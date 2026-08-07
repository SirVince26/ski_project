"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { respondToTripInvite } from "@/app/actions/social";
import { Check, X, Loader2, Crown } from "lucide-react";

interface MemberData {
  id: string;
  user_id: string;
  role: string;
  status: string;
  profile?: {
    full_name: string | null;
    home_location: string | null;
    skill_level: string | null;
  } | null;
}

export function TripMemberList({
  members,
  isOwner,
  currentUserId,
  ownerName,
}: {
  members: MemberData[];
  isOwner: boolean;
  currentUserId: string;
  ownerName?: string;
}) {
  return (
    <div className="space-y-2">
      {/* Show the trip organizer first */}
      {isOwner && (
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-primary/5 border border-primary/10">
          <div className="flex items-center gap-2">
            <Crown size={14} className="text-primary" />
            <span className="text-sm font-medium">{ownerName || "You"}</span>
          </div>
          <Badge variant="outline" className="text-xs">Organizer</Badge>
        </div>
      )}

      {members.map(member => (
        <MemberRow
          key={member.id}
          member={member}
          isOwner={isOwner}
          isCurrentUser={member.user_id === currentUserId}
        />
      ))}

      {members.length === 0 && !isOwner && (
        <p className="text-sm text-muted-foreground text-center py-4">No other members yet.</p>
      )}
    </div>
  );
}

function MemberRow({
  member,
  isOwner,
  isCurrentUser,
}: {
  member: MemberData;
  isOwner: boolean;
  isCurrentUser: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleRespond = (accept: boolean) => {
    startTransition(async () => {
      await respondToTripInvite(member.id, accept);
    });
  };

  const statusColors: Record<string, string> = {
    accepted: "text-green-600 dark:text-green-400",
    invited: "text-yellow-600 dark:text-yellow-400",
    declined: "text-muted-foreground",
  };

  return (
    <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
      <div>
        <p className="text-sm font-medium">
          {member.profile?.full_name || "Unknown"}
          {isCurrentUser && <span className="text-muted-foreground ml-1">(you)</span>}
        </p>
        {member.profile?.skill_level && (
          <p className="text-xs text-muted-foreground capitalize">{member.profile.skill_level}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {/* Show accept/decline for pending invites to current user */}
        {isCurrentUser && member.status === "invited" ? (
          <div className="flex gap-1">
            <Button size="sm" variant="default" onClick={() => handleRespond(true)} disabled={isPending}>
              {isPending ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} className="mr-1" />}
              Accept
            </Button>
            <Button size="sm" variant="ghost" onClick={() => handleRespond(false)} disabled={isPending}>
              <X size={12} />
            </Button>
          </div>
        ) : (
          <Badge variant="outline" className={`text-xs capitalize ${statusColors[member.status] || ""}`}>
            {member.status}
          </Badge>
        )}
      </div>
    </div>
  );
}
