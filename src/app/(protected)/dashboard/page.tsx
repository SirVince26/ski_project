import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResortGrid } from "@/components/resort/resort-grid";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  const { data: favorites } = await supabase.from("favorites").select("*, resorts(*)").eq("user_id", user.id).limit(4);
  const { data: trips } = await supabase.from("trips").select("*, resorts(*)").eq("user_id", user.id).order("start_date", { ascending: true }).limit(3);

  const favoriteResorts = favorites?.map(f => f.resorts).filter(Boolean) || [];

  return (
    <div className="container py-10 px-4 md:px-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {profile?.full_name || 'Skier'}!</h1>
          <p className="text-muted-foreground mt-1">Here's your ski dashboard.</p>
        </div>
        <Link href="/resorts" className={buttonVariants()}>Discover Resorts</Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Your Favorites</h2>
              <Link href="/favorites" className="text-blue-600 hover:underline text-sm font-medium">View All</Link>
            </div>
            {favoriteResorts.length > 0 ? (
              <ResortGrid resorts={favoriteResorts as any[]} />
            ) : (
              <div className="border rounded-xl p-8 text-center bg-slate-50">
                 <p className="text-muted-foreground">You haven't saved any favorites yet.</p>
              </div>
            )}
          </section>
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Trips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(!trips || trips.length === 0) ? (
                 <p className="text-sm text-muted-foreground">No trips planned.</p>
              ) : (
                trips.map(trip => (
                  <div key={trip.id} className="border-b pb-3 last:border-0 last:pb-0">
                    <h4 className="font-semibold">{trip.resorts?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(trip.start_date).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
              <Link href="/trips" className={buttonVariants({ variant: "outline", className: "w-full mt-2" })}>Plan a Trip</Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
