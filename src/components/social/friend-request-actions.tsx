"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { respondToFriendRequest } from "@/app/actions/social";
import { Check, X, Loader2 } from "lucide-react";

export function FriendRequestActions({ friendshipId }: { friendshipId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleRespond = (accept: boolean) => {
    startTransition(async () => {
      await respondToFriendRequest(friendshipId, accept);
    });
  };

  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={() => handleRespond(true)} disabled={isPending}>
        {isPending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} className="mr-1" />}
        Accept
      </Button>
      <Button size="sm" variant="ghost" onClick={() => handleRespond(false)} disabled={isPending}>
        <X size={14} />
      </Button>
    </div>
  );
}
