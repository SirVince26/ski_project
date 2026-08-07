-- ============================================
-- Phase 6: Duplicate Resort Cleanup Migration
-- ============================================
-- Problem: seed.sql used slugs like 'killington', seed-v3.sql used 'killington-vt'
-- Result: Same resort appears twice with different IDs
-- Solution: Migrate references from old IDs to new IDs, then delete old rows
--
-- IMPORTANT: Run this AFTER seed-v3.sql has been applied.
-- This script is idempotent — safe to run multiple times.
-- ============================================

-- Step 1: Migrate favorites from old resort records to new ones
-- For each duplicate pair, update favorites to point to the new (v3) resort ID
UPDATE public.favorites SET resort_id = new_resort.id
FROM public.resorts AS old_resort
JOIN public.resorts AS new_resort ON new_resort.slug = old_resort.slug || '-vt'
WHERE favorites.resort_id = old_resort.id
  AND old_resort.slug IN ('killington', 'stowe', 'sugarbush', 'smugglers-notch', 'jay-peak')
  AND new_resort.id != old_resort.id;

UPDATE public.favorites SET resort_id = new_resort.id
FROM public.resorts AS old_resort
JOIN public.resorts AS new_resort ON new_resort.slug = old_resort.slug || '-me'
WHERE favorites.resort_id = old_resort.id
  AND old_resort.slug IN ('sunday-river', 'sugarloaf')
  AND new_resort.id != old_resort.id;

UPDATE public.favorites SET resort_id = new_resort.id
FROM public.resorts AS old_resort
JOIN public.resorts AS new_resort ON new_resort.slug = 'loon-nh'
WHERE favorites.resort_id = old_resort.id
  AND old_resort.slug = 'loon-mountain'
  AND new_resort.id != old_resort.id;

UPDATE public.favorites SET resort_id = new_resort.id
FROM public.resorts AS old_resort
JOIN public.resorts AS new_resort ON new_resort.slug = 'bretton-woods-nh'
WHERE favorites.resort_id = old_resort.id
  AND old_resort.slug = 'bretton-woods'
  AND new_resort.id != old_resort.id;

-- Step 2: Migrate trips from old resort records to new ones
UPDATE public.trips SET resort_id = new_resort.id
FROM public.resorts AS old_resort
JOIN public.resorts AS new_resort ON new_resort.slug = old_resort.slug || '-vt'
WHERE trips.resort_id = old_resort.id
  AND old_resort.slug IN ('killington', 'stowe', 'sugarbush', 'smugglers-notch', 'jay-peak')
  AND new_resort.id != old_resort.id;

UPDATE public.trips SET resort_id = new_resort.id
FROM public.resorts AS old_resort
JOIN public.resorts AS new_resort ON new_resort.slug = old_resort.slug || '-me'
WHERE trips.resort_id = old_resort.id
  AND old_resort.slug IN ('sunday-river', 'sugarloaf')
  AND new_resort.id != old_resort.id;

UPDATE public.trips SET resort_id = new_resort.id
FROM public.resorts AS old_resort
JOIN public.resorts AS new_resort ON new_resort.slug = 'loon-nh'
WHERE trips.resort_id = old_resort.id
  AND old_resort.slug = 'loon-mountain'
  AND new_resort.id != old_resort.id;

UPDATE public.trips SET resort_id = new_resort.id
FROM public.resorts AS old_resort
JOIN public.resorts AS new_resort ON new_resort.slug = 'bretton-woods-nh'
WHERE trips.resort_id = old_resort.id
  AND old_resort.slug = 'bretton-woods'
  AND new_resort.id != old_resort.id;

-- Step 3: Delete the old duplicate resort records
-- These are the seed.sql entries that lack the state suffix
DELETE FROM public.resorts WHERE slug IN (
  'killington',
  'stowe',
  'sugarbush',
  'smugglers-notch',
  'jay-peak',
  'sunday-river',
  'sugarloaf',
  'loon-mountain',
  'bretton-woods'
);

-- Step 4: Verify — should return 0 rows if cleanup was successful
-- SELECT name, slug FROM public.resorts
-- WHERE slug IN ('killington', 'stowe', 'sugarbush', 'smugglers-notch', 'jay-peak',
--                'sunday-river', 'sugarloaf', 'loon-mountain', 'bretton-woods');
