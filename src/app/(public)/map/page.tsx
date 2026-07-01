import { getResorts } from "@/lib/api/resorts";
import { MapWrapper } from "@/components/map/map-wrapper";

export default async function MapPage() {
  const resorts = await getResorts();

  return (
    <div className="container py-10 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interactive Map</h1>
          <p className="text-muted-foreground mt-2">
            Explore all {resorts.length} ski resorts.
          </p>
        </div>
        
        <div className="h-[600px] border rounded-xl overflow-hidden shadow-sm">
          <MapWrapper resorts={resorts} />
        </div>
      </div>
    </div>
  );
}
