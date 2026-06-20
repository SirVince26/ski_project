"use server";

import { createClient } from "@/lib/supabase/server";
import { extractFiltersFromQuery, rankAndExplainResorts } from "@/lib/api/ai";
import { Resort } from "@/lib/types";

export async function getAIRecommendations(query: string) {
  if (!query || query.trim().length === 0) {
    return { error: "Please enter a valid query." };
  }

  try {
    // 1. Extract structured filters
    const filters = await extractFiltersFromQuery(query);
    
    // 2. Query Supabase using filters
    const supabase = await createClient();
    let dbQuery = supabase.from("resorts").select("*");
    
    if (filters.max_price) {
      dbQuery = dbQuery.lte("lift_ticket_price_usd", filters.max_price);
    }
    if (filters.regions && filters.regions.length > 0) {
      dbQuery = dbQuery.in("region", filters.regions);
    }
    if (filters.difficulty) {
      dbQuery = dbQuery.eq("difficulty_level", filters.difficulty);
    }
    
    const { data, error } = await dbQuery;
    
    if (error) {
      console.error("DB Error:", error);
      return { error: "Failed to query resorts database." };
    }
    
    const resorts = data as Resort[];
    
    if (resorts.length === 0) {
      return { recommendations: [], message: "No resorts found matching those criteria." };
    }
    
    // 3. Rank and explain with Gemini
    const recommendations = await rankAndExplainResorts(query, resorts);
    
    return { recommendations };
  } catch (err: any) {
    console.error("AI Recommendation error:", err);
    return { error: "An error occurred while generating recommendations." };
  }
}
