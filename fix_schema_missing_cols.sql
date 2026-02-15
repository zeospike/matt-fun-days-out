
-- Add missing columns to attractions table
ALTER TABLE public.attractions 
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS latitude float,
ADD COLUMN IF NOT EXISTS longitude float;

-- Verify the table structure (optional, constructing a view or just SELECTing)
-- SELECT * FROM public.attractions LIMIT 1;
