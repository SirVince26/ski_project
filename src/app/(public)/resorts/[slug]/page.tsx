import { getResortBySlug } from "@/lib/api/resorts";
import { getWeatherData } from "@/lib/api/weather";
import { notFound } from "next/navigation";
import { Mountain, MapPin, TrendingUp, DollarSign, ExternalLink, Ticket, Trees, Star, PartyPopper, Snowflake } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/resort/favorite-button";
import { createClient } from "@/lib/supabase/server";
import { MapWrapper } from "@/components/map/map-wrapper";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

function DifficultyBar({ beginner, intermediate, advanced, expert, greenTrails, blueTrails, blackTrails, doubleBlackTrails }: {
  beginner?: number | null; intermediate?: number | null; advanced?: number | null; expert?: number | null;
  greenTrails?: number | null; blueTrails?: number | null; blackTrails?: number | null; doubleBlackTrails?: number | null;
}) {
  const b = beginner || 0;
  const i = intermediate || 0;
  const a = advanced || 0;
  const e = expert || 0;
  const total = b + i + a + e;
  const hasTrailCounts = (greenTrails ?? 0) + (blueTrails ?? 0) + (blackTrails ?? 0) + (doubleBlackTrails ?? 0) > 0;

  if (total === 0 && !hasTrailCounts) return null;

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-foreground">Trail Difficulty</p>
      {total > 0 && (
        <div className="flex h-3 rounded-full overflow-hidden">
          {b > 0 && <div className="bg-green-500" style={{ width: `${b}%` }} title={`Beginner ${b}%`} />}
          {i > 0 && <div className="bg-blue-500" style={{ width: `${i}%` }} title={`Intermediate ${i}%`} />}
          {a > 0 && <div className="bg-black dark:bg-zinc-700" style={{ width: `${a}%` }} title={`Advanced ${a}%`} />}
          {e > 0 && <div className="bg-orange-500" style={{ width: `${e}%` }} title={`Expert ${e}%`} />}
        </div>
      )}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {(b > 0 || (greenTrails ?? 0) > 0) && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            {hasTrailCounts ? `${greenTrails} trails` : `${b}%`} Beginner
          </span>
        )}
        {(i > 0 || (blueTrails ?? 0) > 0) && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            {hasTrailCounts ? `${blueTrails} trails` : `${i}%`} Intermediate
          </span>
        )}
        {(a > 0 || (blackTrails ?? 0) > 0) && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-black dark:bg-zinc-700" />
            {hasTrailCounts ? `${blackTrails} trails` : `${a}%`} Advanced
          </span>
        )}
        {(e > 0 || (doubleBlackTrails ?? 0) > 0) && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            {hasTrailCounts ? `${doubleBlackTrails} trails` : `${e}%`} Expert
          </span>
        )}
      </div>
    </div>
  );
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

  const heroImage = resort.image_url || (resort.images?.length ? resort.images[0] : null);

  return (
    <div className="container py-10 px-4 md:px-6 max-w-6xl">
      <div className="flex flex-col gap-8">

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/5 h-72 lg:h-80 rounded-xl overflow-hidden relative">
            {heroImage ? (
              <img src={heroImage} alt={resort.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-muted to-accent text-muted-foreground">
                <Mountain size={64} className="opacity-40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge>{resort.state}</Badge>
              <Badge variant="outline" className="capitalize">{resort.region.replace('-', ' ')}</Badge>
              {resort.country && resort.country !== 'USA' && <Badge variant="outline">{resort.country}</Badge>}
              {resort.terrain_parks && (
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <Snowflake size={12} className="mr-1" />Terrain Park
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-4xl font-bold tracking-tight">{resort.name}</h1>
              {user && <FavoriteButton resortId={resort.id} isFavorite={isFavorite} />}
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">{resort.description}</p>
            
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2">
                <Mountain className="text-primary" size={20} />
                <div>
                  <p className="text-xs text-muted-foreground">Vertical Drop</p>
                  <p className="font-semibold">{resort.vertical_drop_ft?.toLocaleString()}′</p>
                </div>
              </div>
              {resort.elevation_ft && (
                <div className="flex items-center gap-2">
                  <TrendingUp className="text-primary" size={20} />
                  <div>
                    <p className="text-xs text-muted-foreground">Summit</p>
                    <p className="font-semibold">{resort.elevation_ft.toLocaleString()}′</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <DollarSign className="text-primary" size={20} />
                <div>
                  <p className="text-xs text-muted-foreground">Lift Ticket</p>
                  <p className="font-semibold">${resort.lift_ticket_price_usd}</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {resort.website_url && (
                <Link href={resort.website_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <ExternalLink size={14} className="mr-2" />Visit Website
                  </Button>
                </Link>
              )}
              {resort.lift_ticket_url && (
                <Link href={resort.lift_ticket_url} target="_blank" rel="noopener noreferrer">
                  <Button size="sm">
                    <Ticket size={14} className="mr-2" />Buy Lift Tickets
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 border rounded-xl bg-card">
            <p className="text-sm text-muted-foreground">Trails</p>
            <p className="text-2xl font-bold">{resort.num_trails || '—'}</p>
          </div>
          <div className="p-4 border rounded-xl bg-card">
            <p className="text-sm text-muted-foreground">Lifts</p>
            <p className="text-2xl font-bold">{resort.num_lifts || '—'}</p>
          </div>
          <div className="p-4 border rounded-xl bg-card">
            <p className="text-sm text-muted-foreground">Skiable Acres</p>
            <p className="text-2xl font-bold">{resort.skiable_acres?.toLocaleString() || '—'}</p>
          </div>
          <div className="p-4 border rounded-xl bg-card">
            <p className="text-sm text-muted-foreground">Difficulty</p>
            <p className="text-lg font-bold capitalize">{resort.difficulty_level?.replace('-', ' ') || '—'}</p>
          </div>
        </div>

        {/* Difficulty Breakdown + Scores */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-xl bg-card space-y-4">
            <DifficultyBar
              beginner={resort.beginner_percent}
              intermediate={resort.intermediate_percent}
              advanced={resort.advanced_percent}
              expert={resort.expert_percent}
              greenTrails={resort.green_trails}
              blueTrails={resort.blue_trails}
              blackTrails={resort.black_trails}
              doubleBlackTrails={resort.double_black_trails}
            />
            {resort.family_score && (
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><Star size={14} /> Family Friendly</span>
                <span className="font-semibold">{resort.family_score}/10</span>
              </div>
            )}
            {resort.nightlife_score && (
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><PartyPopper size={14} /> Nightlife</span>
                <span className="font-semibold">{resort.nightlife_score}/10</span>
              </div>
            )}
          </div>

          {/* Weather */}
          <div className="p-6 border rounded-xl bg-card flex flex-col">
            <h3 className="text-lg font-bold mb-4">Current Conditions</h3>
            {weather ? (
              <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold">{weather.current.temperature_f}°F</div>
                  <div className="text-right text-muted-foreground">{weather.current.weather_description}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Base Depth</p>
                    <p className="font-semibold">{weather.current.snow_depth_inches}″</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">New Snow</p>
                    <p className="font-semibold">{weather.current.snowfall_inches}″</p>
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
        </div>

        {/* Map */}
        <div className="h-72 border rounded-xl bg-card overflow-hidden relative">
          <div className="absolute inset-0">
            <MapWrapper resorts={[resort]} center={[resort.latitude, resort.longitude]} zoom={11} />
          </div>
        </div>

      </div>
    </div>
  );
}
