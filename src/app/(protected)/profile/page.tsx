import { createClient } from "@/lib/supabase/server";
import { updateProfile } from "@/app/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (!user || authError) {
    redirect("/login");
  }

  // Try to fetch profile
  let { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // If profile doesn't exist, create it (handle_new_user trigger may have failed)
  if (profileError && profileError.code === "PGRST116") {
    const { error: insertError } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: user.user_metadata?.full_name || "",
        avatar_url: user.user_metadata?.avatar_url || "",
      }, { onConflict: "id" });

    if (!insertError) {
      const { data: retryProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      profile = retryProfile;
      profileError = null;
    } else {
      profileError = insertError;
    }
  }

  // If we still can't get a profile, show an error
  if (profileError && profileError.code !== "PGRST116") {
    return (
      <div className="container py-10 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="mx-auto h-10 w-10 text-destructive mb-4" />
            <h2 className="text-xl font-bold mb-2">Profile Error</h2>
            <p className="text-muted-foreground mb-4">
              We couldn&apos;t load your profile. This usually resolves itself — try refreshing the page.
            </p>
            <p className="text-xs text-muted-foreground">
              Error: {profileError.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-10 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profile Settings</CardTitle>
          <CardDescription>
            Update your personal information and skiing preferences.
          </CardDescription>
        </CardHeader>
        <form action={updateProfile}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input disabled value={user.email} />
              <p className="text-xs text-muted-foreground">Your email cannot be changed here.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input id="full_name" name="full_name" defaultValue={profile?.full_name || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="home_location">Home Location</Label>
              <Input id="home_location" name="home_location" placeholder="e.g. Baltimore, MD" defaultValue={profile?.home_location || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skill_level">Skill Level</Label>
              <Select name="skill_level" defaultValue={profile?.skill_level || "intermediate"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your skill level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
