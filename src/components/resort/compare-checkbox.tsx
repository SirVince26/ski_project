"use client";

import { useCompare } from "@/components/resort/compare-context";
import { Check, Plus } from "lucide-react";

export function CompareCheckbox({ slug }: { slug: string }) {
  const { isSelected, toggleCompare, canAdd } = useCompare();
  const selected = isSelected(slug);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!selected && !canAdd) return;
        toggleCompare(slug);
      }}
      className={`
        flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-all
        ${selected
          ? "bg-primary text-primary-foreground"
          : canAdd
            ? "bg-background/80 backdrop-blur-sm text-foreground hover:bg-primary/20"
            : "bg-background/60 text-muted-foreground cursor-not-allowed opacity-50"
        }
      `}
      title={selected ? "Remove from compare" : canAdd ? "Add to compare" : "Max 3 resorts"}
    >
      {selected ? <Check size={10} /> : <Plus size={10} />}
      {selected ? "Added" : "Compare"}
    </button>
  );
}
