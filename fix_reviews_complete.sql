
-- 1. Create Reviews Table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  attraction_id uuid not null references public.attractions(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade, -- Link to auth user
  rating smallint check (rating between 1 and 5),
  comment text
);

-- 2. Add Unique Constraint to prevent spam (One review per attraction per user)
-- We use DO block to avoid error if constraint already exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_review_per_user_attraction') THEN
        ALTER TABLE public.reviews
        ADD CONSTRAINT unique_review_per_user_attraction UNIQUE (user_id, attraction_id);
    END IF;
END $$;

-- 3. Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 4. Set policies (Drop first to allow re-running)
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated users can insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can update own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can delete own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can insert reviews" ON public.reviews; -- cleanup old policy name

-- VIEW: Everyone can see reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews FOR SELECT
  USING ( true );

-- INSERT: Only authenticated users
CREATE POLICY "Authenticated users can insert reviews"
  ON public.reviews FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

-- UPDATE: Own reviews only
CREATE POLICY "Users can update own reviews"
  ON public.reviews FOR UPDATE
  USING ( auth.uid() = user_id );

-- DELETE: Own reviews only
CREATE POLICY "Users can delete own reviews"
  ON public.reviews FOR DELETE
  USING ( auth.uid() = user_id );
