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
  
  // Apply filtering
  const region = params.region as string;
  const difficulty = params.difficulty as string;
  const price = params.price ? parseInt(params.price as string) : null;
  
  if (region && region !== "all") {
    resorts = resorts.filter(r => r.region === region);
  }
  if (difficulty && difficulty !== "all") {
    resorts = resorts.filter(r => r.difficulty_level === difficulty);
  }
  if (price) {
    resorts = resorts.filter(r => r.lift_ticket_price_usd && r.lift_ticket_price_usd <= price);
  }

  return (
    <div className="container py-10 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ski Resorts</h1>
          <p className="text-muted-foreground mt-2">
            Browse and filter resorts by region, difficulty, and price.
          </p>
        </div>
        
        <ResortFilters />
        
        <ResortGrid resorts={resorts} />
      </div>
    </div>
  );
}
