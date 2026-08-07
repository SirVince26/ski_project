import Link from "next/link";
import { Mountain } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { UserMenu } from "@/components/auth/user-menu";
import { GlobalSearch } from "@/components/layout/global-search";
import { NotificationBell } from "@/components/social/notification-bell";

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch minimal resort data for global search
  const { data: resorts } = await supabase
    .from('resorts')
    .select('name, slug, state, region')
    .order('name');

  // Fetch notifications for logged-in users
  let notifications: any[] = [];
  if (user) {
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);
    notifications = data || [];
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Mountain className="h-6 w-6 text-primary" />
            <span className="font-bold hidden sm:inline-block">Corduroy</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/resorts" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Resorts
            </Link>
            <Link href="/map" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Map
            </Link>
            <Link href="/ask" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Ask AI
            </Link>
            <Link href="/compare" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Compare
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <GlobalSearch resorts={resorts || []} />
          </div>
          {user && <NotificationBell notifications={notifications} />}
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
}

