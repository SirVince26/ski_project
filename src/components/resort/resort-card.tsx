import Link from 'next/link';
import { Resort } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Mountain, TrendingUp, DollarSign } from 'lucide-react';

export function ResortCard({ resort }: { resort: Resort }) {
  return (
    <Link href={`/resorts/${resort.slug}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
        <div className="h-48 bg-slate-200 relative">
          {/* We'll use a solid color or placeholder if no image_url */}
          {resort.image_url ? (
            <img 
              src={resort.image_url} 
              alt={resort.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
              <Mountain size={48} />
            </div>
          )}
          <div className="absolute top-2 right-2 flex gap-2">
            <Badge variant="secondary" className="bg-white/90 hover:bg-white text-black border-none">
              {resort.state}
            </Badge>
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{resort.name}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <MapPin size={14} className="mr-1" />
            <span className="capitalize">{resort.region.replace('-', ' ')}</span>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mt-2">
            <div className="flex items-center text-muted-foreground">
              <Mountain size={14} className="mr-2" />
              <span>{resort.vertical_drop_ft} ft vert</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <TrendingUp size={14} className="mr-2" />
              <span className="capitalize">{resort.difficulty_level?.replace('-', ' ')}</span>
            </div>
            <div className="flex items-center font-medium">
              <DollarSign size={14} className="mr-1" />
              <span>{resort.lift_ticket_price_usd}/day</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <span>{resort.num_trails} trails</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
