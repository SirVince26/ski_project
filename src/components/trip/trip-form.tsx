"use client";

import { useActionState, useState, useMemo } from "react";
import { createTrip } from "@/app/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Resort } from "@/lib/types";
import { estimateTripCost, getLodgingTiers, TripEstimate } from "@/lib/estimation";
import { DollarSign } from "lucide-react";

export function TripForm({ resorts }: { resorts: Resort[] }) {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await createTrip(formData);
    },
    null
  );

  const [selectedResortId, setSelectedResortId] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [groupSize, setGroupSize] = useState(2);
  const [lodgingTier, setLodgingTier] = useState<"budget" | "moderate" | "premium">("moderate");

  const selectedResort = resorts.find(r => r.id === selectedResortId);
  const lodgingTiers = getLodgingTiers();

  const estimate: TripEstimate | null = useMemo(() => {
    if (!selectedResort || !startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const numDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    return estimateTripCost({ resort: selectedResort, numDays, groupSize, lodgingTier });
  }, [selectedResort, startDate, endDate, groupSize, lodgingTier]);

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-4">
        {state?.error && (
          <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">
            {state.error}
          </div>
        )}
        {state?.success && (
          <div className="text-sm font-medium text-green-800 bg-green-100 dark:text-green-300 dark:bg-green-900/30 p-3 rounded-md">
            Trip planned successfully!
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="resort_id">Resort</Label>
          <Select name="resort_id" required value={selectedResortId} onValueChange={(v) => v && setSelectedResortId(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a resort" />
            </SelectTrigger>
            <SelectContent>
              {resorts.map((r) => (
                <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start_date">Start Date</Label>
            <Input type="date" id="start_date" name="start_date" required value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end_date">End Date</Label>
            <Input type="date" id="end_date" name="end_date" required value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="group_size">Group Size</Label>
            <Input type="number" id="group_size" name="group_size" min={1} max={20} value={groupSize} onChange={e => setGroupSize(parseInt(e.target.value) || 1)} />
          </div>
          <div className="space-y-2">
            <Label>Lodging</Label>
            <Select value={lodgingTier} onValueChange={(v) => setLodgingTier(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {lodgingTiers.map(t => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" placeholder="Any special plans?" />
        </div>
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Saving..." : "Save Trip"}
        </Button>
      </form>

      {/* Cost Estimate Panel */}
      {estimate && (
        <div className="border rounded-xl p-4 bg-card space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <DollarSign size={16} className="text-primary" />
            Estimated Trip Cost
          </div>
          {estimate.breakdown.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <div>
                <span className="font-medium">{item.label}</span>
                <span className="text-muted-foreground ml-2 text-xs">{item.detail}</span>
              </div>
              <span className="font-semibold">${item.amount.toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t border-border pt-2 flex justify-between text-sm font-bold">
            <span>Total ({groupSize} people)</span>
            <span className="text-primary">${estimate.grandTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Per person</span>
            <span>${estimate.perPersonTotal.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
