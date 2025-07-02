-- First drop the foreign key constraint
ALTER TABLE public.user_school_favorites DROP CONSTRAINT user_school_favorites_school_id_fkey;

-- Change the data types
ALTER TABLE public.schools ALTER COLUMN id SET DATA TYPE TEXT;
ALTER TABLE public.user_school_favorites ALTER COLUMN school_id SET DATA TYPE TEXT;

-- Recreate the foreign key constraint with the correct types
ALTER TABLE public.user_school_favorites 
ADD CONSTRAINT user_school_favorites_school_id_fkey 
FOREIGN KEY (school_id) REFERENCES public.schools(id);

-- Create cities table
CREATE TABLE public.cities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  emoji TEXT,
  description TEXT,
  local_insights JSONB DEFAULT '[]',
  transport TEXT,
  famous_places TEXT,
  sports_facilities TEXT,
  student_life TEXT,
  schools_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policy for cities (public read access)
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cities"
ON public.cities
FOR SELECT
USING (true);

-- Populate cities table with city data
INSERT INTO public.cities (name, emoji, description, local_insights, transport, famous_places, sports_facilities, student_life) VALUES
('Paris', '🗼', 'The heart of France – rich history, fashion, and art.', '[
  {
    "title": "Transport",
    "description": "Robust metro, RER, buses with discounted Navigo Imagine R card for students under 26.",
    "tips": [
      "Get the Navigo Imagine R card for unlimited public transport if you are under 26.",
      "Metro lines 1 & 14 are automated and fastest during peak times.",
      "Vélib'' bike-sharing is now safer thanks to extra bike lanes.",
      "Cycling commutes now outpace car usage thanks to heavy investment in bike lanes and Vélib''."
    ]
  }
]'::jsonb, 'Metro, RER, buses cover the city efficiently.', 'Louvre, Eiffel Tower, Notre-Dame, Montmartre.', 'University gyms, running tracks along the Seine.', 'International community, cultural events, night life.'),

('Lyon', '🦁', 'France''s culinary capital and student city.', '[]'::jsonb, 'Metro, bus, tramways and funicular.', 'Basilica of Notre-Dame de Fourvière, Parc de la Tête d''Or.', 'University sports centers, Rhône river paths.', 'Vibrant nightlife, student associations.'),

('Cergy', '🌳', 'Modern city in Paris'' green belt, lively student hub.', '[]'::jsonb, 'RER A, bus lines; direct train to Paris.', 'Axe Majeur, marina, leisure island.', 'Base de loisirs, rowing, swimming.', 'Student festivals, bars, affordable housing.'),

('Toulouse', '🛩️', 'The pink city—known for aerospace and warm climate.', '[]'::jsonb, 'Metro, tram, bus.', 'Capitole, Canal du Midi, Cité de l''Espace.', 'Stadium de Toulouse, parks along Garonne.', 'Cafés, rugby games, summer festivals.'),

('Rouen', '⛪', 'Medieval history on the Seine, lively student city.', '[]'::jsonb, 'Metro, bus, TEOR.', 'Rouen Cathedral, Gros-Horloge.', 'Kindarena, Seine river walks.', 'Student parties, riverside bars.'),

('Reims', '🍾', 'Champagne capital with rich history and student life.', '[]'::jsonb, 'Tram, bus, TGV to Paris.', 'Reims Cathedral, Champagne cellars.', 'Stade Auguste Delaune, local gyms.', 'Festivals, cellar tours, city squares.'),

('Lille', '🌧️', 'Young, vibrant and friendly in France''s north.', '[]'::jsonb, 'Metro, tram, bus.', 'Grand Place, Vieux Lille.', 'Stade Pierre-Mauroy, parks.', 'Nightlife, international students, cheap eats.'),

('Strasbourg', '🗺️', 'European city with Franco-German heritage.', '[]'::jsonb, 'Tram, bus, bikes.', 'Petite France, Cathedral, EU Parliament.', 'Stade de la Meinau, Rhenus.', 'Christmas market, cross-border events.'),

('Bordeaux', '🍇', 'Wine capital by the Atlantic, UNESCO World Heritage.', '[]'::jsonb, 'Tram, bus, bike.', 'Place de la Bourse, Cité du Vin.', 'Matmut Atlantique stadium.', 'River festivals, food markets.'),

('Nice', '🏖️', 'Sunny Riviera, Mediterranean beaches and culture.', '[]'::jsonb, 'Tram, bus.', 'Promenade des Anglais, Vieux Nice.', 'Beach sports, Stade Allianz Riviera.', 'Seafood, nightlife, international vibe.'),

('Sophia Antipolis', '🌲', 'Innovative science and tech park near Nice.', '[]'::jsonb, 'Bus, car.', 'Tech business hubs, close to Antibes beaches.', 'Campus sports, cycling trails.', 'Research, green spaces, student cafés.'),

('Marseille', '⛵', 'Mediterranean port city with rich multicultural heritage.', '[]'::jsonb, 'Metro, tram, bus, ferry.', 'Vieux-Port, Notre-Dame de la Garde, Calanques.', 'Stade Vélodrome, beach sports.', 'Multicultural, nightlife, Mediterranean lifestyle.'),

('Grenoble', '🏔️', 'Alpine city known for technology and winter sports.', '[]'::jsonb, 'Tram, bus, cable car.', 'Bastille, Chartreuse mountains, tech parks.', 'Ski resorts, climbing walls, alpine sports.', 'Outdoor sports, tech community, mountain culture.');

-- Clear existing data and insert sample schools
TRUNCATE TABLE public.user_school_favorites CASCADE;
TRUNCATE TABLE public.schools CASCADE;

-- Insert sample schools data
INSERT INTO public.schools (id, name, city, description, subjects, programs, website) VALUES
('sorbonne', 'Sorbonne University', 'Paris', 'Humanities, sciences, and medicine', '{"Humanities", "Science", "Medicine"}', '{"Undergraduate", "Graduate"}', 'https://www.sorbonne-universite.fr/'),
('psl', 'PSL University', 'Paris', 'Includes ENS, Dauphine, Mines ParisTech', '{"Science", "Economics", "Engineering"}', '{"Graduate"}', 'https://psl.eu/'),
('polytechnique', 'École Polytechnique', 'Paris', 'Elite engineering grande école.', '{"Engineering", "Science", "Economics"}', '{"Graduate"}', 'https://www.polytechnique.edu/'),
('hec-paris', 'HEC Paris', 'Paris', 'Top global business school', '{"MBA", "MSc", "PhD"}', '{"Graduate"}', 'https://www.hec.edu/'),
('escp', 'ESCP Business School', 'Paris', 'Multi-campus, Paris is the flagship', '{"MIM", "MBA"}', '{"Graduate"}', 'https://escp.eu/'),
('centrale-lyon', 'École Centrale de Lyon', 'Lyon', 'Engineering and applied sciences', '{"Engineering"}', '{"Graduate"}', 'https://www.ec-lyon.fr/'),
('insa-lyon', 'INSA Lyon', 'Lyon', 'Public engineering school', '{"Engineering"}', '{"Undergraduate", "Graduate"}', 'https://www.insa-lyon.fr/'),
('em-lyon', 'EM Lyon Business School', 'Lyon', 'Prestigious business Grande École', '{"MBA", "MSc"}', '{"Graduate"}', 'https://www.em-lyon.fr/'),
('supaero', 'ISAE-SUPAERO', 'Toulouse', 'Top aerospace engineering school', '{"Aerospace Engineering"}', '{"Graduate"}', 'https://www.isae-supaero.fr/'),
('insa-toulouse', 'INSA Toulouse', 'Toulouse', 'Public engineering school', '{"Engineering"}', '{"Undergraduate", "Graduate"}', 'https://www.insa-toulouse.fr/'),
('paul-sabatier', 'Université Toulouse III – Paul Sabatier', 'Toulouse', 'Science, tech, health', '{"Science", "Technology", "Health"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-toulouse3.fr/'),
('neoma-rouen', 'NEOMA Business School (Main campus)', 'Rouen', 'PGE, MSc, BBA programs', '{"PGE", "MSc", "BBA"}', '{"Graduate"}', 'https://www.neoma-bs.com/en/'),
('lille-univ', 'Université de Lille', 'Lille', 'Large multidisciplinary public university', '{"Various"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-lille.fr/'),
('ieseg', 'IESEG School of Management', 'Lille', 'AACSB-accredited Grande École', '{"Management", "MSc"}', '{"Graduate"}', 'https://www.ieseg.fr/'),
('strasbourg-univ', 'Université de Strasbourg', 'Strasbourg', 'Prestigious university, strong in sciences and humanities', '{"Science", "Humanities"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-strasbourg.fr/'),
('bordeaux-univ', 'Université de Bordeaux', 'Bordeaux', 'Comprehensive research university', '{"Science", "Engineering"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-bordeaux.fr/'),
('kedge-bordeaux', 'KEDGE Business School', 'Bordeaux', 'Top-tier business school', '{"MBA", "MSc"}', '{"Graduate"}', 'https://www.kedge-business-school.fr/'),
('amu', 'Aix-Marseille Université', 'Marseille', 'One of France''s largest public universities', '{"Various"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-amu.fr/'),
('grenoble-univ', 'Université Grenoble Alpes', 'Grenoble', 'Leading research university in sciences and humanities', '{"Science", "Humanities", "Engineering"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-grenoble-alpes.fr/'),
('essec', 'ESSEC Business School', 'Cergy', 'Cergy campus in Paris region', '{"MIM", "MBA", "MSc"}', '{"Graduate"}', 'https://www.essec.edu/');

-- Update schools count in cities based on actual data
UPDATE public.cities 
SET schools_count = (
  SELECT COUNT(*) 
  FROM public.schools 
  WHERE schools.city = cities.name
);