import Link from 'next/link';
import { Resort } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Mountain, TrendingUp, DollarSign, Snowflake } from 'lucide-react';
import { CompareCheckbox } from '@/components/resort/compare-checkbox';

export function ResortCard({ resort }: { resort: Resort }) {
  const heroImage = resort.image_url || (resort.images?.length ? resort.images[0] : null);

  return (
    <Link href={`/resorts/${resort.slug}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col group">
        <div className="h-48 bg-muted relative overflow-hidden">
          {heroImage ? (
            <img 
              src={heroImage} 
              alt={resort.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-muted to-accent text-muted-foreground">
              <Mountain size={48} className="opacity-40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <CompareCheckbox slug={resort.slug} />
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-foreground text-xs border-none">
              {resort.state}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <h3 className="text-white font-bold text-lg drop-shadow-md leading-tight">{resort.name}</h3>
            {resort.terrain_parks && (
              <Badge className="bg-primary/90 text-primary-foreground text-[10px] shrink-0">
                <Snowflake size={10} className="mr-1" />Park
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="flex-1 pt-4 pb-4">
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <MapPin size={14} className="mr-1 shrink-0" />
            <span className="capitalize">{resort.region.replace('-', ' ')}</span>
          </div>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
            {resort.vertical_drop_ft && (
              <div className="flex items-center text-muted-foreground">
                <Mountain size={14} className="mr-2 shrink-0 text-primary/70" />
                <span>{resort.vertical_drop_ft.toLocaleString()}′ vert</span>
              </div>
            )}
            {resort.num_trails && (
              <div className="flex items-center text-muted-foreground">
                <TrendingUp size={14} className="mr-2 shrink-0 text-primary/70" />
                <span>{resort.num_trails} trails</span>
              </div>
            )}
            {resort.lift_ticket_price_usd && (
              <div className="flex items-center font-medium col-span-2 mt-1 text-foreground">
                <DollarSign size={14} className="mr-1 shrink-0 text-primary" />
                <span>${resort.lift_ticket_price_usd}/day</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
