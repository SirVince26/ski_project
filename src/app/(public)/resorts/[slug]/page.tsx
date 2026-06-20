import { getResortBySlug } from "@/lib/api/resorts";
import { getWeatherData } from "@/lib/api/weather";
import { notFound } from "next/navigation";
import { Mountain, MapPin, TrendingUp, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/resort/favorite-button";
import { createClient } from "@/lib/supabase/server";
import { MapWrapper } from "@/components/map/map-wrapper";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ResortDetailPage({ params }: Props) {
  const { slug } = await params;
  const resort = await getResortBySlug(slug);

  if (!resort) {
    notFound();
  }

  const weather = await getWeatherData(resort.latitude, resort.longitude);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let isFavorite = false;
  if (user) {
    const { data } = await supabase.from("favorites").select("id").eq("user_id", user.id).eq("resort_id", resort.id).single();
    if (data) isFavorite = true;
  }

  return (
    <div className="container py-10 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="w-full md:w-1/3 h-64 bg-slate-200 rounded-xl overflow-hidden relative">
            {resort.image_url ? (
              <img 
                src={resort.image_url} 
                alt={resort.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                <Mountain size={64} />
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <Badge>{resort.state}</Badge>
              <Badge variant="outline" className="capitalize">{resort.region.replace('-', ' ')}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold tracking-tight">{resort.name}</h1>
              {user && <FavoriteButton resortId={resort.id} isFavorite={isFavorite} />}
            </div>
            <p className="text-xl text-muted-foreground">{resort.description}</p>
            
            <div className="flex flex-wrap gap-6 pt-4">
               <div className="flex items-center gap-2">
                 <Mountain className="text-blue-500" />
                 <div>
                   <p className="text-sm text-muted-foreground">Vertical Drop</p>
                   <p className="font-semibold">{resort.vertical_drop_ft} ft</p>
                 </div>
               </div>
               <div className="flex items-center gap-2">
                 <TrendingUp className="text-blue-500" />
                 <div>
                   <p className="text-sm text-muted-foreground">Difficulty</p>
                   <p className="font-semibold capitalize">{resort.difficulty_level?.replace('-', ' ')}</p>
                 </div>
               </div>
               <div className="flex items-center gap-2">
                 <DollarSign className="text-blue-500" />
                 <div>
                   <p className="text-sm text-muted-foreground">Lift Ticket</p>
                   <p className="font-semibold">${resort.lift_ticket_price_usd}</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border rounded-xl bg-slate-50">
            <p className="text-sm text-muted-foreground">Trails</p>
            <p className="text-2xl font-bold">{resort.num_trails}</p>
          </div>
          <div className="p-4 border rounded-xl bg-slate-50">
            <p className="text-sm text-muted-foreground">Lifts</p>
            <p className="text-2xl font-bold">{resort.num_lifts}</p>
          </div>
          <div className="p-4 border rounded-xl bg-slate-50">
            <p className="text-sm text-muted-foreground">Skiable Acres</p>
            <p className="text-2xl font-bold">{resort.skiable_acres}</p>
          </div>
          <div className="p-4 border rounded-xl bg-slate-50">
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="text-lg font-bold">{resort.latitude.toFixed(2)}, {resort.longitude.toFixed(2)}</p>
          </div>
        </div>

        {/* Placeholder for Weather and Map */}
        <div className="grid md:grid-cols-2 gap-8 mt-4">
          <div className="p-6 border rounded-xl bg-slate-50 flex flex-col">
            <h3 className="text-lg font-bold mb-4">Current Conditions</h3>
            {weather ? (
              <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold">{weather.current.temperature_f}°F</div>
                  <div className="text-right text-muted-foreground">{weather.current.weather_description}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Base Depth</p>
                    <p className="font-semibold">{weather.current.snow_depth_inches} in</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">New Snow</p>
                    <p className="font-semibold">{weather.current.snowfall_inches} in</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Wind</p>
                    <p className="font-semibold">{weather.current.wind_speed_mph} mph</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Weather data unavailable
              </div>
            )}
          </div>
          <div className="h-64 border rounded-xl bg-slate-50 flex items-center justify-center text-muted-foreground overflow-hidden relative">
            <div className="absolute inset-0">
               <MapWrapper resorts={[resort]} center={[resort.latitude, resort.longitude]} zoom={11} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
