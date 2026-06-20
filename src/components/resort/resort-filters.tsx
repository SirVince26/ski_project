"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { REGIONS, DIFFICULTY_LEVELS } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export function ResortFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [maxPrice, setMaxPrice] = useState<number>(
    searchParams.get("price") ? parseInt(searchParams.get("price")!) : 200
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleRegionChange = (value: string | null) => {
    if (!value) return;
    router.push("?" + createQueryString("region", value === "all" ? "" : value));
  };

  const handleDifficultyChange = (value: string | null) => {
    if (!value) return;
    router.push("?" + createQueryString("difficulty", value === "all" ? "" : value));
  };

  const applyPriceFilter = () => {
    router.push("?" + createQueryString("price", maxPrice.toString()));
  };

  const clearFilters = () => {
    setMaxPrice(200);
    router.push("?");
  };

  const currentRegion = searchParams.get("region") || "all";
  const currentDifficulty = searchParams.get("difficulty") || "all";

  return (
    <div className="bg-slate-50 p-4 rounded-xl border mb-6 flex flex-col md:flex-row gap-4 items-end">
      <div className="flex-1 w-full space-y-2">
        <label className="text-sm font-medium">Region</label>
        <Select value={currentRegion} onValueChange={handleRegionChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {REGIONS.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 w-full space-y-2">
        <label className="text-sm font-medium">Difficulty</label>
        <Select value={currentDifficulty} onValueChange={handleDifficultyChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {DIFFICULTY_LEVELS.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 w-full space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Max Price: ${maxPrice}</label>
        </div>
        <div className="flex gap-2 items-center h-10">
          <Slider 
            value={[maxPrice]} 
            max={250} 
            step={10} 
            onValueChange={(vals) => setMaxPrice(Array.isArray(vals) ? vals[0] : (vals as any)[0] || vals as any)} 
            className="flex-1"
          />
          <Button variant="outline" size="sm" onClick={applyPriceFilter}>Apply</Button>
        </div>
      </div>

      <div className="w-full md:w-auto mt-4 md:mt-0">
        <Button variant="ghost" onClick={clearFilters} className="w-full">
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
