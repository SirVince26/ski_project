import { Resort } from '@/lib/types';
import { ResortCard } from './resort-card';

export function ResortGrid({ resorts }: { resorts: Resort[] }) {
  if (resorts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No resorts found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {resorts.map((resort) => (
        <ResortCard key={resort.id} resort={resort} />
      ))}
    </div>
  );
}
