import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, MapPin, Building2, Users, Info } from 'lucide-react';
import { InsightsDialog } from "./school-insights/InsightsDialog";

interface School {
  id: string;
  name: string;
  description: string;
  location: string;
  ranking?: string;
  tuition?: string;
  programs: string[];
}

interface LocalInsight {
  title: string;
  description: string;
  tips: string[];
}

interface City {
  name: string;
  description: string;
  transport: string;
  famousPlaces: string;
  sportsFacilities: string;
  studentLife: string;
  schools: School[];
  localInsights: LocalInsight[];
}

interface SchoolSelectorProps {
  onBack: () => void;
  onSchoolSelect: (school: School) => void;
}

export const SchoolSelector = ({ onBack, onSchoolSelect }: SchoolSelectorProps) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [showInsights, setShowInsights] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState('All');

  // Auto-close insights dialog whenever changing city
  useEffect(() => {
    setShowInsights(false);
    if (selectedCity) {
      console.log('[DEBUG] Switched to city:', selectedCity);
    }
  }, [selectedCity]);

  const cities: Record<string, City> = {
    paris: {
      name: 'Paris',
      description: 'Capital city with top-tier schools in all domains',
      transport: 'Robust metro, RER, buses with discounted Navigo Imagine R card for students under 26.',
      famousPlaces: 'Eiffel Tower, Louvre, Montmartre, Notre-Dame, Stade de France, aquatic centre.',
      sportsFacilities: 'Free city-run football pitches, rugby fields & athletic tracks; university sports complexes (~60–100 activities) across city/suburbs.',
      studentLife: 'Great Erasmus/student community, coliving options, cultural events—“bonjour/merci” etiquette matters!',
      schools: [
        { id: 'sorbonne', name: 'Sorbonne University', description: 'Humanities, sciences, and medicine', location: 'Paris', programs: ['Humanities', 'Science', 'Medicine'] },
        { id: 'psl', name: 'PSL University', description: 'Includes ENS, Dauphine, Mines ParisTech', location: 'Paris', programs: ['Science', 'Economics', 'Engineering'] },
        { id: 'polytechnique', name: 'École Polytechnique', description: 'Elite engineering grande école', location: 'Palaiseau (Paris area)', programs: ['Engineering', 'Science', 'Economics'] },
        { id: 'hec-paris', name: 'HEC Paris', description: 'Top global business school', location: 'Jouy-en-Josas', programs: ['MBA', 'Grande École'] },
        { id: 'escp', name: 'ESCP Business School', description: 'Multi-campus, Paris is the flagship', location: 'Paris', programs: ['MIM', 'MBA'] },
        { id: 'sciencespo-paris', name: 'Sciences Po Paris', description: 'Political science, international affairs', location: 'Paris', programs: ['Politics', 'International Affairs'] },
        { id: 'neoma-paris', name: 'NEOMA Business School (Paris)', description: 'Executive & MSc programs', location: 'Paris', programs: ['MSc', 'Executive'] },
        { id: 'telecom-paris', name: 'Télécom Paris', description: 'Tech-focused grande école', location: 'Paris', programs: ['Engineering', 'Telecom'] },
        { id: 'essec', name: 'ESSEC Business School', description: 'Cergy campus in Paris region', location: 'Cergy', programs: ['MIM', 'MBA', 'MSc'] }
      ],
      localInsights: [
        {
          title: "Transport",
          description: "Citywide connectivity and affordable metro for students.",
          tips: [
            "Robust metro, RER, and buses with discounted Navigo Imagine R card for students under 26.",
            "Heavy investment in bike lanes & Vélib’—cycling commutes now outpace car usage.",
            "Cycling tips: Vélib’ is easy to use and bike lanes are expanding rapidly.",
          ]
        },
        {
          title: "Sports & Recreation",
          description: "Sports facilities and citywide activities.",
          tips: [
            "Free access to city-run football pitches, rugby fields & athletic tracks.",
            "University sports complexes across city/suburbs (~60–100 activities) available for all students.",
            "Check the Paris municipal website for the map of available fields.",
          ]
        },
        {
          title: "Student Life",
          description: "Living, etiquette, events, and museums.",
          tips: [
            "Great Erasmus/student community life, active coliving options.",
            "Cultural events take place year-round; etiquette tip: always say “bonjour/merci” in social settings.",
            "World-class museums (Louvre, musée d’Orsay) are nearby, often free or discounted for students.",
          ]
        },
        {
          title: "Nearby & Legacy",
          description: "Explore around Paris.",
          tips: [
            "Enjoy parks, major events (Paris 2024 legacy includes Stade de France and aquatic centre), and the city’s rich cultural heritage.",
          ]
        },
      ]
    },
    cergy: {
      name: 'Cergy',
      description: "Modern city with a green campus, served by RER A and buses 25 min from Paris center.",
      transport: "RER A and buses; green campus connected to Paris.",
      famousPlaces: "Leisure lake, Port Cergy terraces, parks, cinemas.",
      sportsFacilities: "273 public and campus sports facilities including sailing, kayaking, and the Aren’Ice arena.",
      studentLife: "University residences, libraries, cafeterias and 47 associations for vibrant student life.",
      schools: [
        { id: 'centrale-cergy', name: 'École Centrale de Cergy', description: 'Engineering and applied sciences', location: 'Cergy', programs: ['Engineering'] },
        { id: 'insa-cergy', name: 'INSA Cergy', description: 'Public engineering school', location: 'Cergy', programs: ['Engineering'] },
        { id: 'claude-bernard', name: 'Université Claude Bernard Cergy', description: 'Sciences and medicine', location: 'Cergy', programs: ['Medicine', 'Science'] },
        { id: 'em-cergy', name: 'EM Cergy Business School', description: 'Prestigious business Grande École', location: 'Cergy', programs: ['MBA', 'MSc'] },
        { id: 'lumiere-cergy2', name: 'Université Lumière Cergy 2', description: 'Social sciences and arts', location: 'Cergy', programs: ['Arts', 'Social Sciences'] }
      ],
      localInsights: [
        {
          title: "Campus & Connectivity",
          description: "Green campus with great links and local facilities.",
          tips: [
            "Green campus of CY Tech, served by RER A and buses (25 min from Paris center).",
            "Public transport via RER A and local buses; plan your daily commutes with off-peak timings."
          ]
        },
        {
          title: "Student Life",
          description: "Resources, associations, and campus vibes.",
          tips: [
            "University residences, libraries, cafeterias, and 47 student associations.",
            "Get involved in clubs—it's a great way to meet new people."
          ]
        },
        {
          title: "Sports & Recreation",
          description: "Cergy's awesome sports options.",
          tips: [
            "273 public/open and campus sports facilities, including sailing, water-skiing, kayaking, ice-hockey at Aren’Ice arena (3,000‑seat).",
            "Explore leisure lake, parks, and the Port Cergy terraces for walks, concerts, and cinemas."
          ]
        }
      ]
    },
    lyon: {
      name: 'Lyon',
      description: 'Culinary capital and a major student city.',
      transport: "Efficient TCL metro/trams/buses plus Velo’v bike-sharing.",
      famousPlaces: "Rhône/Saône riverfronts, Vieux Lyon, Beaujolais vineyards, Alpine gateway.",
      sportsFacilities: "Over 200 sports offered; 200 km of trails, parks, and riversides.",
      studentLife: "INSA & Centrale Lyon provide tailored support, sports centres, cafeterias, student wellness initiatives.",
      schools: [
        { id: 'centrale-lyon', name: 'École Centrale de Lyon', description: 'Engineering and applied sciences', location: 'Lyon', programs: ['Engineering'] },
        { id: 'insa-lyon', name: 'INSA Lyon', description: 'Public engineering school', location: 'Lyon', programs: ['Engineering'] },
        { id: 'claude-bernard', name: 'Université Claude Bernard Lyon 1', description: 'Sciences and medicine', location: 'Lyon', programs: ['Medicine', 'Science'] },
        { id: 'em-lyon', name: 'EM Lyon Business School', description: 'Prestigious business Grande École', location: 'Lyon', programs: ['MBA', 'MSc'] },
        { id: 'lumiere-lyon2', name: 'Université Lumière Lyon 2', description: 'Social sciences and arts', location: 'Lyon', programs: ['Arts', 'Social Sciences'] }
      ],
      localInsights: [
        {
          title: "Transport",
          description: "Getting around Lyon and beyond.",
          tips: [
            "Efficient TCL network (metro, trams, buses).",
            "Velo’v bike-sharing for easy city movement.",
          ]
        },
        {
          title: "Green & Sporty",
          description: "Active lifestyle and outdoor fun in Lyon.",
          tips: [
            "Over 200 sports are offered to students.",
            "Enjoy 200 km of trails, parks, riversides for outdoor activities."
          ]
        },
        {
          title: "Campus Life",
          description: "How to thrive as a student in Lyon.",
          tips: [
            "Institutions like INSA & Centrale Lyon offer tailored support.",
            "Access to student wellness, cafeterias, and sports centres is robust."
          ]
        },
        {
          title: "Nearby Getaways",
          description: "Enjoy Lyon’s surroundings.",
          tips: [
            "Explore the Rhône/Saône riverfronts, Beaujolais vineyards, and use Lyon as an Alpine gateway."
          ]
        }
      ]
    },
    toulouse: {
      name: 'Toulouse',
      description: '“La Ville Rose”—France’s #1 student city for student life, tech, and aerospace.',
      transport: "Tisséo network (metro, tram, buses) plus Pastel card (~€10/mo for under‑26). VélôToulouse bike-sharing and good bike lanes (e.g., to INSA and campus).",
      famousPlaces: "Canal du Midi, Capitole, Toulouse FC, Stade Toulousain.",
      sportsFacilities: "Rugby capital with stadiums, cartoucherie food halls, vibrant cycling infrastructure.",
      studentLife: "Vibrant nightlife, 130k+ students, affordable housing, food halls.",
      schools: [
        { id: 'supaero', name: 'ISAE-SUPAERO', description: 'Top aerospace engineering school', location: 'Toulouse', programs: ['Aerospace Engineering'] },
        { id: 'insa-toulouse', name: 'INSA Toulouse', description: 'Public engineering school', location: 'Toulouse', programs: ['Engineering'] },
        { id: 'paul-sabatier', name: 'Université Toulouse III – Paul Sabatier', description: 'Science, tech, health', location: 'Toulouse', programs: ['Science', 'Technology', 'Health'] },
        { id: 'tbs', name: 'TBS Education', description: 'Grande École business program', location: 'Toulouse', programs: ['Business'] },
        { id: 'capitole', name: 'Université Toulouse 1 Capitole', description: 'Law, economics, management', location: 'Toulouse', programs: ['Law', 'Economics', 'Management'] }
      ],
      localInsights: [
        {
          title: "Transport",
          description: "Affordable city movement with Tisséo network.",
          tips: [
            "Tisséo network covers metro, tram, buses (Pastel card ~€10/mo for under‑26).",
            "VélôToulouse bike-sharing is great, and bike lanes expand to INSA and major campuses."
          ]
        },
        {
          title: "Cycling & Connectivity",
          description: "Easy city cycling options.",
          tips: [
            "Bike lanes improve every year—try cycling to campus.",
            "Combine VélôToulouse rental bikes with tram for flexible commutes!"
          ]
        },
        {
          title: "Student Life",
          description: "France’s #1 student city and social scene.",
          tips: [
            "Ranked France’s #1 student city for student life.",
            "Vibrant nightlife, 130k+ students, and affordable housing.",
            "Try Cartoucherie food halls for budget-friendly eats with friends."
          ]
        },
        {
          title: "Sports & Heritage",
          description: "City is rugby capital, rich history & nature.",
          tips: [
            "Rich heritage along Canal du Midi, with Romanesque basilica and beautiful riverside walks.",
            "Stade Toulousain (rugby) and local football teams offer discounted student tickets.",
            "Don’t miss matches at Stade Municipal and exploring the city’s riverside parks."
          ]
        }
      ]
    },
    rouen: {
      name: 'Rouen',
      description: 'Historic city with modern business and tech schools',
      transport: 'Astuce network (TEOR, metro, bus)',
      famousPlaces: 'Rouen Cathedral, Gros Horloge, Joan of Arc sites',
      sportsFacilities: 'Kindarena sports hall, Robert Diochon stadium',
      studentLife: 'Medieval architecture, Seine riverside, Norman cuisine',
      schools: [
        { id: 'neoma-rouen', name: 'NEOMA Business School (Main campus)', description: 'PGE, MSc, BBA programs', location: 'Rouen', programs: ['PGE', 'MSc', 'BBA'] },
        { id: 'insa-rouen', name: 'INSA Rouen Normandie', description: 'Engineering across multiple domains', location: 'Rouen', programs: ['Engineering'] },
        { id: 'rouen-univ', name: 'Université de Rouen Normandie', description: 'Comprehensive university', location: 'Rouen', programs: ['Various'] },
        { id: 'esigelec', name: 'ESIGELEC Rouen', description: 'Electronics and digital tech', location: 'Rouen', programs: ['Engineering'] }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Navigate Rouen with ease",
          tips: [
            "Astuce network (€30/month student pass) via My Astuce app for TEOR buses, trams, and Calypso shuttle",
            "Lovélo bike rentals through the Lovélo app",
            "FlixBus to Paris, Lyon, etc. (from €7) via FlixBus app from 33 Avenue Champlain",
            "SNCF trains to Paris in 1 hour via SNCF Connect app"
          ]
        },
        {
          title: "Culture & Events",
          description: "Experience Rouen's rich history and events",
          tips: [
            "Attend Jeanne d'Arc Festival (May 31, 2025) for parades and markets",
            "Explore the medieval old town—Rue du Gros-Horloge has €7-10 crêperies",
            "Le Marignan bar near the cathedral offers €3 drinks on Thursdays",
            "Visit Cathédrale Notre-Dame and Jeanne d'Arc Tower"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase Saint-Exupéry via local clubs",
            "Jardins de l'Hôtel de Ville for informal cricket with expat groups—rugby is more popular",
            "Relax at Parc de Grammont with trails",
            "Must-visit: Musée des Beaux-Arts for cultural outings"
          ]
        }
      ]
    },
    reims: {
      name: 'Reims',
      description: 'Business and international affairs education hub',
      transport: 'Citura network (tram, bus)',
      famousPlaces: 'Reims Cathedral, Champagne houses, Palais du Tau',
      sportsFacilities: 'Stade Auguste-Delaune, René Tys sports complex',
      studentLife: 'Champagne capital, historic center, student-friendly',
      schools: [
        { id: 'neoma-reims', name: 'NEOMA Business School (Reims)', description: 'Core business programs', location: 'Reims', programs: ['Business', 'MBA', 'MSc'] },
        { id: 'sciencespo-reims', name: 'Sciences Po Campus Reims', description: 'International program focus', location: 'Reims', programs: ['Politics', 'Global Affairs'] },
        { id: 'reims-univ', name: 'Université de Reims Champagne-Ardenne', description: 'Regional public university', location: 'Reims', programs: ['Various'] },
        { id: 'esiec', name: 'ESIEC Reims', description: 'Packaging and digital engineering', location: 'Reims', programs: ['Engineering'] }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Get around Reims efficiently",
          tips: [
            "Citura buses and trams (€25/month student pass) via Citura app",
            "Walk or bike—Reims is compact",
            "FlixBus to Paris, Lyon, etc. (from €7) via FlixBus app",
            "SNCF TGV to Paris in 45 minutes via SNCF Connect app"
          ]
        },
        {
          title: "Champagne Culture",
          description: "Immerse in the heart of the Champagne region",
          tips: [
            "Visit champagne houses like Pommery for student tours (€10-15)",
            "Attend Jeanne d'Arc Festival (May 31, 2025) for parades",
            "Enjoy €10 meals at Place Drouet-d'Erlon brasseries",
            "Must-visit: Cathédrale Notre-Dame de Reims, Palais du Tau"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase Thiolettes via university",
            "Parc de Champagne for informal cricket with expat groups",
            "Relax at Parc de la Patte d'Oie with green spaces",
            "Watch Stade de Reims matches—student tickets from €10"
          ]
        }
      ]
    },
    lille: {
      name: 'Lille',
      description: 'Northern hub for business and engineering education',
      transport: 'Transpole network (metro, tram, bus)',
      famousPlaces: 'Grand Place, Vieux Lille, Palais des Beaux-Arts',
      sportsFacilities: 'Stade Pierre-Mauroy, Lille Métropole sports complex',
      studentLife: 'Flemish influence, student district, Braderie festival',
      schools: [
        { id: 'lille-univ', name: 'Université de Lille', description: 'Large multidisciplinary public university', location: 'Lille', programs: ['Various'] },
        { id: 'edhec-lille', name: 'EDHEC Business School', description: 'Top 5 French business school', location: 'Lille', programs: ['MBA', 'MSc', 'Finance'] },
        { id: 'centrale-lille', name: 'École Centrale de Lille', description: 'Elite engineering school', location: 'Lille', programs: ['Engineering'] },
        { id: 'ieseg', name: 'IESEG School of Management', description: 'AACSB-accredited Grande École', location: 'Lille', programs: ['Management', 'MSc'] },
        { id: 'hei', name: 'HEI – Hautes Études d\'Ingénieur', description: 'Private engineering school', location: 'Lille', programs: ['Engineering'] }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Navigate Lille and beyond",
          tips: [
            "Transpole metro, trams, and buses (€35/month student pass) via Transpole app",
            "V'Lille bikes through the V'Lille app",
            "FlixBus to Paris, Lyon, etc. (from €7) via FlixBus app from Gare Lille Europe",
            "SNCF TGV to Paris in 1 hour via SNCF Connect app"
          ]
        },
        {
          title: "Culture & Events",
          description: "Experience Lille's youthful vibe",
          tips: [
            "Visit Braderie de Lille (first weekend of September) for flea markets and music",
            "Enjoy €5-7 kebabs on Rue de Gand",
            "Le Macumba bar in Wazemmes has €2 drink nights",
            "Must-visit: Vieux-Lille, Palais des Beaux-Arts"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase des Bois Blancs via Anybuddy",
            "Parc de la Citadelle for informal cricket with expat groups",
            "Relax at Parc de la Citadelle with trails and a zoo",
            "Explore Lille Cathedral for a cultural outing"
          ]
        }
      ]
    },
    strasbourg: {
      name: 'Strasbourg',
      description: 'Prestigious academic and international region',
      transport: 'CTS network (tram, bus)',
      famousPlaces: 'Strasbourg Cathedral, Petite France, European Parliament',
      sportsFacilities: 'Rhenus Sport arena, Stade de la Meinau',
      studentLife: 'Franco-German culture, EU institutions, Christmas market',
      schools: [
        { id: 'strasbourg-univ', name: 'Université de Strasbourg', description: 'Prestigious university, strong in sciences and humanities', location: 'Strasbourg', programs: ['Science', 'Humanities'] },
        { id: 'insa-strasbourg', name: 'INSA Strasbourg', description: 'Part of the INSA engineering network', location: 'Strasbourg', programs: ['Engineering'] },
        { id: 'em-strasbourg', name: 'EM Strasbourg Business School', description: 'Business school within the university', location: 'Strasbourg', programs: ['Business'] },
        { id: 'sciencespo-strasbourg', name: 'Sciences Po Strasbourg', description: 'Regional campus of Sciences Po', location: 'Strasbourg', programs: ['Politics'] }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Navigate Strasbourg and beyond",
          tips: [
            "CTS trams and buses (€30/month student pass) via CTS app",
            "Vélhop bikes through the Vélhop app",
            "FlixBus to Paris, Lyon, etc. (from €18) via FlixBus app",
            "SNCF TGV to Paris in 2 hours via SNCF Connect app"
          ]
        },
        {
          title: "Culture & Events",
          description: "Experience Strasbourg's French-German mix",
          tips: [
            "Visit Strasbourg Christmas Market (late November-December) for mulled wine",
            "Enjoy tarte flambée at Au Brasseur for €8-10",
            "La Kulture bar near the cathedral hosts student events",
            "Must-visit: Cathédrale Notre-Dame, La Petite France"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase des Deux Rives via Anybuddy",
            "Parc de l'Orangerie for informal cricket with expat groups",
            "Relax at Parc de l'Orangerie with a lake and storks",
            "Visit European Parliament for a unique experience"
          ]
        }
      ]
    },
    bordeaux: {
      name: 'Bordeaux',
      description: 'Southwest academic powerhouse in sciences and business',
      transport: 'TBM network (tram, bus, ferry)',
      famousPlaces: 'Place de la Bourse, Grand Théâtre, Cité du Vin',
      sportsFacilities: 'Matmut Atlantique stadium, Mériadeck ice rink',
      studentLife: 'Wine capital, UNESCO heritage, vibrant nightlife',
      schools: [
        { id: 'bordeaux-univ', name: 'Université de Bordeaux', description: 'Comprehensive research university', location: 'Bordeaux', programs: ['Science', 'Engineering'] },
        { id: 'kedge-bordeaux', name: 'KEDGE Business School', description: 'Major business school', location: 'Bordeaux', programs: ['MBA', 'MSc'] },
        { id: 'enseirb', name: 'ENSEIRB-MATMECA', description: 'Engineering in IT, electronics, math', location: 'Bordeaux', programs: ['Engineering'] },
        { id: 'sciencespo-bordeaux', name: 'Sciences Po Bordeaux', description: 'Political science and international studies', location: 'Bordeaux', programs: ['Politics'] },
        { id: 'inpbordeaux', name: 'INP Bordeaux', description: 'Engineering network incl. ENSEIRB-MATMECA, ENSCBP', location: 'Bordeaux', programs: ['Engineering'] }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Get around Bordeaux with ease",
          tips: [
            "TBM trams, buses, and boats (€30/month student pass) via TBM MyCiti app",
            "VCub bikes through the VCub app",
            "FlixBus to Toulouse, Paris, etc. (from €9) via FlixBus app",
            "SNCF TGV to Paris in 2 hours via SNCF Connect app"
          ]
        },
        {
          title: "Wine Culture",
          description: "Immerse in Bordeaux's wine heritage",
          tips: [
            "Visit La Cité du Vin to learn about wine culture",
            "Attend Fête du Vin (June, next in 2026) for tastings",
            "Hang out at Darwin Ecosystem for cheap food trucks",
            "Must-visit: Place de la Bourse, Grosse Cloche"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase Thiers via Anybuddy",
            "Parc Bordelais for informal cricket with expat groups",
            "Relax at Jardin Public with green spaces",
            "Explore €5 sandwiches on Rue Sainte-Catherine"
          ]
        }
      ]
    },
    nice: {
      name: 'Nice',
      description: 'Côte d\'Azur region with business and engineering strengths',
      transport: 'Lignes d\'Azur network (tram, bus)',
      famousPlaces: 'Promenade des Anglais, Old Nice, Castle Hill',
      sportsFacilities: 'Allianz Riviera stadium, Charles Ehrmann sports complex',
      studentLife: 'Mediterranean beaches, international atmosphere, outdoor lifestyle',
      schools: [
        { id: 'uca', name: 'Université Côte d\'Azur', description: 'Alliance of local institutions under one label', location: 'Nice', programs: ['Various'] },
        { id: 'skema-nice', name: 'SKEMA Business School (Sophia)', description: 'Global business school with AI focus', location: 'Sophia Antipolis', programs: ['Business', 'AI'] },
        { id: 'polytech-nice', name: 'Polytech Nice Sophia', description: 'Engineering school within UCA', location: 'Nice', programs: ['Engineering'] },
        { id: 'edhec-nice', name: 'EDHEC Business School (Nice)', description: 'Specializes in Finance MSc and Global MBA', location: 'Nice', programs: ['Finance', 'MBA'] },
        { id: 'mines-sophia', name: 'Mines Paris – Sophia', description: 'AI and systems engineering research campus', location: 'Sophia Antipolis', programs: ['Engineering', 'AI'] }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Navigate Nice with ease",
          tips: [
            "Lignes d'Azur trams and buses (€25/month student pass) via Lignes d'Azur app",
            "Vélo Bleu bikes through the Vélo Bleu app",
            "FlixBus to Marseille, Paris, etc. (from €9) via FlixBus app",
            "SNCF trains to Marseille in 2.5 hours via SNCF Connect app"
          ]
        },
        {
          title: "Mediterranean Lifestyle",
          description: "Study with a view of the Mediterranean",
          tips: [
            "Enjoy Carnaval de Nice (February) with parades",
            "Grab socca in Vieux Nice for €3-5",
            "Relax on public beaches—bring your own towel",
            "Must-visit: Promenade des Anglais, Castle Hill"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase Pasteur via Anybuddy",
            "Parc Estienne d'Orves for informal cricket with expat groups",
            "Relax at Promenade du Paillon with fountains",
            "Visit Vieux Nice for a cultural outing"
          ]
        }
      ]
    },
    marseille: {
      name: 'Marseille',
      description: 'Mediterranean port city with large academic presence',
      transport: 'RTM network (metro, tram, bus, ferry)',
      famousPlaces: 'Vieux-Port, Notre-Dame de la Garde, Calanques',
      sportsFacilities: 'Orange Vélodrome stadium, Palais des Sports',
      studentLife: 'Mediterranean culture, diverse cuisine, coastal activities',
      schools: [
        { id: 'amu', name: 'Aix-Marseille Université', description: 'One of France\'s largest public universities', location: 'Marseille', programs: ['Various'] },
        { id: 'kedge-marseille', name: 'KEDGE Business School (Marseille)', description: 'Major business school', location: 'Marseille', programs: ['Business'] },
        { id: 'centrale-marseille', name: 'École Centrale de Marseille', description: 'Part of the Centrale engineering group', location: 'Marseille', programs: ['Engineering'] },
        { id: 'polytech-marseille', name: 'Polytech Marseille', description: 'Engineering programs under AMU', location: 'Marseille', programs: ['Engineering'] }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Navigate Marseille with ease",
          tips: [
            "RTM metro, trams, and buses (€30/month student pass) via RTM app",
            "Ferries to Frioul islands (€5) via RTM",
            "FlixBus to Saint Charles, Nice, etc. (from €9) via FlixBus app from Saint Charles",
            "SNCF trains to Paris in 3 hours via SNCF Connect app"
          ]
        },
        {
          title: "Cultural Diversity",
          description: "Experience Marseille's multicultural vibe",
          tips: [
            "Enjoy Fête de la Saint-Jean (June 23-24) with bonfires",
            "Grab panisses in Le Panier for €3-5",
            "Hang out at Cours Julien for cheap bars and live music",
            "Must-visit: Vieux-Port, Notre-Dame de la Garde, Calanques"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Palais Omnisports Marseille Grand-Est via Anybuddy",
            "Parc Borély for informal cricket with expat groups",
            "Relax at Parc Borély with fields and trails",
            "Explore the diverse food scene with North African flavors"
          ]
        }
      ]
    },
    grenoble: {
      name: 'Grenoble',
      description: 'Alpine hub for science, technology, and innovation',
      transport: 'TAG network (tram, bus, cable car)',
      famousPlaces: 'Bastille fortress, Grenoble-Bastille cable car, Alps views',
      sportsFacilities: 'Palais des Sports, winter sports in nearby Alps',
      studentLife: 'Tech innovation, mountain activities, research focus',
      schools: [
        { id: 'grenoble-univ', name: 'Université Grenoble Alpes', description: 'Leading research university in sciences and humanities', location: 'Grenoble', programs: ['Science', 'Humanities', 'Engineering'] },
        { id: 'grenoble-inp', name: 'Grenoble INP', description: 'Engineering institute with multiple schools', location: 'Grenoble', programs: ['Engineering', 'Technology'] },
        { id: 'gem', name: 'Grenoble Ecole de Management', description: 'Top business school with tech focus', location: 'Grenoble', programs: ['MBA', 'MSc', 'Business'] },
        { id: 'ensimag', name: 'Ensimag', description: 'Engineering school specializing in IT and applied math', location: 'Grenoble', programs: ['Engineering', 'IT'] },
        { id: 'sciencespo-grenoble', name: 'Sciences Po Grenoble', description: 'Political science and governance programs', location: 'Grenoble', programs: ['Politics', 'Governance'] }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Navigate Grenoble with ease",
          tips: [
            "TAG trams and buses (€30/month student pass) via TAG app",
            "Métrovélo bike rentals through the Métrovélo app",
            "FlixBus to Lyon, Paris, etc. (from €8) via FlixBus app from Grenoble station",
            "SNCF trains to Lyon in 1.5 hours via SNCF Connect app"
          ]
        },
        {
          title: "Alpine Lifestyle & Culture",
          description: "Embrace Grenoble's tech and mountain vibe",
          tips: [
            "Visit Musée de Grenoble for €5 with student discount",
            "Enjoy fondue at local restaurants like La Ferme à Dédé (€12-15)",
            "Attend Festival de l'Innovation (October) for tech events",
            "Hang out at Place Saint-André for €3-5 coffee spots"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Enjoy sports and nature in the Alps",
          tips: [
            "Book badminton courts at Gymnase Hoche via Anybuddy",
            "Parc Paul Mistral for informal cricket with expat groups—skiing is popular in winter",
            "Relax at Parc Paul Mistral with green spaces and trails",
            "Must-visit: Bastille fortress, reachable by cable car"
          ]
        }
      ]
    },
    nantes: {
      name: 'Nantes',
      description: 'Vibrant Atlantic city with engineering and creative industries',
      transport: 'TAN network (tram, bus, ferry)',
      famousPlaces: 'Château des Ducs de Bretagne, Les Machines de l\'Île, Passage Pommeraye',
      sportsFacilities: 'Stade de la Beaujoire, Petit Port sports complex',
      studentLife: 'Creative arts scene, Atlantic coast, sustainable city',
      schools: [
        { id: 'nantes-univ', name: 'Université de Nantes', description: 'Comprehensive public university', location: 'Nantes', programs: ['Various'] },
        { id: 'audencia', name: 'Audencia Business School', description: 'Top-tier business school with international focus', location: 'Nantes', programs: ['MBA', 'MSc', 'Business'] },
        { id: 'centrale-nantes', name: 'École Centrale de Nantes', description: 'Elite engineering grande école', location: 'Nantes', programs: ['Engineering'] },
        { id: 'polytech-nantes', name: 'Polytech Nantes', description: 'Engineering school under Université de Nantes', location: 'Nantes', programs: ['Engineering'] },
        { id: 'oniris', name: 'Oniris', description: 'Engineering in food science and veterinary medicine', location: 'Nantes', programs: ['Engineering', 'Veterinary'] }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Get around Nantes efficiently",
          tips: [
            "TAN buses, trams, and ferries (€30/month student pass) via TAN app",
            "Bicloo bikes through the Bicloo app",
            "FlixBus to Paris, Bordeaux, etc. (from €10) via FlixBus app from Gare de Nantes",
            "SNCF TGV to Paris in 2 hours via SNCF Connect app"
          ]
        },
        {
          title: "Creative Culture",
          description: "Experience Nantes' artistic and innovative scene",
          tips: [
            "Visit Les Machines de l'Île for unique mechanical art (€8 student ticket)",
            "Enjoy crêpes at La Crêperie du Bouffay for €6-10",
            "Attend Festival des 3 Continents (November) for global cinema",
            "Hang out at Hangar à Bananes for €3-5 drinks and nightlife"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase Mangin via Anybuddy",
            "Parc de Procé for informal cricket with expat groups—football is common",
            "Relax at Jardin des Plantes with botanical gardens",
            "Must-visit: Château des Ducs de Bretagne, Île de Nantes"
          ]
        }
      ]
    },
    larochelle: {
      name: 'La Rochelle',
      description: 'Coastal city with focus on sustainability and business',
      transport: 'Yélo network (bus, bike, ferry)',
      famousPlaces: 'Old Port, Towers of La Rochelle, Aquarium La Rochelle',
      sportsFacilities: 'Stade Marcel-Deflandre, nautical center',
      studentLife: 'Coastal lifestyle, maritime heritage, student-friendly size',
      schools: [
        { id: 'larochelle-univ', name: 'Université de La Rochelle', description: 'Public university with environmental focus', location: 'La Rochelle', programs: ['Science', 'Environment', 'Humanities'] },
        { id: 'excelia', name: 'Excelia Business School', description: 'Business school with tourism and sustainability programs', location: 'La Rochelle', programs: ['Business', 'Tourism', 'MSc'] },
        { id: 'eigsi', name: 'EIGSI La Rochelle', description: 'General engineering with maritime focus', location: 'La Rochelle', programs: ['Engineering'] },
        { id: 'institut-ocean', name: 'Institut de l\'Océan', description: 'Marine and environmental research programs', location: 'La Rochelle', programs: ['Marine Science', 'Environment'] }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Navigate La Rochelle with ease",
          tips: [
            "Yélo buses, bikes, and ferries (€25/month student pass) via Yélo app",
            "Yélo bike rentals through the Yélo app—ideal for coastal paths",
            "FlixBus to Bordeaux, Paris, etc. (from €10) via FlixBus app from Gare de La Rochelle",
            "SNCF trains to Paris in 3 hours via SNCF Connect app"
          ]
        },
        {
          title: "Coastal Culture",
          description: "Embrace La Rochelle's maritime heritage",
          tips: [
            "Visit Aquarium La Rochelle (€12 with student discount)",
            "Enjoy seafood at Les Flots near Vieux-Port for €10-15",
            "Attend Francofolies music festival (July) for €10 student tickets",
            "Hang out at Cours des Dames for €3-5 drinks with sea views"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Enjoy sports and coastal relaxation",
          tips: [
            "Book badminton courts at Gymnase de Port-Neuf via Anybuddy",
            "Plage des Minimes for informal cricket with expat groups—sailing is popular",
            "Relax at Parc Charruyer with green spaces and streams",
            "Must-visit: Vieux-Port, Tours de La Rochelle"
          ]
        }
      ]
    }
  };

  if (selectedSchool) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => setSelectedSchool(null)} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
          </Button>
        </div>

        <div className="rounded-lg p-6 mb-6 text-white bg-gradient-to-r from-blue-600 to-purple-600">
          <h1 className="text-3xl font-bold mb-1">{selectedSchool.name}</h1>
          <p className="text-lg mb-1">{selectedSchool.description}</p>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            {selectedSchool.location}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold text-gray-800 text-md mb-2">🎓 Programs Offered</h2>
              {selectedSchool.programs.map((prog) => (
                <div key={prog} className="flex justify-between text-sm text-gray-700 border-b py-1">
                  <span>{prog}</span>
                  <span className="text-green-600 font-medium">Available</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold text-gray-800 text-md mb-2">📅 Tuition & Fees</h2>
              <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
                <li>Application fee: €100–200</li>
                <li>Living expenses: €800–1,200/month</li>
                <li>Books & materials: €500–800/year</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold text-gray-800 text-md mb-2">🌐 Admission Requirements</h2>
              <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
                <li>Bachelor's degree (any field)</li>
                <li>GMAT/GRE scores</li>
                <li>English proficiency (TOEFL/IELTS)</li>
                <li>Personal statement</li>
                <li>2–3 recommendation letters</li>
                <li>Work experience (preferred)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold text-gray-800 text-md mb-2">📞 Contact Information</h2>
              <div className="text-sm text-gray-700 space-y-1">
                <p><span className="font-medium">📧</span> admissions@{selectedSchool.id}.edu</p>
                <p><span className="font-medium">📱</span> +33 1 XX XX XX XX</p>
                <p><span className="font-medium">🌐</span> www.{selectedSchool.id}.edu</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-4">
            <h2 className="font-semibold text-gray-800 text-md mb-3">📌 Application Deadlines</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-semibold text-sm text-blue-800">Fall Intake</h3>
                <p className="text-sm text-gray-700">September 2025</p>
                <p className="text-xs text-gray-500">Deadline: March 15, 2025</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h3 className="font-semibold text-sm text-green-800">Spring Intake</h3>
                <p className="text-sm text-gray-700">January 2026</p>
                <p className="text-xs text-gray-500">Deadline: October 15, 2025</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <h3 className="font-semibold text-sm text-purple-800">Summer Intake</h3>
                <p className="text-sm text-gray-700">June 2025</p>
                <p className="text-xs text-gray-500">Deadline: January 15, 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedCity && cities[selectedCity]) {
    const cityData = cities[selectedCity];

    // Get unique subjects based ONLY on schools in this city
    const citySubjectsSet = new Set<string>();
    cityData.schools.forEach((school) => {
      if (Array.isArray(school.programs)) {
        school.programs.forEach((subj) => citySubjectsSet.add(subj));
      }
    });
    const citySubjects = Array.from(citySubjectsSet).sort();

    // Adjust filtering logic: use the locally scoped citySubjects for the dropdown
    const filteredSchools =
      subjectFilter === 'All'
        ? cityData.schools
        : cityData.schools.filter((school) =>
            school.programs.some((prog) => prog === subjectFilter)
          );

    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => setSelectedCity(null)} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cities
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">{cityData.name} - Schools & Local Insights</h1>
        </div>

        {/* City-specific Subject Filter */}
        {citySubjects.length > 1 && (
          <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
            <label htmlFor="subject-filter" className="font-medium text-gray-700">Filter by Subject:</label>
            <select
              id="subject-filter"
              className="border rounded px-2 py-2 text-sm md:w-64 w-full focus:outline-none"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="All">All Subjects</option>
              {citySubjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        )}

        {/* Local Insights Section */}
        <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Info className="h-5 w-5 text-purple-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Local Insights for {cityData.name}</h2>
              </div>
              <Button onClick={() => setShowInsights(true)} variant="outline" size="sm">
                View All Tips
              </Button>
            </div>
            <p className="text-gray-600 mb-4">Get insider knowledge about living and studying in {cityData.name}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <h3 className="font-semibold text-gray-900">🚆 Transport</h3>
                </div>
                <p className="text-sm text-gray-600">{cityData.transport}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <h3 className="font-semibold text-gray-900">🏛️ Nearby Landmarks</h3>
                </div>
                <p className="text-sm text-gray-600">{cityData.famousPlaces}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <h3 className="font-semibold text-gray-900">🏟️ Sports Facilities</h3>
                </div>
                <p className="text-sm text-gray-600">{cityData.sportsFacilities}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <h3 className="font-semibold text-gray-900">🎋 Student Life</h3>
                </div>
                <p className="text-sm text-gray-600">{cityData.studentLife}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schools Section */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Schools in {cityData.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(filteredSchools) && filteredSchools.length > 0 ? (
            filteredSchools.map((school) => (
              <Card
                key={school.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedSchool(school)}
              >
                <CardContent className="p-6 break-words">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 break-words">{school.description}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{school.location}</span>
                    </div>
                    {school.ranking && (
                      <div className="flex items-center text-sm">
                        <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-green-600 font-medium">{school.ranking}</span>
                      </div>
                    )}
                    {school.tuition && (
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{school.tuition}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <div className="text-xs text-gray-500 mb-2">Programs Offered:</div>
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(school.programs) && school.programs.length > 0 ? (
                        school.programs.map((program) => (
                          <span key={program} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {program}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">No programs listed</span>
                      )}
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="sm">View Details</Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-gray-500 text-center">
              No schools found for this subject in {cityData.name}.
            </div>
          )}
        </div>

        {/* Local Insights Modal */}
        <InsightsDialog
          open={showInsights}
          onOpenChange={setShowInsights}
          cityName={cityData.name}
          localInsights={cityData.localInsights}
          transport={cityData.transport}
          famousPlaces={cityData.famousPlaces}
          sportsFacilities={cityData.sportsFacilities}
          studentLife={cityData.studentLife}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => selectedCity ? setSelectedCity(null) : onBack()} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Checklist
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Select Your City</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(cities).map(([cityKey, city]) => (
          <Card
            key={cityKey}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-slate-50"
            onClick={() => setSelectedCity(cityKey)}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <div className="h-28 w-full flex flex-col items-center justify-center mb-4">
                {/* Centered City Name, removed FR */}
                <span className="text-2xl font-bold text-gray-800 text-center">
                  {city.name}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4 text-center">{city.description}</p>
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{city.schools.length} Schools</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Local Tips</span>
                </div>
                <Button size="sm">Explore</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
