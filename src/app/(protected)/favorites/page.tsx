import { createClient } from "@/lib/supabase/server";
import { ResortGrid } from "@/components/resort/resort-grid";
import { redirect } from "next/navigation";

export default async function FavoritesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: favorites } = await supabase
    .from("favorites")
    .select("*, resorts(*)")
    .eq("user_id", user.id);

  const resorts = favorites?.map(f => f.resorts).filter(Boolean) || [];

  return (
    <div className="container py-10 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Favorites</h1>
          <p className="text-muted-foreground mt-2">
            Your saved ski resorts.
          </p>
        </div>
        
        <ResortGrid resorts={resorts as any[]} />
      </div>
    </div>
  );
}
