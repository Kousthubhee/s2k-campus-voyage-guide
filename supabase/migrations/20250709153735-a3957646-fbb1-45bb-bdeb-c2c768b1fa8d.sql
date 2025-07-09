
-- Update cities table with comprehensive local insights for each city
UPDATE cities SET local_insights = '[
  {
    "id": "1",
    "type": "transport",
    "title": "TBM Monthly Pass",
    "description": "Students get discounted monthly passes for €30. The tram system connects major universities efficiently."
  },
  {
    "id": "2",
    "type": "events",
    "title": "Bordeaux Wine Festival",
    "description": "Biennial wine festival held in June along the Garonne River with free tastings and cultural events."
  },
  {
    "id": "3",
    "type": "student",
    "title": "Student Housing",
    "description": "CROUS provides affordable student housing. Popular student areas include Victoire and Saint-Michel."
  }
]'::jsonb WHERE name = 'Bordeaux';

UPDATE cities SET local_insights = '[
  {
    "id": "1",
    "type": "transport",
    "title": "Navigo Student Discount",
    "description": "Students under 27 get 50% off monthly Navigo passes. RER A provides direct access to Paris."
  },
  {
    "id": "2",
    "type": "places",
    "title": "Île de Loisirs",
    "description": "Large recreation area with beaches, water sports, and outdoor activities perfect for students."
  }
]'::jsonb WHERE name = 'Cergy';

UPDATE cities SET local_insights = '[
  {
    "id": "1",
    "type": "transport",
    "title": "TAG Student Pass",
    "description": "Discounted monthly transport pass for students. Free cable car rides to Bastille with student ID."
  },
  {
    "id": "2",
    "type": "sports",
    "title": "Winter Sports Access",
    "description": "Student discounts at nearby ski resorts. University ski club organizes regular trips."
  },
  {
    "id": "3",
    "type": "events",
    "title": "Festival of Lights",
    "description": "Annual December festival illuminating the city with artistic light installations."
  }
]'::jsonb WHERE name = 'Grenoble';

UPDATE cities SET local_insights = '[
  {
    "id": "1",
    "type": "transport",
    "title": "Ilevia Student Rates",
    "description": "Reduced fare transport passes for students. Direct high-speed rail to major European cities."
  },
  {
    "id": "2",
    "type": "events",
    "title": "Braderie de Lille",
    "description": "Europe largest flea market held annually in September, attracting millions of visitors."
  }
]'::jsonb WHERE name = 'Lille';

UPDATE cities SET local_insights = '[
  {
    "id": "1",
    "type": "transport",
    "title": "TCL Student Pass",
    "description": "Discounted monthly transport passes for students under 27. Extensive metro and tram network."
  },
  {
    "id": "2",
    "type": "events",
    "title": "Festival of Lights",
    "description": "Famous December festival where the entire city is illuminated with artistic light displays."
  },
  {
    "id": "3",
    "type": "student",
    "title": "Student Food Scene",
    "description": "Numerous student-friendly bouchons (traditional restaurants) and affordable food markets."
  }
]'::jsonb WHERE name = 'Lyon';

UPDATE cities SET local_insights = '[
  {
    "id": "1",
    "type": "transport",
    "title": "RTM Student Discounts",
    "description": "Reduced rate metro and bus passes for students. Ferry connections for weekend trips."
  },
  {
    "id": "2",
    "type": "places",
    "title": "Calanques Access",
    "description": "Easy access to stunning limestone cliffs and beaches perfect for hiking and swimming."
  },
  {
    "id": "3",
    "type": "events",
    "title": "Marseille Music Festivals",
    "description": "Various music festivals throughout the year, including electronic music and world music events."
  }
]'::jsonb WHERE name = 'Marseille';

UPDATE cities SET local_insights = '[
  {
    "id": "1",
    "type": "transport",
    "title": "Lignes d Azur Student Pass",
    "description": "Discounted tram and bus passes for students. Easy access to Monaco and Cannes."
  },
  {
    "id": "2",
    "type": "events",
    "title": "Nice Carnival",
    "description": "Famous annual carnival in February with parades, flowers, and festivities."
  },
  {
    "id": "3",
    "type": "student",
    "title": "International Community",
    "description": "Large international student population with various cultural exchanges and events."
  }
]'::jsonb WHERE name = 'Nice';

UPDATE cities SET local_insights = '[
  {
    "id": "1",
    "type": "transport",
    "title": "Navigo Student Discount",
    "description": "Students under 27 get 50% off monthly Navigo passes. Extensive public transport network."
  },
  {
    "id": "2",
    "type": "student",
    "title": "Student Housing",
    "description": "CROUS provides affordable student housing. Many student residences in suburbs with metro access."
  },
  {
    "id": "3",
    "type": "events",
    "title": "Nuit Blanche",
    "description": "Annual all-night arts festival in October with free access to museums and cultural venues."
  }
]'::jsonb WHERE name = 'Paris';

UPDATE cities SET local_insights = '[
  {
    "id": "1",
    "type": "transport",
    "title": "Citura Student Pass",
    "description": "Discounted bus and tram passes for students. Fast TGV connections to Paris."
  },
  {
    "id": "2",
    "type": "events",
    "title": "Champagne Harvest Festival",
    "description": "Annual harvest celebration in September with vineyard tours and tastings."
  },
  {
    "id": "3",
    "type": "places",
    "title": "Champagne House Tours",
    "description": "Student discounts available for tours of famous champagne houses like Veuve Clicquot."
  }
]'::jsonb WHERE name = 'Reims';

UPDATE cities SET local_insights = '[
  {
    "id": "1",
    "type": "transport",
    "title": "Myastuce Student Rates",
    "description": "Reduced bus fares for students. New tram system launching soon for better connectivity."
  },
  {
    "id": "2",
    "type": "events",
    "title": "Joan of Arc Festival",
    "description": "Annual May festival celebrating Joan of Arc with parades, medieval shows, and historical reenactments."
  },
  {
    "id": "3",
    "type": "student",
    "title": "Student Quarter",
    "description": "Active student life around Place du Vieux-Marché with affordable bars and restaurants."
  }
]'::jsonb WHERE name = 'Rouen';

UPDATE cities SET local_insights = '[
  {
    "id": "1",
    "type": "transport",
    "title": "Tech Park Shuttle",
    "description": "Free shuttle buses connect different parts of the technology park and nearby cities."
  },
  {
    "id": "2",
    "type": "student",
    "title": "Tech Innovation Hub",
    "description": "Numerous internship and job opportunities in technology companies and startups."
  }
]'::jsonb WHERE name = 'Sophia Antipolis';

UPDATE cities SET local_insights = '[
  {
    "id": "1",
    "type": "transport",
    "title": "CTS Student Pass",
    "description": "Discounted tram and bus passes for students. Easy cross-border travel to Germany."
  },
  {
    "id": "2",
    "type": "events",
    "title": "Strasbourg Christmas Market",
    "description": "One of France oldest Christmas markets, running from late November to December."
  },
  {
    "id": "3",
    "type": "student",
    "title": "European Exchange Hub",
    "description": "Major destination for European student exchanges with international student services."
  }
]'::jsonb WHERE name = 'Strasbourg';

UPDATE cities SET local_insights = '[
  {
    "id": "1",
    "type": "transport",
    "title": "Tisséo Student Pass",
    "description": "Discounted metro and bus passes for students. Extensive public transport network."
  },
  {
    "id": "2",
    "type": "events",
    "title": "Toulouse Space Festival",
    "description": "Annual festival celebrating aerospace industry with exhibitions and conferences."
  },
  {
    "id": "3",
    "type": "student",
    "title": "Aerospace Opportunities",
    "description": "Major aerospace hub with internship and job opportunities at Airbus and other companies."
  }
]'::jsonb WHERE name = 'Toulouse';
