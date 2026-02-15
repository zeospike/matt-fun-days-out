
-- Check policies on reviews
select * from pg_policies wheretablename = 'reviews';
-- Check policies on profiles
select * from pg_policies where tablename = 'profiles';

-- Try to select reviews manually to see data
select * from reviews limit 5;
