
-- First, let's update all cities with proper local insights data
UPDATE public.cities SET local_insights = '[
  {
    "title": "Transport & Getting Around",
    "description": "Efficient public transport system with student discounts available.",
    "tips": [
      "Get a student transport card for significant discounts",
      "Use the city transport app for real-time schedules",
      "Bike-sharing systems are available and student-friendly"
    ]
  },
  {
    "title": "Student Life & Community",
    "description": "Vibrant student community with various clubs and activities.",
    "tips": [
      "Join student associations to meet new people",
      "Attend university events and festivals",
      "Explore local student hangout spots"
    ]
  },
  {
    "title": "Budget Tips",
    "description": "How to manage finances as a student in the city.",
    "tips": [
      "Look for student discounts at restaurants and shops",
      "Use student dining halls for affordable meals",
      "Take advantage of free cultural events and museums"
    ]
  },
  {
    "title": "Study Spots & Resources",
    "description": "Best places to study and academic resources available.",
    "tips": [
      "University libraries often have extended hours",
      "Many cafes offer student discounts and WiFi",
      "Study groups are common and helpful"
    ]
  }
]'::jsonb WHERE name = 'Lyon';

UPDATE public.cities SET local_insights = '[
  {
    "title": "Campus Life",
    "description": "Modern campus with excellent facilities and easy Paris access.",
    "tips": [
      "RER A runs frequently to central Paris",
      "Campus has all essential services within walking distance",
      "Student residences are well-integrated with campus life"
    ]
  },
  {
    "title": "Recreation & Sports",
    "description": "Excellent sports facilities and outdoor activities.",
    "tips": [
      "Try water sports at the nearby lake",
      "Campus gym offers various fitness classes",
      "Cycling paths connect to Paris and surrounding areas"
    ]
  },
  {
    "title": "Student Services",
    "description": "Comprehensive support services for international students.",
    "tips": [
      "International student office provides orientation",
      "Free French language courses available",
      "Career services help with internships and jobs"
    ]
  }
]'::jsonb WHERE name = 'Cergy';

UPDATE public.cities SET local_insights = '[
  {
    "title": "Aerospace Hub",
    "description": "Heart of Frances aerospace industry with excellent career opportunities.",
    "tips": [
      "Many aerospace companies offer internships",
      "Attend industry events and career fairs",
      "Network with professionals in the aerospace sector"
    ]
  },
  {
    "title": "Student Culture",
    "description": "Vibrant student life with southern French charm.",
    "tips": [
      "Join student rugby or football clubs",
      "Explore the historic city center on foot",
      "Take advantage of the mild climate year-round"
    ]
  },
  {
    "title": "Cost of Living",
    "description": "More affordable than Paris with excellent quality of life.",
    "tips": [
      "Housing is significantly cheaper than Paris",
      "Local markets offer fresh produce at low prices",
      "Student restaurants provide affordable meals"
    ]
  }
]'::jsonb WHERE name = 'Toulouse';

UPDATE public.cities SET local_insights = '[
  {
    "title": "Historic Charm",
    "description": "Beautiful medieval city with rich cultural heritage.",
    "tips": [
      "Explore the historic cathedral and old town",
      "Visit local museums with student discounts",
      "Enjoy riverside walks along the Seine"
    ]
  },
  {
    "title": "Student Community",
    "description": "Strong student presence with active university life.",
    "tips": [
      "Join student organizations for networking",
      "Attend cultural events and festivals",
      "Participate in traditional Norman celebrations"
    ]
  }
]'::jsonb WHERE name = 'Rouen';

UPDATE public.cities SET local_insights = '[
  {
    "title": "Champagne Culture",
    "description": "Experience the famous champagne region and its traditions.",
    "tips": [
      "Take student tours of champagne houses",
      "Attend wine tasting events with student discounts",
      "Learn about the champagne-making process"
    ]
  },
  {
    "title": "Academic Excellence",
    "description": "Strong academic environment with good support systems.",
    "tips": [
      "Library facilities are excellent for studying",
      "Professor-student relationships are close and supportive",
      "Research opportunities are available for motivated students"
    ]
  }
]'::jsonb WHERE name = 'Reims';

UPDATE public.cities SET local_insights = '[
  {
    "title": "Northern Hospitality",
    "description": "Friendly, welcoming atmosphere with strong community spirit.",
    "tips": [
      "Locals are very welcoming to international students",
      "French-Flemish culture offers unique experiences",
      "Cross-border opportunities with Belgium nearby"
    ]
  },
  {
    "title": "Cultural Scene",
    "description": "Rich cultural life with museums, theaters, and festivals.",
    "tips": [
      "Visit the Palais des Beaux-Arts with student discounts",
      "Attend the annual Braderie festival",
      "Explore the historic Vieux Lille district"
    ]
  }
]'::jsonb WHERE name = 'Lille';

UPDATE public.cities SET local_insights = '[
  {
    "title": "European Capital",
    "description": "Unique position as a European political center.",
    "tips": [
      "Visit the European Parliament and institutions",
      "Attend EU-related events and conferences",
      "Network with international professionals"
    ]
  },
  {
    "title": "Multicultural Environment",
    "description": "Diverse, international community with rich cultural exchange.",
    "tips": [
      "Participate in international student events",
      "Learn German alongside French for better opportunities",
      "Explore cross-border cultural activities"
    ]
  }
]'::jsonb WHERE name = 'Strasbourg';

UPDATE public.cities SET local_insights = '[
  {
    "title": "Wine Culture",
    "description": "World-famous wine region with educational opportunities.",
    "tips": [
      "Take wine appreciation courses",
      "Visit vineyards and learn about winemaking",
      "Attend wine festivals and tastings"
    ]
  },
  {
    "title": "UNESCO Heritage",
    "description": "Beautiful historic city center with architectural treasures.",
    "tips": [
      "Explore the UNESCO World Heritage old town",
      "Take architectural walking tours",
      "Visit the contemporary art museum"
    ]
  }
]'::jsonb WHERE name = 'Bordeaux';

UPDATE public.cities SET local_insights = '[
  {
    "title": "Mediterranean Lifestyle",
    "description": "Relaxed coastal living with year-round sunshine.",
    "tips": [
      "Enjoy beach activities and water sports",
      "Take advantage of the outdoor lifestyle",
      "Explore the French Riviera on weekends"
    ]
  },
  {
    "title": "International Hub",
    "description": "Diverse international community and business opportunities.",
    "tips": [
      "Network with international businesses",
      "Attend startup events and tech meetups",
      "Learn about Mediterranean trade and commerce"
    ]
  }
]'::jsonb WHERE name = 'Nice';

UPDATE public.cities SET local_insights = '[
  {
    "title": "Tech Innovation",
    "description": "Europes largest technology park with cutting-edge research.",
    "tips": [
      "Attend tech conferences and workshops",
      "Network with startup founders and researchers",
      "Apply for internships at tech companies"
    ]
  },
  {
    "title": "Nature & Balance",
    "description": "Perfect balance of technology and natural beauty.",
    "tips": [
      "Enjoy hiking in the nearby hills",
      "Take breaks at the many parks and gardens",
      "Cycle through the tech park on dedicated paths"
    ]
  }
]'::jsonb WHERE name = 'Sophia Antipolis';

UPDATE public.cities SET local_insights = '[
  {
    "title": "Multicultural Port City",
    "description": "Diverse, vibrant city with Mediterranean character.",
    "tips": [
      "Explore different cultural neighborhoods",
      "Try authentic North African and Mediterranean cuisine",
      "Participate in cultural festivals throughout the year"
    ]
  },
  {
    "title": "Coastal Adventures",
    "description": "Amazing natural beauty with outdoor opportunities.",
    "tips": [
      "Hike in the Calanques National Park",
      "Try sailing or diving in the Mediterranean",
      "Take weekend trips to nearby coastal towns"
    ]
  }
]'::jsonb WHERE name = 'Marseille';

UPDATE public.cities SET local_insights = '[
  {
    "title": "Alpine Adventure",
    "description": "Gateway to the Alps with world-class outdoor activities.",
    "tips": [
      "Take advantage of student ski pass discounts",
      "Join university mountaineering clubs",
      "Explore hiking trails in summer months"
    ]
  },
  {
    "title": "Innovation Ecosystem",
    "description": "Strong tech and research community with startup opportunities.",
    "tips": [
      "Attend innovation events at local incubators",
      "Network with researchers and entrepreneurs",
      "Explore internship opportunities in tech companies"
    ]
  }
]'::jsonb WHERE name = 'Grenoble';

-- Now let's update all schools with comprehensive information including contact details, tuition fees, and complete program information

-- Update ESSEC Business School
UPDATE public.schools SET 
  tuition_fees = '{"MBA": "45000", "Master in Management": "18000", "MSc Programs": "25000"}'::jsonb,
  contact_info = '{"email": "admissions@essec.edu", "phone": "+33 1 34 43 30 00", "address": "3 Avenue Bernard Hirsch, 95021 Cergy, France", "linkedin": "https://www.linkedin.com/school/essec-business-school/", "instagram": "https://www.instagram.com/essecbusinessschool/"}'::jsonb,
  detailed_programs = '[
    {"name": "Master in Management (Grande École)", "description": "3-year program with international focus", "duration": "3 years", "type": "master"},
    {"name": "Global MBA", "description": "Full-time MBA with Asia-Pacific focus", "duration": "1 year", "type": "mba"},
    {"name": "Executive MBA", "description": "Part-time MBA for working professionals", "duration": "18 months", "type": "executive"},
    {"name": "MSc in Management", "description": "International management specialization", "duration": "1-2 years", "type": "msc"},
    {"name": "MSc in Finance", "description": "Advanced finance program", "duration": "1 year", "type": "msc"}
  ]'::jsonb,
  rankings = '[
    {"title": "Global Top 3 MiM", "description": "Financial Times Master in Management ranking"},
    {"title": "Top 5 European Business School", "description": "Multiple international rankings"},
    {"title": "Triple Crown Accreditation", "description": "AACSB, EQUIS, AMBA accredited"}
  ]'::jsonb
WHERE name = 'ESSEC Business School';

-- Update HEC Paris
UPDATE public.schools SET 
  tuition_fees = '{"MBA": "89000", "Master in Management": "23000", "MSc Programs": "35000"}'::jsonb,
  contact_info = '{"email": "info@hec.fr", "phone": "+33 1 39 67 70 00", "address": "1 Rue de la Libération, 78351 Jouy-en-Josas, France", "linkedin": "https://www.linkedin.com/school/hec-paris/", "instagram": "https://www.instagram.com/hec_paris/"}'::jsonb,
  detailed_programs = '[
    {"name": "Master in Management (Grande École)", "description": "Flagship 3-year program", "duration": "3 years", "type": "master"},
    {"name": "MBA", "description": "Top-ranked global MBA program", "duration": "16 months", "type": "mba"},
    {"name": "Executive MBA", "description": "TRIUM Global Executive MBA", "duration": "18 months", "type": "executive"},
    {"name": "MSc International Finance", "description": "World #1 finance program", "duration": "1 year", "type": "msc"},
    {"name": "MSc Marketing", "description": "Advanced marketing program", "duration": "1 year", "type": "msc"}
  ]'::jsonb,
  rankings = '[
    {"title": "#1 European Business School", "description": "Financial Times ranking"},
    {"title": "#1 Master in Finance Worldwide", "description": "Financial Times ranking"},
    {"title": "Top 5 Global MBA", "description": "Multiple rankings"}
  ]'::jsonb
WHERE name = 'HEC Paris';

-- Update Sorbonne University
UPDATE public.schools SET 
  tuition_fees = '{"EU Students": "170-380", "Non-EU Students": "2770-3770", "PhD": "380"}'::jsonb,
  contact_info = '{"email": "international@sorbonne-universite.fr", "phone": "+33 1 44 27 44 27", "address": "21 Rue de lÉcole de Médecine, 75006 Paris, France", "linkedin": "https://www.linkedin.com/school/sorbonne-universite/", "instagram": "https://www.instagram.com/sorbonneuniversite/"}'::jsonb,
  detailed_programs = '[
    {"name": "Bachelor Programs", "description": "Literature, Science, Medicine, Engineering", "duration": "3 years", "type": "bachelor"},
    {"name": "Master Programs", "description": "Research and professional masters", "duration": "2 years", "type": "master"},
    {"name": "PhD Programs", "description": "Doctoral research programs", "duration": "3-4 years", "type": "phd"},
    {"name": "Medical School", "description": "Medicine and health sciences", "duration": "6 years", "type": "medical"},
    {"name": "Engineering Programs", "description": "Polytech Sorbonne engineering", "duration": "5 years", "type": "engineering"}
  ]'::jsonb,
  rankings = '[
    {"title": "Top 50 Global University", "description": "QS World University Rankings"},
    {"title": "Top 5 French University", "description": "National rankings"},
    {"title": "Excellence in Research", "description": "Multiple research excellence awards"}
  ]'::jsonb
WHERE name = 'Sorbonne University';

-- Update École Polytechnique
UPDATE public.schools SET 
  tuition_fees = '{"Engineering Program": "0", "Master Programs": "15000", "PhD": "0"}'::jsonb,
  contact_info = '{"email": "admission@polytechnique.edu", "phone": "+33 1 69 33 33 33", "address": "Route de Saclay, 91128 Palaiseau, France", "linkedin": "https://www.linkedin.com/school/ecole-polytechnique/", "instagram": "https://www.instagram.com/polytechnique_officiel/"}'::jsonb,
  detailed_programs = '[
    {"name": "Polytechnicien Program", "description": "4-year elite engineering program", "duration": "4 years", "type": "engineering"},
    {"name": "Master of Science & Technology", "description": "English-taught masters", "duration": "2 years", "type": "master"},
    {"name": "PhD Programs", "description": "Research doctoral programs", "duration": "3-4 years", "type": "phd"},
    {"name": "Executive Education", "description": "Professional development programs", "duration": "Various", "type": "executive"}
  ]'::jsonb,
  rankings = '[
    {"title": "#1 Engineering School France", "description": "Consistently top-ranked"},
    {"title": "Top 50 Global Engineering", "description": "QS World University Rankings"},
    {"title": "Elite Grande École", "description": "Most prestigious engineering school"}
  ]'::jsonb
WHERE name = 'École Polytechnique';

-- Update Sciences Po Paris
UPDATE public.schools SET 
  tuition_fees = '{"EU Students": "4570", "Non-EU Students": "14210", "Master Programs": "15300"}'::jsonb,
  contact_info = '{"email": "admissions@sciencespo.fr", "phone": "+33 1 45 49 50 50", "address": "27 Rue Saint-Guillaume, 75007 Paris, France", "linkedin": "https://www.linkedin.com/school/sciences-po/", "instagram": "https://www.instagram.com/sciencespo/"}'::jsonb,
  detailed_programs = '[
    {"name": "College Universitaire", "description": "3-year undergraduate program", "duration": "3 years", "type": "bachelor"},
    {"name": "School of Public Affairs", "description": "Public policy and governance", "duration": "2 years", "type": "master"},
    {"name": "School of International Affairs", "description": "International relations", "duration": "2 years", "type": "master"},
    {"name": "School of Management & Innovation", "description": "Business and innovation", "duration": "2 years", "type": "master"},
    {"name": "School of Journalism", "description": "Journalism and media", "duration": "2 years", "type": "master"}
  ]'::jsonb,
  rankings = '[
    {"title": "Top 50 Global Social Sciences", "description": "QS World University Rankings"},
    {"title": "#3 Political Science Worldwide", "description": "QS Rankings by Subject"},
    {"title": "Elite Grande École", "description": "Most prestigious political science school"}
  ]'::jsonb
WHERE name = 'Sciences Po Paris';

-- Update more schools with similar comprehensive information
UPDATE public.schools SET 
  tuition_fees = '{"Engineering Program": "2770", "EU Students": "170", "Non-EU Students": "2770"}'::jsonb,
  contact_info = '{"email": "international@insa-lyon.fr", "phone": "+33 4 72 43 83 83", "address": "20 Avenue Albert Einstein, 69621 Villeurbanne, France", "linkedin": "https://www.linkedin.com/school/insa-lyon/", "instagram": "https://www.instagram.com/insa_lyon/"}'::jsonb,
  detailed_programs = '[
    {"name": "Engineering Programs", "description": "5-year integrated engineering program", "duration": "5 years", "type": "engineering"},
    {"name": "International Program", "description": "English-taught engineering track", "duration": "5 years", "type": "international"},
    {"name": "Master Programs", "description": "Specialized engineering masters", "duration": "2 years", "type": "master"},
    {"name": "PhD Programs", "description": "Research doctoral programs", "duration": "3-4 years", "type": "phd"}
  ]'::jsonb,
  rankings = '[
    {"title": "Top 10 Engineering Schools France", "description": "National engineering rankings"},
    {"title": "INSA Group Excellence", "description": "Part of prestigious INSA network"},
    {"title": "CTI Accreditation", "description": "Accredited by French engineering commission"}
  ]'::jsonb
WHERE name = 'INSA Lyon';

-- Update University of Lille
UPDATE public.schools SET 
  tuition_fees = '{"EU Students": "170-243", "Non-EU Students": "2770-3770", "PhD": "380"}'::jsonb,
  contact_info = '{"email": "international@univ-lille.fr", "phone": "+33 3 20 43 43 43", "address": "42 Rue Paul Duez, 59000 Lille, France", "linkedin": "https://www.linkedin.com/school/universite-de-lille/", "instagram": "https://www.instagram.com/univlille/"}'::jsonb,
  detailed_programs = '[
    {"name": "Bachelor Programs", "description": "Arts, Sciences, Law, Medicine, Economics", "duration": "3 years", "type": "bachelor"},
    {"name": "Master Programs", "description": "Research and professional masters", "duration": "2 years", "type": "master"},
    {"name": "Medical School", "description": "Medicine, dentistry, pharmacy", "duration": "6-9 years", "type": "medical"},
    {"name": "Engineering School", "description": "Polytech Lille engineering programs", "duration": "5 years", "type": "engineering"},
    {"name": "PhD Programs", "description": "Doctoral research programs", "duration": "3-4 years", "type": "phd"}
  ]'::jsonb,
  rankings = '[
    {"title": "Top 15 French Universities", "description": "Shanghai Academic Ranking"},
    {"title": "I-Site Excellence", "description": "French excellence initiative winner"},
    {"title": "Research Excellence", "description": "Strong research performance across disciplines"}
  ]'::jsonb
WHERE name = 'Université de Lille';
