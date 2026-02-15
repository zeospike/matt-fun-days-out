
-- Theme Parks
INSERT INTO public.attractions (name, description, cost_tier, indoor_outdoor, has_nappy_changing, has_restaurant, has_parking, is_parking_paid, category, allow_time, image_url, address, website_url)
VALUES
('Paultons Park Home of Peppa Pig World', 'Family theme park with over 70 rides and attractions, including the world-first Peppa Pig World.', 3, 'Outdoor', true, true, true, false, 'Theme Park', 'Full Day', 'https://paultonspark.co.uk/content/images/header-logo.png', 'Ower, Romsey SO51 6AL', 'https://paultonspark.co.uk/'),
('Alton Towers Resort', 'The largest theme park in the UK with world-class rollercoasters and CBeebies Land for little ones.', 4, 'Outdoor', true, true, true, true, 'Theme Park', 'Full Day', 'https://www.altontowers.com/media/2533/cbeebies-land-logo.png', 'Farley Ln, Alton, Stoke-on-Trent ST10 4DB', 'https://www.altontowers.com/'),
('Chessington World of Adventures', 'Theme park, zoo and SEA LIFE centre with over 40 rides and attractions.', 3, 'mixed', true, true, true, true, 'Theme Park', 'Full Day', 'https://www.chessington.com/media/1086/cwoa-logo-2019.png', 'Leatherhead Rd, Chessington KT9 2NE', 'https://www.chessington.com/'),
('LEGOLAND Windsor Resort', 'Theme park dedicated to children aged 2-12 years old. Play your part in a world of LEGO adventure.', 4, 'Outdoor', true, true, true, true, 'Theme Park', 'Full Day', 'https://www.legoland.co.uk/media/1085/legoland-windsor-logo.png', 'Winkfield Rd, Windsor SL4 4AY', 'https://www.legoland.co.uk/'),
('Drayton Manor Resort', 'Home of Thomas Land, a zoo, and rides for the whole family.', 3, 'Outdoor', true, true, true, true, 'Theme Park', 'Full Day', 'https://www.draytonmanor.co.uk/media/1085/drayton-manor-logo.png', 'Drayton Manor Dr, Fazeley, Mile Oak, Tamworth B78 3TW', 'https://www.draytonmanor.co.uk/');

-- Farm Parks
INSERT INTO public.attractions (name, description, cost_tier, indoor_outdoor, has_nappy_changing, has_restaurant, has_parking, is_parking_paid, category, allow_time, image_url, address, website_url)
VALUES
('Pennywell Farm', 'Friendly farm with miniature pigs to cuddle, tractor rides and hands-on activities.', 2, 'mixed', true, true, true, false, 'Farm', '3-4 hours', 'https://www.pennywellfarm.co.uk/wp-content/uploads/2016/11/Pennywell-Farm-Logo.png', 'Lower Dean, Buckfastleigh TQ11 0LT', 'https://www.pennywellfarm.co.uk/'),
('Odds Farm Park', 'Animal feeding, tractor rides and huge indoor playbarn.', 2, 'mixed', true, true, true, false, 'Farm', '3-4 hours', 'https://www.oddsfarm.co.uk/wp-content/uploads/2018/11/odds-farm-park-logo.png', 'Wooburn Common, Wooburn Green, High Wycombe HP10 0LX', 'https://www.oddsfarm.co.uk/'),
('Godstone Farm', 'Farm trail, animal encounters, huge adventure playground and dinosaur trail.', 2, 'Outdoor', true, true, true, false, 'Farm', '3-4 hours', 'https://godstonefarm.co.uk/wp-content/uploads/2021/04/godstone-farm-logo.png', 'Tilburstow Hill Rd, Godstone RH9 8LX', 'https://godstonefarm.co.uk/'),
('Finkley Down Farm', 'Hands-on farm experience with "Finkley Fat Controller" and massive indoor play.', 2, 'mixed', true, true, true, false, 'Farm', '3-4 hours', 'https://www.finkleydownfarm.co.uk/wp-content/uploads/2018/12/finkley-logo.png', 'North Way, Andover SP11 6NF', 'https://www.finkleydownfarm.co.uk/');

-- Museums
INSERT INTO public.attractions (name, description, cost_tier, indoor_outdoor, has_nappy_changing, has_restaurant, has_parking, is_parking_paid, category, allow_time, image_url, address, website_url, google_maps_url)
VALUES
('Natural History Museum', 'Home to life-sized dinosaurs, a blue whale skeleton and geological wonders.', 1, 'Indoor', true, true, false, false, 'Museum', '2-3 hours', 'https://www.nhm.ac.uk/content/dam/nhmwww/global/nhm-logo.png', 'Cromwell Rd, South Kensington, London SW7 5BD', 'https://www.nhm.ac.uk/', 'https://goo.gl/maps/1'),
('Science Museum', 'Interactive science exhibits, IMAX cinema and Wonderlab for kids.', 1, 'Indoor', true, true, false, false, 'Museum', '2-3 hours', 'https://www.sciencemuseum.org.uk/sites/default/files/2018-05/SM_Logo_Black.png', 'Exhibition Rd, South Kensington, London SW7 2DD', 'https://www.sciencemuseum.org.uk/', 'https://goo.gl/maps/2'),
('Young V&A', 'Museum of childhood with interactive zones for design, making and performance.', 1, 'Indoor', true, true, false, false, 'Museum', '2-3 hours', 'https://images.ctfassets.net/pjshm78m9jt4/4yJ0Z0Z0Z0Z0Z0Z0Z0Z0Z0/0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0/Young_VA_Logo.png', 'Cambridge Heath Rd, Bethnal Green, London E2 9PA', 'https://www.vam.ac.uk/young/', 'https://goo.gl/maps/3'),
('Horniman Museum and Gardens', 'Anthropology, natural history, musical instruments and an aquarium + gardens.', 1, 'mixed', true, true, false, true, 'Museum', '2-3 hours', 'https://www.horniman.ac.uk/wp-content/themes/horniman/assets/img/logo.svg', '100 London Rd, Forest Hill, London SE23 3PQ', 'https://www.horniman.ac.uk/', 'https://goo.gl/maps/4');
