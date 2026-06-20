"use client";

import { useActionState } from "react";
import { createTrip } from "@/app/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Resort } from "@/lib/types";

export function TripForm({ resorts }: { resorts: Resort[] }) {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await createTrip(formData);
    },
    null
  );

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="text-sm font-medium text-green-800 bg-green-100 p-3 rounded-md">
          Trip planned successfully!
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="resort_id">Resort</Label>
        <Select name="resort_id" required>
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
          <Input type="date" id="start_date" name="start_date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end_date">End Date</Label>
          <Input type="date" id="end_date" name="end_date" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" placeholder="Any special plans?" />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Trip"}
      </Button>
    </form>
  );
}
