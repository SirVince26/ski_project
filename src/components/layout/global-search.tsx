"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Mountain } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchResult {
  name: string;
  slug: string;
  state: string;
  region: string;
}

export function GlobalSearch({ resorts }: { resorts: SearchResult[] }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const q = query.toLowerCase();
    const filtered = resorts
      .filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.state.toLowerCase().includes(q) ||
        r.region.toLowerCase().replace('-', ' ').includes(q)
      )
      .slice(0, 6);

    setResults(filtered);
    setIsOpen(filtered.length > 0);
  }, [query, resorts]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/resorts/${slug}`);
  };

  return (
    <div ref={ref} className="relative w-full max-w-xs">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search resorts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 h-9 text-sm bg-muted/50 border-border focus:bg-background transition-colors"
        />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          {results.map((resort) => (
            <button
              key={resort.slug}
              onClick={() => handleSelect(resort.slug)}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-accent transition-colors text-left"
            >
              <Mountain size={14} className="text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{resort.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{resort.state} · {resort.region.replace('-', ' ')}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
