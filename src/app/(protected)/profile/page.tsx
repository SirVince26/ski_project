import { createClient } from "@/lib/supabase/server";
import { updateProfile } from "@/app/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="container py-10 max-w-2xl">
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
