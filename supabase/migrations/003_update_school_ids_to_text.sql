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
  },
  {
    "title": "Cycling",
    "description": "Heavy investment in bike lanes & Vélib''; cycling commutes now outpace car usage.",
    "tips": [
      "Use Vélib'' bike-sharing for safe and affordable cycling.",
      "Bike lanes are extensive—consider cycling for daily commutes."
    ]
  },
  {
    "title": "Sports",
    "description": "Free access to city-run football pitches, rugby fields & athletic tracks. University sports complexes (~60-100 activities) across city/suburbs.",
    "tips": [
      "University sports complexes offer a wide range of activities.",
      "City football, rugby and athletics pitches are free for students.",
      "Look for legacy sports parks from Paris 2024 for unique events."
    ]
  },
  {
    "title": "Student Life", 
    "description": "Great Erasmus/student community life, coliving options, cultural events—''bonjour/merci'' etiquette matters!",
    "tips": [
      "Student association bars in the Latin Quarter are popular and budget-friendly.",
      "Museums like the Louvre and musée d''Orsay offer free/reduced entry for students.",
      "Learning ''bonjour'' and ''merci'' goes a long way!",
      "Participate in city cultural events to meet other students."
    ]
  },
  {
    "title": "Nearby Landmarks",
    "description": "World-class museums (Louvre, musée d''Orsay), parks, and major events (Stade de France, aquatic centre, legacy of Paris 2024).",
    "tips": [
      "Always check for student discounts at major attractions and events."
    ]
  }
]'::jsonb, 'Metro, RER, buses cover the city efficiently.', 'Louvre, Eiffel Tower, Notre-Dame, Montmartre.', 'University gyms, running tracks along the Seine.', 'International community, cultural events, night life.'),

('Lyon', '🦁', 'France''s culinary capital and student city.', '[
  {
    "title": "Transport",
    "description": "Efficient TCL metro/trams/buses plus Velo''v bike-sharing.",
    "tips": [
      "Use the TCL app to plan multi-modal journeys.",
      "Velo''v is the best way to navigate the inner city and cost-effective for students."
    ]
  },
  {
    "title": "Green & Sporty",
    "description": "Over 200 sports offered; 200 km of trails, parks, riversides for outdoor activities.",
    "tips": [
      "Jog or cycle along the Rhône/Saône riverfronts for great views.",
      "Check out student discounts for gyms and sports centers via LyonCampus.com."
    ]
  },
  {
    "title": "Campus Life",
    "description": "Institutions like INSA & Centrale Lyon offer tailored student support, sports centres, cafeteria, wellness.",
    "tips": [
      "Join a student association for instant local friends and tips.",
      "Student wellness coordinators and subsidized cafeterias help new arrivals."
    ]
  },
  {
    "title": "Nearby/Excursions",
    "description": "Rhône/Saône riverfronts, regional Beaujolais vineyards, Alpine gateway.",
    "tips": [
      "Plan weekend trips to Beaujolais or take short train rides to the Alps for snow sports."
    ]
  }
]'::jsonb, 'Metro, bus, tramways and funicular.', 'Basilica of Notre-Dame de Fourvière, Parc de la Tête d''Or.', 'University sports centers, Rhône river paths.', 'Vibrant nightlife, student associations.'),

('Cergy', '🌳', 'Modern city in Paris'' green belt, lively student hub.', '[
  {
    "title": "Campus",
    "description": "Green campus of CY Tech, served by RER A and buses 25 min from Paris center.",
    "tips": [
      "RER A runs late into the evening—great for exploring Paris or late-night returns.",
      "Use buses for easy and cheap access to Port Cergy or leisure island."
    ]
  },
  {
    "title": "Student Life",
    "description": "University residences, libraries, cafeterias, and 47 student associations.",
    "tips": [
      "Join clubs at the university center—most offer free trial events.",
      "CYU''s cafeterias serve affordable, filling meals (RU Cergy)."
    ]
  },
  {
    "title": "Sports Facilities",
    "description": "273 public/open and campus sports facilities, including sailing, water-skiing, kayaking, ice-hockey at Aren''Ice arena (3,000‑seat).",
    "tips": [
      "Try watersports on the lake or join student sailing/kayak clubs for discounted lessons.",
      "Aren''Ice hosts student nights for ice skating and hockey games."
    ]
  },
  {
    "title": "Nearby Attractions",
    "description": "Leisure lake, parks, Port Cergy terraces, concerts, and cinemas.",
    "tips": [
      "Port Cergy is perfect for riverside walks and concerts in spring/summer.",
      "Check the local cinema for French-language deals and VO (original version) film nights."
    ]
  }
]'::jsonb, 'RER A, bus lines; direct train to Paris.', 'Axe Majeur, marina, leisure island.', 'Base de loisirs, rowing, swimming.', 'Student festivals, bars, affordable housing.'),

('Toulouse', '🛩️', 'The pink city—known for aerospace and warm climate.', '[
  {
    "title": "Transport",
    "description": "Tisséo network (metro, tram, buses) plus Pastel card (~€10/mo for under‑26).",
    "tips": [
      "Tisséo network covers metro, tram, buses. Get the Pastel card for affordable rides if you''re under 26."
    ]
  },
  {
    "title": "Cycling",
    "description": "VélôToulouse bike-sharing; good bike lanes, e.g., to INSA and campus.",
    "tips": [
      "VélôToulouse bike-sharing is great for students.",
      "Bike lanes expand every year—try cycling to campus."
    ]
  },
  {
    "title": "Student Life",
    "description": "Ranked France''s #1 student city; vibrant nightlife, 130k+ students, affordable housing & food halls (like Cartoucherie).",
    "tips": [
      "Check out Cartoucherie food halls for budget eats and meeting friends.",
      "Many student events around universities—join at least one club or activity."
    ]
  },
  {
    "title": "Sports & Heritage",
    "description": "City is rugby capital—Stade Toulousain, Toulouse FC (football), Stade Municipal; rich heritage along Canal du Midi, Romanesque basilica.",
    "tips": [
      "Catch a rugby or football match for authentic Toulouse spirit.",
      "Walk along Canal du Midi for heritage sites and relaxing views."
    ]
  }
]'::jsonb, 'Metro, tram, bus.', 'Capitole, Canal du Midi, Cité de l''Espace.', 'Stadium de Toulouse, parks along Garonne.', 'Cafés, rugby games, summer festivals.'),

('Rouen', '⛪', 'Medieval history on the Seine, lively student city.', '[
  {
    "title": "Old Town & Culture",
    "description": "Historic old town, Joan of Arc festival, museums (Beaux-Arts), CROUS student residencies.",
    "tips": [
      "Don''t miss the Joan of Arc festival each year.",
      "Beaux-Arts museum is a great student-friendly spot on weekends."
    ]
  },
  {
    "title": "Transport",
    "description": "Public transport via Réseau Astuce local network; bike rentals.",
    "tips": [
      "Get a student discount transit card for city buses and trams."
    ]
  },
  {
    "title": "Sports",
    "description": "University sports facilities: gymnasiums, fields, tennis courts.",
    "tips": [
      "Check out university gyms for affordable sports facilities."
    ]
  },
  {
    "title": "Nearby",
    "description": "Seine valley, Monet''s Giverny within easy train reach.",
    "tips": [
      "Take a day-trip to Monet''s Giverny!"
    ]
  }
]'::jsonb, 'Metro, bus, TEOR.', 'Rouen Cathedral, Gros-Horloge.', 'Kindarena, Seine river walks.', 'Student parties, riverside bars.'),

('Reims', '🍾', 'Champagne capital with rich history and student life.', '[
  {
    "title": "Transport",
    "description": "Public transport (bus & tram), bike/sharing (Vél''hop).",
    "tips": [
      "tram/bus offer easy access to all university campuses.",
      "Try Vél''hop for convenient bike-sharing!"
    ]
  },
  {
    "title": "Champagne Houses & Events",
    "description": "Champagne house tours with student discounts; annual national fairs and festivals.",
    "tips": [
      "Look for student discount tickets at local Champagne houses.",
      "Habits de Lumière festival in December is a must-see."
    ]
  },
  {
    "title": "Sports",
    "description": "University gyms, stadiums, aquatic centres.",
    "tips": [
      "Check out university gym passes for affordable fitness."
    ]
  },
  {
    "title": "Landmarks",
    "description": "Reims Cathedral, Palais du Tau; annual festivals.",
    "tips": [
      "Festivals and culture are all around the city centre."
    ]
  }
]'::jsonb, 'Tram, bus, TGV to Paris.', 'Reims Cathedral, Champagne cellars.', 'Stade Auguste Delaune, local gyms.', 'Festivals, cellar tours, city squares.'),

('Lille', '🌧️', 'Young, vibrant and friendly in France''s north.', '[
  {
    "title": "Transport",
    "description": "Good tram, metro, bus network; bike-sharing (V''Lille) and TER regional trains.",
    "tips": [
      "Try V''Lille for campus commutes.",
      "Use TER regional trains for day trips in northern France."
    ]
  },
  {
    "title": "Sports",
    "description": "Multi-venue halls, Stade Pierre-Mauroy, campus gyms.",
    "tips": [
      "Check out student discounts at Stade Pierre-Mauroy events."
    ]
  },
  {
    "title": "Culture",
    "description": "Vieux Lille cafes, museums (Palais des Beaux-Arts), student-friendly discounts.",
    "tips": [
      "Explore Vieux Lille''s cafes for a real local vibe.",
      "Visit Palais des Beaux-Arts with your student ID for reduced entry.",
      "Attend the grand Braderie festival for a unique city-wide market experience."
    ]
  }
]'::jsonb, 'Metro, tram, bus.', 'Grand Place, Vieux Lille.', 'Stade Pierre-Mauroy, parks.', 'Nightlife, international students, cheap eats.'),

('Strasbourg', '🗺️', 'European city with Franco-German heritage.', '[
  {
    "title": "Culture & Lifestyle",
    "description": "Strong Franco-German heritage, world-famous Christmas market.",
    "tips": [
      "Visit the European Parliament if you enjoy politics.",
      "Plan for city-crossing tram rides—Strasbourg is cyclist and pedestrian-friendly.",
      "Don''t miss the Strasbourg Christmas market."
    ]
  },
  {
    "title": "Events & Outdoors",
    "description": "Cross-border EU events, excellent river/canal activities.",
    "tips": [
      "Explore riverside walks and canal kayaking."
    ]
  }
]'::jsonb, 'Tram, bus, bikes.', 'Petite France, Cathedral, EU Parliament.', 'Stade de la Meinau, Rhenus.', 'Christmas market, cross-border events.'),

('Bordeaux', '🍇', 'Wine capital by the Atlantic, UNESCO World Heritage.', '[
  {
    "title": "Transport",
    "description": "Tram, bus, bike all provide easy access to university and city nightlife.",
    "tips": [
      "Use the TBM app to get real-time transit info.",
      "Bike paths lead along the river—great for leisure rides."
    ]
  },
  {
    "title": "Wine & Culture",
    "description": "City is famous for wine, festivals, and riverfront events.",
    "tips": [
      "Tour Cité du Vin (Wine Museum) with student pricing."
    ]
  },
  {
    "title": "Sports & Outdoor",
    "description": "Stadium and river activities available for students.",
    "tips": [
      "Catch a game or jog at Matmut Atlantique stadium."
    ]
  }
]'::jsonb, 'Tram, bus, bike.', 'Place de la Bourse, Cité du Vin.', 'Matmut Atlantique stadium.', 'River festivals, food markets.'),

('Nice', '🏖️', 'Sunny Riviera, Mediterranean beaches and culture.', '[
  {
    "title": "Transport & Outdoors",
    "description": "Nice tramway, bus, bike-sharing (Vélobleu); coastal and hill hikes nearby.",
    "tips": [
      "Use Vélobleu bikes for exploring beach and hill routes.",
      "Catch the tram for quick downtown access."
    ]
  },
  {
    "title": "Sports & Lifestyle",
    "description": "Mediterranean beaches for swimming, water sports; tennis, student gyms.",
    "tips": [
      "Join a campus gym right by the beach.",
      "Try paddleboard or kayak rentals in summer."
    ]
  },
  {
    "title": "Culture & Nearby",
    "description": "Promenade des Anglais, old town cafés, carnivals, Jazz Festival.",
    "tips": [
      "Visit the Nice Jazz Festival every July.",
      "Day-trip to Cannes, Monaco, or Mercantour mountains with fellow students."
    ]
  }
]'::jsonb, 'Tram, bus.', 'Promenade des Anglais, Vieux Nice.', 'Beach sports, Stade Allianz Riviera.', 'Seafood, nightlife, international vibe.'),

('Sophia Antipolis', '🌲', 'Innovative science and tech park near Nice.', '[
  {
    "title": "Tech & Transport",
    "description": "Europe''s largest tech park with high density of startups, R&D. Served by Lignes d''Azur buses, good road links, campus bike paths.",
    "tips": [
      "Join on-campus innovation clubs for networking.",
      "Bike or bus between different tech campuses."
    ]
  },
  {
    "title": "Sports & Lifestyle",
    "description": "Nature, hiking trails, Mediterranean micro-climate, fitness culture, local gyms.",
    "tips": [
      "Try local fitness classes or join a nature hiking group.",
      "Make the most of Sophia/Valbonne cultural events for students."
    ]
  }
]'::jsonb, 'Bus, car.', 'Tech business hubs, close to Antibes beaches.', 'Campus sports, cycling trails.', 'Research, green spaces, student cafés.'),

('Marseille', '⛵', 'Mediterranean port city with rich multicultural heritage.', '[
  {
    "title": "Transport",
    "description": "Metro, tram, bus network plus bike-sharing (Le vélo).",
    "tips": [
      "Get a student RTM pass for unlimited metro/tram/bus access.",
      "Use Le vélo bike-sharing for coastal rides."
    ]
  },
  {
    "title": "Culture & Food",
    "description": "Multicultural neighborhoods, North African cuisine, bouillabaisse, Vieux-Port markets.",
    "tips": [
      "Explore Le Panier district for authentic street art and cafés.",
      "Try authentic bouillabaisse at Vieux-Port restaurants."
    ]
  },
  {
    "title": "Sports & Beaches",
    "description": "Mediterranean beaches, sailing, diving, OM football matches.",
    "tips": [
      "Join beach volleyball or sailing clubs for water sports.",
      "Catch an OM match at Stade Vélodrome for the ultimate Marseille experience."
    ]
  },
  {
    "title": "Nature & Nearby",
    "description": "Calanques National Park, coastal hiking, weekend trips to Cassis.",
    "tips": [
      "Hike the Calanques for stunning Mediterranean views.",
      "Take weekend trips to Cassis or Aix-en-Provence."
    ]
  }
]'::jsonb, 'Metro, tram, bus, ferry.', 'Vieux-Port, Notre-Dame de la Garde, Calanques.', 'Stade Vélodrome, beach sports.', 'Multicultural, nightlife, Mediterranean lifestyle.'),

('Grenoble', '🏔️', 'Alpine city known for technology and winter sports.', '[
  {
    "title": "Transport & Geography",
    "description": "Excellent tram/bus network; surrounded by mountains for skiing/hiking.",
    "tips": [
      "Use student discounts for ski passes in nearby resorts.",
      "Tram lines connect all university campuses efficiently."
    ]
  },
  {
    "title": "Tech & Innovation",
    "description": "Strong tech industry, research centers, startup ecosystem.",
    "tips": [
      "Join tech meetups and innovation events around campus.",
      "Explore internship opportunities in local tech companies."
    ]
  },
  {
    "title": "Outdoor Activities",
    "description": "World-class skiing, hiking, climbing; outdoor sports culture.",
    "tips": [
      "Join university skiing/hiking clubs for group trips.",
      "Take advantage of student discounts at sports equipment shops."
    ]
  },
  {
    "title": "Student Life",
    "description": "Active student community, affordable housing, mountain lifestyle.",
    "tips": [
      "Participate in outdoor student associations.",
      "Explore the vibrant café culture in the city center."
    ]
  }
]'::jsonb, 'Tram, bus, cable car.', 'Bastille, Chartreuse mountains, tech parks.', 'Ski resorts, climbing walls, alpine sports.', 'Outdoor sports, tech community, mountain culture.');

-- Clear user_school_favorites first, then truncate schools
TRUNCATE TABLE public.user_school_favorites CASCADE;
TRUNCATE TABLE public.schools CASCADE;

-- Insert all schools data
INSERT INTO public.schools (id, name, city, description, subjects, programs, website) VALUES
('sorbonne', 'Sorbonne University', 'Paris', 'Humanities, sciences, and medicine', '{"Humanities", "Science", "Medicine"}', '{"Undergraduate", "Graduate"}', 'https://www.sorbonne-universite.fr/'),
('psl', 'PSL University', 'Paris', 'Includes ENS, Dauphine, Mines ParisTech', '{"Science", "Economics", "Engineering"}', '{"Graduate"}', 'https://psl.eu/'),
('polytechnique', 'École Polytechnique', 'Paris', 'Elite engineering grande école.', '{"Engineering", "Science", "Economics"}', '{"Graduate"}', 'https://www.polytechnique.edu/'),
('hec-paris', 'HEC Paris', 'Paris', 'Top global business school. Triple-accredited: EQUIS, AACSB, AMBA. Global Rankings: FT European Business School top 2–3; FT MiM #1 Europe; MSc Finance #1 worldwide.', '{"Grande École – MiM", "MBA", "Executive MBA", "Trium EMBA", "MSc (various)", "PhD"}', '{"Graduate"}', 'https://www.hec.edu/'),
('escp', 'ESCP Business School', 'Paris', 'Multi-campus, Paris is the flagship', '{"MIM", "MBA"}', '{"Graduate"}', 'https://escp.eu/'),
('sciencespo-paris', 'Sciences Po Paris', 'Paris', 'Political science, international affairs. Top 50 global, Top EU political science. Highly selective Bachelor''s & Master''s programs; Paris and international campuses.', '{"Bachelor''s (College Universitaire)", "Master''s (multiple schools)", "One-Year Master''s", "PhD"}', '{"Undergraduate", "Graduate"}', 'https://www.sciencespo.fr/'),
('neoma-paris', 'NEOMA Business School (Paris)', 'Paris', 'Executive & MSc programs', '{"MSc", "Executive"}', '{"Graduate"}', 'https://www.neoma-bs.com/en/'),
('telecom-paris', 'Télécom Paris', 'Paris', 'Tech-focused grande école', '{"Engineering", "Telecom"}', '{"Graduate"}', 'https://www.telecom-paris.fr/'),
('essec', 'ESSEC Business School', 'Cergy', 'Cergy campus in Paris region', '{"MIM", "MBA", "MSc"}', '{"Graduate"}', 'https://www.essec.edu/'),
('centrale-lyon', 'École Centrale de Lyon', 'Lyon', 'Engineering and applied sciences', '{"Engineering"}', '{"Graduate"}', 'https://www.ec-lyon.fr/'),
('insa-lyon', 'INSA Lyon', 'Lyon', 'Public engineering school', '{"Engineering"}', '{"Undergraduate", "Graduate"}', 'https://www.insa-lyon.fr/'),
('claude-bernard', 'Université Claude Bernard Lyon 1', 'Lyon', 'Sciences and medicine', '{"Medicine", "Science"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-lyon1.fr/'),
('em-lyon', 'EM Lyon Business School', 'Lyon', 'Prestigious business Grande École', '{"MBA", "MSc"}', '{"Graduate"}', 'https://www.em-lyon.fr/'),
('lumiere-lyon2', 'Université Lumière Lyon 2', 'Lyon', 'Social sciences and arts', '{"Arts", "Social Sciences"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-lumiere.fr/'),
('supaero', 'ISAE-SUPAERO', 'Toulouse', 'Top aerospace engineering school', '{"Aerospace Engineering"}', '{"Graduate"}', 'https://www.isae-supaero.fr/'),
('insa-toulouse', 'INSA Toulouse', 'Toulouse', 'Public engineering school', '{"Engineering"}', '{"Undergraduate", "Graduate"}', 'https://www.insa-toulouse.fr/'),
('paul-sabatier', 'Université Toulouse III – Paul Sabatier', 'Toulouse', 'Science, tech, health', '{"Science", "Technology", "Health"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-toulouse3.fr/'),
('tbs', 'TBS Education', 'Toulouse', 'Grande École business program', '{"Business"}', '{"Graduate"}', 'https://www.tbs-education.fr/'),
('capitole', 'Université Toulouse 1 Capitole', 'Toulouse', 'Law, economics, management', '{"Law", "Economics", "Management"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-toulouse1.fr/'),
('neoma-rouen', 'NEOMA Business School (Main campus)', 'Rouen', 'PGE, MSc, BBA programs', '{"PGE", "MSc", "BBA"}', '{"Graduate"}', 'https://www.neoma-bs.com/en/'),
('insa-rouen', 'INSA Rouen Normandie', 'Rouen', 'Engineering across multiple domains', '{"Engineering"}', '{"Undergraduate", "Graduate"}', 'https://www.insa-rouen.fr/'),
('rouen-univ', 'Université de Rouen Normandie', 'Rouen', 'Comprehensive university', '{"Various"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-rouen.fr/'),
('esigelec', 'ESIGELEC Rouen', 'Rouen', 'Electronics and digital tech', '{"Engineering"}', '{"Graduate"}', 'https://www.esigelec.fr/'),
('neoma-reims', 'NEOMA Business School (Reims)', 'Reims', 'Core business programs', '{"Business", "MBA", "MSc"}', '{"Graduate"}', 'https://www.neoma-bs.com/en/'),
('sciencespo-reims', 'Sciences Po Campus Reims', 'Reims', 'International program focus', '{"Politics", "Global Affairs"}', '{"Undergraduate"}', 'https://www.sciencespo.fr/'),
('reims-univ', 'Université de Reims Champagne-Ardenne', 'Reims', 'Regional public university', '{"Various"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-reims.fr/'),
('esiec', 'ESIEC Reims', 'Reims', 'Packaging and digital engineering', '{"Engineering"}', '{"Graduate"}', 'https://www.esiec.fr/'),
('lille-univ', 'Université de Lille', 'Lille', 'Large multidisciplinary public university', '{"Various"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-lille.fr/'),
('edhec-lille', 'EDHEC Business School', 'Lille', 'Top 5 French business school', '{"MBA", "MSc", "Finance"}', '{"Graduate"}', 'https://www.edhec.fr/'),
('centrale-lille', 'École Centrale de Lille', 'Lille', 'Elite engineering school', '{"Engineering"}', '{"Graduate"}', 'https://www.ec-lille.fr/'),
('ieseg', 'IESEG School of Management', 'Lille', 'AACSB-accredited Grande École', '{"Management", "MSc"}', '{"Graduate"}', 'https://www.ieseg.fr/'),
('hei', 'HEI – Hautes Études d''Ingénieur', 'Lille', 'Private engineering school', '{"Engineering"}', '{"Graduate"}', 'https://www.hei.fr/'),
('strasbourg-univ', 'Université de Strasbourg', 'Strasbourg', 'Prestigious university, strong in sciences and humanities', '{"Science", "Humanities"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-strasbourg.fr/'),
('insa-strasbourg', 'INSA Strasbourg', 'Strasbourg', 'Part of the INSA engineering network', '{"Engineering"}', '{"Undergraduate", "Graduate"}', 'https://www.insa-strasbourg.fr/'),
('em-strasbourg', 'EM Strasbourg Business School', 'Strasbourg', 'Business school within the university', '{"Business"}', '{"Graduate"}', 'https://www.em-strasbourg.fr/'),
('sciencespo-strasbourg', 'Sciences Po Strasbourg', 'Strasbourg', 'Regional campus of Sciences Po', '{"Politics"}', '{"Undergraduate"}', 'https://www.sciencespo.fr/'),
('bordeaux-univ', 'Université de Bordeaux', 'Bordeaux', 'Comprehensive research university', '{"Science", "Engineering"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-bordeaux.fr/'),
('kedge-bordeaux', 'KEDGE Business School', 'Bordeaux', 'Top-tier business school', '{"MBA", "MSc"}', '{"Graduate"}', 'https://www.kedge-business-school.fr/'),
('enseirb', 'ENSEIRB-MATMECA', 'Bordeaux', 'Engineering in IT, electronics, math', '{"Engineering"}', '{"Graduate"}', 'https://www.enseirb-matmeca.fr/'),
('sciencespo-bordeaux', 'Sciences Po Bordeaux', 'Bordeaux', 'Political science and international studies', '{"Politics"}', '{"Undergraduate"}', 'https://www.sciencespo.fr/'),
('inpbordeaux', 'INP Bordeaux', 'Bordeaux', 'Engineering network incl. ENSEIRB-MATMECA, ENSCBP', '{"Engineering"}', '{"Graduate"}', 'https://www.inp-bordeaux.fr/'),
('uca', 'Université Côte d''Azur', 'Nice', 'Alliance of local institutions under one label', '{"Various"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-cotedazur.fr/'),
('skema-nice', 'SKEMA Business School (Sophia)', 'Nice', 'Global business school with AI focus', '{"Business", "AI"}', '{"Graduate"}', 'https://www.skema.fr/'),
('polytech-nice', 'Polytech Nice Sophia', 'Nice', 'Engineering school within UCA', '{"Engineering"}', '{"Undergraduate", "Graduate"}', 'https://www.polytech-nice.fr/'),
('edhec-nice', 'EDHEC Business School (Nice)', 'Nice', 'Specializes in Finance MSc and Global MBA', '{"Finance", "MBA"}', '{"Graduate"}', 'https://www.edhec.fr/'),
('mines-sophia', 'Mines Paris – Sophia', 'Sophia Antipolis', 'AI and systems engineering research campus', '{"Engineering", "AI"}', '{"Graduate"}', 'https://www.mines-paris-sophia.fr/'),
('amu', 'Aix-Marseille Université', 'Marseille', 'One of France''s largest public universities', '{"Various"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-amu.fr/'),
('kedge-marseille', 'KEDGE Business School (Marseille)', 'Marseille', 'Major business school', '{"Business"}', '{"Graduate"}', 'https://www.kedge-business-school.fr/'),
('centrale-marseille', 'École Centrale de Marseille', 'Marseille', 'Part of the Centrale engineering group', '{"Engineering"}', '{"Graduate"}', 'https://www.ec-marseille.fr/'),
('polytech-marseille', 'Polytech Marseille', 'Marseille', 'Engineering programs under AMU', '{"Engineering"}', '{"Undergraduate", "Graduate"}', 'https://www.polytech-marseille.fr/'),
('grenoble-univ', 'Université Grenoble Alpes', 'Grenoble', 'Leading research university in sciences and humanities', '{"Science", "Humanities", "Engineering"}', '{"Undergraduate", "Graduate"}', 'https://www.univ-grenoble-alpes.fr/'),
('grenoble-inp', 'Grenoble INP', 'Grenoble', 'Engineering institute with multiple schools', '{"Engineering", "Technology"}', '{"Graduate"}', 'https://www.grenoble-inp.fr/'),
('gem', 'Grenoble Ecole de Management', 'Grenoble', 'Top business school with tech focus', '{"MBA", "MSc", "Business"}', '{"Graduate"}', 'https://www.grenoble-em.fr/'),
('ensimag', 'Ensimag', 'Grenoble', 'Engineering school specializing in IT and applied math', '{"Engineering", "IT"}', '{"Graduate"}', 'https://www.ensimag.fr/');

-- Update schools count in cities based on actual data
UPDATE public.cities 
SET schools_count = (
  SELECT COUNT(*) 
  FROM public.schools 
  WHERE schools.city = cities.name
);