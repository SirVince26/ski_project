"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addItineraryItem, deleteItineraryItem } from "@/app/actions/social";
import { Plus, Trash2, Loader2 } from "lucide-react";

interface ItineraryItem {
  id: string;
  day_date: string;
  title: string;
  description: string | null;
  created_by: string | null;
  creator?: {
    full_name: string | null;
  } | null;
}

export function TripItinerarySection({
  tripId,
  itinerary,
  startDate,
  endDate,
  canEdit,
  currentUserId,
}: {
  tripId: string;
  itinerary: ItineraryItem[];
  startDate: string;
  endDate: string;
  canEdit: boolean;
  currentUserId: string;
}) {
  const [showAddForm, setShowAddForm] = useState(false);

  // Group itinerary items by date
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days: string[] = [];
  const current = new Date(start);
  while (current <= end) {
    days.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }

  const groupedItems = days.map(day => ({
    date: day,
    items: itinerary.filter(item => item.day_date === day),
  }));

  return (
    <div className="space-y-4">
      {groupedItems.map((group, dayIndex) => (
        <div key={group.date}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              Day {dayIndex + 1}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(group.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </span>
          </div>
          {group.items.length === 0 ? (
            <p className="text-xs text-muted-foreground pl-4 py-1">No plans yet.</p>
          ) : (
            <div className="space-y-1.5 pl-4">
              {group.items.map(item => (
                <ItineraryRow
                  key={item.id}
                  item={item}
                  canDelete={item.created_by === currentUserId}
                />
              ))}
            </div>
          )}
        </div>
      ))}

      {canEdit && (
        <>
          {showAddForm ? (
            <AddItineraryForm
              tripId={tripId}
              days={days}
              onClose={() => setShowAddForm(false)}
            />
          ) : (
            <Button variant="outline" size="sm" className="w-full" onClick={() => setShowAddForm(true)}>
              <Plus size={14} className="mr-1" /> Add item
            </Button>
          )}
        </>
      )}
    </div>
  );
}

function ItineraryRow({ item, canDelete }: { item: ItineraryItem; canDelete: boolean }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteItineraryItem(item.id);
    });
  };

  return (
    <div className="flex items-start justify-between group p-2 rounded-md hover:bg-muted/50 transition-colors">
      <div>
        <p className="text-sm font-medium">{item.title}</p>
        {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
        {item.creator?.full_name && (
          <p className="text-[10px] text-muted-foreground/60 mt-0.5">— {item.creator.full_name}</p>
        )}
      </div>
      {canDelete && (
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
        </Button>
      )}
    </div>
  );
}

function AddItineraryForm({
  tripId,
  days,
  onClose,
}: {
  tripId: string;
  days: string[];
  onClose: () => void;
}) {
  const [selectedDay, setSelectedDay] = useState(days[0] || "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !selectedDay) return;
    startTransition(async () => {
      const result = await addItineraryItem(tripId, selectedDay, title.trim(), description.trim() || undefined);
      if (result.success) {
        setTitle("");
        setDescription("");
        onClose();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border rounded-lg p-3 bg-card">
      <div>
        <select
          value={selectedDay}
          onChange={e => setSelectedDay(e.target.value)}
          className="w-full text-sm border rounded-md px-3 py-2 bg-background"
        >
          {days.map((day, i) => (
            <option key={day} value={day}>
              Day {i + 1} — {new Date(day + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </option>
          ))}
        </select>
      </div>
      <Input
        placeholder="What's the plan?"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Details (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={2}
      />
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
        <Button type="submit" size="sm" disabled={isPending || !title.trim()}>
          {isPending ? <Loader2 size={14} className="animate-spin mr-1" /> : <Plus size={14} className="mr-1" />}
          Add
        </Button>
      </div>
    </form>
  );
}
