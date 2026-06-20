"use client";

import { useActionState } from "react";
import { toggleFavorite } from "@/app/actions/user";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function FavoriteButton({ resortId, isFavorite = false }: { resortId: string, isFavorite?: boolean }) {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await toggleFavorite(resortId);
    },
    null
  );

  return (
    <form action={formAction}>
      <Button 
        type="submit" 
        variant="outline" 
        size="icon" 
        className={`rounded-full ${isFavorite ? 'text-red-500 hover:text-red-600 border-red-200 bg-red-50' : 'text-slate-500'}`}
        disabled={isPending}
      >
        <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
        <span className="sr-only">Toggle Favorite</span>
      </Button>
    </form>
  );
}
