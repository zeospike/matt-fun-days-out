
-- Create a table to store suggested edits
-- We use JSONB for 'proposed_data' so we can be flexible about what fields are being edited
create table if not exists public.attraction_edits (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  attraction_id uuid not null references public.attractions(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null, -- Nullable if we want to allow deleted users' edits to remain, or strict reference
  proposed_data jsonb not null, -- Stores the fields being changed e.g. {"description": "New desc", "has_parking": true}
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  admin_notes text
);

-- Enable RLS
alter table public.attraction_edits enable row level security;

-- Policies

-- 1. Authenticated users can insert their own edits
create policy "Users can submit edits"
  on public.attraction_edits for insert
  to authenticated
  with check (true);

-- 2. Users can view their own edits (to see status)
create policy "Users can view own edits"
  on public.attraction_edits for select
  to authenticated
  using (auth.uid() = user_id);

-- 3. Admins can view/update all edits
-- For the PoC, we will use a hardcoded email in the application logic to determine "admin-ness",
-- OR we can add a policy here if we have a way to identify admins in the DB.
-- For now, let's allow 'authenticated' to SELECT all if we want to build a client-side admin dashboard 
-- that filters visibility, BUT secure is better.
-- Let's create a policy that assumes a specific user ID or email is admin, 
-- OR just rely on the fact that we'll use the Service Role key for admin actions if we were building a proper backend.
-- HOWEVER, since we are building a Next.js app with Supabase Auth, we want Row Level Security.
-- Let's stick to: Users see their own. 
-- We will need a way for the "Admin" user to see everything.
-- For this PoC, let's allow read access to everyone for now (transparency?) OR 
-- better yet, let's add a policy for a specific email if possible, or just open it up for now to keep it simple 
-- and restrict writing (UPDATE) to only the admin.

-- SIMPLIFIED ADMIN POLICY FOR POC:
-- Allow anyone to VIEW edits (transparency - "See what's being suggested/pending")
create policy "Anyone can view edits"
  on public.attraction_edits for select
  to authenticated
  using (true);

-- Allow updates (Approve/Reject) ONLY if you are the assumed admin. 
-- Ideally we'd look up a `is_admin` flag in `public.profiles`.
-- Let's add that column to profiles to make this clean.

DO $$ 
BEGIN 
  -- Add is_admin column to profiles if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'is_admin') THEN
    ALTER TABLE public.profiles ADD COLUMN is_admin boolean default false;
  END IF;
END $$;

-- Policy for updating status (Admins/Editors only)
create policy "Admins/Editors can update status"
  on public.attraction_edits for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.active_role IN ('admin', 'editor')
    )
  );

