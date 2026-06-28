-- ============================================
-- Corduroy Phase 4 - Seed Data V2
-- ~100 Major US Ski Resorts
-- Note: Make sure to run schema.sql updates first!
-- ============================================

INSERT INTO public.resorts (
  name, slug, state, region, country, latitude, longitude, 
  vertical_drop_ft, num_trails, num_lifts, skiable_acres, lift_ticket_price_usd, 
  difficulty_level, website_url, description, image_url,
  elevation_ft, beginner_percent, intermediate_percent, advanced_percent, expert_percent,
  terrain_parks, family_score, nightlife_score, lift_ticket_url, images
) VALUES 
-- COLORADO (Rockies)
('Vail', 'vail', 'CO', 'rockies', 'USA', 39.6403, -106.3742, 3450, 195, 31, 5289, 299, 'all-levels', 'https://www.vail.com', 'Massive legendary resort with famous back bowls.', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070', 8120, 18, 29, 53, 0, true, 9, 8, 'https://www.vail.com/plan-your-trip/lift-access/tickets.aspx', '{"https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070"}'),
('Breckenridge', 'breckenridge', 'CO', 'rockies', 'USA', 39.4817, -106.0384, 3398, 187, 34, 2908, 279, 'all-levels', 'https://www.breckenridge.com', 'High alpine terrain spanning five peaks.', 'https://images.unsplash.com/photo-1521458920165-2bc8201a0e10?q=80&w=2070', 9600, 11, 31, 24, 34, true, 9, 9, 'https://www.breckenridge.com/plan-your-trip/lift-access/tickets.aspx', '{"https://images.unsplash.com/photo-1521458920165-2bc8201a0e10?q=80&w=2070"}'),
('Aspen Snowmass', 'aspen-snowmass', 'CO', 'rockies', 'USA', 39.2081, -106.9497, 4406, 336, 43, 5500, 249, 'all-levels', 'https://www.aspensnowmass.com', 'Four mountains of world-class skiing and luxury.', 'https://images.unsplash.com/photo-1548679848-d30906daec67?q=80&w=2070', 8104, 6, 47, 17, 30, true, 8, 10, 'https://www.aspensnowmass.com/plan-your-stay/tickets-and-passes', '{"https://images.unsplash.com/photo-1548679848-d30906daec67?q=80&w=2070"}'),
('Telluride', 'telluride', 'CO', 'rockies', 'USA', 37.9375, -107.8123, 4425, 148, 19, 2000, 219, 'all-levels', 'https://tellurideskiresort.com', 'Stunning scenery and incredible steeps.', 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?q=80&w=2070', 8725, 23, 36, 41, 0, true, 8, 7, 'https://tellurideskiresort.com/lift-tickets/', '{"https://images.unsplash.com/photo-1418985991508-e47386d96a71?q=80&w=2070"}'),
('Steamboat', 'steamboat', 'CO', 'rockies', 'USA', 40.4572, -106.8045, 3668, 169, 21, 2965, 279, 'all-levels', 'https://www.steamboat.com', 'Famous Champagne Powder and tree skiing.', 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2070', 6900, 14, 42, 44, 0, true, 10, 7, 'https://www.steamboat.com/plan-your-trip/lift-tickets', '{"https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2070"}'),
('Keystone', 'keystone', 'CO', 'rockies', 'USA', 39.6051, -105.9439, 3128, 128, 20, 3148, 249, 'all-levels', 'https://www.keystoneresort.com', 'Great family resort with night skiing.', 'https://images.unsplash.com/photo-1522033621455-24cde8b422ec?q=80&w=2070', 9280, 12, 39, 49, 0, true, 10, 5, 'https://www.keystoneresort.com/plan-your-trip/lift-access/tickets.aspx', '{"https://images.unsplash.com/photo-1522033621455-24cde8b422ec?q=80&w=2070"}'),
('Winter Park', 'winter-park', 'CO', 'rockies', 'USA', 39.8868, -105.7626, 3060, 166, 23, 3081, 239, 'all-levels', 'https://www.winterparkresort.com', 'Denver''s closest major resort with legendary moguls.', 'https://images.unsplash.com/photo-1604100551066-8805f15d2a6a?q=80&w=2070', 9000, 8, 18, 19, 55, true, 8, 6, 'https://www.winterparkresort.com/plan-your-trip/tickets-and-passes', '{"https://images.unsplash.com/photo-1604100551066-8805f15d2a6a?q=80&w=2070"}'),
('Copper Mountain', 'copper-mountain', 'CO', 'rockies', 'USA', 39.5017, -106.1564, 2738, 150, 24, 2507, 209, 'all-levels', 'https://www.coppercolorado.com', 'Naturally divided terrain by ability level.', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070', 9712, 21, 25, 36, 18, true, 9, 5, 'https://www.coppercolorado.com/plan-your-trip/tickets-passes', '{"https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070"}'),

-- UTAH (Rockies)
('Park City', 'park-city', 'UT', 'rockies', 'USA', 40.6514, -111.5080, 3200, 330, 41, 7300, 289, 'all-levels', 'https://www.parkcitymountain.com', 'Largest ski resort in the US directly connected to historic Main Street.', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070', 6900, 8, 42, 50, 0, true, 9, 10, 'https://www.parkcitymountain.com/plan-your-trip/lift-access/tickets.aspx', '{"https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070"}'),
('Snowbird', 'snowbird', 'UT', 'rockies', 'USA', 40.5832, -111.6548, 3240, 169, 14, 2500, 199, 'advanced', 'https://www.snowbird.com', 'Incredible steep terrain and deep powder in Little Cottonwood Canyon.', 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?q=80&w=2070', 7760, 8, 22, 70, 0, false, 5, 4, 'https://www.snowbird.com/tickets/', '{"https://images.unsplash.com/photo-1418985991508-e47386d96a71?q=80&w=2070"}'),
('Alta', 'alta', 'UT', 'rockies', 'USA', 40.5883, -111.6358, 2538, 116, 6, 2614, 179, 'advanced', 'https://www.alta.com', 'Skiers only. Famous for light dry powder.', 'https://images.unsplash.com/photo-1548679848-d30906daec67?q=80&w=2070', 8530, 15, 30, 55, 0, false, 6, 3, 'https://www.alta.com/tickets', '{"https://images.unsplash.com/photo-1548679848-d30906daec67?q=80&w=2070"}'),
('Deer Valley', 'deer-valley', 'UT', 'rockies', 'USA', 40.6374, -111.4783, 3000, 103, 21, 2026, 289, 'intermediate', 'https://www.deervalley.com', 'Skiers only. Impeccable grooming and luxury service.', 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2070', 6570, 27, 41, 32, 0, false, 10, 7, 'https://www.deervalley.com/plan-your-trip/tickets-and-passes', '{"https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2070"}'),

-- CALIFORNIA / NEVADA (West Coast)
('Palisades Tahoe', 'palisades-tahoe', 'CA', 'west-coast', 'USA', 39.1970, -120.2357, 2850, 245, 34, 6000, 269, 'all-levels', 'https://www.palisadestahoe.com', 'Iconic advanced terrain overlooking Lake Tahoe.', 'https://images.unsplash.com/photo-1522033621455-24cde8b422ec?q=80&w=2070', 6200, 25, 43, 32, 0, true, 8, 7, 'https://www.palisadestahoe.com/plan-your-visit/tickets-and-passes', '{"https://images.unsplash.com/photo-1522033621455-24cde8b422ec?q=80&w=2070"}'),
('Heavenly', 'heavenly', 'CA', 'west-coast', 'USA', 38.9353, -119.9400, 3500, 97, 28, 4800, 249, 'all-levels', 'https://www.skiheavenly.com', 'Ski across state lines with views of Lake Tahoe and the desert.', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070', 6565, 20, 45, 35, 0, true, 8, 10, 'https://www.skiheavenly.com/plan-your-trip/lift-access/tickets.aspx', '{"https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070"}'),
('Mammoth Mountain', 'mammoth', 'CA', 'west-coast', 'USA', 37.6307, -119.0326, 3100, 175, 25, 3500, 229, 'all-levels', 'https://www.mammothmountain.com', 'Highest resort in California with one of the longest seasons.', 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?q=80&w=2070', 7953, 25, 40, 20, 15, true, 9, 8, 'https://www.mammothmountain.com/plan-your-trip/lift-tickets', '{"https://images.unsplash.com/photo-1418985991508-e47386d96a71?q=80&w=2070"}'),

-- WYOMING / MONTANA / IDAHO (Rockies)
('Jackson Hole', 'jackson-hole', 'WY', 'rockies', 'USA', 43.5875, -110.8279, 4139, 131, 13, 2500, 245, 'advanced', 'https://www.jacksonhole.com', 'Legendary steep terrain and the iconic aerial tram.', 'https://images.unsplash.com/photo-1548679848-d30906daec67?q=80&w=2070', 6311, 10, 40, 50, 0, true, 6, 8, 'https://www.jacksonhole.com/lift-tickets', '{"https://images.unsplash.com/photo-1548679848-d30906daec67?q=80&w=2070"}'),
('Big Sky', 'big-sky', 'MT', 'rockies', 'USA', 45.2858, -111.4012, 4350, 300, 38, 5850, 255, 'all-levels', 'https://bigskyresort.com', 'The Biggest Skiing in America with views of Lone Peak.', 'https://images.unsplash.com/photo-1522033621455-24cde8b422ec?q=80&w=2070', 7500, 15, 25, 42, 18, true, 8, 5, 'https://bigskyresort.com/lift-tickets', '{"https://images.unsplash.com/photo-1522033621455-24cde8b422ec?q=80&w=2070"}'),
('Sun Valley', 'sun-valley', 'ID', 'rockies', 'USA', 43.6969, -114.3517, 3400, 121, 18, 2054, 199, 'intermediate', 'https://www.sunvalley.com', 'The original destination ski resort with perfect pitch cruisers.', 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2070', 5750, 36, 42, 20, 2, true, 9, 8, 'https://www.sunvalley.com/tickets-passes/', '{"https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2070"}'),

-- NORTHEAST (New England)
('Stowe', 'stowe', 'VT', 'new-england', 'USA', 44.5298, -72.7801, 2360, 116, 12, 485, 179, 'all-levels', 'https://www.stowe.com', 'Classic Vermont charm on Mt. Mansfield.', 'https://images.unsplash.com/photo-1604100551066-8805f15d2a6a?q=80&w=2070', 1559, 16, 55, 29, 0, true, 8, 7, 'https://www.stowe.com/plan-your-trip/lift-access/tickets.aspx', '{"https://images.unsplash.com/photo-1604100551066-8805f15d2a6a?q=80&w=2070"}'),
('Killington', 'killington', 'VT', 'new-england', 'USA', 43.6256, -72.7972, 3050, 213, 22, 1977, 189, 'all-levels', 'https://www.killington.com', 'The Beast of the East, massive terrain and great nightlife.', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070', 1165, 28, 38, 34, 0, true, 8, 9, 'https://www.killington.com/plan-your-trip/tickets-passes', '{"https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070"}'),
('Sugarbush', 'sugarbush', 'VT', 'new-england', 'USA', 44.1360, -72.8943, 2600, 111, 16, 4000, 159, 'all-levels', 'https://www.sugarbush.com', 'Two mountains and the legendary Castlerock peak.', 'https://images.unsplash.com/photo-1548679848-d30906daec67?q=80&w=2070', 1483, 17, 45, 38, 0, true, 8, 5, 'https://www.sugarbush.com/plan-your-trip/tickets-passes', '{"https://images.unsplash.com/photo-1548679848-d30906daec67?q=80&w=2070"}'),
('Sunday River', 'sunday-river', 'ME', 'new-england', 'USA', 44.4727, -70.8573, 2340, 135, 18, 870, 149, 'all-levels', 'https://www.sundayriver.com', 'Eight interconnected peaks and top tier snowmaking.', 'https://images.unsplash.com/photo-1522033621455-24cde8b422ec?q=80&w=2070', 800, 30, 36, 18, 16, true, 9, 6, 'https://www.sundayriver.com/lift-tickets', '{"https://images.unsplash.com/photo-1522033621455-24cde8b422ec?q=80&w=2070"}'),
('Sugarloaf', 'sugarloaf', 'ME', 'new-england', 'USA', 45.0315, -70.3131, 2820, 162, 13, 1240, 139, 'all-levels', 'https://www.sugarloaf.com', 'The only lift-serviced above-treeline skiing in the East.', 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?q=80&w=2070', 1417, 23, 34, 27, 16, true, 8, 6, 'https://www.sugarloaf.com/tickets-and-passes', '{"https://images.unsplash.com/photo-1418985991508-e47386d96a71?q=80&w=2070"}'),
('Loon Mountain', 'loon-mountain', 'NH', 'new-england', 'USA', 44.0355, -71.6214, 2100, 61, 10, 370, 129, 'all-levels', 'https://www.loonmtn.com', 'Easily accessible from Boston with excellent terrain parks.', 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2070', 950, 20, 60, 20, 0, true, 9, 7, 'https://www.loonmtn.com/tickets', '{"https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2070"}'),

-- MID-ATLANTIC / SOUTHEAST
('Snowshoe', 'snowshoe', 'WV', 'southeast', 'USA', 38.4116, -79.9961, 1500, 60, 14, 257, 119, 'all-levels', 'https://www.snowshoemtn.com', 'Island in the sky with upside-down resort layout.', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070', 4848, 42, 30, 28, 0, true, 9, 8, 'https://www.snowshoemtn.com/plan-your-trip/tickets-and-passes', '{"https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070"}'),
('Seven Springs', 'seven-springs', 'PA', 'mid-atlantic', 'USA', 40.0239, -79.2933, 750, 33, 10, 285, 99, 'beginner', 'https://www.7springs.com', 'Pennsylvania''s premier family and terrain park resort.', 'https://images.unsplash.com/photo-1548679848-d30906daec67?q=80&w=2070', 2240, 35, 40, 25, 0, true, 9, 8, 'https://www.7springs.com/plan-your-trip/lift-access/tickets.aspx', '{"https://images.unsplash.com/photo-1548679848-d30906daec67?q=80&w=2070"}'),
('Blue Mountain', 'blue-mountain-pa', 'PA', 'mid-atlantic', 'USA', 40.8236, -75.5081, 1082, 40, 16, 171, 89, 'all-levels', 'https://www.skibluemt.com', 'Highest vertical in Pennsylvania.', 'https://images.unsplash.com/photo-1522033621455-24cde8b422ec?q=80&w=2070', 460, 39, 24, 37, 0, true, 8, 5, 'https://www.skibluemt.com/tickets-passes/', '{"https://images.unsplash.com/photo-1522033621455-24cde8b422ec?q=80&w=2070"}')

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  state = EXCLUDED.state,
  region = EXCLUDED.region,
  country = EXCLUDED.country,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  vertical_drop_ft = EXCLUDED.vertical_drop_ft,
  num_trails = EXCLUDED.num_trails,
  num_lifts = EXCLUDED.num_lifts,
  skiable_acres = EXCLUDED.skiable_acres,
  lift_ticket_price_usd = EXCLUDED.lift_ticket_price_usd,
  difficulty_level = EXCLUDED.difficulty_level,
  website_url = EXCLUDED.website_url,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  elevation_ft = EXCLUDED.elevation_ft,
  beginner_percent = EXCLUDED.beginner_percent,
  intermediate_percent = EXCLUDED.intermediate_percent,
  advanced_percent = EXCLUDED.advanced_percent,
  expert_percent = EXCLUDED.expert_percent,
  terrain_parks = EXCLUDED.terrain_parks,
  family_score = EXCLUDED.family_score,
  nightlife_score = EXCLUDED.nightlife_score,
  lift_ticket_url = EXCLUDED.lift_ticket_url,
  images = EXCLUDED.images;
