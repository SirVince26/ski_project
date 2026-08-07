import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ClipboardList, Mountain, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { InviteFriendToTrip } from "@/components/social/invite-friend-to-trip";
import { TripMemberList } from "@/components/social/trip-member-list";
import { TripItinerarySection } from "@/components/social/trip-itinerary";

interface TripDetailPageProps {
  params: Promise<{ id: string }>;
}

const statusStyles: Record<string, string> = {
  planned: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  completed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
};

export default async function TripDetailPage({ params }: TripDetailPageProps) {
  const { id: tripId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: trip, error } = await supabase
    .from("trips")
    .select("*, resorts(*)")
    .eq("id", tripId)
    .single();

  if (error || !trip) notFound();

  const isOwner = trip.user_id === user.id;
  let isMember = false;
  if (!isOwner) {
    const { data: membership } = await supabase
      .from("trip_members")
      .select("id, status")
      .eq("trip_id", tripId)
      .eq("user_id", user.id)
      .maybeSingle();
    isMember = membership?.status === "accepted";
    if (!membership) notFound();
  }

  const [{ data: members }, { data: itinerary }] = await Promise.all([
    supabase.from("trip_members").select("*, profile:profiles(*)").eq("trip_id", tripId).order("created_at"),
    supabase.from("trip_itinerary").select("*, creator:profiles(*)").eq("trip_id", tripId).order("day_date").order("created_at"),
  ]);

  let friends: any[] = [];
  if (isOwner) {
    const { data: friendships } = await supabase
      .from("friends")
      .select("*, profile:profiles!friends_user_id_fkey(*), friend_profile:profiles!friends_friend_id_fkey(*)")
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
      .eq("status", "accepted");

    friends = (friendships || [])
      .map(f => (f.user_id === user.id ? f.friend_profile : f.profile))
      .filter(Boolean);

    const memberIds = new Set((members || []).map(m => m.user_id));
    friends = friends.filter(f => !memberIds.has(f.id));
  }

  const startDate = new Date(trip.start_date);
  const endDate = new Date(trip.end_date);
  const numDays = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  const acceptedMemberCount = (members || []).filter(m => m.status === "accepted").length;

  return (
    <div className="container py-8 px-4 md:px-6 max-w-5xl mx-auto">
      {/* Back link */}
      <Link href="/trips" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft size={14} />
        Back to trips
      </Link>

      {/* Hero Header */}
      <div className="rounded-2xl border bg-gradient-to-br from-card to-muted/30 p-6 md:p-8 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${statusStyles[trip.status] || ""}`}>
            {trip.status}
          </span>
          {isOwner && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-primary/10 text-primary border-primary/20">
              Organizer
            </span>
          )}
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl shrink-0 hidden sm:block">
            <Mountain className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{trip.resorts?.name}</h1>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-primary/60" />
                {trip.resorts?.state}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-primary/60" />
                {startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} — {endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={14} className="text-primary/60" />
                {acceptedMemberCount + 1} skier{acceptedMemberCount + 1 !== 1 ? "s" : ""}
              </span>
            </div>
            {trip.notes && (
              <p className="mt-3 text-sm text-muted-foreground italic">"{trip.notes}"</p>
            )}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Members Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Users size={15} className="text-primary" />
              </div>
              <CardTitle className="text-base">Trip Members</CardTitle>
              <Badge variant="outline" className="ml-auto text-xs">{acceptedMemberCount + 1}</Badge>
            </div>
            <CardDescription className="text-xs">
              {isOwner ? "Manage your group members and invite friends." : "View your fellow trip members."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <TripMemberList
              members={members || []}
              isOwner={isOwner}
              currentUserId={user.id}
              ownerName="You (organizer)"
            />
            {isOwner && friends.length > 0 && (
              <div className="pt-3 border-t border-dashed">
                <InviteFriendToTrip tripId={tripId} friends={friends} />
              </div>
            )}
            {isOwner && friends.length === 0 && (members || []).length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-2">
                Add friends first to invite them to this trip.{" "}
                <Link href="/friends" className="text-primary hover:underline">Go to Friends →</Link>
              </p>
            )}
          </CardContent>
        </Card>

        {/* Itinerary Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <ClipboardList size={15} className="text-primary" />
              </div>
              <CardTitle className="text-base">Itinerary</CardTitle>
              <Badge variant="outline" className="ml-auto text-xs">{numDays} day{numDays !== 1 ? "s" : ""}</Badge>
            </div>
            <CardDescription className="text-xs">
              {canEdit(isOwner, isMember) ? "Add and manage your day-by-day plans." : "View your trip plans."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TripItinerarySection
              tripId={tripId}
              itinerary={itinerary || []}
              startDate={trip.start_date}
              endDate={trip.end_date}
              canEdit={isOwner || isMember}
              currentUserId={user.id}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function canEdit(isOwner: boolean, isMember: boolean) {
  return isOwner || isMember;
}
