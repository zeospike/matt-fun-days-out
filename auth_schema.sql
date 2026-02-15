
-- Create a table for public profiles using the uuid from auth.users
create table public.profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text
--   website text, 
--   full_name text  -- intentionally omitted for privacy/PoC
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- ALLOW READ: Everyone can see profiles (needed for reviews later)
create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

-- ALLOW INSERT: Users can insert their own profile
create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

-- ALLOW UPDATE: Users can update own profile
create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  random_adjectives text[] := array[
    'Happy', 'Lucky', 'Sunny', 'Clever', 'Brave', 'Calm', 'Witty', 'Jolly', 'Fizzing', 'Super', 'Magic', 'Cosmic',
    'Bouncy', 'Speedy', 'Gentle', 'Kind', 'Mighty', 'Bright', 'Shiny', 'Daring', 'Eager', 'Fuzzy', 'Giggly', 'Hungry',
    'Lively', 'Merry', 'Noble', 'Plucky', 'Quick', 'Rapid', 'Silly', 'Tidy', 'Wild', 'Zesty'
  ];
  random_animals text[] := array[
    'Badger', 'Fox', 'Owl', 'Hedgehog', 'Bear', 'Cat', 'Dog', 'Lion', 'Tiger', 'Panda', 'Koala', 'Penguin',
    'Eagle', 'Hawk', 'Falcon', 'Wolf', 'Leopard', 'Cheetah', 'Otter', 'Seal', 'Dolphin', 'Whale', 'Shark', 'Octopus',
    'Rabbit', 'Hare', 'Squirrel', 'Mouse', 'Rat', 'Hamster', 'Gerbil', 'GuineaPig', 'Lemur', 'Meerkat'
  ];
  random_adj text;
  random_ani text;
  random_num int;
  suggested_username text;
begin
  -- Pick random parts
  random_adj := random_adjectives[ floor(random() * array_length(random_adjectives, 1) + 1)::int ];
  random_ani := random_animals[ floor(random() * array_length(random_animals, 1) + 1)::int ];
  random_num := floor(random() * 1000)::int;
  
  suggested_username := random_adj || '-' || random_ani || '-' || random_num;

  insert into public.profiles (id, username, avatar_url)
  values (new.id, suggested_username, new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

-- Trigger to call the function on signup
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
