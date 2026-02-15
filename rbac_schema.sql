
-- 1. Create Enum for User Roles
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE public.user_role AS ENUM ('visitor', 'reviewer', 'editor', 'admin');
    END IF;
END$$;

-- 2. Update Profiles Table
-- NOTE: 'current_role' is a reserved keyword in Postgres, so we use 'active_role' instead.
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS role_type user_role DEFAULT 'visitor',
ADD COLUMN IF NOT EXISTS active_role user_role DEFAULT 'visitor',
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- 3. Update Attractions Table
ALTER TABLE public.attractions
ADD COLUMN IF NOT EXISTS is_live boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS approved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS approved_at timestamp with time zone;

-- 4. Update Reviews Table
ALTER TABLE public.reviews
ADD COLUMN IF NOT EXISTS is_live boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS approved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS approved_at timestamp with time zone;

-- 5. Data Migration: Make existing content visible
UPDATE public.attractions SET is_live = true WHERE is_live IS FALSE;
UPDATE public.reviews SET is_live = true WHERE is_live IS FALSE;

-- 6. Helper Function to update active_role (for Role Switcher)
CREATE OR REPLACE FUNCTION public.update_active_role(new_role user_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the user is attempting to switch to a role equal to or lower than their max role_type
  -- Logic: We need an ordering. Enum ordering is determined by creation order: visitor < reviewer < editor < admin
  -- However, comparing enums directly works in Postgres based on definition order.
  
  IF (SELECT role_type FROM public.profiles WHERE id = auth.uid()) >= new_role THEN
    UPDATE public.profiles
    SET active_role = new_role
    WHERE id = auth.uid();
  ELSE
    RAISE EXCEPTION 'Insufficient permissions to switch to this role.';
  END IF;
END;
$$;

-- 7. RLS Updates
-- ATTRACTIONS READ POLICY
DROP POLICY IF EXISTS "Attractions are viewable by everyone" ON public.attractions;
DROP POLICY IF EXISTS "Public/Visitors see live active attractions" ON public.attractions;

CREATE POLICY "Public/Visitors see live active attractions"
ON public.attractions FOR SELECT
USING (
  (is_live = true AND is_active = true)
  OR
  -- Allow creators to see their own drafts
  (auth.uid() = created_by)
  OR
  -- Allow Reviewers/Editors/Admins to see everything (mapped via profiles)
  (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.active_role IN ('reviewer', 'editor', 'admin')
  ))
);

-- REVIEWS READ POLICY
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;
DROP POLICY IF EXISTS "Public/Visitors see live active reviews" ON public.reviews;

CREATE POLICY "Public/Visitors see live active reviews"
ON public.reviews FOR SELECT
USING (
  (is_live = true AND is_active = true)
  OR
  (auth.uid() = user_id)
  OR
  (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.active_role IN ('reviewer', 'editor', 'admin')
  ))
);
