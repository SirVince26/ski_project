# API Integrations — SkiTrip AI

## Overview

SkiTrip AI integrates with three external services:

| Service | Purpose | Auth | Cost |
|---------|---------|------|------|
| **Open-Meteo** | Weather & snow conditions | None (open API) | Free |
| **Google Gemini** | AI-powered recommendations | API key (server-only) | Free tier |
| **Supabase** | Database & authentication | Anon key (client) | Free tier |

---

## 1. Open-Meteo Weather API

### Purpose

Provide real-time weather and snow conditions for each ski resort based on its coordinates.

### Base URL

```
https://api.open-meteo.com/v1/forecast
```

### Authentication

None required. Open-Meteo is free and does not require an API key.

### Rate Limits

- 10,000 requests/day (non-commercial)
- We cache responses for 30 minutes server-side, so actual API calls will be minimal

### Request Format

```
GET https://api.open-meteo.com/v1/forecast
  ?latitude={resort_lat}
  &longitude={resort_lng}
  &current=temperature_2m,weather_code,wind_speed_10m,snowfall,snow_depth
  &daily=snowfall_sum,temperature_2m_max,temperature_2m_min
  &temperature_unit=fahrenheit
  &wind_speed_unit=mph
  &forecast_days=7
  &timezone=America/New_York
```

### Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `latitude` | Resort latitude | From resorts table |
| `longitude` | Resort longitude | From resorts table |
| `current` | `temperature_2m,weather_code,wind_speed_10m,snowfall,snow_depth` | Current conditions |
| `daily` | `snowfall_sum,temperature_2m_max,temperature_2m_min` | 7-day forecast |
| `temperature_unit` | `fahrenheit` | US-friendly units |
| `wind_speed_unit` | `mph` | US-friendly units |
| `forecast_days` | `7` | One week forecast |
| `timezone` | `America/New_York` | East Coast timezone |

### Response (Raw)

```json
{
  "current": {
    "temperature_2m": 28.4,
    "weather_code": 71,
    "wind_speed_10m": 12.3,
    "snowfall": 0.5,
    "snow_depth": 24.0
  },
  "daily": {
    "time": ["2026-01-15", "2026-01-16", ...],
    "snowfall_sum": [2.1, 0.0, ...],
    "temperature_2m_max": [32.0, 35.0, ...],
    "temperature_2m_min": [18.0, 22.0, ...]
  }
}
```

### Weather Code Mapping

The `weather_code` field uses WMO codes. Key mappings for ski conditions:

| Code | Description | Icon Suggestion |
|------|-------------|-----------------|
| 0 | Clear sky | ☀️ |
| 1-3 | Partly cloudy | ⛅ |
| 45, 48 | Fog | 🌫️ |
| 51-55 | Drizzle | 🌧️ |
| 61-65 | Rain | 🌧️ |
| 71 | Slight snowfall | 🌨️ |
| 73 | Moderate snowfall | 🌨️ |
| 75 | Heavy snowfall | ❄️ |
| 77 | Snow grains | ❄️ |
| 85, 86 | Snow showers | ❄️ |

### Our API Route

**Endpoint**: `GET /api/weather?lat={lat}&lng={lng}`

**Internal implementation**:
1. Check cache (Next.js `revalidate: 1800` — 30 minutes)
2. If cache miss, fetch from Open-Meteo
3. Transform response into our `WeatherData` shape
4. Return to client

**Our response shape**:

```typescript
interface WeatherData {
  current: {
    temperature_f: number;
    weather_code: number;
    weather_description: string;  // Human-readable from code mapping
    wind_speed_mph: number;
    snowfall_inches: number;
    snow_depth_inches: number;
  };
  forecast: Array<{
    date: string;
    snowfall_inches: number;
    temp_high_f: number;
    temp_low_f: number;
  }>;
}
```

### Error Handling

- If Open-Meteo is unreachable, return `null` weather data
- Display "Weather data unavailable" in the UI
- Never block page rendering on weather fetch failure

---

## 2. Google Gemini API

### Purpose

Power the AI recommendation feature by interpreting natural language ski trip queries and generating ranked explanations.

### SDK

```
@google/generative-ai
```

### Authentication

Server-side only via `GEMINI_API_KEY` environment variable. Never expose in client bundles.

### Rate Limits (Free Tier)

- 60 requests/minute
- 1,500 requests/day
- Sufficient for MVP usage

### AI Recommendation Pipeline

The AI makes **two separate calls** to Gemini:

#### Call 1: Intent Extraction

**Purpose**: Convert natural language query into structured database filters.

**Input**:
```
User query: "Best resort under $100 near Baltimore this weekend"
```

**System prompt** (summary):
> You are a ski trip planning assistant. Extract structured filters from the user's query.
> Return JSON matching the ParsedFilters interface.
> Only extract filters explicitly mentioned or clearly implied.

**Expected output**:
```json
{
  "max_price": 100,
  "origin_city": "Baltimore, MD",
  "max_distance_miles": 300,
  "sort_by": "snow"
}
```

**TypeScript interface**:
```typescript
interface ParsedFilters {
  max_price?: number;
  regions?: ('new-england' | 'mid-atlantic' | 'southeast')[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  origin_city?: string;
  max_distance_miles?: number;
  sort_by?: 'price' | 'snow' | 'size' | 'distance';
}
```

#### Between Calls: Database Query

Use the extracted filters to query the `resorts` table in Supabase. This is the **primary search mechanism**. The AI does not search — the database does.

- Apply filters as Supabase `.filter()` / `.lte()` / `.in()` calls
- Calculate haversine distance if `origin_city` is provided
- Return matching resorts with their data

#### Call 2: Ranking & Explanation

**Purpose**: Given filtered resorts + weather data, rank them and explain why.

**Input**: Array of resort objects with current weather data.

**System prompt** (summary):
> You are a ski trip advisor. Rank these resorts for the user's query.
> Consider weather conditions, price, distance, and terrain.
> Provide a brief, helpful explanation for each recommendation.
> Never invent data — only use the resort data provided.

**Expected output**:
```json
{
  "recommendations": [
    {
      "resort_slug": "jay-peak",
      "score": 95,
      "explanation": "Jay Peak is your best bet — at $99 it's under budget, and it's currently receiving moderate snowfall with a 24-inch base."
    }
  ],
  "summary": "Based on your budget and the current conditions, here are the top picks..."
}
```

### Our API Route

**Endpoint**: `POST /api/ai/recommend`

**Request body**:
```typescript
{
  query: string;           // Natural language question
  user_location?: string;  // Optional home location from profile
}
```

**Response**:
```typescript
{
  filters_used: ParsedFilters;
  recommendations: Array<{
    resort: Resort;
    weather: WeatherData | null;
    score: number;
    explanation: string;
  }>;
  summary: string;
}
```

### Error Handling

- If Gemini is unreachable, return error message suggesting manual search
- If intent extraction returns no usable filters, ask user to be more specific
- If no resorts match filters, explain why and suggest relaxing criteria
- Always validate Gemini output against expected JSON schema

---

## 3. Supabase

### Purpose

Database (PostgreSQL), authentication, and row-level security.

### Client Libraries

```
@supabase/supabase-js
@supabase/ssr
```

### Authentication

Uses `@supabase/ssr` for cookie-based sessions that work across Server Components, Client Components, and Middleware.

**Environment variables**:
```
NEXT_PUBLIC_SUPABASE_URL     → Safe for client
NEXT_PUBLIC_SUPABASE_ANON_KEY → Safe for client (RLS protects data)
```

### Data Access Patterns

| Operation | Method | Context | Auth |
|-----------|--------|---------|------|
| List all resorts | `supabase.from('resorts').select('*')` | Server Component | No |
| Get resort by slug | `supabase.from('resorts').select('*').eq('slug', slug).single()` | Server Component | No |
| Filter resorts | `supabase.from('resorts').select('*').in('region', [...]).lte('lift_ticket_price_usd', max)` | Server Component | No |
| Get user favorites | `supabase.from('favorites').select('*, resorts(*)')` | Server Component | Yes (RLS) |
| Add favorite | `supabase.from('favorites').insert({ user_id, resort_id })` | Server Action | Yes (RLS) |
| Remove favorite | `supabase.from('favorites').delete().eq('id', fav_id)` | Server Action | Yes (RLS) |
| Get user trips | `supabase.from('trips').select('*, resorts(*)')` | Server Component | Yes (RLS) |
| Create trip | `supabase.from('trips').insert({...})` | Server Action | Yes (RLS) |
| Update trip | `supabase.from('trips').update({...}).eq('id', trip_id)` | Server Action | Yes (RLS) |
| Delete trip | `supabase.from('trips').delete().eq('id', trip_id)` | Server Action | Yes (RLS) |
| Get profile | `supabase.from('profiles').select('*').eq('id', user_id).single()` | Server Component | Yes (RLS) |
| Update profile | `supabase.from('profiles').update({...}).eq('id', user_id)` | Server Action | Yes (RLS) |

### Haversine Distance Calculation

For distance-based filtering, calculate haversine distance client-side (in TypeScript) after fetching resorts:

```typescript
function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}
```

This is used in resort search and AI recommendation filtering.
