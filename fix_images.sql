
-- Fix Attraction Images with reliable Unsplash URLs

-- Theme Parks
UPDATE public.attractions SET image_url = 'https://images.unsplash.com/photo-1513889961551-628c1e5e2e89?auto=format&fit=crop&w=1200' 
WHERE name = 'Paultons Park Home of Peppa Pig World';

UPDATE public.attractions SET image_url = 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200' 
WHERE name = 'Alton Towers Resort';

UPDATE public.attractions SET image_url = 'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=1200' 
WHERE name = 'Chessington World of Adventures';

UPDATE public.attractions SET image_url = 'https://images.unsplash.com/photo-1563201413-5a7c29be1900?auto=format&fit=crop&w=1200' 
WHERE name = 'LEGOLAND Windsor Resort';

UPDATE public.attractions SET image_url = 'https://images.unsplash.com/photo-1615822369062-7936d85942b0?auto=format&fit=crop&w=1200' 
WHERE name = 'Drayton Manor Resort';


-- Farms
UPDATE public.attractions SET image_url = 'https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?auto=format&fit=crop&w=1200' 
WHERE name = 'Pennywell Farm';

UPDATE public.attractions SET image_url = 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200' 
WHERE name = 'Odds Farm Park';

UPDATE public.attractions SET image_url = 'https://images.unsplash.com/photo-1549487922-a9b09ba47ba4?auto=format&fit=crop&w=1200' 
WHERE name = 'Godstone Farm';

UPDATE public.attractions SET image_url = 'https://images.unsplash.com/photo-1516467508483-a72120615603?auto=format&fit=crop&w=1200' 
WHERE name = 'Finkley Down Farm';


-- Museums
UPDATE public.attractions SET image_url = 'https://images.unsplash.com/photo-1518131393672-009772a43369?auto=format&fit=crop&w=1200' 
WHERE name = 'Natural History Museum';

UPDATE public.attractions SET image_url = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200' 
WHERE name = 'Science Museum';

UPDATE public.attractions SET image_url = 'https://images.unsplash.com/photo-1566415714421-396a99264c99?auto=format&fit=crop&w=1200' 
WHERE name = 'Young V&A';

UPDATE public.attractions SET image_url = 'https://images.unsplash.com/photo-1557767746-b924040f90e5?auto=format&fit=crop&w=1200' 
WHERE name = 'Horniman Museum and Gardens';
