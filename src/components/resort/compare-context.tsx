"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface CompareContextType {
  selectedSlugs: string[];
  toggleCompare: (slug: string) => void;
  isSelected: (slug: string) => boolean;
  clearAll: () => void;
  canAdd: boolean;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  const toggleCompare = useCallback((slug: string) => {
    setSelectedSlugs(prev => {
      if (prev.includes(slug)) {
        return prev.filter(s => s !== slug);
      }
      if (prev.length >= 3) return prev;
      return [...prev, slug];
    });
  }, []);

  const isSelected = useCallback((slug: string) => {
    return selectedSlugs.includes(slug);
  }, [selectedSlugs]);

  const clearAll = useCallback(() => setSelectedSlugs([]), []);

  const canAdd = selectedSlugs.length < 3;

  return (
    <CompareContext.Provider value={{ selectedSlugs, toggleCompare, isSelected, clearAll, canAdd }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
