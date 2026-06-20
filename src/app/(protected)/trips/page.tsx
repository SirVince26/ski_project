import { createClient } from "@/lib/supabase/server";
import { getResorts } from "@/lib/api/resorts";
import { TripForm } from "@/components/trip/trip-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

export default async function TripsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [resorts, { data: trips }] = await Promise.all([
    getResorts(),
    supabase.from("trips").select("*, resorts(*)").eq("user_id", user.id).order("start_date", { ascending: true })
  ]);

  return (
    <div className="container py-10 px-4 md:px-6">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Plan a New Trip</CardTitle>
              <CardDescription>Select a resort and dates.</CardDescription>
            </CardHeader>
            <CardContent>
              <TripForm resorts={resorts} />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">My Trips</h2>
          {(!trips || trips.length === 0) ? (
            <div className="text-center py-12 border rounded-xl bg-slate-50">
              <p className="text-muted-foreground">You don't have any trips planned yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {trips.map((trip) => (
                <Card key={trip.id}>
                  <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{trip.resorts?.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar size={14} className="mr-2" />
                        {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                      </div>
                      {trip.notes && <p className="text-sm mt-2 text-slate-600">{trip.notes}</p>}
                    </div>
                    <Badge variant={trip.status === 'completed' ? 'secondary' : 'default'}>
                      {trip.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
