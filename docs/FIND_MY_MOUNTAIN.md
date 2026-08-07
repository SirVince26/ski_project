# Find My Mountain — Technical Architecture

> **Status:** Documentation only. Not yet implemented.

This document describes the architecture for a future "Find My Mountain" feature that recommends ski resorts based on a user's home location, drive time budget, skill level, pass ownership, and financial budget.

---

## Feature Overview

### User Inputs
| Input | Type | Description |
|-------|------|-------------|
| Home Location | Text / Geocoded | e.g., "Baltimore, MD" → lat/lng |
| Max Drive Time | Slider (hours) | 1–12 hours, in 30-minute increments |
| Skill Level | Select | Beginner / Intermediate / Advanced / Expert |
| Pass Ownership | Multi-select | Epic, Ikon, Indy, None |
| Budget | Slider ($) | Max daily spend (lift ticket + lodging) |

### Example Output
> "Based on your location and preferences, your best options are **Liberty Mountain**, **Whitetail Resort**, and **Seven Springs**."

Results should show:
- Resort name and key stats
- Estimated drive time from home
- Lift ticket price
- Pass eligibility (e.g., "Included with Ikon Pass")
- Map view with driving routes (Leaflet)

---

## Database Requirements

### Pass Affiliation Table
```sql
CREATE TABLE public.resort_passes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resort_id UUID NOT NULL REFERENCES public.resorts(id) ON DELETE CASCADE,
  pass_name TEXT NOT NULL CHECK (pass_name IN ('epic', 'ikon', 'indy', 'mountain-collective')),
  pass_tier TEXT DEFAULT 'full' CHECK (pass_tier IN ('full', 'local', 'day-limit')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(resort_id, pass_name)
);
CREATE INDEX idx_resort_passes_pass ON public.resort_passes(pass_name);
```

### User Preferences Extension
```sql
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS passes TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS max_drive_hours NUMERIC(3,1);
```

### Required Resort Data
All resorts need:
- ✅ `latitude` and `longitude` (already present)
- ✅ `lift_ticket_price_usd` (already present)
- ✅ `difficulty_level` (already present)
- 🆕 Pass affiliations (new `resort_passes` table)

---

## Routing Provider Comparison

### Option 1: OSRM (Open Source Routing Machine)
- **Website:** https://project-osrm.org/
- **Cost:** Free (self-hosted) or free demo server (rate-limited)
- **Data:** OpenStreetMap
- **Pros:**
  - Completely free
  - Self-hostable (Docker)
  - Fast routing
  - No API key needed for demo server
- **Cons:**
  - Demo server is rate-limited (~1 req/sec)
  - Self-hosting requires a VPS ($5-20/mo) and RAM for map data
  - No traffic-aware routing
- **API Example:**
  ```
  GET http://router.project-osrm.org/route/v1/driving/{lng1},{lat1};{lng2},{lat2}?overview=false
  ```
  Returns: `duration` (seconds), `distance` (meters)

### Option 2: GraphHopper
- **Website:** https://www.graphhopper.com/
- **Cost:** Free tier (500 req/day), paid from €49/mo
- **Data:** OpenStreetMap
- **Pros:**
  - Free tier sufficient for MVP
  - Hosted — no infrastructure needed
  - Isochrone API (drive-time polygons)
  - Good documentation
- **Cons:**
  - 500 req/day limit on free tier
  - Requires API key
- **Isochrone API** (key differentiator):
  ```
  GET https://graphhopper.com/api/1/isochrone?point={lat},{lng}&time_limit=10800&vehicle=car
  ```
  Returns a polygon of all points reachable within 3 hours — can be overlaid on Leaflet map.

### Option 3: Mapbox Directions API
- **Website:** https://www.mapbox.com/directions
- **Cost:** Free tier (100,000 req/mo), then $0.50/1000
- **Data:** Proprietary + OpenStreetMap
- **Pros:**
  - Generous free tier
  - Traffic-aware routing
  - Best documentation and SDK support
  - Isochrone API available
- **Cons:**
  - Requires Mapbox account + API key
  - Vendor lock-in concerns
  - We already use Leaflet (not Mapbox GL JS)

### Recommendation: GraphHopper (MVP) → OSRM (Scale)

**GraphHopper** is the best MVP choice:
1. Free tier (500 req/day) is enough for initial launch
2. Isochrone API lets us draw "drive-time rings" on the Leaflet map
3. No infrastructure to manage
4. Easy upgrade path to self-hosted OSRM if we exceed limits

---

## Travel-Time Calculation Strategy

### Approach A: Real-Time Per-Request (Recommended for MVP)
1. User enters home location → geocode to lat/lng (use Nominatim or browser geolocation)
2. For each resort in the database, call routing API to get drive time
3. Filter resorts by max drive time
4. Cache results per user location (store in `localStorage` or a server-side cache)

**Pros:** Accurate, simple
**Cons:** Many API calls for first load (60+ resorts × 1 API call each)

### Approach B: Precomputed Distance Matrix
1. For a set of "hub cities" (e.g., NYC, Boston, DC, Denver, SLC, SF, Seattle, Chicago), precompute drive times to all resorts
2. Store in a `drive_times` table
3. For a user request, find the nearest hub city and use precomputed data, adjusting for the delta

**Pros:** Fast (no API calls at runtime), works offline
**Cons:** Less accurate for users between hubs, requires periodic refresh

### Approach C: Isochrone Overlay
1. User enters location + max drive time
2. Call GraphHopper Isochrone API to get the drive-time polygon
3. Use PostGIS `ST_Contains` to find resorts within the polygon
4. Display polygon on Leaflet map

**Pros:** Visually intuitive, single API call
**Cons:** Requires PostGIS extension in Supabase (available on paid plans)

### Recommended Strategy
Start with **Approach A** for simplicity. Cache aggressively. Migrate to **Approach C** when PostGIS is available.

---

## AI Recommendation Workflow

The existing "Ask AI" chat can be extended to support Find My Mountain queries:

```
User: "I live in Baltimore and can drive up to 4 hours. I'm an intermediate skier 
       with an Epic Pass and a budget of $200/day."

System Prompt Extension:
- Query resorts within 4-hour drive time of Baltimore
- Filter by Epic Pass affiliation
- Filter by intermediate-friendly difficulty
- Filter by lift ticket price ≤ $200
- Rank by: pass inclusion > proximity > snow quality > price
```

### AI Pipeline
1. Parse user intent → extract location, drive time, skill, pass, budget
2. Geocode location → lat/lng
3. Query routing API for drive times to all resorts
4. Filter by constraints
5. Rank results
6. Format response with resort cards

---

## Future UI Design

### Page: `/find-my-mountain`

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Find My Mountain                               │
├──────────────┬──────────────────────────────────┤
│  FILTERS     │  MAP (Leaflet)                   │
│              │  - Drive-time ring overlay        │
│  📍 Location │  - Resort pins (color by match)   │
│  ⏱ Drive Time│  - Click pin → resort card popup  │
│  ⛷ Skill     │                                   │
│  🎫 Pass     │                                   │
│  💰 Budget   │                                   │
│              │                                   │
│  [Search]    │                                   │
├──────────────┴──────────────────────────────────┤
│  RESULTS (sorted by match score)                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ Resort 1 │ │ Resort 2 │ │ Resort 3 │        │
│  │ 2hr 15m  │ │ 3hr 30m  │ │ 4hr 00m  │        │
│  │ Epic ✓   │ │ Ikon ✓   │ │ $89/day  │        │
│  └──────────┘ └──────────┘ └──────────┘        │
└─────────────────────────────────────────────────┘
```

**Components Needed:**
- `FindMyMountainFilters` — filter sidebar
- `DriveTimeMap` — Leaflet map with isochrone overlay
- `MatchedResortCard` — result card with drive time + pass info
- `useGeolocation` hook — browser geolocation with fallback to text input

---

## Implementation Priority

| Step | Description | Effort |
|------|-------------|--------|
| 1 | Create `resort_passes` table + seed Epic/Ikon data | Low |
| 2 | Add pass filter to existing resort search | Low |
| 3 | Integrate GraphHopper routing API | Medium |
| 4 | Build `/find-my-mountain` page with map + filters | Medium |
| 5 | Add isochrone overlay to map | Medium |
| 6 | Extend AI chat to support location-based queries | High |
| 7 | Precompute drive times for major cities | Low |

**Estimated total:** 2-3 development sessions
