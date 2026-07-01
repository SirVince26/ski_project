"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { REGIONS, DIFFICULTY_LEVELS } from "@/lib/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export function ResortFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [maxPrice, setMaxPrice] = useState<number>(
    searchParams.get("price") ? parseInt(searchParams.get("price")!) : 400
  );
  const [minFamily, setMinFamily] = useState<number>(
    searchParams.get("minFamily") ? parseInt(searchParams.get("minFamily")!) : 1
  );
  const [minNightlife, setMinNightlife] = useState<number>(
    searchParams.get("minNightlife") ? parseInt(searchParams.get("minNightlife")!) : 1
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

  const applyMultipleParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, val] of Object.entries(updates)) {
        if (val) params.set(key, val);
        else params.delete(key);
      }
      router.push("?" + params.toString());
    },
    [searchParams, router]
  );

  const handleRegionChange = (value: string | null) => {
    if (!value) return;
    router.push("?" + createQueryString("region", value === "all" ? "" : value));
  };

  const handleDifficultyChange = (value: string | null) => {
    if (!value) return;
    router.push("?" + createQueryString("difficulty", value === "all" ? "" : value));
  };

  const handleTerrainSizeChange = (value: string | null) => {
    if (!value) return;
    router.push("?" + createQueryString("terrainSize", value === "all" ? "" : value));
  };

  const applySliderFilters = () => {
    applyMultipleParams({
      price: maxPrice.toString(),
      minFamily: minFamily > 1 ? minFamily.toString() : "",
      minNightlife: minNightlife > 1 ? minNightlife.toString() : "",
    });
  };

  const clearFilters = () => {
    setMaxPrice(400);
    setMinFamily(1);
    setMinNightlife(1);
    router.push("?");
  };

  const currentRegion = searchParams.get("region") || "all";
  const currentDifficulty = searchParams.get("difficulty") || "all";
  const currentTerrainSize = searchParams.get("terrainSize") || "all";

  return (
    <div className="bg-muted p-4 rounded-xl border mb-6 space-y-4">
      {/* Row 1: Dropdowns */}
      <div className="flex flex-col md:flex-row gap-4">
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
          <label className="text-sm font-medium">Terrain Size</label>
          <Select value={currentTerrainSize} onValueChange={handleTerrainSizeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Any Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Size</SelectItem>
              <SelectItem value="small">Small (&lt;500 acres)</SelectItem>
              <SelectItem value="medium">Medium (500–2000 acres)</SelectItem>
              <SelectItem value="large">Large (&gt;2000 acres)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Row 2: Sliders */}
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Max Price: ${maxPrice}</label>
          </div>
          <div className="h-10 flex items-center">
            <Slider
              value={[maxPrice]}
              max={400}
              step={10}
              onValueChange={(vals) => setMaxPrice(Array.isArray(vals) ? vals[0] : (vals as any)[0] || vals as any)}
              className="flex-1"
            />
          </div>
        </div>

        <div className="flex-1 w-full space-y-2">
          <label className="text-sm font-medium">Min Family Score: {minFamily}/10</label>
          <div className="h-10 flex items-center">
            <Slider
              value={[minFamily]}
              min={1}
              max={10}
              step={1}
              onValueChange={(vals) => setMinFamily(Array.isArray(vals) ? vals[0] : (vals as any)[0] || vals as any)}
              className="flex-1"
            />
          </div>
        </div>

        <div className="flex-1 w-full space-y-2">
          <label className="text-sm font-medium">Min Nightlife: {minNightlife}/10</label>
          <div className="h-10 flex items-center">
            <Slider
              value={[minNightlife]}
              min={1}
              max={10}
              step={1}
              onValueChange={(vals) => setMinNightlife(Array.isArray(vals) ? vals[0] : (vals as any)[0] || vals as any)}
              className="flex-1"
            />
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto shrink-0">
          <Button variant="outline" size="sm" onClick={applySliderFilters}>Apply</Button>
          <Button variant="ghost" size="sm" onClick={clearFilters}>Clear</Button>
        </div>
      </div>
    </div>
  );
}
