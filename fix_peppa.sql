
-- Fix Peppa Pig Image specifically (using case-insensitive match)
UPDATE public.attractions 
SET image_url = 'https://images.unsplash.com/photo-1513889961551-628c1e5e2e89?auto=format&fit=crop&w=1200&q=80' 
WHERE name ILIKE '%Paultons Park%';

-- Also ensure address is being picked up if we need to reload anything (no schema change needed).
