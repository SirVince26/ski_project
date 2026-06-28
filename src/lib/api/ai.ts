import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";
import { ParsedFilters, Resort } from "@/lib/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const filterSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    max_price: { type: SchemaType.NUMBER, nullable: true },
    regions: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, nullable: true },
    difficulty: { type: SchemaType.STRING, nullable: true },
    sort_by: { type: SchemaType.STRING, nullable: true },
  },
};

export async function extractFiltersFromQuery(query: string): Promise<ParsedFilters> {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: filterSchema,
    },
  });

  const prompt = `
    Extract search filters from the following user query for ski resorts.
    Valid regions: new-england, mid-atlantic, southeast, rockies, west-coast, midwest.
    Valid difficulty: beginner, intermediate, advanced, all-levels.
    Valid sort_by: price, snow, size, distance.
    If a filter is not mentioned, leave it null.
    
    Query: "${query}"
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text) as ParsedFilters;
  } catch (error) {
    console.error("Error extracting filters with Gemini:", error);
    return {};
  }
}

export async function rankAndExplainResorts(query: string, resorts: Resort[]): Promise<Array<{ resort: Resort; explanation: string }>> {
  if (resorts.length === 0) return [];
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            resort_id: { type: SchemaType.STRING },
            explanation: { type: SchemaType.STRING },
          },
          required: ["resort_id", "explanation"],
        },
      },
    },
  });

  const resortsData = resorts.map(r => ({
    id: r.id,
    name: r.name,
    state: r.state,
    price: r.lift_ticket_price_usd,
    region: r.region,
    difficulty: r.difficulty_level,
    vertical_drop_ft: r.vertical_drop_ft,
    skiable_acres: r.skiable_acres,
    num_trails: r.num_trails,
    beginner_pct: r.beginner_percent,
    intermediate_pct: r.intermediate_percent,
    advanced_pct: r.advanced_percent,
    expert_pct: r.expert_percent,
    terrain_parks: r.terrain_parks,
    family_score: r.family_score,
    nightlife_score: r.nightlife_score,
    description: r.description,
  }));

  const prompt = `
    The user is asking: "${query}"
    
    Here is a list of matching ski resorts with their structured attributes:
    ${JSON.stringify(resortsData, null, 2)}
    
    Rank the top 3 best matching resorts based on the user's query.
    Use the structured data (difficulty percentages, terrain parks, family/nightlife scores, skiable acres, etc.) to justify your rankings.
    Provide a short, engaging 1-2 sentence explanation of WHY each resort is a good fit, citing specific data points.
    Return an array of objects containing the resort_id and explanation.
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const rankings = JSON.parse(text) as Array<{ resort_id: string; explanation: string }>;
    
    // Map back to the full resort objects
    return rankings
      .map(rank => {
        const resort = resorts.find(r => r.id === rank.resort_id);
        if (!resort) return null;
        return { resort, explanation: rank.explanation };
      })
      .filter(Boolean) as Array<{ resort: Resort; explanation: string }>;
      
  } catch (error) {
    console.error("Error ranking resorts with Gemini:", error);
    // Fallback: just return the first 3 with a generic explanation
    return resorts.slice(0, 3).map(r => ({
      resort: r,
      explanation: "This resort matched your filter criteria."
    }));
  }
}
