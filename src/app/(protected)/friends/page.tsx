import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, Clock } from "lucide-react";
import { FriendSearch } from "@/components/social/friend-search";
import { FriendRequestActions } from "@/components/social/friend-request-actions";
import { RemoveFriendButton } from "@/components/social/remove-friend-button";

const skillColors: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  advanced: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  expert: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

function SkierAvatar({ name, size = "md" }: { name: string | null; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-12 w-12 text-base" };
  const initials = name ? name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "?";
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary/70 to-primary flex items-center justify-center text-primary-foreground font-bold shrink-0`}>
      {initials}
    </div>
  );
}

export default async function FriendsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: friendships } = await supabase
    .from("friends")
    .select("*, profile:profiles!friends_user_id_fkey(*), friend_profile:profiles!friends_friend_id_fkey(*)")
    .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
    .order("created_at", { ascending: false });

  const acceptedFriends = (friendships || []).filter(f => f.status === "accepted");
  const pendingReceived = (friendships || []).filter(f => f.status === "pending" && f.friend_id === user.id);
  const pendingSent = (friendships || []).filter(f => f.status === "pending" && f.user_id === user.id);

  return (
    <div className="container py-10 px-4 md:px-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Users className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Friends</h1>
          <p className="text-muted-foreground mt-0.5">Connect with other skiers and plan trips together.</p>
        </div>
        {acceptedFriends.length > 0 && (
          <Badge className="ml-auto text-sm px-3 py-1">{acceptedFriends.length} friend{acceptedFriends.length !== 1 ? "s" : ""}</Badge>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Search / Add Friends */}
        <div className="md:col-span-1 space-y-4">
          <Card className="sticky top-20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Find a Skier</CardTitle>
              <CardDescription className="text-xs">Search by name to send a friend request.</CardDescription>
            </CardHeader>
            <CardContent>
              <FriendSearch />
            </CardContent>
          </Card>
        </div>

        {/* Friends List + Requests */}
        <div className="md:col-span-2 space-y-5">
          {/* Pending Incoming Requests */}
          {pendingReceived.length > 0 && (
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <CardTitle className="text-base">Friend Requests</CardTitle>
                  <Badge variant="default" className="ml-auto text-xs">{pendingReceived.length} new</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {pendingReceived.map(f => {
                  const requester = f.profile;
                  return (
                    <div key={f.id} className="flex items-center gap-3 p-3 rounded-xl bg-background border">
                      <SkierAvatar name={requester?.full_name} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{requester?.full_name || "Unknown user"}</p>
                        {requester?.home_location && (
                          <p className="text-xs text-muted-foreground truncate">{requester.home_location}</p>
                        )}
                        {requester?.skill_level && (
                          <span className={`mt-1 inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize ${skillColors[requester.skill_level] || ""}`}>
                            {requester.skill_level}
                          </span>
                        )}
                      </div>
                      <FriendRequestActions friendshipId={f.id} />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* Pending Sent */}
          {pendingSent.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-muted-foreground">Pending Sent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {pendingSent.map(f => {
                  const friend = f.friend_profile;
                  return (
                    <div key={f.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                      <SkierAvatar name={friend?.full_name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{friend?.full_name || "Unknown user"}</p>
                        {friend?.home_location && (
                          <p className="text-xs text-muted-foreground truncate">{friend.home_location}</p>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs text-muted-foreground">Awaiting</Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* Accepted Friends */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <UserCheck size={16} className="text-primary" />
                <CardTitle className="text-base">
                  My Friends
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {acceptedFriends.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Users className="h-8 w-8 text-muted-foreground/40" />
                  </div>
                  <p className="text-sm font-medium">No friends yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Search for other skiers to add them as friends.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {acceptedFriends.map(f => {
                    const friendProfile = f.user_id === user.id ? f.friend_profile : f.profile;
                    return (
                      <div key={f.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors group">
                        <SkierAvatar name={friendProfile?.full_name} />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{friendProfile?.full_name || "Unknown user"}</p>
                          {friendProfile?.home_location && (
                            <p className="text-xs text-muted-foreground truncate">{friendProfile.home_location}</p>
                          )}
                          {friendProfile?.skill_level && (
                            <span className={`mt-1 inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize ${skillColors[friendProfile.skill_level] || ""}`}>
                              {friendProfile.skill_level}
                            </span>
                          )}
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <RemoveFriendButton friendshipId={f.id} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
