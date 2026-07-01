# Future Architecture — Corduroy

This document outlines database requirements, architecture requirements, and integration requirements for future features. These are **not** implemented in the current MVP — they exist as planning guides for future development.

---

## Resort Comparison

### Overview
Allow users to compare 2–4 resorts side-by-side in a matrix view.

### Architecture
- **URL structure:** `/compare?resorts=vail,killington,stowe`
- **Component:** `<ComparisonTable resorts={Resort[]} />` rendering a responsive side-by-side or stacked comparison.
- **Metrics compared:** Lift ticket price, vertical drop, skiable acres, difficulty breakdown, terrain parks, family/nightlife scores, weather conditions.

### Database
No schema changes required — all data already exists in the `resorts` table.

---

## Historical Conditions

### Overview
Track and display historical snowfall, temperatures, and seasonal averages over time.

### Database
```sql
CREATE TABLE public.weather_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resort_id UUID NOT NULL REFERENCES public.resorts(id) ON DELETE CASCADE,
  recorded_date DATE NOT NULL,
  snowfall_inches NUMERIC,
  snow_depth_inches NUMERIC,
  temp_high_f NUMERIC,
  temp_low_f NUMERIC,
  source TEXT DEFAULT 'open-meteo',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(resort_id, recorded_date)
);
CREATE INDEX idx_weather_history_resort_date ON public.weather_history(resort_id, recorded_date);
```

### Integration
- Daily cron job (Vercel Cron or Supabase Edge Function) fetching weather data from Open-Meteo for all resorts and inserting into `weather_history`.
- Display as line charts on resort detail pages using a lightweight chart library (e.g., Recharts).

---

## Progression Tracking

### Overview
Let users track their ski history — resorts visited, days skied, and personal goals.

### Database
```sql
CREATE TABLE public.ski_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  resort_id UUID NOT NULL REFERENCES public.resorts(id) ON DELETE CASCADE,
  ski_date DATE NOT NULL,
  runs_completed INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_ski_logs_user ON public.ski_logs(user_id);
```

### Architecture
- Profile page section showing total days skied, unique resorts visited, and a calendar heatmap.
- Badge/achievement system (e.g., "Skied 10 unique resorts", "100+ days on snow").

---

## Personal Checklists

### Overview
Provide packing lists, equipment checklists, and travel preparation lists.

### Database
```sql
CREATE TABLE public.checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  trip_id UUID REFERENCES public.trips(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Architecture
- `items` is a JSON array of `{ text: string, checked: boolean }`.
- Pre-built templates: "Day Trip Packing", "Multi-Day Trip", "Equipment Check".
- Users can customize and save their own templates.

---

## Lodging Recommendations

### Overview
Suggest nearby lodging options with estimated pricing.

### Integration Requirements
- **Potential APIs:** Google Places API, Booking.com Affiliate API, Airbnb (unofficial/scraping only).
- **MVP alternative:** Curated links to booking sites per resort stored in a new `resort_lodging_links` table.
- **Long-term:** Full integration with a hotel search aggregator API.

### Database (MVP)
```sql
ALTER TABLE public.resorts
  ADD COLUMN lodging_search_url TEXT;
```

### Future Lodging Comparison
- Side-by-side hotel vs Airbnb pricing
- Proximity-to-resort sorting
- Group-size-aware room recommendations
- Seasonal price estimates (peak vs off-peak)

### Potential Data Sources
| Source | Type | Auth | Notes |
|--------|------|------|-------|
| Google Places API | Hotels near lat/lng | API Key | Good for names/ratings, no pricing |
| Booking.com Affiliate | Hotels + pricing | Affiliate ID | Best for real-time pricing |
| Airbnb | Vacation rentals | Unofficial | No official API, may need scraping |
| Hotels.com | Hotels + pricing | Affiliate | Alternate to Booking.com |

---

## Group Trip Planning

### Overview
Enable families and friend groups to coordinate ski trips together. Inspired by lightweight TeamSnap-style coordination.

### Core Features
- **Shared Trips:** Multiple users can be members of a single trip.
- **Shared Itineraries:** Day-by-day plans visible to all trip members.
- **Shared Lodging Info:** Centralized lodging details (address, check-in/out, costs).
- **Shared Resort Recommendations:** Group members can suggest and vote on resorts.
- **Notifications:** Email or in-app notifications for trip changes.

### Database Requirements
```sql
-- Trip members (many-to-many between users and trips)
CREATE TABLE public.trip_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('organizer', 'member')),
  status TEXT NOT NULL DEFAULT 'invited' CHECK (status IN ('invited', 'accepted', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(trip_id, user_id)
);

-- Trip itinerary items
CREATE TABLE public.trip_itinerary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  day_date DATE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trip invitations
CREATE TABLE public.trip_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  invited_email TEXT NOT NULL,
  invited_by UUID NOT NULL REFERENCES public.profiles(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days')
);
```

### Permission Model
| Role | Can View | Can Edit Trip | Can Invite | Can Delete Trip |
|------|----------|---------------|------------|-----------------|
| Organizer | ✅ | ✅ | ✅ | ✅ |
| Member | ✅ | Own items only | ❌ | ❌ |
| Invited | ❌ (until accepted) | ❌ | ❌ | ❌ |

### Notification Architecture
- **Email:** Use Supabase Edge Functions + Resend/SendGrid for trip invitations and changes.
- **In-app:** Store notifications in a `notifications` table, display via header bell icon.
- **Events that trigger notifications:**
  - New member invited
  - Member accepted/declined
  - Trip dates changed
  - New itinerary item added
  - Trip cancelled

---

## Agent Delegation Strategy

| Feature | Best Agent | Rationale |
|---------|-----------|-----------|
| Resort comparison UI | Sonnet 4.6 / Gemini | ✅ Completed in Phase 5 |
| Historical data cron job | Sonnet 4.6 | Standard API integration |
| Weather history charts | Sonnet 4.6 | Recharts integration |
| Progression tracking UI | Sonnet 4.6 | CRUD + profile page |
| Checklist system | Sonnet 4.6 | JSON handling + forms |
| Lodging API integration | Opus 4.6 | Complex API auth, scraping strategy |
| Comprehensive seed data (500+ resorts) | Opus 4.6 | Needs deep knowledge + accuracy |
| AI recommendation tuning | Opus 4.6 | Prompt engineering, edge cases |
| Group Trip Planning | Opus 4.6 | Complex permissions + notifications |
| Resort photography pipeline | Sonnet 4.6 | Image sourcing + storage |
| Post-MVP: internationalization | Postpone | Wait until US coverage is solid |
| Post-MVP: mobile app | Postpone | Web-first strategy |
