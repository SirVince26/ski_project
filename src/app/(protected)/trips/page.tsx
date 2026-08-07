import { createClient } from "@/lib/supabase/server";
import { getResorts } from "@/lib/api/resorts";
import { TripForm } from "@/components/trip/trip-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight, Users } from "lucide-react";
import Link from "next/link";

export default async function TripsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [resorts, { data: trips }, { data: invitations }] = await Promise.all([
    getResorts(),
    supabase.from("trips").select("*, resorts(*)").eq("user_id", user.id).order("start_date", { ascending: true }),
    supabase.from("trip_members").select("*, trip:trips(*, resorts(*))").eq("user_id", user.id).eq("status", "invited"),
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
        
        <div className="md:col-span-2 space-y-6">
          {/* Pending Trip Invitations */}
          {invitations && invitations.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Users size={18} className="text-primary" />
                Trip Invitations
              </h2>
              <div className="space-y-3">
                {invitations.map((inv: any) => (
                  <Link key={inv.id} href={`/trips/${inv.trip_id}`}>
                    <Card className="hover:bg-muted/30 transition-colors cursor-pointer border-primary/20">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{inv.trip?.resorts?.name || "Unknown resort"}</h3>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Calendar size={12} className="mr-1" />
                            {new Date(inv.trip?.start_date).toLocaleDateString()} — {new Date(inv.trip?.end_date).toLocaleDateString()}
                          </div>
                        </div>
                        <Badge variant="default">Invited</Badge>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* My Trips */}
          <div>
            <h2 className="text-2xl font-bold mb-4">My Trips</h2>
            {(!trips || trips.length === 0) ? (
              <div className="text-center py-12 border rounded-xl bg-muted">
                <p className="text-muted-foreground">You don&apos;t have any trips planned yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {trips.map((trip) => (
                  <Link key={trip.id} href={`/trips/${trip.id}`}>
                    <Card className="hover:bg-muted/30 transition-colors cursor-pointer">
                      <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg">{trip.resorts?.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Calendar size={14} className="mr-2" />
                            {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                          </div>
                          {trip.notes && <p className="text-sm mt-2 text-muted-foreground">{trip.notes}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={trip.status === 'completed' ? 'secondary' : 'default'}>
                            {trip.status}
                          </Badge>
                          <ChevronRight size={16} className="text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

