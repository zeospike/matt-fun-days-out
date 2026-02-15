
-- Ensure Admin/Reviewer policies are set up correctly

-- 1. Create edits table if not exists (Idempotent)
create table if not exists public.attraction_edits (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  attraction_id uuid not null references public.attractions(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  proposed_data jsonb not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  admin_notes text
);

-- 2. Enable RLS
alter table public.attraction_edits enable row level security;

-- 3. Drop existing policies to avoid conflicts/recursion
drop policy if exists "Users can submit edits" on public.attraction_edits;
drop policy if exists "Users can view own edits" on public.attraction_edits;
drop policy if exists "Anyone can view edits" on public.attraction_edits;
drop policy if exists "Admins can update status" on public.attraction_edits;
drop policy if exists "Admins/Editors can update status" on public.attraction_edits;

-- 4. Recreate Policies
create policy "Users can submit edits" on public.attraction_edits for insert to authenticated with check (true);

create policy "Users can view own edits" on public.attraction_edits for select to authenticated using (auth.uid() = user_id);

-- Reviewers/Editors/Admins basically need to see all pending edits to approve them
-- Or specifically allow them to see everything.
create policy "Admins/Editors can see all edits" on public.attraction_edits for select to authenticated 
using (
  auth.uid() = user_id 
  OR 
  exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.active_role IN ('admin', 'editor', 'reviewer')
  )
);

create policy "Admins/Editors can update status" on public.attraction_edits for update to authenticated 
using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.active_role IN ('admin', 'editor', 'reviewer')
    )
);

-- 5. Ensure attractions/reviews updates are allowed for Admins
-- (We might need explicit UPDATE policies on attractions table for Admins to trigger approval)
create policy "Admins/Editors can update attractions" on public.attractions for update to authenticated
using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.active_role IN ('admin', 'editor')
    )
);
