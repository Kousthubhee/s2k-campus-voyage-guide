
-- Create comprehensive school_profiles table
CREATE TABLE public.school_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  overview TEXT,
  global_rankings TEXT,
  recognitions TEXT,
  programs TEXT[] DEFAULT '{}',
  subjects TEXT[] DEFAULT '{}',
  degrees TEXT[] DEFAULT '{}',
  language TEXT,
  admission_requirements TEXT,
  language_tests TEXT,
  entrance_exams TEXT,
  fees TEXT,
  scholarships TEXT,
  living_costs TEXT,
  housing TEXT,
  facilities TEXT,
  student_services TEXT,
  indian_community TEXT,
  cultural_societies TEXT,
  indian_amenities TEXT,
  contact_links JSONB DEFAULT '{}',
  detailed_programs JSONB DEFAULT '{}',
  brochures JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.school_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read school profiles (public data)
CREATE POLICY "Anyone can view school profiles" 
  ON public.school_profiles 
  FOR SELECT 
  USING (true);

-- Create index on slug for fast lookups
CREATE INDEX idx_school_profiles_slug ON public.school_profiles(slug);

-- Create index on city for filtering
CREATE INDEX idx_school_profiles_city ON public.school_profiles(city);

-- Insert sample data for testing
INSERT INTO public.school_profiles (
  slug, name, city, overview, global_rankings, recognitions,
  programs, subjects, degrees, language, admission_requirements,
  language_tests, entrance_exams, fees, scholarships, living_costs,
  housing, facilities, student_services, indian_community,
  cultural_societies, indian_amenities, contact_links, detailed_programs, brochures
) VALUES 
(
  'kedge-business-school',
  'KEDGE Business School',
  'Bordeaux',
  'KEDGE Business School is a leading French business school with campuses in Bordeaux, Marseille, Paris, Toulon, and internationally. Known for excellence in management education and research.',
  'Ranked among top 50 business schools in Europe by Financial Times. Triple crown accreditation (AACSB, EQUIS, AMBA).',
  'AACSB, EQUIS, AMBA accredited. Member of Conférence des Grandes Écoles.',
  ARRAY['MBA', 'Master in Management', 'MSc International Business', 'Bachelor in Business Administration'],
  ARRAY['Management', 'Finance', 'Marketing', 'International Business', 'Digital Transformation'],
  ARRAY['Bachelor''s', 'Master''s', 'MBA', 'Executive Education'],
  'English and French programs available',
  'Bachelor''s degree for Master programs, GMAT/GRE for MBA. Application deadlines vary by program.',
  'IELTS 6.5+ or TOEFL 90+ for English programs. DELF/DALF for French programs.',
  'GMAT (550+) or GRE required for MBA programs',
  'Master programs: €15,000-20,000/year. MBA: €35,000 total.',
  'Merit scholarships up to 50% tuition. Need-based aid available.',
  '€800-1,200/month including accommodation, food, transportation',
  'On-campus residences, shared apartments, homestay options available',
  'Modern campus with library, sports facilities, student lounges, career center',
  'Career services, international student support, visa assistance, health services',
  'Strong Indian student community (50+ students). Active Indian Student Association.',
  'Indian Student Association, Bollywood dance club, cultural events',
  'Indian restaurants nearby, Indian grocery stores, Diwali celebrations on campus',
  '{"website": "https://kedge.edu", "linkedin": "https://linkedin.com/school/kedge-bs", "instagram": "@kedgebs"}',
  '{"MBA": {"description": "Full-time MBA program focusing on international business", "duration": "12 months", "specializations": ["Finance", "Marketing", "Consulting"]}, "MSc International Business": {"description": "Master program for global business careers", "duration": "24 months", "specializations": ["Digital Business", "Luxury Management"]}}',
  '{"MBA": ["https://kedge.edu/mba-brochure.pdf"], "MSc International Business": ["https://kedge.edu/msc-ib-brochure.pdf"]}'
);
