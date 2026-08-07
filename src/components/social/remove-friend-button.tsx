"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { removeFriend } from "@/app/actions/social";
import { UserMinus, Loader2 } from "lucide-react";

export function RemoveFriendButton({ friendshipId }: { friendshipId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      size="sm"
      variant="ghost"
      className="text-muted-foreground hover:text-destructive"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await removeFriend(friendshipId);
        });
      }}
    >
      {isPending ? <Loader2 size={14} className="animate-spin" /> : <UserMinus size={14} />}
    </Button>
  );
}
