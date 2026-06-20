"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleFavorite(resortId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Check if favorite exists
  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("resort_id", resortId)
    .single();

  if (existing) {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", existing.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase
      .from("favorites")
      .insert({ user_id: user.id, resort_id: resortId });
    if (error) return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function createTrip(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const data = {
    user_id: user.id,
    resort_id: formData.get("resort_id") as string,
    start_date: formData.get("start_date") as string,
    end_date: formData.get("end_date") as string,
    notes: formData.get("notes") as string,
  };

  const { error } = await supabase.from("trips").insert(data);

  if (error) return { error: error.message };

  revalidatePath("/trips");
  return { success: true };
}
