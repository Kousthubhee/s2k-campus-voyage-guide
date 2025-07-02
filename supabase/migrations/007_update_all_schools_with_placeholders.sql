-- Update all schools that don't have complete details with placeholders
UPDATE public.schools SET 
  emoji = COALESCE(emoji, '🎓'),
  long_description = COALESCE(long_description, 'Comprehensive educational institution offering quality programs'),
  detailed_programs = CASE 
    WHEN detailed_programs = '[]'::jsonb OR detailed_programs IS NULL THEN 
      '[
        {"name": "Undergraduate Programs", "description": "Bachelor''s degree programs", "type": "undergraduate"},
        {"name": "Graduate Programs", "description": "Master''s and PhD programs", "type": "graduate"}
      ]'::jsonb
    ELSE detailed_programs
  END,
  rankings = CASE 
    WHEN rankings = '[]'::jsonb OR rankings IS NULL THEN 
      '[{"title": "Regional Recognition", "description": "Well-regarded institution"}]'::jsonb
    ELSE rankings
  END,
  accreditations = CASE 
    WHEN accreditations = '[]'::jsonb OR accreditations IS NULL THEN 
      '[{"title": "National Accreditation", "description": "Accredited by French education authorities"}]'::jsonb
    ELSE accreditations
  END,
  recognition = CASE 
    WHEN recognition = '[]'::jsonb OR recognition IS NULL THEN 
      '[{"title": "Academic Excellence", "description": "Recognized for educational quality"}]'::jsonb
    ELSE recognition
  END,
  specializations = CASE 
    WHEN specializations = '[]'::jsonb OR specializations IS NULL THEN 
      '[{"title": "Diverse Programs", "description": "Multiple fields of study available"}]'::jsonb
    ELSE specializations
  END,
  website = COALESCE(website, 'https://www.example.edu')
WHERE emoji IS NULL 
   OR long_description IS NULL 
   OR detailed_programs = '[]'::jsonb 
   OR detailed_programs IS NULL
   OR rankings = '[]'::jsonb 
   OR rankings IS NULL
   OR accreditations = '[]'::jsonb 
   OR accreditations IS NULL
   OR recognition = '[]'::jsonb 
   OR recognition IS NULL
   OR specializations = '[]'::jsonb 
   OR specializations IS NULL
   OR website IS NULL;

-- Update specific schools with better details where we have placeholders
UPDATE public.schools SET 
  emoji = '🎓',
  long_description = 'Multidisciplinary University',
  detailed_programs = '[
    {"name": "Science Programs", "description": "Mathematics, Physics, Chemistry, Biology", "type": "science"},
    {"name": "Engineering Programs", "description": "Various engineering disciplines", "type": "engineering"},
    {"name": "Medicine & Health", "description": "Medical and health science programs", "type": "medicine"}
  ]'::jsonb,
  rankings = '[{"title": "Top French University", "description": "Highly ranked in multiple disciplines"}]'::jsonb,
  website = 'https://www.psl.eu/'
WHERE name = 'PSL University';

UPDATE public.schools SET 
  emoji = '🏛️',
  long_description = 'Leading Research University',
  detailed_programs = '[
    {"name": "Bachelor Programs", "description": "Science, Medicine, Literature", "type": "bachelor"},
    {"name": "Master & PhD", "description": "Research-focused programs", "type": "graduate"}
  ]'::jsonb,
  rankings = '[{"title": "Global Top 100", "description": "World-renowned research"}]'::jsonb,
  website = 'https://www.sorbonne-universite.fr/'
WHERE name = 'Sorbonne University';

UPDATE public.schools SET 
  emoji = '🏢',
  long_description = 'Catholic Business School',
  detailed_programs = '[
    {"name": "Master in Management", "description": "5-year program", "type": "master"},
    {"name": "MSc Programs", "description": "International Business specializations", "type": "msc"}
  ]'::jsonb,
  accreditations = '[{"title": "Triple Crown", "description": "AACSB, EQUIS, AMBA"}]'::jsonb,
  website = 'https://www.ieseg.fr/'
WHERE name = 'IÉSEG School of Management';

UPDATE public.schools SET 
  emoji = '🔧',
  long_description = 'Engineering Institute',
  detailed_programs = '[
    {"name": "Engineering Degrees", "description": "5-year program", "type": "engineering"},
    {"name": "Specializations", "description": "Mechanical, Civil, Electrical", "type": "specialization"}
  ]'::jsonb,
  recognition = '[{"title": "INSA Group", "description": "Prestigious engineering network"}]'::jsonb,
  website = 'https://www.insa-lyon.fr/'
WHERE name = 'INSA Lyon';

UPDATE public.schools SET 
  emoji = '🚀',
  long_description = 'Aerospace Engineering School',
  detailed_programs = '[
    {"name": "Aerospace Engineering", "description": "Specialized aerospace programs", "type": "engineering"},
    {"name": "Space Systems", "description": "Satellite and space technology", "type": "specialization"}
  ]'::jsonb,
  rankings = '[{"title": "Top Aerospace School", "description": "Leading in aerospace education"}]'::jsonb,
  website = 'https://www.isae-supaero.fr/'
WHERE name = 'ISAE-SUPAERO';

UPDATE public.schools SET 
  emoji = '🏢',
  long_description = 'International Business School',
  detailed_programs = '[
    {"name": "Master in Management", "description": "Grande École Program", "type": "master"},
    {"name": "International MBA", "description": "Global business focus", "type": "mba"}
  ]'::jsonb,
  accreditations = '[{"title": "AACSB & EQUIS", "description": "International accreditations"}]'::jsonb,
  website = 'https://www.kedge-business-school.fr/'
WHERE name = 'KEDGE Business School';

UPDATE public.schools SET 
  emoji = '🏢',
  long_description = 'European Business School',
  detailed_programs = '[
    {"name": "Master in Management", "description": "Grande École Program", "type": "master"},
    {"name": "MSc Programs", "description": "Specialized master programs", "type": "msc"}
  ]'::jsonb,
  accreditations = '[{"title": "AACSB & EQUIS", "description": "International accreditations"}]'::jsonb,
  website = 'https://www.neoma-bs.com/en/'
WHERE name = 'NEOMA Business School (Main campus)';

UPDATE public.schools SET 
  emoji = '🏢',
  long_description = 'International Business School',
  detailed_programs = '[
    {"name": "Master in Management", "description": "Grande École Program", "type": "master"},
    {"name": "International Programs", "description": "Global business education", "type": "international"}
  ]'::jsonb,
  rankings = '[{"title": "Top Business School", "description": "Highly ranked in Europe"}]'::jsonb,
  website = 'https://www.em-lyon.fr/'
WHERE name = 'EM Lyon Business School';

UPDATE public.schools SET 
  emoji = '🔧',
  long_description = 'Engineering Grande École',
  detailed_programs = '[
    {"name": "Engineering Programs", "description": "5-year integrated program", "type": "engineering"},
    {"name": "Specializations", "description": "Mechanical, Electrical, Civil", "type": "specialization"}
  ]'::jsonb,
  recognition = '[{"title": "Grande École", "description": "Prestigious engineering school"}]'::jsonb,
  website = 'https://www.ec-lyon.fr/'
WHERE name = 'École Centrale de Lyon';

UPDATE public.schools SET 
  emoji = '🎓',
  long_description = 'Comprehensive Research University',
  detailed_programs = '[
    {"name": "Sciences", "description": "Natural and formal sciences", "type": "science"},
    {"name": "Health Sciences", "description": "Medicine, pharmacy, dentistry", "type": "health"},
    {"name": "Social Sciences", "description": "Law, economics, humanities", "type": "social"}
  ]'::jsonb,
  recognition = '[{"title": "I-Site Excellence", "description": "Excellence initiative recipient"}]'::jsonb,
  website = 'https://www.univ-lille.fr/'
WHERE name = 'Université de Lille';

UPDATE public.schools SET 
  emoji = '🎓',
  long_description = 'Leading Research University',
  detailed_programs = '[
    {"name": "Sciences & Technology", "description": "Physics, chemistry, computer science", "type": "science"},
    {"name": "Health Sciences", "description": "Medicine, pharmacy, biology", "type": "health"},
    {"name": "Social Sciences", "description": "Law, economics, humanities", "type": "social"}
  ]'::jsonb,
  recognition = '[{"title": "Idex Excellence", "description": "Initiative of Excellence recipient"}]'::jsonb,
  website = 'https://www.univ-grenoble-alpes.fr/'
WHERE name = 'Université Grenoble Alpes';

UPDATE public.schools SET 
  emoji = '🎓',
  long_description = 'Major Research University',
  detailed_programs = '[
    {"name": "Sciences & Technology", "description": "Engineering, computer science, mathematics", "type": "science"},
    {"name": "Health Sciences", "description": "Medicine, pharmacy, health sciences", "type": "health"},
    {"name": "Arts & Humanities", "description": "Literature, languages, history", "type": "humanities"}
  ]'::jsonb,
  recognition = '[{"title": "A*MIDEX Excellence", "description": "Excellence initiative recipient"}]'::jsonb,
  website = 'https://www.univ-amu.fr/'
WHERE name = 'Aix-Marseille Université';