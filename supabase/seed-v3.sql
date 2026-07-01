-- Phase 5 Data Expansion - 100+ U.S. Resorts with Trail Counts
-- Auto-generated seed file


INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Telluride', 'telluride-co', 'CO', 'rockies', 37.9365, -107.8463, 4425, 148, 17, 2000,
  219, 'advanced', 23, 36, 41, 0,
  34, 53, 61, 0, true, 'USA', 13150, 8, 7,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Aspen Snowmass', 'aspen-snowmass-co', 'CO', 'rockies', 39.2081, -106.9497, 4406, 98, 20, 3342,
  239, 'all-levels', 5, 48, 17, 30,
  5, 47, 17, 29, true, 'USA', 12510, 10, 8,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Steamboat', 'steamboat-co', 'CO', 'rockies', 40.4572, -106.8045, 3668, 170, 23, 2965,
  249, 'intermediate', 14, 42, 44, 0,
  24, 71, 75, 0, true, 'USA', 10568, 9, 7,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Winter Park', 'winter-park-co', 'CO', 'rockies', 39.8868, -105.7625, 3060, 166, 23, 3081,
  219, 'intermediate', 8, 18, 19, 55,
  13, 30, 32, 91, true, 'USA', 12060, 9, 6,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Copper Mountain', 'copper-mountain-co', 'CO', 'rockies', 39.5017, -106.1564, 2738, 155, 24, 2507,
  199, 'all-levels', 21, 25, 36, 18,
  33, 39, 55, 28, true, 'USA', 12313, 9, 6,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Arapahoe Basin', 'arapahoe-basin-co', 'CO', 'rockies', 39.6425, -105.8719, 2530, 147, 9, 1428,
  159, 'advanced', 7, 20, 49, 24,
  10, 29, 72, 36, true, 'USA', 13050, 6, 4,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Keystone', 'keystone-co', 'CO', 'rockies', 39.6051, -105.9439, 3128, 128, 20, 3148,
  209, 'intermediate', 12, 39, 49, 0,
  15, 50, 63, 0, true, 'USA', 12408, 10, 5,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Crested Butte', 'crested-butte-co', 'CO', 'rockies', 38.8997, -106.9658, 2775, 121, 15, 1547,
  189, 'advanced', 26, 57, 14, 3,
  31, 69, 17, 4, true, 'USA', 12162, 7, 7,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Loveland', 'loveland-co', 'CO', 'rockies', 39.68, -105.897, 2210, 94, 10, 1800,
  119, 'intermediate', 13, 41, 46, 0,
  12, 39, 43, 0, true, 'USA', 13010, 7, 2,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Monarch Mountain', 'monarch-co', 'CO', 'rockies', 38.5121, -106.3323, 1162, 67, 7, 800,
  109, 'intermediate', 14, 28, 58, 0,
  9, 19, 39, 0, true, 'USA', 11952, 8, 3,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Alta', 'alta-ut', 'UT', 'rockies', 40.5883, -111.6358, 2538, 119, 6, 2614,
  179, 'advanced', 15, 30, 55, 0,
  18, 36, 65, 0, false, 'USA', 11068, 6, 3,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Snowbird', 'snowbird-ut', 'UT', 'rockies', 40.5833, -111.6508, 3240, 140, 14, 2500,
  199, 'advanced', 8, 22, 70, 0,
  11, 31, 98, 0, true, 'USA', 11000, 6, 4,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Park City', 'park-city-ut', 'UT', 'rockies', 40.6514, -111.508, 3226, 330, 41, 7300,
  269, 'all-levels', 8, 42, 50, 0,
  26, 139, 165, 0, true, 'USA', 10026, 9, 10,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Deer Valley', 'deer-valley-ut', 'UT', 'rockies', 40.6231, -111.4878, 3000, 103, 21, 2026,
  289, 'intermediate', 27, 41, 32, 0,
  28, 42, 33, 0, false, 'USA', 9570, 10, 8,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Solitude', 'solitude-ut', 'UT', 'rockies', 40.6195, -111.5919, 2494, 82, 8, 1200,
  169, 'intermediate', 10, 40, 50, 0,
  8, 33, 41, 0, true, 'USA', 10488, 8, 3,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Brighton', 'brighton-ut', 'UT', 'rockies', 40.598, -111.5826, 1745, 66, 7, 1050,
  149, 'intermediate', 21, 40, 39, 0,
  14, 26, 26, 0, true, 'USA', 10500, 9, 3,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Snowbasin', 'snowbasin-ut', 'UT', 'rockies', 41.216, -111.8569, 2900, 111, 12, 3000,
  189, 'advanced', 7, 29, 64, 0,
  8, 32, 71, 0, true, 'USA', 9350, 8, 4,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Powder Mountain', 'powder-mountain-ut', 'UT', 'rockies', 41.3813, -111.7766, 2205, 154, 9, 8464,
  229, 'intermediate', 25, 40, 35, 0,
  39, 62, 53, 0, true, 'USA', 9422, 7, 2,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Sundance', 'sundance-ut', 'UT', 'rockies', 40.3934, -111.5888, 2150, 44, 5, 450,
  139, 'intermediate', 20, 40, 40, 0,
  9, 18, 17, 0, true, 'USA', 8250, 9, 5,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Palisades Tahoe', 'palisades-tahoe-ca', 'CA', 'west-coast', 39.1969, -120.2357, 2850, 270, 34, 6000,
  269, 'advanced', 25, 45, 30, 0,
  68, 121, 81, 0, true, 'USA', 9050, 9, 8,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Mammoth Mountain', 'mammoth-ca', 'CA', 'west-coast', 37.6307, -119.0326, 3100, 175, 25, 3500,
  249, 'all-levels', 25, 40, 20, 15,
  44, 70, 35, 26, true, 'USA', 11053, 9, 7,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Heavenly', 'heavenly-ca', 'CA', 'west-coast', 38.9353, -119.94, 3500, 97, 28, 4800,
  239, 'intermediate', 20, 45, 35, 0,
  19, 44, 34, 0, true, 'USA', 10067, 8, 10,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Northstar', 'northstar-ca', 'CA', 'west-coast', 39.2746, -120.1211, 2280, 100, 20, 3170,
  229, 'intermediate', 13, 60, 27, 0,
  13, 60, 27, 0, true, 'USA', 8610, 10, 6,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Kirkwood', 'kirkwood-ca', 'CA', 'west-coast', 38.6845, -120.0652, 2000, 86, 15, 2300,
  169, 'advanced', 12, 30, 38, 20,
  10, 26, 33, 17, true, 'USA', 9800, 6, 4,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Sugar Bowl', 'sugar-bowl-ca', 'CA', 'west-coast', 39.3039, -120.3347, 1500, 98, 12, 1650,
  149, 'intermediate', 17, 45, 38, 0,
  17, 44, 37, 0, true, 'USA', 8383, 8, 3,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Bear Valley', 'bear-valley-ca', 'CA', 'west-coast', 38.48, -120.015, 1900, 75, 9, 1680,
  119, 'intermediate', 25, 40, 35, 0,
  19, 30, 26, 0, true, 'USA', 8500, 8, 2,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Dodge Ridge', 'dodge-ridge-ca', 'CA', 'west-coast', 38.1888, -119.9839, 1600, 67, 12, 862,
  109, 'intermediate', 20, 40, 40, 0,
  13, 27, 27, 0, true, 'USA', 8200, 9, 2,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Mt. Baker', 'mt-baker-wa', 'WA', 'west-coast', 48.8618, -121.6609, 1500, 38, 10, 1000,
  89, 'advanced', 24, 45, 31, 0,
  9, 17, 12, 0, false, 'USA', 5089, 6, 2,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Crystal Mountain', 'crystal-wa', 'WA', 'west-coast', 46.9354, -121.4741, 3100, 85, 11, 2600,
  179, 'advanced', 11, 54, 35, 0,
  9, 46, 30, 0, true, 'USA', 7012, 7, 4,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Stevens Pass', 'stevens-pass-wa', 'WA', 'west-coast', 47.7447, -121.089, 1800, 52, 10, 1125,
  149, 'intermediate', 11, 54, 35, 0,
  6, 28, 18, 0, true, 'USA', 5845, 7, 3,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Snoqualmie', 'snoqualmie-wa', 'WA', 'west-coast', 47.4258, -121.4162, 2280, 110, 25, 1981,
  129, 'intermediate', 18, 44, 38, 0,
  20, 48, 42, 0, true, 'USA', 5420, 8, 5,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Mt. Bachelor', 'mt-bachelor-or', 'OR', 'west-coast', 43.9786, -121.6853, 3365, 101, 12, 4323,
  169, 'intermediate', 15, 35, 30, 20,
  15, 35, 30, 21, true, 'USA', 9065, 8, 6,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Mt. Hood Meadows', 'mt-hood-meadows-or', 'OR', 'west-coast', 45.3308, -121.6644, 2777, 87, 11, 2150,
  149, 'intermediate', 15, 50, 20, 15,
  13, 44, 17, 13, true, 'USA', 7300, 8, 4,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Timberline Lodge', 'timberline-or', 'OR', 'west-coast', 45.3311, -121.711, 3690, 41, 9, 1415,
  119, 'intermediate', 25, 50, 25, 0,
  10, 21, 10, 0, true, 'USA', 8540, 9, 4,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Big Sky', 'big-sky-mt', 'MT', 'rockies', 45.2849, -111.4018, 4350, 317, 39, 5850,
  249, 'all-levels', 15, 25, 42, 18,
  48, 79, 133, 57, true, 'USA', 11166, 9, 6,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Whitefish', 'whitefish-mt', 'MT', 'rockies', 48.48, -114.3496, 2353, 113, 14, 3000,
  129, 'intermediate', 12, 38, 50, 0,
  14, 43, 56, 0, true, 'USA', 6817, 8, 7,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Bridger Bowl', 'bridger-bowl-mt', 'MT', 'rockies', 45.816, -110.8988, 2700, 75, 11, 2000,
  89, 'advanced', 16, 28, 36, 20,
  12, 21, 27, 15, true, 'USA', 8800, 7, 5,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Jackson Hole', 'jackson-hole-wy', 'WY', 'rockies', 43.596, -110.8268, 4139, 130, 13, 2500,
  239, 'advanced', 10, 40, 50, 0,
  13, 52, 65, 0, true, 'USA', 10450, 6, 8,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Grand Targhee', 'grand-targhee-wy', 'WY', 'rockies', 43.7925, -110.9634, 2270, 97, 5, 2602,
  149, 'intermediate', 10, 70, 20, 0,
  10, 68, 19, 0, true, 'USA', 9862, 9, 3,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Sun Valley', 'sun-valley-id', 'ID', 'rockies', 43.6666, -114.3541, 3400, 121, 18, 2434,
  199, 'intermediate', 36, 42, 22, 0,
  44, 51, 26, 0, true, 'USA', 9150, 10, 7,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Schweitzer', 'schweitzer-id', 'ID', 'rockies', 48.3792, -116.6231, 2400, 92, 10, 2900,
  129, 'intermediate', 10, 40, 35, 15,
  9, 37, 32, 14, true, 'USA', 7300, 8, 4,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Bogus Basin', 'bogus-basin-id', 'ID', 'rockies', 43.7634, -116.103, 1790, 82, 10, 2600,
  89, 'intermediate', 22, 33, 45, 0,
  18, 27, 37, 0, true, 'USA', 7582, 8, 3,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Taos', 'taos-nm', 'NM', 'rockies', 36.5959, -105.4545, 3274, 110, 13, 1294,
  165, 'advanced', 24, 25, 51, 0,
  26, 28, 56, 0, true, 'USA', 12481, 6, 5,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Angel Fire', 'angel-fire-nm', 'NM', 'rockies', 36.3897, -105.2759, 2077, 81, 7, 560,
  109, 'beginner', 21, 56, 23, 0,
  17, 45, 19, 0, true, 'USA', 10677, 9, 3,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Arizona Snowbowl', 'snowbowl-az', 'AZ', 'rockies', 35.3283, -111.7088, 2300, 55, 8, 777,
  119, 'intermediate', 37, 42, 21, 0,
  20, 23, 12, 0, true, 'USA', 11500, 8, 3,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Stowe', 'stowe-vt', 'VT', 'new-england', 44.5298, -72.7809, 2360, 116, 12, 485,
  199, 'intermediate', 16, 55, 29, 0,
  19, 64, 33, 0, true, 'USA', 4395, 8, 7,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Killington', 'killington-vt', 'VT', 'new-england', 43.6253, -72.7972, 3050, 155, 21, 1509,
  189, 'all-levels', 17, 40, 43, 0,
  26, 62, 67, 0, true, 'USA', 4241, 8, 9,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Sugarbush', 'sugarbush-vt', 'VT', 'new-england', 44.136, -72.8942, 2600, 111, 16, 484,
  179, 'intermediate', 19, 34, 47, 0,
  21, 38, 52, 0, true, 'USA', 4083, 8, 6,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Smugglers Notch', 'smugglers-notch-vt', 'VT', 'new-england', 44.5885, -72.7901, 2610, 78, 8, 310,
  109, 'intermediate', 19, 50, 31, 0,
  15, 39, 24, 0, true, 'USA', 3640, 10, 3,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Jay Peak', 'jay-peak-vt', 'VT', 'new-england', 44.9366, -72.5074, 2153, 81, 9, 385,
  119, 'advanced', 20, 40, 40, 0,
  16, 32, 33, 0, true, 'USA', 3968, 8, 5,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Loon Mountain', 'loon-nh', 'NH', 'new-england', 44.0355, -71.6214, 2100, 61, 10, 370,
  149, 'intermediate', 20, 60, 20, 0,
  12, 37, 12, 0, true, 'USA', 3050, 9, 6,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Bretton Woods', 'bretton-woods-nh', 'NH', 'new-england', 44.2592, -71.4616, 1500, 98, 10, 464,
  129, 'beginner', 24, 28, 32, 16,
  24, 27, 31, 16, true, 'USA', 3100, 10, 3,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Sunday River', 'sunday-river-me', 'ME', 'new-england', 44.4735, -70.8568, 2340, 135, 18, 870,
  159, 'intermediate', 30, 36, 34, 0,
  40, 49, 46, 0, true, 'USA', 3140, 9, 6,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Sugarloaf', 'sugarloaf-me', 'ME', 'new-england', 45.0315, -70.3131, 2820, 162, 13, 1240,
  139, 'intermediate', 23, 34, 27, 16,
  37, 55, 44, 26, true, 'USA', 4237, 8, 5,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Whiteface', 'whiteface-ny', 'NY', 'mid-atlantic', 44.3658, -73.9027, 3430, 90, 11, 288,
  119, 'advanced', 20, 42, 38, 0,
  18, 38, 34, 0, true, 'USA', 4650, 7, 7,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Gore Mountain', 'gore-ny', 'NY', 'mid-atlantic', 43.6738, -73.9928, 2537, 110, 14, 439,
  109, 'intermediate', 10, 50, 40, 0,
  11, 55, 44, 0, true, 'USA', 3600, 8, 3,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Holiday Valley', 'holiday-valley-ny', 'NY', 'mid-atlantic', 42.2618, -78.6669, 750, 60, 13, 290,
  89, 'intermediate', 39, 11, 50, 0,
  23, 7, 30, 0, true, 'USA', 2250, 9, 8,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Boyne Mountain', 'boyne-mountain-mi', 'MI', 'midwest', 45.1636, -84.9328, 500, 60, 10, 415,
  109, 'beginner', 29, 41, 30, 0,
  17, 25, 18, 0, true, 'USA', 1120, 10, 6,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Crystal Mountain (MI)', 'crystal-mountain-mi', 'MI', 'midwest', 44.5222, -85.992, 375, 58, 8, 102,
  89, 'beginner', 22, 48, 30, 0,
  13, 28, 17, 0, true, 'USA', 1132, 9, 3,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Granite Peak', 'granite-peak-wi', 'WI', 'midwest', 44.9255, -89.6841, 700, 68, 7, 400,
  95, 'intermediate', 35, 30, 35, 0,
  24, 20, 24, 0, true, 'USA', 1940, 8, 5,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;

INSERT INTO public.resorts (
  name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres,
  lift_ticket_price_usd, difficulty_level, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  green_trails, blue_trails, black_trails, double_black_trails, terrain_parks, country, elevation_ft, family_score, nightlife_score,
  images
) VALUES (
  'Lutsen Mountains', 'lutsen-mn', 'MN', 'midwest', 47.6521, -90.7303, 825, 95, 8, 1000,
  99, 'intermediate', 18, 47, 25, 10,
  17, 45, 24, 9, true, 'USA', 1688, 8, 4,
  '{}'
) ON CONFLICT (slug) DO UPDATE SET
  green_trails = EXCLUDED.green_trails,
  blue_trails = EXCLUDED.blue_trails,
  black_trails = EXCLUDED.black_trails,
  double_black_trails = EXCLUDED.double_black_trails,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  elevation_ft = EXCLUDED.elevation_ft;
