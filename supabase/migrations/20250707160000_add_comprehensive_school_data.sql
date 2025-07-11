
-- Insert comprehensive data for schools in Rouen and NEOMA campuses

-- Update or insert NEOMA Business School - Rouen Campus
INSERT INTO school_profiles (
  name, 
  slug, 
  city, 
  overview,
  programs,
  subjects,
  degrees,
  language,
  fees,
  living_costs,
  admission_requirements,
  language_tests,
  entrance_exams,
  scholarships,
  housing,
  facilities,
  student_services,
  global_rankings,
  recognitions,
  indian_community,
  cultural_societies,
  indian_amenities,
  contact_links,
  detailed_programs,
  brochures
) VALUES (
  'NEOMA Business School - Rouen Campus', 
  'neoma-business-school-rouen',
  'Rouen',
  'NEOMA Business School is a leading French business school with campuses in Rouen, Reims, and Paris. The Rouen campus offers a diverse range of business programs with strong international focus and excellent industry connections.',
  ARRAY['Global BBA', 'Master in Management', 'MSc International Business', 'MSc Digital Marketing & Data Analytics', 'MSc Supply Chain Management', 'MBA', 'Executive MBA', 'PhD in Management'],
  ARRAY['Business Administration', 'International Business', 'Marketing', 'Finance', 'Supply Chain', 'Digital Marketing', 'Data Analytics', 'Management', 'Entrepreneurship'],
  ARRAY['Bachelor', 'Master', 'MBA', 'PhD'],
  'French and English',
  'Bachelor: €12,000-15,000/year, Master: €15,000-18,000/year, MBA: €45,000-55,000/year',
  '€800-1,200/month including accommodation, food, and personal expenses',
  'Bachelor: High school diploma + entrance exam, Master: Bachelor degree + GMAT/GRE, Strong academic record required',
  'TOEFL (90+) or IELTS (6.5+) for English programs, TCF/TEF for French programs',
  'TAGE MAGE for French programs, GMAT/GRE for international programs',
  'Merit-based scholarships available, Excellence scholarships for top performers, Need-based financial aid',
  'On-campus residences, partner student housing, private accommodation assistance',
  'Modern lecture halls, computer labs, library, student lounge, cafeteria, sports facilities, career center',
  'International student office, career services, academic advising, counseling services',
  'Ranked among top 30 business schools in Europe, Triple accredited (AACSB, EQUIS, AMBA)',
  'AACSB, EQUIS, AMBA accreditation - Triple Crown accreditation',
  'Active Indian Student Association with 150+ members, regular cultural events and festivals',
  'Indian Student Association, Bollywood Dance Club, Cricket Club, Cultural Exchange Society',
  'Indian restaurants nearby, Indian grocery stores, Diwali and Holi celebrations on campus',
  '{"website": "https://neoma-bs.fr", "linkedin": "https://linkedin.com/school/neoma-business-school", "instagram": "https://instagram.com/neomabs", "email": "admissions@neoma-bs.fr", "phone": "+33 2 32 82 57 00"}'::jsonb,
  '{"Global BBA": {"description": "4-year international business program with study abroad opportunities", "duration": "4 years", "specializations": ["International Business", "Digital Marketing", "Finance"]}, "Master in Management": {"description": "2-year program for business generalists", "duration": "2 years", "specializations": ["Strategy", "Marketing", "Finance", "Operations"]}}'::jsonb,
  '{"Global BBA": ["https://neoma-bs.fr/brochures/global-bba.pdf"], "Master in Management": ["https://neoma-bs.fr/brochures/mim.pdf"]}'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
  overview = EXCLUDED.overview,
  programs = EXCLUDED.programs,
  subjects = EXCLUDED.subjects,
  degrees = EXCLUDED.degrees,
  language = EXCLUDED.language,
  fees = EXCLUDED.fees,
  living_costs = EXCLUDED.living_costs,
  admission_requirements = EXCLUDED.admission_requirements,
  language_tests = EXCLUDED.language_tests,
  entrance_exams = EXCLUDED.entrance_exams,
  scholarships = EXCLUDED.scholarships,
  housing = EXCLUDED.housing,
  facilities = EXCLUDED.facilities,
  student_services = EXCLUDED.student_services,
  global_rankings = EXCLUDED.global_rankings,
  recognitions = EXCLUDED.recognitions,
  indian_community = EXCLUDED.indian_community,
  cultural_societies = EXCLUDED.cultural_societies,
  indian_amenities = EXCLUDED.indian_amenities,
  contact_links = EXCLUDED.contact_links,
  detailed_programs = EXCLUDED.detailed_programs,
  brochures = EXCLUDED.brochures,
  updated_at = now();

-- Insert NEOMA Business School - Paris Campus
INSERT INTO school_profiles (
  name, 
  slug, 
  city, 
  overview,
  programs,
  subjects,
  degrees,
  language,
  fees,
  living_costs,
  admission_requirements,
  language_tests,
  entrance_exams,
  scholarships,
  housing,
  facilities,
  student_services,
  global_rankings,
  recognitions,
  indian_community,
  cultural_societies,
  indian_amenities,
  contact_links,
  detailed_programs,
  brochures
) VALUES (
  'NEOMA Business School - Paris Campus', 
  'neoma-business-school-paris',
  'Paris',
  'NEOMA Business School Paris campus is located in the heart of the French capital, offering premium business education with unparalleled access to major corporations and international organizations.',
  ARRAY['Executive MBA', 'MSc Luxury & Fashion Management', 'MSc International Business', 'MSc Finance', 'Advanced Master Programs', 'Corporate Training'],
  ARRAY['Luxury Management', 'Fashion Management', 'International Business', 'Finance', 'Executive Leadership', 'Corporate Strategy'],
  ARRAY['Master', 'Advanced Master', 'Executive MBA'],
  'French and English',
  'Master: €18,000-25,000/year, Executive MBA: €55,000-65,000/year',
  '€1,200-1,800/month including accommodation, food, and personal expenses',
  'Master degree required, Professional experience preferred for executive programs',
  'TOEFL (95+) or IELTS (7.0+) for English programs, TCF/TEF for French programs',
  'GMAT/GRE for master programs, Professional experience evaluation for executive programs',
  'Corporate sponsorship programs, Alumni scholarships, Diversity scholarships',
  'Premium student residences, corporate housing partnerships, luxury accommodation options',
  'State-of-the-art facilities, executive learning spaces, networking lounges, premium library',
  'Executive career services, personal coaching, alumni network access, corporate partnerships',
  'Top 20 business schools in Europe, Ranked #1 in France for luxury management',
  'AACSB, EQUIS, AMBA accreditation, Member of CGE (Conférence des Grandes Écoles)',
  'Strong Indian executive network, regular networking events with Indian business leaders',
  'Indian Executives Association, Cultural Diversity Club, Professional Networking Society',
  'High-end Indian restaurants, luxury Indian fashion brands, premium Indian services',
  '{"website": "https://neoma-bs.fr/paris", "linkedin": "https://linkedin.com/school/neoma-business-school", "instagram": "https://instagram.com/neomabs", "email": "paris.admissions@neoma-bs.fr", "phone": "+33 1 55 91 78 00"}'::jsonb,
  '{"Executive MBA": {"description": "18-month program for senior executives", "duration": "18 months", "specializations": ["Corporate Strategy", "Digital Transformation", "Global Leadership"]}, "MSc Luxury & Fashion Management": {"description": "Specialized program in luxury industry management", "duration": "12-15 months", "specializations": ["Luxury Retail", "Fashion Marketing", "Brand Management"]}}'::jsonb,
  '{"Executive MBA": ["https://neoma-bs.fr/brochures/executive-mba.pdf"], "MSc Luxury & Fashion Management": ["https://neoma-bs.fr/brochures/luxury-management.pdf"]}'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
  overview = EXCLUDED.overview,
  programs = EXCLUDED.programs,
  subjects = EXCLUDED.subjects,
  degrees = EXCLUDED.degrees,
  language = EXCLUDED.language,
  fees = EXCLUDED.fees,
  living_costs = EXCLUDED.living_costs,
  admission_requirements = EXCLUDED.admission_requirements,
  language_tests = EXCLUDED.language_tests,
  entrance_exams = EXCLUDED.entrance_exams,
  scholarships = EXCLUDED.scholarships,
  housing = EXCLUDED.housing,
  facilities = EXCLUDED.facilities,
  student_services = EXCLUDED.student_services,
  global_rankings = EXCLUDED.global_rankings,
  recognitions = EXCLUDED.recognitions,
  indian_community = EXCLUDED.indian_community,
  cultural_societies = EXCLUDED.cultural_societies,
  indian_amenities = EXCLUDED.indian_amenities,
  contact_links = EXCLUDED.contact_links,
  detailed_programs = EXCLUDED.detailed_programs,
  brochures = EXCLUDED.brochures,
  updated_at = now();

-- Insert NEOMA Business School - Reims Campus
INSERT INTO school_profiles (
  name, 
  slug, 
  city, 
  overview,
  programs,
  subjects,
  degrees,
  language,
  fees,
  living_costs,
  admission_requirements,
  language_tests,
  entrance_exams,
  scholarships,
  housing,
  facilities,
  student_services,
  global_rankings,
  recognitions,
  indian_community,
  cultural_societies,
  indian_amenities,
  contact_links,
  detailed_programs,
  brochures
) VALUES (
  'NEOMA Business School - Reims Campus', 
  'neoma-business-school-reims',
  'Reims',
  'NEOMA Business School Reims campus, the historic main campus, offers a comprehensive business education in the heart of the Champagne region with strong traditions and modern facilities.',
  ARRAY['Programme Grande École', 'Global BBA', 'MSc International Business', 'MSc Marketing', 'MSc Finance', 'MSc Management', 'PhD in Management', 'Executive Education'],
  ARRAY['Management', 'International Business', 'Marketing', 'Finance', 'Strategy', 'Innovation', 'Entrepreneurship', 'Supply Chain'],
  ARRAY['Bachelor', 'Master', 'PhD', 'Executive'],
  'French and English',
  'Bachelor: €10,000-13,000/year, Master: €13,000-16,000/year, PhD: €8,000/year',
  '€700-1,000/month including accommodation, food, and personal expenses',
  'Competitive entrance examination, Strong academic performance, Personal interview',
  'TOEFL (85+) or IELTS (6.0+) for English programs, TCF/TEF for French programs',
  'Concours entrance exam for Grande École, TAGE MAGE, GMAT/GRE for international programs',
  'Excellence scholarships, International mobility grants, Need-based financial assistance',
  'Traditional student residences, modern apartments, homestay options with local families',
  'Historic campus buildings, modern classrooms, research centers, sports complex, student clubs',
  'International relations office, career guidance, academic tutoring, psychological support',
  'Top 25 European business schools, Historic reputation since 1928',
  'AACSB, EQUIS, AMBA accreditation, Member of Chapter (French business schools conference)',
  'Growing Indian student community, Indian festivals celebrated, strong alumni network in India',
  'Indo-French Cultural Association, International Students Club, Entrepreneurship Society',
  'Indian grocery store in city center, Indian restaurant, cultural exchange programs',
  '{"website": "https://neoma-bs.fr/reims", "linkedin": "https://linkedin.com/school/neoma-business-school", "instagram": "https://instagram.com/neomabs", "email": "reims.admissions@neoma-bs.fr", "phone": "+33 3 26 77 47 47"}'::jsonb,
  '{"Programme Grande École": {"description": "3-year Master level program, flagship program", "duration": "3 years", "specializations": ["Strategy & Consulting", "Finance", "Marketing", "International Business"]}, "Global BBA": {"description": "4-year international business program", "duration": "4 years", "specializations": ["International Management", "Digital Business", "Sustainable Business"]}}'::jsonb,
  '{"Programme Grande École": ["https://neoma-bs.fr/brochures/pge.pdf"], "Global BBA": ["https://neoma-bs.fr/brochures/global-bba-reims.pdf"]}'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
  overview = EXCLUDED.overview,
  programs = EXCLUDED.programs,
  subjects = EXCLUDED.subjects,
  degrees = EXCLUDED.degrees,
  language = EXCLUDED.language,
  fees = EXCLUDED.fees,
  living_costs = EXCLUDED.living_costs,
  admission_requirements = EXCLUDED.admission_requirements,
  language_tests = EXCLUDED.language_tests,
  entrance_exams = EXCLUDED.entrance_exams,
  scholarships = EXCLUDED.scholarships,
  housing = EXCLUDED.housing,
  facilities = EXCLUDED.facilities,
  student_services = EXCLUDED.student_services,
  global_rankings = EXCLUDED.global_rankings,
  recognitions = EXCLUDED.recognitions,
  indian_community = EXCLUDED.indian_community,
  cultural_societies = EXCLUDED.cultural_societies,
  indian_amenities = EXCLUDED.indian_amenities,
  contact_links = EXCLUDED.contact_links,
  detailed_programs = EXCLUDED.detailed_programs,
  brochures = EXCLUDED.brochures,
  updated_at = now();

-- Insert University of Rouen Normandy
INSERT INTO school_profiles (
  name, 
  slug, 
  city, 
  overview,
  programs,
  subjects,
  degrees,
  language,
  fees,
  living_costs,
  admission_requirements,
  language_tests,
  entrance_exams,
  scholarships,
  housing,
  facilities,
  student_services,
  global_rankings,
  recognitions,
  indian_community,
  cultural_societies,
  indian_amenities,
  contact_links,
  detailed_programs,
  brochures
) VALUES (
  'University of Rouen Normandy', 
  'university-of-rouen-normandy',
  'Rouen',
  'University of Rouen Normandy is a major public research university offering comprehensive programs across multiple disciplines with strong research focus and international collaborations.',
  ARRAY['Bachelor in Sciences', 'Bachelor in Arts', 'Master in Engineering', 'Master in Business', 'Master in Sciences', 'PhD Programs', 'Medicine', 'Pharmacy'],
  ARRAY['Sciences', 'Engineering', 'Medicine', 'Pharmacy', 'Arts', 'Humanities', 'Business', 'Law', 'Psychology', 'Computer Science'],
  ARRAY['Bachelor', 'Master', 'PhD', 'Professional Degrees'],
  'French (some English programs available)',
  'EU students: €170-601/year, Non-EU: €2,770-3,770/year (undergraduate), €3,770-4,175/year (graduate)',
  '€600-900/month including accommodation, food, and personal expenses',
  'High school diploma for bachelor, Bachelor degree for master, Proficiency in French required',
  'TCF/TEF for French programs, TOEFL/IELTS for English programs (when available)',
  'No specific entrance exam, but competitive admission based on academic record',
  'CROUS scholarships, Erasmus+ grants, Regional scholarships, Merit-based aid',
  'CROUS student residences, private student housing, shared apartments',
  'Multiple campuses, modern laboratories, extensive library system, sports facilities',
  'International student welcome desk, French language courses, career guidance',
  'Ranked among top 500 universities worldwide, Strong research reputation',
  'French Ministry of Higher Education accreditation, Member of Normandy University consortium',
  'Small but growing Indian student population, Indian PhD students in research programs',
  'International Students Association, Cultural Exchange Club, Research Student Society',
  'Limited Indian amenities, students travel to Paris for Indian services',
  '{"website": "https://www.univ-rouen.fr", "linkedin": "https://linkedin.com/school/université-de-rouen-normandie", "email": "international@univ-rouen.fr", "phone": "+33 2 35 14 60 00"}'::jsonb,
  '{"Master in Engineering": {"description": "2-year research-oriented engineering program", "duration": "2 years", "specializations": ["Mechanical Engineering", "Chemical Engineering", "Computer Science"]}, "Bachelor in Sciences": {"description": "3-year undergraduate science program", "duration": "3 years", "specializations": ["Physics", "Chemistry", "Biology", "Mathematics"]}}'::jsonb,
  '{"Master in Engineering": ["https://www.univ-rouen.fr/brochures/engineering-master.pdf"], "Bachelor in Sciences": ["https://www.univ-rouen.fr/brochures/bachelor-sciences.pdf"]}'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
  overview = EXCLUDED.overview,
  programs = EXCLUDED.programs,
  subjects = EXCLUDED.subjects,
  degrees = EXCLUDED.degrees,
  language = EXCLUDED.language,
  fees = EXCLUDED.fees,
  living_costs = EXCLUDED.living_costs,
  admission_requirements = EXCLUDED.admission_requirements,
  language_tests = EXCLUDED.language_tests,
  entrance_exams = EXCLUDED.entrance_exams,
  scholarships = EXCLUDED.scholarships,
  housing = EXCLUDED.housing,
  facilities = EXCLUDED.facilities,
  student_services = EXCLUDED.student_services,
  global_rankings = EXCLUDED.global_rankings,
  recognitions = EXCLUDED.recognitions,
  indian_community = EXCLUDED.indian_community,
  cultural_societies = EXCLUDED.cultural_societies,
  indian_amenities = EXCLUDED.indian_amenities,
  contact_links = EXCLUDED.contact_links,
  detailed_programs = EXCLUDED.detailed_programs,
  brochures = EXCLUDED.brochures,
  updated_at = now();

-- Insert INSA Rouen Normandy
INSERT INTO school_profiles (
  name, 
  slug, 
  city, 
  overview,
  programs,
  subjects,
  degrees,
  language,
  fees,
  living_costs,
  admission_requirements,
  language_tests,
  entrance_exams,
  scholarships,
  housing,
  facilities,
  student_services,
  global_rankings,
  recognitions,
  indian_community,
  cultural_societies,
  indian_amenities,
  contact_links,
  detailed_programs,
  brochures
) VALUES (
  'INSA Rouen Normandy', 
  'insa-rouen-normandy',
  'Rouen',
  'INSA Rouen Normandy is a prestigious engineering school, part of the INSA network, known for its innovative approach to engineering education and strong industry partnerships.',
  ARRAY['Engineering Program', 'International Engineering Program', 'Master in Engineering', 'PhD in Engineering', 'Continuing Education'],
  ARRAY['Mechanical Engineering', 'Civil Engineering', 'Computer Science', 'Information Systems', 'Mathematics', 'Energy Systems', 'Materials Science'],
  ARRAY['Engineering Degree', 'Master', 'PhD'],
  'French and English',
  'EU students: €601/year, Non-EU: €2,500/year (engineering program)',
  '€650-950/month including accommodation, food, and personal expenses',
  'Competitive entrance examination, Strong mathematics and science background required',
  'TOEFL (80+) or IELTS (6.0+) for international programs, TCF/TEF for French programs',
  'Concours entrance exam, International baccalaureate accepted',
  'Merit-based scholarships, International mobility grants, INSA foundation scholarships',
  'On-campus student residences, nearby private housing, international student housing',
  'Modern engineering laboratories, maker spaces, innovation centers, sports facilities',
  'International relations office, career services, academic support, student counseling',
  'Top 10 engineering schools in France, Member of prestigious INSA network',
  'CTI (Commission des Titres d\'Ingénieur) accreditation, EUR-ACE quality label',
  'Active Indian engineering student community, technical clubs and competitions',
  'Indian Student Association, Engineering Societies, Innovation Clubs, Sports Clubs',
  'Indian grocery options in Rouen, Indian restaurant, cultural celebration support',
  '{"website": "https://www.insa-rouen.fr", "linkedin": "https://linkedin.com/school/insa-rouen", "instagram": "https://instagram.com/insa_rouen", "email": "international@insa-rouen.fr", "phone": "+33 2 32 95 66 00"}'::jsonb,
  '{"Engineering Program": {"description": "5-year engineering program with specialization", "duration": "5 years", "specializations": ["Mechanical Engineering", "Civil Engineering", "Computer Science", "Energy Systems"]}, "International Engineering Program": {"description": "English-taught engineering program", "duration": "5 years", "specializations": ["Mechanical Engineering", "Computer Science"]}}'::jsonb,
  '{"Engineering Program": ["https://www.insa-rouen.fr/brochures/engineering-program.pdf"], "International Engineering Program": ["https://www.insa-rouen.fr/brochures/international-program.pdf"]}'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
  overview = EXCLUDED.overview,
  programs = EXCLUDED.programs,
  subjects = EXCLUDED.subjects,
  degrees = EXCLUDED.degrees,
  language = EXCLUDED.language,
  fees = EXCLUDED.fees,
  living_costs = EXCLUDED.living_costs,
  admission_requirements = EXCLUDED.admission_requirements,
  language_tests = EXCLUDED.language_tests,
  entrance_exams = EXCLUDED.entrance_exams,
  scholarships = EXCLUDED.scholarships,
  housing = EXCLUDED.housing,
  facilities = EXCLUDED.facilities,
  student_services = EXCLUDED.student_services,
  global_rankings = EXCLUDED.global_rankings,
  recognitions = EXCLUDED.recognitions,
  indian_community = EXCLUDED.indian_community,
  cultural_societies = EXCLUDED.cultural_societies,
  indian_amenities = EXCLUDED.indian_amenities,
  contact_links = EXCLUDED.contact_links,
  detailed_programs = EXCLUDED.detailed_programs,
  brochures = EXCLUDED.brochures,
  updated_at = now();
