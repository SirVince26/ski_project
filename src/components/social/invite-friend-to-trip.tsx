"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { inviteToTrip } from "@/app/actions/social";
import { UserPlus, Loader2 } from "lucide-react";

interface FriendProfile {
  id: string;
  full_name: string | null;
  home_location: string | null;
}

export function InviteFriendToTrip({ tripId, friends }: { tripId: string; friends: FriendProfile[] }) {
  const [selectedFriend, setSelectedFriend] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleInvite = () => {
    if (!selectedFriend) return;
    setMessage(null);
    startTransition(async () => {
      const result = await inviteToTrip(tripId, selectedFriend);
      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ type: "success", text: "Invitation sent!" });
        setSelectedFriend("");
      }
    });
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Invite a friend</p>
      <div className="flex gap-2">
        <Select value={selectedFriend} onValueChange={(v) => v && setSelectedFriend(v)}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select a friend" />
          </SelectTrigger>
          <SelectContent>
            {friends.map(f => (
              <SelectItem key={f.id} value={f.id}>
                {f.full_name || "Unnamed"} {f.home_location ? `(${f.home_location})` : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size="icon" onClick={handleInvite} disabled={!selectedFriend || isPending}>
          {isPending ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
        </Button>
      </div>
      {message && (
        <p className={`text-xs ${message.type === "error" ? "text-destructive" : "text-green-600 dark:text-green-400"}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}
