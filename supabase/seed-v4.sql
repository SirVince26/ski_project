-- ============================================
-- Phase 6 Data Expansion — Additional U.S. Resorts
-- Covers: Southeast, Mid-Atlantic gaps, Midwest, West Coast gaps, New England gaps
-- Run in: Supabase Dashboard → SQL Editor
-- Uses ON CONFLICT (slug) — safe to re-run.
-- Total: ~40 new resorts
-- ============================================

-- ============================================
-- SOUTHEAST
-- ============================================

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Snowshoe Mountain', 'snowshoe-wv', 'WV', 'mid-atlantic', 38.4049, -79.9951, 1500, 60, 14, 244, 129, 'all-levels', 10, 45, 35, 10, 6, 27, 21, 6, true, 'USA', 4848, 9, 6, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Beech Mountain Resort', 'beech-mountain-nc', 'NC', 'southeast', 36.1993, -81.9009, 830, 17, 8, 95, 89, 'intermediate', 35, 40, 25, 0, 6, 7, 4, 0, true, 'USA', 5506, 9, 3, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Cataloochee Ski Area', 'cataloochee-nc', 'NC', 'southeast', 35.6034, -83.0765, 740, 18, 7, 50, 79, 'beginner', 45, 35, 20, 0, 8, 6, 4, 0, true, 'USA', 5400, 10, 2, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Wintergreen Resort', 'wintergreen-va', 'VA', 'mid-atlantic', 37.9631, -78.9381, 1003, 26, 7, 119, 89, 'intermediate', 25, 45, 30, 0, 7, 12, 7, 0, true, 'USA', 3515, 9, 5, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Massanutten Resort', 'massanutten-va', 'VA', 'mid-atlantic', 38.4018, -78.7315, 1110, 14, 9, 78, 79, 'beginner', 40, 45, 15, 0, 6, 6, 2, 0, true, 'USA', 3275, 10, 4, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Ober Gatlinburg', 'ober-gatlinburg-tn', 'TN', 'southeast', 35.7243, -83.4993, 600, 10, 9, 30, 69, 'beginner', 50, 40, 10, 0, 5, 4, 1, 0, false, 'USA', 3434, 10, 4, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

-- ============================================
-- MID-ATLANTIC (Pennsylvania & New York gaps)
-- ============================================

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Camelback Mountain', 'camelback-pa', 'PA', 'mid-atlantic', 41.0429, -75.3477, 800, 35, 16, 164, 109, 'intermediate', 25, 50, 25, 0, 9, 17, 9, 0, true, 'USA', 2133, 9, 5, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Blue Mountain Resort', 'blue-mountain-pa', 'PA', 'mid-atlantic', 40.6979, -75.6907, 1082, 40, 15, 165, 99, 'intermediate', 20, 55, 25, 0, 8, 22, 10, 0, true, 'USA', 1600, 8, 4, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Seven Springs Mountain Resort', 'seven-springs-pa', 'PA', 'mid-atlantic', 39.9448, -79.2950, 750, 32, 10, 285, 89, 'intermediate', 30, 45, 25, 0, 10, 14, 8, 0, true, 'USA', 2993, 10, 6, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Liberty Mountain Resort', 'liberty-mountain-pa', 'PA', 'mid-atlantic', 39.8084, -77.1900, 620, 22, 9, 80, 79, 'beginner', 35, 45, 20, 0, 8, 10, 4, 0, true, 'USA', 1200, 9, 3, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Whitetail Resort', 'whitetail-pa', 'PA', 'mid-atlantic', 39.8573, -77.6467, 935, 23, 9, 115, 79, 'intermediate', 25, 50, 25, 0, 6, 12, 5, 0, true, 'USA', 2000, 8, 3, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Windham Mountain', 'windham-ny', 'NY', 'mid-atlantic', 42.3000, -74.2569, 1600, 54, 10, 285, 119, 'intermediate', 17, 54, 29, 0, 9, 29, 16, 0, true, 'USA', 3100, 8, 6, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

-- ============================================
-- MIDWEST (Minnesota & Wisconsin)
-- ============================================

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Giants Ridge', 'giants-ridge-mn', 'MN', 'midwest', 47.5194, -92.1899, 500, 35, 8, 135, 79, 'intermediate', 20, 50, 30, 0, 7, 18, 10, 0, true, 'USA', 1776, 8, 3, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Spirit Mountain', 'spirit-mountain-mn', 'MN', 'midwest', 46.7308, -92.2232, 700, 22, 9, 175, 79, 'intermediate', 20, 50, 30, 0, 5, 11, 6, 0, true, 'USA', 1800, 8, 5, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Afton Alps', 'afton-alps-mn', 'MN', 'midwest', 44.8619, -92.7797, 350, 48, 18, 300, 69, 'beginner', 35, 40, 25, 0, 17, 19, 12, 0, true, 'USA', 1200, 9, 3, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Devil''s Head Resort', 'devils-head-wi', 'WI', 'midwest', 43.4286, -89.7478, 500, 33, 9, 155, 79, 'intermediate', 25, 45, 30, 0, 8, 15, 10, 0, true, 'USA', 1400, 9, 4, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Wilmot Mountain', 'wilmot-wi', 'WI', 'midwest', 42.5153, -88.2026, 230, 23, 9, 100, 65, 'beginner', 45, 35, 20, 0, 10, 8, 5, 0, true, 'USA', 1000, 10, 3, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

-- ============================================
-- ROCKIES — Colorado gaps
-- ============================================

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Beaver Creek', 'beaver-creek-co', 'CO', 'rockies', 39.6042, -106.5165, 4040, 150, 25, 1815, 269, 'advanced', 19, 43, 38, 0, 29, 64, 57, 0, true, 'USA', 11440, 10, 7, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Eldora Mountain', 'eldora-co', 'CO', 'rockies', 39.9378, -105.5836, 1400, 68, 11, 680, 139, 'intermediate', 30, 30, 20, 20, 20, 20, 14, 14, true, 'USA', 10800, 8, 3, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Purgatory Resort', 'purgatory-co', 'CO', 'rockies', 37.6288, -107.8151, 2029, 105, 11, 1635, 149, 'intermediate', 22, 36, 26, 16, 23, 38, 27, 17, true, 'USA', 10822, 8, 5, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Wolf Creek Ski Area', 'wolf-creek-co', 'CO', 'rockies', 37.4771, -106.7948, 1604, 77, 8, 1600, 99, 'intermediate', 20, 35, 25, 20, 15, 27, 19, 16, false, 'USA', 11775, 7, 1, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Ski Cooper', 'ski-cooper-co', 'CO', 'rockies', 39.3623, -106.3072, 1200, 26, 5, 400, 79, 'beginner', 30, 40, 30, 0, 8, 10, 8, 0, false, 'USA', 11700, 8, 1, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

-- ============================================
-- WEST COAST — California & Nevada gaps
-- ============================================

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Mt. Rose Ski Tahoe', 'mt-rose-nv', 'NV', 'west-coast', 39.3144, -119.8823, 1800, 61, 8, 1200, 129, 'intermediate', 20, 30, 30, 20, 12, 18, 18, 13, true, 'USA', 9700, 7, 8, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Diamond Peak', 'diamond-peak-nv', 'NV', 'west-coast', 39.2546, -119.9349, 1840, 30, 6, 655, 109, 'intermediate', 18, 46, 36, 0, 5, 14, 11, 0, false, 'USA', 8540, 9, 3, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('June Mountain', 'june-mountain-ca', 'CA', 'west-coast', 37.7776, -119.0816, 2590, 35, 7, 500, 149, 'intermediate', 35, 45, 20, 0, 12, 16, 7, 0, true, 'USA', 10135, 10, 2, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Boreal Mountain Resort', 'boreal-ca', 'CA', 'west-coast', 39.3322, -120.3517, 500, 41, 9, 380, 99, 'beginner', 30, 45, 25, 0, 12, 18, 11, 0, true, 'USA', 7700, 9, 2, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Homewood Mountain Resort', 'homewood-ca', 'CA', 'west-coast', 39.0815, -120.1654, 1650, 64, 8, 1260, 119, 'intermediate', 15, 50, 35, 0, 10, 32, 22, 0, false, 'USA', 7886, 8, 4, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

-- ============================================
-- PACIFIC NORTHWEST & ALASKA
-- ============================================

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Alyeska Resort', 'alyeska-ak', 'AK', 'west-coast', 60.9660, -149.1063, 2500, 76, 9, 1400, 149, 'advanced', 10, 30, 60, 0, 8, 23, 45, 0, true, 'USA', 3939, 7, 4, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Mission Ridge', 'mission-ridge-wa', 'WA', 'west-coast', 47.2938, -120.4011, 2250, 36, 5, 2000, 109, 'advanced', 8, 42, 50, 0, 3, 15, 18, 0, true, 'USA', 6820, 7, 2, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Mt. Hood Skibowl', 'skibowl-or', 'OR', 'west-coast', 45.2982, -121.7108, 1500, 65, 6, 960, 69, 'beginner', 45, 35, 20, 0, 29, 23, 13, 0, true, 'USA', 5026, 9, 3, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

-- ============================================
-- VERMONT — Additional resorts
-- ============================================

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Okemo Mountain Resort', 'okemo-vt', 'VT', 'new-england', 43.4062, -72.7253, 2200, 121, 20, 632, 149, 'intermediate', 35, 36, 29, 0, 42, 44, 35, 0, true, 'USA', 3343, 10, 5, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Stratton Mountain', 'stratton-vt', 'VT', 'new-england', 43.1153, -72.9085, 2003, 99, 11, 670, 149, 'intermediate', 14, 57, 29, 0, 14, 56, 29, 0, true, 'USA', 3875, 8, 7, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Mount Snow', 'mount-snow-vt', 'VT', 'new-england', 42.9618, -72.9213, 1700, 87, 20, 588, 139, 'intermediate', 14, 72, 14, 0, 12, 63, 12, 0, true, 'USA', 3600, 8, 6, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Mad River Glen', 'mad-river-glen-vt', 'VT', 'new-england', 44.1905, -72.9356, 2037, 52, 5, 115, 109, 'advanced', 30, 30, 40, 0, 16, 16, 20, 0, false, 'USA', 3637, 5, 3, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Bolton Valley Resort', 'bolton-valley-vt', 'VT', 'new-england', 44.4181, -72.8728, 1704, 71, 6, 165, 89, 'intermediate', 30, 40, 30, 0, 21, 28, 22, 0, true, 'USA', 3150, 8, 3, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

-- ============================================
-- NEW ENGLAND — New Hampshire & Maine gaps
-- ============================================

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Cannon Mountain', 'cannon-mountain-nh', 'NH', 'new-england', 44.1561, -71.6957, 2180, 97, 10, 285, 99, 'advanced', 18, 49, 33, 0, 17, 48, 32, 0, false, 'USA', 4080, 7, 3, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Wildcat Mountain', 'wildcat-nh', 'NH', 'new-england', 44.2637, -71.2381, 2112, 49, 5, 225, 109, 'advanced', 10, 49, 41, 0, 5, 24, 20, 0, false, 'USA', 4062, 6, 2, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Attitash Mountain Resort', 'attitash-nh', 'NH', 'new-england', 44.0792, -71.2327, 1750, 68, 9, 311, 109, 'intermediate', 21, 47, 32, 0, 14, 32, 22, 0, true, 'USA', 2350, 7, 3, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent, green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score, images)
VALUES ('Big Rock Mountain', 'big-rock-me', 'ME', 'new-england', 47.3517, -68.3320, 860, 31, 4, 180, 59, 'intermediate', 30, 40, 30, 0, 9, 12, 10, 0, true, 'USA', 1994, 8, 2, '{}')
ON CONFLICT (slug) DO UPDATE SET lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd, family_score = EXCLUDED.family_score, nightlife_score = EXCLUDED.nightlife_score;
