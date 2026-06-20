import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Mountain, Map, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-slate-950/90 z-0" />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                SkiTrip <span className="text-blue-500">AI</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Your ultimate East Coast ski trip planner. Discover resorts, check live conditions, and get AI-powered recommendations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/resorts" className={buttonVariants({ size: "lg", className: "bg-blue-600 hover:bg-blue-700 text-white" })}>
                  <Mountain className="mr-2 h-4 w-4" />
                  Explore Resorts
              </Link>
              <Link href="/ask" className={buttonVariants({ size: "lg", variant: "outline", className: "text-slate-900 bg-white hover:bg-slate-100 border-none" })}>
                  <Sparkles className="mr-2 h-4 w-4 text-blue-600" />
                  Ask AI
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-blue-100 rounded-full">
                <Mountain className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">25+ East Coast Resorts</h3>
              <p className="text-slate-500 dark:text-slate-400">
                From Vermont's highest peaks to the Blue Ridge mountains.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-blue-100 rounded-full">
                <Map className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Live Conditions</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Real-time weather and snow depth via Open-Meteo.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-blue-100 rounded-full">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Smart Recommendations</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Just ask what you're looking for, and our AI will find the perfect spot.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
