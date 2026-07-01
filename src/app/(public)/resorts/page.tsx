import { getResorts } from "@/lib/api/resorts";
import { ResortGrid } from "@/components/resort/resort-grid";
import { ResortFilters } from "@/components/resort/resort-filters";
import { Resort } from "@/lib/types";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ResortsPage({ searchParams }: Props) {
  const params = await searchParams;
  let resorts = await getResorts();
  
  // Text search (from homepage search bar)
  const search = (params.search as string)?.toLowerCase();
  if (search) {
    resorts = resorts.filter(r =>
      r.name.toLowerCase().includes(search) ||
      r.state.toLowerCase().includes(search) ||
      r.region.toLowerCase().replace('-', ' ').includes(search)
    );
  }

  // Apply filtering
  const region = params.region as string;
  const difficulty = params.difficulty as string;
  const price = params.price ? parseInt(params.price as string) : null;
  const terrainSize = params.terrainSize as string;
  const minFamily = params.minFamily ? parseInt(params.minFamily as string) : null;
  const minNightlife = params.minNightlife ? parseInt(params.minNightlife as string) : null;
  
  if (region && region !== "all") {
    resorts = resorts.filter(r => r.region === region);
  }
  if (difficulty && difficulty !== "all") {
    resorts = resorts.filter(r => r.difficulty_level === difficulty);
  }
  if (price) {
    resorts = resorts.filter(r => r.lift_ticket_price_usd && r.lift_ticket_price_usd <= price);
  }
  if (terrainSize && terrainSize !== "all") {
    resorts = resorts.filter(r => {
      const acres = r.skiable_acres || 0;
      if (terrainSize === "small") return acres < 500;
      if (terrainSize === "medium") return acres >= 500 && acres <= 2000;
      if (terrainSize === "large") return acres > 2000;
      return true;
    });
  }
  if (minFamily && minFamily > 1) {
    resorts = resorts.filter(r => r.family_score && r.family_score >= minFamily);
  }
  if (minNightlife && minNightlife > 1) {
    resorts = resorts.filter(r => r.nightlife_score && r.nightlife_score >= minNightlife);
  }

  return (
    <div className="container py-10 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ski Resorts</h1>
          <p className="text-muted-foreground mt-2">
            Browse and filter {resorts.length} resorts by region, difficulty, size, and more.
          </p>
        </div>
        
        <ResortFilters />
        
        <ResortGrid resorts={resorts} />
      </div>
    </div>
  );
}
