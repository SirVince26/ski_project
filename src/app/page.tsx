import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Mountain, Map, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/90 z-0" />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-4">
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                Corduroy
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl font-light">
                Your ultimate ski trip planner. Discover resorts, check live conditions, and get AI-powered recommendations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
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

      <section className="w-full py-12 md:py-24 bg-card border-t border-border">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-primary/10 rounded-full ring-1 ring-primary/20">
                <Mountain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">U.S. Resorts</h3>
              <p className="text-muted-foreground leading-relaxed">
                From Vermont's highest peaks to the Rockies and beyond.
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
                Just ask what you're looking for, and our AI will find the perfect spot.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
