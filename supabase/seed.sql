-- ============================================
-- SkiTrip AI - Seed Data: 25 East Coast Resorts
-- Run AFTER schema.sql in: Supabase Dashboard → SQL Editor
-- ============================================

INSERT INTO public.resorts (name, slug, state, region, latitude, longitude, vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, difficulty_level, website_url, description) VALUES

-- ============================================
-- NEW ENGLAND (15 resorts)
-- ============================================
('Killington Resort', 'killington', 'VT', 'new-england', 43.6620, -72.7850, 3050, 155, 22, 1509, 149, 'all-levels', 'https://www.killington.com', 'The Beast of the East — the largest ski area in eastern North America with 155 trails across six peaks.'),
('Stowe Mountain Resort', 'stowe', 'VT', 'new-england', 44.5320, -72.7800, 2360, 116, 13, 485, 179, 'advanced', 'https://www.stowe.com', 'Vermont''s premier resort on Mt. Mansfield, the state''s highest peak. Known for world-class terrain and a charming village.'),
('Sunday River', 'sunday-river', 'ME', 'new-england', 44.4810, -70.7760, 2340, 135, 15, 870, 129, 'all-levels', 'https://www.sundayriver.com', 'Spread across eight interconnected peaks in western Maine with reliable snowmaking.'),
('Sugarloaf', 'sugarloaf', 'ME', 'new-england', 45.0320, -70.3150, 2820, 162, 13, 1230, 139, 'advanced', 'https://www.sugarloaf.com', 'Maine''s biggest ski area with the only lift-served skiing above treeline in the East.'),
('Okemo Mountain Resort', 'okemo', 'VT', 'new-england', 43.4050, -72.7250, 2200, 121, 20, 667, 139, 'intermediate', 'https://www.okemo.com', 'Family-friendly Vermont resort known for excellent grooming and consistent conditions.'),
('Sugarbush Resort', 'sugarbush', 'VT', 'new-england', 44.1350, -72.8830, 2600, 111, 16, 484, 139, 'all-levels', 'https://www.sugarbush.com', 'Two interconnected mountains in Vermont''s Mad River Valley with diverse terrain.'),
('Jay Peak Resort', 'jay-peak', 'VT', 'new-england', 44.9280, -72.5240, 2153, 81, 9, 385, 99, 'all-levels', 'https://www.jaypeakresort.com', 'Near the Canadian border, Jay Peak gets more natural snow than any other East Coast resort.'),
('Stratton Mountain', 'stratton', 'VT', 'new-england', 43.1180, -72.9050, 2003, 99, 11, 670, 149, 'intermediate', 'https://www.stratton.com', 'Southern Vermont resort where snowboarding was born. Great village atmosphere.'),
('Smugglers Notch', 'smugglers-notch', 'VT', 'new-england', 44.5820, -72.7880, 2610, 78, 8, 311, 89, 'all-levels', 'https://www.smuggs.com', 'Family-oriented resort in northern Vermont with three interconnected mountains.'),
('Cannon Mountain', 'cannon-mountain', 'NH', 'new-england', 44.1560, -71.6960, 2180, 97, 10, 285, 99, 'advanced', 'https://www.cannonmt.com', 'New Hampshire''s state-owned ski area in Franconia Notch with challenging terrain at great value.'),
('Loon Mountain', 'loon-mountain', 'NH', 'new-england', 44.0470, -71.6190, 2100, 61, 10, 370, 129, 'intermediate', 'https://www.loonmtn.com', 'Popular White Mountains resort with a great mix of terrain and a lively base area.'),
('Bretton Woods', 'bretton-woods', 'NH', 'new-england', 44.2580, -71.4620, 1500, 63, 10, 464, 119, 'beginner', 'https://www.brettonwoods.com', 'New Hampshire''s largest ski area, known for gentle terrain and the grand Mt. Washington Hotel.'),
('Wildcat Mountain', 'wildcat-mountain', 'NH', 'new-england', 44.2640, -71.2390, 2112, 49, 5, 225, 109, 'advanced', 'https://www.skiwildcat.com', 'Rugged New Hampshire mountain with stunning views of Mt. Washington and Tuckerman Ravine.'),
('Mount Snow', 'mount-snow', 'VT', 'new-england', 42.9610, -72.9210, 1700, 87, 20, 588, 139, 'intermediate', 'https://www.mountsnow.com', 'Southern Vermont resort easily accessible from the NYC/Boston corridor with great parks.'),
('Attitash Mountain Resort', 'attitash', 'NH', 'new-england', 44.0830, -71.2290, 1750, 68, 9, 311, 109, 'intermediate', 'https://www.attitash.com', 'White Mountains resort with two peaks and a family-friendly atmosphere.'),

-- ============================================
-- MID-ATLANTIC (7 resorts)
-- ============================================
('Hunter Mountain', 'hunter-mountain', 'NY', 'mid-atlantic', 42.2030, -74.2250, 1600, 67, 13, 240, 109, 'intermediate', 'https://www.huntermtn.com', 'The Catskills'' premier ski area, closest major resort to NYC with aggressive snowmaking.'),
('Windham Mountain', 'windham-mountain', 'NY', 'mid-atlantic', 42.2970, -74.2590, 1600, 54, 11, 285, 99, 'intermediate', 'https://www.windhammountain.com', 'Upscale Catskills resort known for excellent grooming and a relaxed atmosphere.'),
('Whiteface Mountain', 'whiteface', 'NY', 'mid-atlantic', 44.3660, -73.9030, 3430, 87, 11, 288, 119, 'advanced', 'https://www.whiteface.com', 'Olympic mountain in Lake Placid with the greatest vertical drop in the East.'),
('Gore Mountain', 'gore-mountain', 'NY', 'mid-atlantic', 43.6730, -74.0060, 2537, 110, 14, 439, 99, 'all-levels', 'https://www.goremountain.com', 'State-run Adirondack resort with four peaks and excellent value.'),
('Camelback Mountain', 'camelback', 'PA', 'mid-atlantic', 41.0520, -75.3580, 800, 39, 16, 166, 79, 'beginner', 'https://www.camelbackresort.com', 'Pocono Mountains resort with a waterpark, close to NYC and Philadelphia.'),
('Jack Frost / Big Boulder', 'jack-frost', 'PA', 'mid-atlantic', 41.0950, -75.6230, 600, 21, 7, 120, 69, 'beginner', 'https://www.jfbb.com', 'Affordable Pocono Mountains skiing with two connected resorts.'),
('Elk Mountain', 'elk-mountain', 'PA', 'mid-atlantic', 41.6870, -75.5830, 1000, 27, 7, 120, 65, 'intermediate', 'https://www.elkskier.com', 'Northeast Pennsylvania gem known for challenging terrain at budget prices.'),

-- ============================================
-- SOUTHEAST (3 resorts)
-- ============================================
('Snowshoe Mountain', 'snowshoe', 'WV', 'southeast', 38.4100, -79.9940, 1500, 60, 14, 244, 99, 'all-levels', 'https://www.snowshoemtn.com', 'West Virginia''s premier resort at 4,848 feet elevation with a slopeside village.'),
('Wintergreen Resort', 'wintergreen', 'VA', 'southeast', 37.9420, -78.8970, 1003, 26, 7, 115, 79, 'beginner', 'https://www.wintergreenresort.com', 'Virginia Blue Ridge resort with scenic skiing and a wide range of activities.'),
('Massanutten Resort', 'massanutten', 'VA', 'southeast', 38.4070, -78.7350, 1110, 14, 7, 70, 75, 'beginner', 'https://www.massresort.com', 'Shenandoah Valley resort with skiing, a waterpark, and golf. Great for families.');
