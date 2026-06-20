# Product Specification — SkiTrip AI MVP

## Vision

SkiTrip AI centralizes ski trip planning into a single application. Instead of checking multiple websites for conditions, prices, and resort info, users get everything in one place — plus AI-powered recommendations.

## Target Users

| Segment | Needs |
|---------|-------|
| **East Coast skiers** | Quick access to regional resort data and conditions |
| **Weekend skiers** | Find the best conditions for this weekend |
| **College students** | Budget-friendly options, easy comparison |
| **Budget-conscious travelers** | Filter by price, find deals |

## Example User Query

> "Tell me the best East Coast ski resort this weekend within 5 hours of Baltimore and under $100."

The system interprets this query, filters the resort database, checks weather conditions, and returns ranked recommendations with explanations.

---

## Features

### 1. Authentication

**Description**: Secure user accounts via Supabase Auth.

**User Stories**:
- As a visitor, I can sign up with email and password
- As a user, I can log in and log out
- As a user, I can reset my forgotten password
- As a user, I can view and edit my profile (name, home location, skill level)

**Acceptance Criteria**:
- Email/password signup with email confirmation
- Persistent sessions via cookies (refreshed in middleware)
- Protected routes redirect unauthenticated users to login
- Profile auto-created on signup via database trigger

---

### 2. Resort Database

**Description**: Browsable catalog of 25 East Coast ski resorts.

**Data Fields**:
- Name, slug (URL-friendly)
- State, region (New England / Mid-Atlantic / Southeast)
- Latitude, longitude
- Vertical drop (ft), number of trails, number of lifts, skiable acres
- Lift ticket price (weekend adult, USD)
- Difficulty level
- Website URL, description

**User Stories**:
- As a visitor, I can browse all resorts in a grid/list view
- As a visitor, I can view a detailed resort page by clicking on a card
- As a visitor, I can see resort stats (trails, lifts, vertical, price)

**Acceptance Criteria**:
- Resort listing page with cards showing key info
- Individual resort pages at `/resorts/[slug]`
- No authentication required to browse

---

### 3. Resort Conditions (Weather)

**Description**: Live weather data for each resort via Open-Meteo API.

**Displayed Data**:
- Current temperature (°F)
- Current weather conditions (sunny, snowy, etc.)
- Current snowfall
- Snow depth
- Wind speed
- 7-day forecast (daily snowfall, high/low temps)

**User Stories**:
- As a visitor, I can see current weather on a resort detail page
- As a visitor, I can see a 7-day snow forecast

**Acceptance Criteria**:
- Weather fetched server-side with 30-minute cache
- Weather codes mapped to human-readable descriptions
- Graceful fallback if API is unavailable

---

### 4. Resort Search & Filtering

**Description**: Filter resorts by multiple criteria.

**Filters**:
- **Region**: New England, Mid-Atlantic, Southeast
- **Budget**: Max lift ticket price (slider or input)
- **Difficulty**: Beginner, Intermediate, Advanced, All-Levels
- **Distance**: Max miles from a given location (haversine)

**User Stories**:
- As a visitor, I can filter resorts by region
- As a visitor, I can set a max budget to see affordable options
- As a visitor, I can filter by difficulty level
- As a visitor, I can find resorts within X miles of my location

**Acceptance Criteria**:
- Filters update the resort grid in real-time (client-side filtering)
- Multiple filters can be combined
- Clear/reset all filters option
- Result count shown

---

### 5. Interactive Map

**Description**: OpenStreetMap + Leaflet map showing all resort locations.

**User Stories**:
- As a visitor, I can see all resorts plotted on a map
- As a visitor, I can click a marker to see resort summary
- As a visitor, I can click through from a marker to the resort detail page

**Acceptance Criteria**:
- Map centered on East Coast with appropriate zoom
- Markers at each resort's lat/lng
- Popup on marker click with name, state, price
- Link in popup to resort detail page
- Map loads without SSR errors (dynamic import)

---

### 6. Favorites

**Description**: Authenticated users can save resorts to a favorites list.

**User Stories**:
- As a logged-in user, I can favorite/unfavorite a resort
- As a logged-in user, I can view all my favorited resorts
- As a visitor, I see a prompt to log in when trying to favorite

**Acceptance Criteria**:
- Heart/star toggle on resort cards and detail pages
- Favorites page lists all saved resorts
- Favorites persist across sessions (stored in Supabase)
- RLS ensures users only see their own favorites

---

### 7. Trip Planner

**Description**: Users can plan trips by saving a resort, dates, and notes.

**User Stories**:
- As a logged-in user, I can create a trip (select resort, dates, add notes)
- As a logged-in user, I can view all my planned trips
- As a logged-in user, I can edit or cancel a trip
- As a logged-in user, I can mark a trip as completed

**Acceptance Criteria**:
- Trip form with resort selector, date range picker, notes textarea
- Trip statuses: planned, completed, cancelled
- Trips sorted by date (upcoming first)
- RLS ensures users only see their own trips

---

### 8. AI Recommendations

**Description**: Natural language questions answered using structured data + Google Gemini.

**Example Queries**:
- "Best East Coast resort this weekend"
- "Best resort under $100"
- "Good beginner resorts near Baltimore"
- "Where has the most snow right now?"

**Processing Pipeline**:
1. Gemini extracts structured filters from the query
2. Supabase query finds matching resorts using those filters
3. Weather data fetched for matching resorts
4. Gemini ranks results and generates explanations

**User Stories**:
- As a logged-in user, I can type a natural language question
- As a logged-in user, I receive ranked resort recommendations
- As a logged-in user, I can see why each resort was recommended

**Acceptance Criteria**:
- Text input for natural language queries
- Structured filters shown (transparency into what the AI extracted)
- Each recommendation shows resort info, weather, and explanation
- Graceful handling of ambiguous or unanswerable queries
- AI never fabricates resort data — all data from the database

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| **Performance** | First Contentful Paint < 2s |
| **Responsive** | Mobile (375px), Tablet (768px), Desktop (1440px) |
| **Accessibility** | shadcn/ui components maintain ARIA compliance |
| **SEO** | Proper meta tags, semantic HTML, one H1 per page |
| **Security** | RLS on all user tables, no exposed secrets |
