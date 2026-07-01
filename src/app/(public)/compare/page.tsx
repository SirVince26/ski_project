import { getResortBySlug } from "@/lib/api/resorts";
import { Resort } from "@/lib/types";
import { notFound } from "next/navigation";
import { Mountain, DollarSign, TrendingUp, Snowflake, Star, PartyPopper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function CompareRow({ label, values, format }: { label: string; values: (string | number | null | undefined)[]; format?: "currency" | "number" | "text" }) {
  return (
    <div className="grid grid-cols-[140px_repeat(3,1fr)] gap-4 py-3 border-b border-border items-center">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      {values.map((val, i) => (
        <div key={i} className="text-sm font-semibold text-center">
          {val == null ? "—" : format === "currency" ? `$${val}` : format === "number" ? Number(val).toLocaleString() : val}
        </div>
      ))}
      {/* Fill empty cols if fewer than 3 resorts */}
      {Array.from({ length: 3 - values.length }).map((_, i) => (
        <div key={`empty-${i}`} className="text-sm text-center text-muted-foreground">—</div>
      ))}
    </div>
  );
}

export default async function ComparePage({ searchParams }: Props) {
  const params = await searchParams;
  const slugsParam = params.resorts as string;

  if (!slugsParam) {
    return (
      <div className="container py-20 max-w-4xl mx-auto text-center">
        <Mountain size={48} className="mx-auto text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold mb-2">Compare Resorts</h1>
        <p className="text-muted-foreground mb-6">Select up to 3 resorts from the resorts page to compare them side-by-side.</p>
        <Link href="/resorts" className={buttonVariants()}>Browse Resorts</Link>
      </div>
    );
  }

  const slugs = slugsParam.split(",").slice(0, 3);
  const resorts = (await Promise.all(slugs.map(s => getResortBySlug(s.trim())))).filter(Boolean) as Resort[];

  if (resorts.length === 0) notFound();

  return (
    <div className="container py-10 px-4 md:px-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Compare Resorts</h1>
        <p className="text-muted-foreground mt-1">Side-by-side comparison of {resorts.length} resort{resorts.length > 1 ? "s" : ""}.</p>
      </div>

      {/* Resort Headers */}
      <div className="grid grid-cols-[140px_repeat(3,1fr)] gap-4 mb-2">
        <div />
        {resorts.map(r => (
          <div key={r.id} className="text-center">
            <Link href={`/resorts/${r.slug}`} className="hover:underline">
              <h2 className="font-bold text-lg">{r.name}</h2>
            </Link>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Badge variant="outline" className="text-xs">{r.state}</Badge>
              <Badge variant="outline" className="text-xs capitalize">{r.region.replace("-", " ")}</Badge>
            </div>
          </div>
        ))}
        {Array.from({ length: 3 - resorts.length }).map((_, i) => (
          <div key={`empty-header-${i}`} className="text-center text-muted-foreground text-sm">
            <Link href="/resorts" className="hover:underline">+ Add resort</Link>
          </div>
        ))}
      </div>

      {/* Comparison Rows */}
      <div className="border rounded-xl bg-card p-4 overflow-x-auto">
        <CompareRow label="Lift Ticket" values={resorts.map(r => r.lift_ticket_price_usd)} format="currency" />
        <CompareRow label="Vertical Drop" values={resorts.map(r => r.vertical_drop_ft ? `${r.vertical_drop_ft.toLocaleString()}′` : null)} />
        <CompareRow label="Summit" values={resorts.map(r => r.elevation_ft ? `${r.elevation_ft.toLocaleString()}′` : null)} />
        <CompareRow label="Trails" values={resorts.map(r => r.num_trails)} format="number" />
        <CompareRow label="Lifts" values={resorts.map(r => r.num_lifts)} format="number" />
        <CompareRow label="Skiable Acres" values={resorts.map(r => r.skiable_acres)} format="number" />
        <CompareRow label="Terrain Parks" values={resorts.map(r => r.terrain_parks ? "Yes" : "No")} />
        <CompareRow label="Difficulty" values={resorts.map(r => r.difficulty_level?.replace("-", " ") || null)} />
        <CompareRow label="Beginner %" values={resorts.map(r => r.beginner_percent ? `${r.beginner_percent}%` : null)} />
        <CompareRow label="Intermediate %" values={resorts.map(r => r.intermediate_percent ? `${r.intermediate_percent}%` : null)} />
        <CompareRow label="Advanced %" values={resorts.map(r => r.advanced_percent ? `${r.advanced_percent}%` : null)} />
        <CompareRow label="Expert %" values={resorts.map(r => r.expert_percent ? `${r.expert_percent}%` : null)} />
        <CompareRow label="Family Score" values={resorts.map(r => r.family_score ? `${r.family_score}/10` : null)} />
        <CompareRow label="Nightlife" values={resorts.map(r => r.nightlife_score ? `${r.nightlife_score}/10` : null)} />
      </div>

      <div className="mt-6 text-center">
        <Link href="/resorts" className={buttonVariants({ variant: "outline" })}>
          ← Back to Resorts
        </Link>
      </div>
    </div>
  );
}
