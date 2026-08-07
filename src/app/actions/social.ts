"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// ============================================
// FRIEND ACTIONS
// ============================================

export async function sendFriendRequest(friendEmail: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  // Look up the friend's profile by finding their auth user by email
  // We need to search profiles — but email is on auth.users, not profiles.
  // Workaround: search profiles by matching some criteria, or use a different approach
  // For now, we'll look up profiles and match by email via the auth admin endpoint
  // Better approach: add email to profiles table display, or search by name/handle

  // Search for user by email in auth (we can't do this client-side, need service role)
  // Alternative: find profiles where the user knows the friend's user ID or name
  // For MVP: accept a user ID directly from the friends search UI
  return { error: "Use addFriendById instead" };
}

export async function addFriendById(friendId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };
  if (user.id === friendId) return { error: "Cannot add yourself" };

  // Check if friendship already exists in either direction
  const { data: existing } = await supabase
    .from("friends")
    .select("id, status")
    .or(`and(user_id.eq.${user.id},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${user.id})`)
    .maybeSingle();

  if (existing) {
    return { error: existing.status === 'accepted' ? "Already friends" : "Request already sent" };
  }

  const { error } = await supabase.from("friends").insert({
    user_id: user.id,
    friend_id: friendId,
    status: "pending",
  });

  if (error) return { error: error.message };

  // Create notification for the friend
  await supabase.from("notifications").insert({
    user_id: friendId,
    title: "New Friend Request",
    body: "Someone sent you a friend request.",
    link: "/friends",
  });

  revalidatePath("/friends");
  return { success: true };
}

export async function respondToFriendRequest(friendshipId: string, accept: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data: friendship } = await supabase
    .from("friends")
    .select("*")
    .eq("id", friendshipId)
    .single();

  if (!friendship) return { error: "Request not found" };
  if (friendship.friend_id !== user.id) return { error: "Not authorized" };

  const { error } = await supabase
    .from("friends")
    .update({ status: accept ? "accepted" : "declined" })
    .eq("id", friendshipId);

  if (error) return { error: error.message };

  // Notify the requester
  await supabase.from("notifications").insert({
    user_id: friendship.user_id,
    title: accept ? "Friend Request Accepted" : "Friend Request Declined",
    body: accept ? "Your friend request was accepted!" : "Your friend request was declined.",
    link: "/friends",
  });

  revalidatePath("/friends");
  return { success: true };
}

export async function removeFriend(friendshipId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("friends")
    .delete()
    .eq("id", friendshipId);

  if (error) return { error: error.message };

  revalidatePath("/friends");
  return { success: true };
}

// ============================================
// TRIP MEMBER ACTIONS
// ============================================

export async function inviteToTrip(tripId: string, friendId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  // Verify trip belongs to user or user is organizer
  const { data: trip } = await supabase
    .from("trips")
    .select("id, user_id")
    .eq("id", tripId)
    .single();

  if (!trip) return { error: "Trip not found" };
  if (trip.user_id !== user.id) {
    // Check if user is organizer
    const { data: membership } = await supabase
      .from("trip_members")
      .select("role")
      .eq("trip_id", tripId)
      .eq("user_id", user.id)
      .eq("role", "organizer")
      .maybeSingle();
    if (!membership) return { error: "Only trip organizers can invite members" };
  }

  // Check if already a member
  const { data: existing } = await supabase
    .from("trip_members")
    .select("id")
    .eq("trip_id", tripId)
    .eq("user_id", friendId)
    .maybeSingle();

  if (existing) return { error: "Already invited" };

  const { error } = await supabase.from("trip_members").insert({
    trip_id: tripId,
    user_id: friendId,
    role: "member",
    status: "invited",
  });

  if (error) return { error: error.message };

  // Notify the friend
  await supabase.from("notifications").insert({
    user_id: friendId,
    title: "Trip Invitation",
    body: "You've been invited to a ski trip!",
    link: `/trips/${tripId}`,
  });

  revalidatePath("/trips");
  return { success: true };
}

export async function respondToTripInvite(memberId: string, accept: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("trip_members")
    .update({ status: accept ? "accepted" : "declined" })
    .eq("id", memberId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/trips");
  return { success: true };
}

// ============================================
// TRIP ITINERARY ACTIONS
// ============================================

export async function addItineraryItem(tripId: string, dayDate: string, title: string, description?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("trip_itinerary").insert({
    trip_id: tripId,
    day_date: dayDate,
    title,
    description: description || null,
    created_by: user.id,
  });

  if (error) return { error: error.message };

  revalidatePath("/trips");
  return { success: true };
}

export async function deleteItineraryItem(itemId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("trip_itinerary")
    .delete()
    .eq("id", itemId);

  if (error) return { error: error.message };

  revalidatePath("/trips");
  return { success: true };
}

// ============================================
// NOTIFICATION ACTIONS
// ============================================

export async function markNotificationRead(notificationId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", notificationId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  return { success: true };
}

export async function markAllNotificationsRead() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("user_id", user.id)
    .eq("read", false);

  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

// ============================================
// PROFILE SEARCH (for adding friends)
// ============================================

export async function searchProfiles(query: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated", profiles: [] };

  if (!query || query.length < 2) return { error: null, profiles: [] };

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url, home_location")
    .neq("id", user.id)
    .ilike("full_name", `%${query}%`)
    .limit(10);

  if (error) return { error: error.message, profiles: [] };
  return { error: null, profiles: profiles || [] };
}
