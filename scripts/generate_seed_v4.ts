import * as fs from 'fs';
import * as path from 'path';

// Resorts missing from current coverage
const resorts = [
  // ============================================
  // SOUTHEAST
  // ============================================
  { name: 'Snowshoe Mountain', slug: 'snowshoe-wv', state: 'WV', region: 'mid-atlantic', lat: 38.4049, lng: -79.9951, vert: 1500, trails: 60, lifts: 14, acres: 244, price: 129, difficulty: 'all-levels', beginner: 10, intermediate: 45, advanced: 35, expert: 10, green: 6, blue: 27, black: 21, double: 6, parks: true, country: 'USA', elev: 4848, family: 9, nightlife: 6 },
  { name: 'Beech Mountain Resort', slug: 'beech-mountain-nc', state: 'NC', region: 'southeast', lat: 36.1993, lng: -81.9009, vert: 830, trails: 17, lifts: 8, acres: 95, price: 89, difficulty: 'intermediate', beginner: 35, intermediate: 40, advanced: 25, expert: 0, green: 6, blue: 7, black: 4, double: 0, parks: true, country: 'USA', elev: 5506, family: 9, nightlife: 3 },
  { name: 'Cataloochee Ski Area', slug: 'cataloochee-nc', state: 'NC', region: 'southeast', lat: 35.6034, lng: -83.0765, vert: 740, trails: 18, lifts: 7, acres: 50, price: 79, difficulty: 'beginner', beginner: 45, intermediate: 35, advanced: 20, expert: 0, green: 8, blue: 6, black: 4, double: 0, parks: true, country: 'USA', elev: 5400, family: 10, nightlife: 2 },
  { name: 'Wintergreen Resort', slug: 'wintergreen-va', state: 'VA', region: 'mid-atlantic', lat: 37.9631, lng: -78.9381, vert: 1003, trails: 26, lifts: 7, acres: 119, price: 89, difficulty: 'intermediate', beginner: 25, intermediate: 45, advanced: 30, expert: 0, green: 7, blue: 12, black: 7, double: 0, parks: true, country: 'USA', elev: 3515, family: 9, nightlife: 5 },
  { name: 'Massanutten Resort', slug: 'massanutten-va', state: 'VA', region: 'mid-atlantic', lat: 38.4018, lng: -78.7315, vert: 1110, trails: 14, lifts: 9, acres: 78, price: 79, difficulty: 'beginner', beginner: 40, intermediate: 45, advanced: 15, expert: 0, green: 6, blue: 6, black: 2, double: 0, parks: true, country: 'USA', elev: 3275, family: 10, nightlife: 4 },
  { name: 'Ober Gatlinburg', slug: 'ober-gatlinburg-tn', state: 'TN', region: 'southeast', lat: 35.7243, lng: -83.4993, vert: 600, trails: 10, lifts: 9, acres: 30, price: 69, difficulty: 'beginner', beginner: 50, intermediate: 40, advanced: 10, expert: 0, green: 5, blue: 4, black: 1, double: 0, parks: false, country: 'USA', elev: 3434, family: 10, nightlife: 4 },

  // ============================================
  // MID-ATLANTIC (Pennsylvania & New York)
  // ============================================
  { name: 'Camelback Mountain', slug: 'camelback-pa', state: 'PA', region: 'mid-atlantic', lat: 41.0429, lng: -75.3477, vert: 800, trails: 35, lifts: 16, acres: 164, price: 109, difficulty: 'intermediate', beginner: 25, intermediate: 50, advanced: 25, expert: 0, green: 9, blue: 17, black: 9, double: 0, parks: true, country: 'USA', elev: 2133, family: 9, nightlife: 5 },
  { name: 'Blue Mountain Resort', slug: 'blue-mountain-pa', state: 'PA', region: 'mid-atlantic', lat: 40.6979, lng: -75.6907, vert: 1082, trails: 40, lifts: 15, acres: 165, price: 99, difficulty: 'intermediate', beginner: 20, intermediate: 55, advanced: 25, expert: 0, green: 8, blue: 22, black: 10, double: 0, parks: true, country: 'USA', elev: 1600, family: 8, nightlife: 4 },
  { name: 'Seven Springs Mountain Resort', slug: 'seven-springs-pa', state: 'PA', region: 'mid-atlantic', lat: 39.9448, lng: -79.2950, vert: 750, trails: 32, lifts: 10, acres: 285, price: 89, difficulty: 'intermediate', beginner: 30, intermediate: 45, advanced: 25, expert: 0, green: 10, blue: 14, black: 8, double: 0, parks: true, country: 'USA', elev: 2993, family: 10, nightlife: 6 },
  { name: 'Liberty Mountain Resort', slug: 'liberty-mountain-pa', state: 'PA', region: 'mid-atlantic', lat: 39.8084, lng: -77.1900, vert: 620, trails: 22, lifts: 9, acres: 80, price: 79, difficulty: 'beginner', beginner: 35, intermediate: 45, advanced: 20, expert: 0, green: 8, blue: 10, black: 4, double: 0, parks: true, country: 'USA', elev: 1200, family: 9, nightlife: 3 },
  { name: 'Whitetail Resort', slug: 'whitetail-pa', state: 'PA', region: 'mid-atlantic', lat: 39.8573, lng: -77.6467, vert: 935, trails: 23, lifts: 9, acres: 115, price: 79, difficulty: 'intermediate', beginner: 25, intermediate: 50, advanced: 25, expert: 0, green: 6, blue: 12, black: 5, double: 0, parks: true, country: 'USA', elev: 2000, family: 8, nightlife: 3 },
  { name: 'Windham Mountain', slug: 'windham-ny', state: 'NY', region: 'mid-atlantic', lat: 42.3000, lng: -74.2569, vert: 1600, trails: 54, lifts: 10, acres: 285, price: 119, difficulty: 'intermediate', beginner: 17, intermediate: 54, advanced: 29, expert: 0, green: 9, blue: 29, black: 16, double: 0, parks: true, country: 'USA', elev: 3100, family: 8, nightlife: 6 },
  { name: 'Hunter Mountain', slug: 'hunter-ny', state: 'NY', region: 'mid-atlantic', lat: 42.2033, lng: -74.2261, vert: 1600, trails: 67, lifts: 13, acres: 240, price: 109, difficulty: 'intermediate', beginner: 20, intermediate: 48, advanced: 32, expert: 0, green: 13, blue: 32, black: 22, double: 0, parks: true, country: 'USA', elev: 3200, family: 8, nightlife: 5 },

  // ============================================
  // MIDWEST (Minnesota, Wisconsin, Illinois)
  // ============================================
  { name: 'Giants Ridge', slug: 'giants-ridge-mn', state: 'MN', region: 'midwest', lat: 47.5194, lng: -92.1899, vert: 500, trails: 35, lifts: 8, acres: 135, price: 79, difficulty: 'intermediate', beginner: 20, intermediate: 50, advanced: 30, expert: 0, green: 7, blue: 18, black: 10, double: 0, parks: true, country: 'USA', elev: 1776, family: 8, nightlife: 3 },
  { name: 'Spirit Mountain', slug: 'spirit-mountain-mn', state: 'MN', region: 'midwest', lat: 46.7308, lng: -92.2232, vert: 700, trails: 22, lifts: 9, acres: 175, price: 79, difficulty: 'intermediate', beginner: 20, intermediate: 50, advanced: 30, expert: 0, green: 5, blue: 11, black: 6, double: 0, parks: true, country: 'USA', elev: 1800, family: 8, nightlife: 5 },
  { name: 'Afton Alps', slug: 'afton-alps-mn', state: 'MN', region: 'midwest', lat: 44.8619, lng: -92.7797, vert: 350, trails: 48, lifts: 18, acres: 300, price: 69, difficulty: 'beginner', beginner: 35, intermediate: 40, advanced: 25, expert: 0, green: 17, blue: 19, black: 12, double: 0, parks: true, country: 'USA', elev: 1200, family: 9, nightlife: 3 },
  { name: "Devil's Head Resort", slug: 'devils-head-wi', state: 'WI', region: 'midwest', lat: 43.4286, lng: -89.7478, vert: 500, trails: 33, lifts: 9, acres: 155, price: 79, difficulty: 'intermediate', beginner: 25, intermediate: 45, advanced: 30, expert: 0, green: 8, blue: 15, black: 10, double: 0, parks: true, country: 'USA', elev: 1400, family: 9, nightlife: 4 },
  { name: 'Wilmot Mountain', slug: 'wilmot-wi', state: 'WI', region: 'midwest', lat: 42.5153, lng: -88.2026, vert: 230, trails: 23, lifts: 9, acres: 100, price: 65, difficulty: 'beginner', beginner: 45, intermediate: 35, advanced: 20, expert: 0, green: 10, blue: 8, black: 5, double: 0, parks: true, country: 'USA', elev: 1000, family: 10, nightlife: 3 },

  // ============================================
  // ROCKIES — Colorado gaps
  // ============================================
  { name: 'Beaver Creek', slug: 'beaver-creek-co', state: 'CO', region: 'rockies', lat: 39.6042, lng: -106.5165, vert: 4040, trails: 150, lifts: 25, acres: 1815, price: 269, difficulty: 'advanced', beginner: 19, intermediate: 43, advanced: 38, expert: 0, green: 29, blue: 64, black: 57, double: 0, parks: true, country: 'USA', elev: 11440, family: 10, nightlife: 7 },
  { name: 'Eldora Mountain', slug: 'eldora-co', state: 'CO', region: 'rockies', lat: 39.9378, lng: -105.5836, vert: 1400, trails: 68, lifts: 11, acres: 680, price: 139, difficulty: 'intermediate', beginner: 30, intermediate: 30, advanced: 20, expert: 20, green: 20, blue: 20, black: 14, double: 14, parks: true, country: 'USA', elev: 10800, family: 8, nightlife: 3 },
  { name: 'Purgatory Resort', slug: 'purgatory-co', state: 'CO', region: 'rockies', lat: 37.6288, lng: -107.8151, vert: 2029, trails: 105, lifts: 11, acres: 1635, price: 149, difficulty: 'intermediate', beginner: 22, intermediate: 36, advanced: 26, expert: 16, green: 23, blue: 38, black: 27, double: 17, parks: true, country: 'USA', elev: 10822, family: 8, nightlife: 5 },
  { name: 'Wolf Creek Ski Area', slug: 'wolf-creek-co', state: 'CO', region: 'rockies', lat: 37.4771, lng: -106.7948, vert: 1604, trails: 77, lifts: 8, acres: 1600, price: 99, difficulty: 'intermediate', beginner: 20, intermediate: 35, advanced: 25, expert: 20, green: 15, blue: 27, black: 19, double: 16, parks: false, country: 'USA', elev: 11775, family: 7, nightlife: 1 },
  { name: 'Ski Cooper', slug: 'ski-cooper-co', state: 'CO', region: 'rockies', lat: 39.3623, lng: -106.3072, vert: 1200, trails: 26, lifts: 5, acres: 400, price: 79, difficulty: 'beginner', beginner: 30, intermediate: 40, advanced: 30, expert: 0, green: 8, blue: 10, black: 8, double: 0, parks: false, country: 'USA', elev: 11700, family: 8, nightlife: 1 },

  // ============================================
  // WEST COAST — California & Nevada gaps
  // ============================================
  { name: 'Mt. Rose Ski Tahoe', slug: 'mt-rose-nv', state: 'NV', region: 'west-coast', lat: 39.3144, lng: -119.8823, vert: 1800, trails: 61, lifts: 8, acres: 1200, price: 129, difficulty: 'intermediate', beginner: 20, intermediate: 30, advanced: 30, expert: 20, green: 12, blue: 18, black: 18, double: 13, parks: true, country: 'USA', elev: 9700, family: 7, nightlife: 8 },
  { name: 'Diamond Peak', slug: 'diamond-peak-nv', state: 'NV', region: 'west-coast', lat: 39.2546, lng: -119.9349, vert: 1840, trails: 30, lifts: 6, acres: 655, price: 109, difficulty: 'intermediate', beginner: 18, intermediate: 46, advanced: 36, expert: 0, green: 5, blue: 14, black: 11, double: 0, parks: false, country: 'USA', elev: 8540, family: 9, nightlife: 3 },
  { name: 'June Mountain', slug: 'june-mountain-ca', state: 'CA', region: 'west-coast', lat: 37.7776, lng: -119.0816, vert: 2590, trails: 35, lifts: 7, acres: 500, price: 149, difficulty: 'intermediate', beginner: 35, intermediate: 45, advanced: 20, expert: 0, green: 12, blue: 16, black: 7, double: 0, parks: true, country: 'USA', elev: 10135, family: 10, nightlife: 2 },
  { name: 'Boreal Mountain Resort', slug: 'boreal-ca', state: 'CA', region: 'west-coast', lat: 39.3322, lng: -120.3517, vert: 500, trails: 41, lifts: 9, acres: 380, price: 99, difficulty: 'beginner', beginner: 30, intermediate: 45, advanced: 25, expert: 0, green: 12, blue: 18, black: 11, double: 0, parks: true, country: 'USA', elev: 7700, family: 9, nightlife: 2 },
  { name: 'Homewood Mountain Resort', slug: 'homewood-ca', state: 'CA', region: 'west-coast', lat: 39.0815, lng: -120.1654, vert: 1650, trails: 64, lifts: 8, acres: 1260, price: 119, difficulty: 'intermediate', beginner: 15, intermediate: 50, advanced: 35, expert: 0, green: 10, blue: 32, black: 22, double: 0, parks: false, country: 'USA', elev: 7886, family: 8, nightlife: 4 },

  // ============================================
  // VERMONT — Additional resorts
  // ============================================
  { name: 'Okemo Mountain Resort', slug: 'okemo-vt', state: 'VT', region: 'new-england', lat: 43.4062, lng: -72.7253, vert: 2200, trails: 121, lifts: 20, acres: 632, price: 149, difficulty: 'intermediate', beginner: 35, intermediate: 36, advanced: 29, expert: 0, green: 42, blue: 44, black: 35, double: 0, parks: true, country: 'USA', elev: 3343, family: 10, nightlife: 5 },
  { name: 'Stratton Mountain', slug: 'stratton-vt', state: 'VT', region: 'new-england', lat: 43.1153, lng: -72.9085, vert: 2003, trails: 99, lifts: 11, acres: 670, price: 149, difficulty: 'intermediate', beginner: 14, intermediate: 57, advanced: 29, expert: 0, green: 14, blue: 56, black: 29, double: 0, parks: true, country: 'USA', elev: 3875, family: 8, nightlife: 7 },
  { name: 'Mount Snow', slug: 'mount-snow-vt', state: 'VT', region: 'new-england', lat: 42.9618, lng: -72.9213, vert: 1700, trails: 87, lifts: 20, acres: 588, price: 139, difficulty: 'intermediate', beginner: 14, intermediate: 72, advanced: 14, expert: 0, green: 12, blue: 63, black: 12, double: 0, parks: true, country: 'USA', elev: 3600, family: 8, nightlife: 6 },
  { name: 'Mad River Glen', slug: 'mad-river-glen-vt', state: 'VT', region: 'new-england', lat: 44.1905, lng: -72.9356, vert: 2037, trails: 52, lifts: 5, acres: 115, price: 109, difficulty: 'advanced', beginner: 30, intermediate: 30, advanced: 40, expert: 0, green: 16, blue: 16, black: 20, double: 0, parks: false, country: 'USA', elev: 3637, family: 5, nightlife: 3 },
  { name: 'Bolton Valley Resort', slug: 'bolton-valley-vt', state: 'VT', region: 'new-england', lat: 44.4181, lng: -72.8728, vert: 1704, trails: 71, lifts: 6, acres: 165, price: 89, difficulty: 'intermediate', beginner: 30, intermediate: 40, advanced: 30, expert: 0, green: 21, blue: 28, black: 22, double: 0, parks: true, country: 'USA', elev: 3150, family: 8, nightlife: 3 },

  // ============================================
  // NEW ENGLAND — New Hampshire & Maine gaps
  // ============================================
  { name: 'Cannon Mountain', slug: 'cannon-mountain-nh', state: 'NH', region: 'new-england', lat: 44.1561, lng: -71.6957, vert: 2180, trails: 97, lifts: 10, acres: 285, price: 99, difficulty: 'advanced', beginner: 18, intermediate: 49, advanced: 33, expert: 0, green: 17, blue: 48, black: 32, double: 0, parks: false, country: 'USA', elev: 4080, family: 7, nightlife: 3 },
  { name: 'Wildcat Mountain', slug: 'wildcat-nh', state: 'NH', region: 'new-england', lat: 44.2637, lng: -71.2381, vert: 2112, trails: 49, lifts: 5, acres: 225, price: 109, difficulty: 'advanced', beginner: 10, intermediate: 49, advanced: 41, expert: 0, green: 5, blue: 24, black: 20, double: 0, parks: false, country: 'USA', elev: 4062, family: 6, nightlife: 2 },
  { name: 'Mount Attitash', slug: 'attitash-nh', state: 'NH', region: 'new-england', lat: 44.0792, lng: -71.2327, vert: 1750, trails: 68, lifts: 9, acres: 311, price: 109, difficulty: 'intermediate', beginner: 21, intermediate: 47, advanced: 32, expert: 0, green: 14, blue: 32, black: 22, double: 0, parks: true, country: 'USA', elev: 2350, family: 7, nightlife: 3 },
  { name: 'Big Rock Mountain', slug: 'big-rock-me', state: 'ME', region: 'new-england', lat: 47.3517, lng: -68.3320, vert: 860, trails: 31, lifts: 4, acres: 180, price: 59, difficulty: 'intermediate', beginner: 30, intermediate: 40, advanced: 30, expert: 0, green: 9, blue: 12, black: 10, double: 0, parks: true, country: 'USA', elev: 1994, family: 8, nightlife: 2 },

  // ============================================
  // ALASKA & PACIFIC NORTHWEST
  // ============================================
  { name: 'Alyeska Resort', slug: 'alyeska-ak', state: 'AK', region: 'west-coast', lat: 60.9660, lng: -149.1063, vert: 2500, trails: 76, lifts: 9, acres: 1400, price: 149, difficulty: 'advanced', beginner: 10, intermediate: 30, advanced: 60, expert: 0, green: 8, blue: 23, black: 45, double: 0, parks: true, country: 'USA', elev: 3939, family: 7, nightlife: 4 },
  { name: 'Mission Ridge', slug: 'mission-ridge-wa', state: 'WA', region: 'west-coast', lat: 47.2938, lng: -120.4011, vert: 2250, trails: 36, lifts: 5, acres: 2000, price: 109, difficulty: 'advanced', beginner: 8, intermediate: 42, advanced: 50, expert: 0, green: 3, blue: 15, black: 18, double: 0, parks: true, country: 'USA', elev: 6820, family: 7, nightlife: 2 },
  { name: 'Ski Bowl Mt. Hood', slug: 'ski-bowl-or', state: 'OR', region: 'west-coast', lat: 45.2982, lng: -121.7108, vert: 1500, trails: 65, lifts: 6, acres: 960, price: 69, difficulty: 'beginner', beginner: 45, intermediate: 35, advanced: 20, expert: 0, green: 29, blue: 23, black: 13, double: 0, parks: true, country: 'USA', elev: 5026, family: 9, nightlife: 3 },
];

let sql = `-- Phase 6 Data Expansion - Additional U.S. Resorts (seed-v4)
-- Auto-generated. Uses ON CONFLICT (slug) so safe to re-run.
-- Adds Southeast, Mid-Atlantic gaps, Midwest, West Coast gaps, and more NE resorts.

`;

resorts.forEach(r => {
  sql += `
INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  ${JSON.stringify(r.name)}, ${JSON.stringify(r.slug)}, ${JSON.stringify(r.state)}, ${JSON.stringify(r.region)},
  ${r.lat}, ${r.lng}, ${r.vert}, ${r.trails}, ${r.lifts}, ${r.acres},
  ${r.price}, ${JSON.stringify(r.difficulty)}, ${r.beginner}, ${r.intermediate}, ${r.advanced}, ${r.expert},
  ${r.green}, ${r.blue}, ${r.black}, ${r.double}, ${r.parks}, ${JSON.stringify(r.country)}, ${r.elev}, ${r.family}, ${r.nightlife},
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft,
  skiable_acres = EXCLUDED.skiable_acres,
  lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd;
`;
});

fs.writeFileSync(path.join(__dirname, '../supabase/seed-v4.sql'), sql);
console.log(`Seed v4 generated: ${resorts.length} resorts.`);
