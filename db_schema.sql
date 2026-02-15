-- Create Attractions Table
create table public.attractions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  description text,
  latitude float,
  longitude float,
  address text,
  website_url text,
  google_maps_url text,
  cost_tier smallint check (cost_tier between 1 and 4), -- 1: £, 2: ££, 3: £££, 4: ££££
  indoor_outdoor text check (indoor_outdoor in ('Indoor', 'Outdoor', 'Mixed')),
  has_nappy_changing boolean default false,
  has_restaurant boolean default false,
  has_parking boolean default false,
  is_parking_paid boolean default false,
  category text,
  age_range text[], -- Array of strings: ['<5', '5-8', '8-11', '11+']
  allow_time text, -- e.g. "2-3 hours"
  image_url text
);

-- Enable Row Level Security (RLS) on attractions
alter table public.attractions enable row level security;

-- Allow read access to everyone
create policy "Attractions are viewable by everyone"
  on public.attractions for select
  using ( true );

-- Allow insert access to everyone (for PoC purposes - typically would be authenticated users only)
create policy "Anyone can insert attractions"
  on public.attractions for insert
  with check ( true );

-- Create Reviews Table
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  attraction_id uuid not null references public.attractions(id) on delete cascade,
  user_id uuid, -- Nullable for anon reviews in PoC, or references auth.users(id)
  rating smallint check (rating between 1 and 5),
  comment text,
  user_name text -- Optional: capture name if not logged in
);

-- Enable RLS on reviews
alter table public.reviews enable row level security;

-- Allow read access to everyone
create policy "Reviews are viewable by everyone"
  on public.reviews for select
  using ( true );

-- Allow insert access to everyone
create policy "Anyone can insert reviews"
  on public.reviews for insert
  with check ( true );
