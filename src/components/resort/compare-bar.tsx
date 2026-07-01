"use client";

import { useCompare } from "@/components/resort/compare-context";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CompareBar() {
  const { selectedSlugs, clearAll } = useCompare();

  if (selectedSlugs.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-card border border-border rounded-xl shadow-2xl px-6 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-4 duration-300">
      <span className="text-sm font-medium text-foreground">
        {selectedSlugs.length} resort{selectedSlugs.length > 1 ? "s" : ""} selected
      </span>
      <Link href={`/compare?resorts=${selectedSlugs.join(",")}`}>
        <Button size="sm" disabled={selectedSlugs.length < 2}>
          Compare <ArrowRight size={14} className="ml-1" />
        </Button>
      </Link>
      <button onClick={clearAll} className="text-muted-foreground hover:text-foreground transition-colors p-1">
        <X size={16} />
      </button>
    </div>
  );
}
