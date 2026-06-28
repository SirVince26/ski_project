"use client";

import { useState } from "react";
import { getAIRecommendations } from "@/app/actions/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResortCard } from "@/components/resort/resort-card";
import { Sparkles, Loader2 } from "lucide-react";
import { Resort } from "@/lib/types";

interface Recommendation {
  resort: Resort;
  explanation: string;
}

export default function AskAIPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setRecommendations(null);
    setMessage(null);

    const result = await getAIRecommendations(query);

    if (result.error) {
      setError(result.error);
    } else if (result.recommendations) {
      setRecommendations(result.recommendations);
      if (result.recommendations.length === 0 && result.message) {
        setMessage(result.message);
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="container py-10 max-w-4xl">
      <div className="flex flex-col items-center text-center space-y-4 mb-10">
        <div className="p-4 bg-primary/10 rounded-full ring-1 ring-primary/20">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Ask Corduroy</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Tell us what you're looking for in your next ski trip, and our AI will recommend the perfect resorts for you.
        </p>
      </div>

      <Card className="mb-10">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input 
              placeholder='e.g., "Best beginner resort under $100 in New England"' 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-lg py-6"
            />
            <Button type="submit" size="lg" disabled={isLoading} className="py-6 px-8">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
              Ask
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg mb-8">
          {error}
        </div>
      )}

      {message && (
        <div className="p-8 text-center border rounded-xl bg-muted text-muted-foreground">
          {message}
        </div>
      )}

      {recommendations && recommendations.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Top Recommendations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <Card key={rec.resort.id} className="flex flex-col border-primary/20 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <div className="p-4 bg-primary/5">
                  <div className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded mb-2">
                    Rank #{index + 1}
                  </div>
                  <p className="text-sm italic text-muted-foreground">"{rec.explanation}"</p>
                </div>
                <div className="flex-1 p-0">
                  <ResortCard resort={rec.resort} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
