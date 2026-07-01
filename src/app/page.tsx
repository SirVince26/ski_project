import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Mountain, Map, Sparkles, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-background z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                Corduroy
              </h1>
              <p className="mx-auto max-w-[600px] text-muted-foreground text-lg md:text-xl lg:text-2xl font-light leading-relaxed">
                Discover resorts, check live conditions, and get AI-powered recommendations for your next ski trip.
              </p>
            </div>

            {/* Prominent Search Bar */}
            <div className="w-full max-w-xl">
              <form action="/resorts" method="GET">
                <div className="relative">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    name="search"
                    type="text"
                    placeholder="Search by resort name, state, or region..."
                    className="w-full h-14 pl-12 pr-4 rounded-xl border border-border bg-card text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow shadow-sm"
                  />
                </div>
              </form>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/resorts" className={buttonVariants({ size: "lg", className: "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8" })}>
                <Mountain className="mr-2 h-5 w-5" />
                Explore Resorts
              </Link>
              <Link href="/ask" className={buttonVariants({ size: "lg", variant: "outline", className: "font-semibold px-8 border-primary/20 hover:bg-primary/10" })}>
                <Sparkles className="mr-2 h-5 w-5 text-primary" />
                Ask AI
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="w-full py-16 md:py-24 bg-card border-t border-border">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-primary/10 rounded-full ring-1 ring-primary/20">
                <Mountain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">U.S. Resorts</h3>
              <p className="text-muted-foreground leading-relaxed">
                From Vermont&apos;s highest peaks to the Rockies and beyond.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-primary/10 rounded-full ring-1 ring-primary/20">
                <Map className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Live Conditions</h3>
              <p className="text-muted-foreground leading-relaxed">
                Real-time weather and snow depth data for every mountain.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-primary/10 rounded-full ring-1 ring-primary/20">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Smart Intelligence</h3>
              <p className="text-muted-foreground leading-relaxed">
                Just ask what you&apos;re looking for, and our AI will find the perfect spot.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
