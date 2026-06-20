"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error("Not authenticated");
    return;
  }

  const updates = {
    full_name: formData.get("full_name") as string,
    home_location: formData.get("home_location") as string,
    skill_level: formData.get("skill_level") as string,
  };

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id);

  if (error) {
    console.error("Error updating profile:", error.message);
    return;
  }

  revalidatePath("/profile");
}
