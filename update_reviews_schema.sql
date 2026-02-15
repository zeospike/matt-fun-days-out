
-- Drop the old table if it exists (or we can alter it, but for PoC easier to recreate if empty)
-- Since we might have data, let's ALTER.

-- 1. Update Reviews Table to reference auth.users/public.profiles
ALTER TABLE public.reviews 
DROP COLUMN IF EXISTS user_name, -- We will fetch this from profiles
DROP CONSTRAINT IF EXISTS reviews_user_id_fkey;

ALTER TABLE public.reviews
ADD CONSTRAINT reviews_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Add Unique Constraint to prevent spam (One review per attraction per user)
ALTER TABLE public.reviews
ADD CONSTRAINT unique_review_per_user_attraction UNIQUE (user_id, attraction_id);

-- 3. Update RLS Policies

-- Drop old policies to be safe
DROP POLICY IF EXISTS "Anyone can insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;

-- VIEW: Everyone can see reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews FOR SELECT
  USING ( true );

-- INSERT: Only authenticated users can insert (and user_id must match token)
CREATE POLICY "Authenticated users can insert reviews"
  ON public.reviews FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

-- UPDATE: Users can update their own reviews
CREATE POLICY "Users can update own reviews"
  ON public.reviews FOR UPDATE
  USING ( auth.uid() = user_id );

-- DELETE: Users can delete their own reviews
CREATE POLICY "Users can delete own reviews"
  ON public.reviews FOR DELETE
  USING ( auth.uid() = user_id );
