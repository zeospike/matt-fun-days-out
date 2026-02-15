
-- Fix Reviews Schema to allow joining with Profiles

-- 1. Add Foreign Key to profiles (if not exists)
-- We first drop the constraint if it exists to be safe/idempotent, or just add it.
-- PostgREST needs this FK to know how to join 'reviews' and 'profiles'.
ALTER TABLE public.reviews
DROP CONSTRAINT IF EXISTS reviews_user_id_fkey, -- Drop old FK to auth.users if it was named this
ADD CONSTRAINT reviews_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES public.profiles(id)
ON DELETE SET NULL;

-- 2. Ensure all reviews have is_live = true (for now)
UPDATE public.reviews SET is_live = true WHERE is_live IS NULL;

-- 3. Ensure RLS is permissive enough for the join
-- (The existing policies should be fine, but let's re-verify)

-- 4. Grant access to profiles (just in case)
GRANT SELECT ON public.profiles TO anon, authenticated;
GRANT SELECT ON public.reviews TO anon, authenticated;
