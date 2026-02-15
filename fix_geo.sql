
-- Backfill Coordinates for Seed Data

-- Theme Parks
UPDATE public.attractions SET latitude = 50.9492, longitude = -1.5494 WHERE name ILIKE '%Paultons Park%';
UPDATE public.attractions SET latitude = 52.9874, longitude = -1.8863 WHERE name ILIKE '%Alton Towers%';
UPDATE public.attractions SET latitude = 51.3478, longitude = -0.3168 WHERE name ILIKE '%Chessington%';
UPDATE public.attractions SET latitude = 51.4633, longitude = -0.6514 WHERE name ILIKE '%LEGOLAND%';
UPDATE public.attractions SET latitude = 52.6105, longitude = -1.7132 WHERE name ILIKE '%Drayton Manor%';

-- Farms
UPDATE public.attractions SET latitude = 50.4688, longitude = -3.7937 WHERE name ILIKE '%Pennywell Farm%';
UPDATE public.attractions SET latitude = 51.5833, longitude = -0.6726 WHERE name ILIKE '%Odds Farm%';
UPDATE public.attractions SET latitude = 51.2435, longitude = -0.0573 WHERE name ILIKE '%Godstone Farm%';
UPDATE public.attractions SET latitude = 51.2268, longitude = -1.4587 WHERE name ILIKE '%Finkley Down%';

-- Museums
UPDATE public.attractions SET latitude = 51.4967, longitude = -0.1764 WHERE name ILIKE '%Natural History Museum%';
UPDATE public.attractions SET latitude = 51.4978, longitude = -0.1745 WHERE name ILIKE '%Science Museum%';
UPDATE public.attractions SET latitude = 51.5290, longitude = -0.0556 WHERE name ILIKE '%Young V&A%';
UPDATE public.attractions SET latitude = 51.4411, longitude = -0.0610 WHERE name ILIKE '%Horniman%';
