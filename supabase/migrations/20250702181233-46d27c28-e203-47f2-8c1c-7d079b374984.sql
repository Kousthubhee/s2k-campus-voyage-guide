-- Add detailed information fields to schools table
ALTER TABLE public.schools 
ADD COLUMN emoji text,
ADD COLUMN long_description text,
ADD COLUMN detailed_programs jsonb DEFAULT '[]'::jsonb,
ADD COLUMN specializations jsonb DEFAULT '[]'::jsonb,
ADD COLUMN rankings jsonb DEFAULT '[]'::jsonb,
ADD COLUMN accreditations jsonb DEFAULT '[]'::jsonb,
ADD COLUMN recognition jsonb DEFAULT '[]'::jsonb;

-- Update existing schools with detailed information
UPDATE public.schools SET 
  emoji = '🎓',
  long_description = 'Paris Sciences et Lettres',
  detailed_programs = '[
    {"name": "Undergraduate Programs", "description": "Selective admissions", "type": "undergraduate"},
    {"name": "Graduate Programs", "description": "Research & professional degrees", "type": "graduate"}
  ]'::jsonb,
  rankings = '[
    {"title": "Top 50 Global", "description": "Excellence in research"}
  ]'::jsonb,
  website = 'https://www.psl.eu/'
WHERE name = 'Université PSL';

UPDATE public.schools SET 
  emoji = '🏢',
  long_description = 'Top Business School',
  detailed_programs = '[
    {"name": "Master in Management", "description": "Grande École Program", "type": "master"},
    {"name": "MBA Programs", "description": "Executive and Full-time MBA", "type": "mba"}
  ]'::jsonb,
  rankings = '[
    {"title": "#1 Business School Europe", "description": "Financial Times ranking"}
  ]'::jsonb,
  website = 'https://www.hec.edu/'
WHERE name = 'HEC Paris';

UPDATE public.schools SET 
  emoji = '🏛️',
  long_description = 'Leading Research University',
  detailed_programs = '[
    {"name": "Bachelor''s Programs", "description": "Science, Medicine, Literature", "type": "bachelor"},
    {"name": "Master''s & PhD", "description": "Research-focused programs", "type": "graduate"}
  ]'::jsonb,
  rankings = '[
    {"title": "Global Top 100", "description": "World-renowned research"}
  ]'::jsonb,
  website = 'https://www.sorbonne-universite.fr/'
WHERE name = 'Sorbonne Université';

UPDATE public.schools SET 
  emoji = '🏢',
  long_description = 'Multi-campus European Business School',
  detailed_programs = '[
    {"name": "Master in Management", "description": "Grande École Program", "type": "master"},
    {"name": "MBA Programs", "description": "Executive and Full-time MBA", "type": "mba"}
  ]'::jsonb,
  accreditations = '[
    {"title": "Triple Crown", "description": "AACSB, EQUIS, AMBA"}
  ]'::jsonb,
  website = 'https://escp.eu/'
WHERE name = 'ESCP Business School';

UPDATE public.schools SET 
  emoji = '🏢',
  long_description = 'Top French Business School',
  detailed_programs = '[
    {"name": "Master in Management", "description": "Grande École Program", "type": "master"},
    {"name": "MBA & MSc Programs", "description": "Various specializations", "type": "mba"}
  ]'::jsonb,
  rankings = '[
    {"title": "Top Business School", "description": "Highly ranked in Europe"}
  ]'::jsonb,
  website = 'https://www.essec.edu/'
WHERE name = 'ESSEC Business School';

UPDATE public.schools SET 
  emoji = '🔧',
  long_description = 'Engineering School',
  detailed_programs = '[
    {"name": "Engineering Programs", "description": "5-year integrated program", "type": "engineering"},
    {"name": "Master''s Programs", "description": "Specialized engineering degrees", "type": "master"}
  ]'::jsonb,
  recognition = '[
    {"title": "CTI Accredited", "description": "Commission des Titres d''Ingénieur"}
  ]'::jsonb,
  website = 'https://www.hei.fr/'
WHERE name = 'HEI Lille';

UPDATE public.schools SET 
  emoji = '🏢',
  long_description = 'Catholic Business School',
  detailed_programs = '[
    {"name": "Master in Management", "description": "5-year program", "type": "master"},
    {"name": "MSc Programs", "description": "International Business specializations", "type": "msc"}
  ]'::jsonb,
  accreditations = '[
    {"title": "Triple Crown", "description": "AACSB, EQUIS, AMBA"}
  ]'::jsonb,
  website = 'https://www.ieseg.fr/'
WHERE name = 'IÉSEG School of Management';

UPDATE public.schools SET 
  emoji = '🔧',
  long_description = 'Engineering Institute',
  detailed_programs = '[
    {"name": "Engineering Degrees", "description": "5-year program", "type": "engineering"},
    {"name": "Specializations", "description": "Mechanical, Civil, Electrical", "type": "specialization"}
  ]'::jsonb,
  recognition = '[
    {"title": "INSA Group", "description": "Prestigious engineering network"}
  ]'::jsonb,
  website = 'https://www.insa-strasbourg.fr/'
WHERE name = 'INSA Strasbourg';

UPDATE public.schools SET 
  emoji = '🏢',
  long_description = 'Management School',
  detailed_programs = '[
    {"name": "Master in Management", "description": "Grande École Program", "type": "master"},
    {"name": "MSc Programs", "description": "International Business", "type": "msc"}
  ]'::jsonb,
  accreditations = '[
    {"title": "AACSB & EQUIS", "description": "International accreditations"}
  ]'::jsonb,
  website = 'https://www.em-strasbourg.eu/'
WHERE name = 'EM Strasbourg Business School';

UPDATE public.schools SET 
  emoji = '📡',
  long_description = 'Tech-focused Grande École',
  detailed_programs = '[
    {"name": "Engineering Programs", "description": "Telecommunications & Digital", "type": "engineering"},
    {"name": "Master Programs", "description": "Specialized tech degrees", "type": "master"}
  ]'::jsonb,
  specializations = '[
    {"title": "Tech Focus", "description": "Leading in telecommunications"}
  ]'::jsonb,
  website = 'https://www.telecom-paris.fr/'
WHERE name = 'Télécom Paris';

UPDATE public.schools SET 
  emoji = '🔧',
  long_description = 'Public Engineering School',
  detailed_programs = '[
    {"name": "Engineering Programs", "description": "5-year integrated program", "type": "engineering"},
    {"name": "Research Programs", "description": "PhD and research opportunities", "type": "research"}
  ]'::jsonb,
  recognition = '[
    {"title": "Public Excellence", "description": "Part of prestigious INSA group"}
  ]'::jsonb,
  website = 'https://www.insa-toulouse.fr/'
WHERE name = 'INSA Toulouse';

UPDATE public.schools SET 
  emoji = '🏛️',
  long_description = 'Political Science & International Affairs',
  detailed_programs = '[
    {"name": "Bachelor''s Programs", "description": "College Universitaire", "type": "bachelor"},
    {"name": "Master''s Programs", "description": "Multiple schools and specializations", "type": "master"}
  ]'::jsonb,
  rankings = '[
    {"title": "Top 50 Global", "description": "Leading in political science"}
  ]'::jsonb,
  website = 'https://www.sciencespo.fr/'
WHERE name = 'Sciences Po Paris';

UPDATE public.schools SET 
  emoji = '🏛️',
  long_description = 'Comprehensive University',
  detailed_programs = '[
    {"name": "Bachelor''s Programs", "description": "Arts, Sciences, Medicine, Law", "type": "bachelor"},
    {"name": "Master''s & PhD", "description": "Research and professional programs", "type": "graduate"}
  ]'::jsonb,
  recognition = '[
    {"title": "Excellence Initiative", "description": "IDEX award winner"}
  ]'::jsonb,
  website = 'https://www.unistra.fr/'
WHERE name = 'Université de Strasbourg';

UPDATE public.schools SET 
  emoji = '🔬',
  long_description = 'Elite Engineering Grande École',
  detailed_programs = '[
    {"name": "Engineering Program", "description": "4-year engineering degree", "type": "engineering"},
    {"name": "Master Programs", "description": "Various specializations", "type": "master"}
  ]'::jsonb,
  rankings = '[
    {"title": "Elite Status", "description": "Top engineering school in France"}
  ]'::jsonb,
  website = 'https://www.polytechnique.edu/'
WHERE name = 'École Polytechnique';

UPDATE public.schools SET 
  emoji = '🔬',
  long_description = 'Science, Technology & Health University',
  detailed_programs = '[
    {"name": "Science Programs", "description": "Mathematics, Physics, Chemistry", "type": "science"},
    {"name": "Technology & Health", "description": "Engineering, Medicine, Pharmacy", "type": "technology"}
  ]'::jsonb,
  recognition = '[
    {"title": "Research Focus", "description": "Leading research university"}
  ]'::jsonb,
  website = 'https://www.univ-toulouse3.fr/'
WHERE name = 'Université Toulouse III – Paul Sabatier';

UPDATE public.schools SET 
  emoji = '🏛️',
  long_description = 'Political Science Institute',
  detailed_programs = '[
    {"name": "Political Science", "description": "Master''s in Political Science", "type": "master"},
    {"name": "European Studies", "description": "European Affairs & Governance", "type": "master"}
  ]'::jsonb,
  recognition = '[
    {"title": "European Focus", "description": "Strong connections to EU institutions"}
  ]'::jsonb,
  website = 'https://www.iep-strasbourg.fr/'
WHERE name = 'Sciences Po Strasbourg';

UPDATE public.schools SET 
  emoji = '🏛️',
  long_description = 'Institut d''Études Politiques de Bordeaux',
  detailed_programs = '[
    {"name": "Political Science", "description": "5-year integrated program", "type": "political_science"},
    {"name": "Master''s Programs", "description": "Public Policy, International Relations", "type": "master"}
  ]'::jsonb,
  recognition = '[
    {"title": "Grande École", "description": "Prestigious political science institute"}
  ]'::jsonb,
  website = 'https://www.sciencespobordeaux.fr/'
WHERE name = 'Sciences Po Bordeaux';

UPDATE public.schools SET 
  emoji = '🎓',
  long_description = 'Comprehensive Research University',
  detailed_programs = '[
    {"name": "Sciences & Technology", "description": "Computer Science, Mathematics, Physics", "type": "science"},
    {"name": "Life Sciences", "description": "Biology, Medicine, Health Sciences", "type": "life_sciences"},
    {"name": "Social Sciences", "description": "Law, Economics, Humanities", "type": "social_sciences"}
  ]'::jsonb,
  recognition = '[
    {"title": "Excellence Initiative", "description": "IdEx Bordeaux laureate"}
  ]'::jsonb,
  website = 'https://www.u-bordeaux.fr/'
WHERE name = 'Université de Bordeaux';