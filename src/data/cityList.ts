import { City } from "./cityTypes";
import { schools } from "./schoolList";

// The full cityData array from SchoolInsightsPage, exactly as previously implemented.
export const cityData: City[] = [
  {
    name: "Paris",
    emoji: "🗼",
    description: "The heart of France – rich history, fashion, and art.",
    localInsights: [
      {
        title: "Transport",
        description:
          "Robust metro, RER, buses with discounted Navigo Imagine R card for students under 26.",
        tips: [
          "Get the Navigo Imagine R card for unlimited public transport if you are under 26.",
          "Metro lines 1 & 14 are automated and fastest during peak times.",
          "Vélib' bike-sharing is now safer thanks to extra bike lanes.",
          "Cycling commutes now outpace car usage thanks to heavy investment in bike lanes and Vélib'.",
        ],
      },
      {
        title: "Cycling",
        description:
          "Heavy investment in bike lanes & Vélib’; cycling commutes now outpace car usage.",
        tips: [
          "Use Vélib' bike-sharing for safe and affordable cycling.",
          "Bike lanes are extensive—consider cycling for daily commutes.",
        ],
      },
      {
        title: "Sports",
        description:
          "Free access to city-run football pitches, rugby fields & athletic tracks. University sports complexes (~60-100 activities) across city/suburbs.",
        tips: [
          "University sports complexes offer a wide range of activities.",
          "City football, rugby and athletics pitches are free for students.",
          "Look for legacy sports parks from Paris 2024 for unique events.",
        ],
      },
      {
        title: "Student Life",
        description:
          "Great Erasmus/student community life, coliving options, cultural events—'bonjour/merci' etiquette matters!",
        tips: [
          "Student association bars in the Latin Quarter are popular and budget-friendly.",
          "Museums like the Louvre and musée d’Orsay offer free/reduced entry for students.",
          "Learning 'bonjour' and 'merci' goes a long way!",
          "Participate in city cultural events to meet other students.",
        ],
      },
      {
        title: "Nearby Landmarks",
        description:
          "World-class museums (Louvre, musée d’Orsay), parks, and major events (Stade de France, aquatic centre, legacy of Paris 2024).",
        tips: [
          "Always check for student discounts at major attractions and events.",
        ],
      },
    ],
    transport: "Metro, RER, buses cover the city efficiently.",
    famousPlaces: "Louvre, Eiffel Tower, Notre-Dame, Montmartre.",
    sportsFacilities: "University gyms, running tracks along the Seine.",
    studentLife: "International community, cultural events, night life.",
    schoolsCount: schools.filter((s) => s.city === "Paris").length,
  },
  {
    name: "Lyon",
    emoji: "🦁",
    description: "France’s culinary capital and student city.",
    localInsights: [
      {
        title: "Transport",
        description: "Efficient TCL metro/trams/buses plus Velo’v bike-sharing.",
        tips: [
          "Use the TCL app to plan multi-modal journeys.",
          "Velo’v is the best way to navigate the inner city and cost-effective for students.",
        ],
      },
      {
        title: "Green & Sporty",
        description: "Over 200 sports offered; 200 km of trails, parks, riversides for outdoor activities.",
        tips: [
          "Jog or cycle along the Rhône/Saône riverfronts for great views.",
          "Check out student discounts for gyms and sports centers via LyonCampus.com.",
        ],
      },
      {
        title: "Campus Life",
        description:
          "Institutions like INSA & Centrale Lyon offer tailored student support, sports centres, cafeteria, wellness.",
        tips: [
          "Join a student association for instant local friends and tips.",
          "Student wellness coordinators and subsidized cafeterias help new arrivals.",
        ],
      },
      {
        title: "Nearby/Excursions",
        description: "Rhône/Saône riverfronts, regional Beaujolais vineyards, Alpine gateway.",
        tips: [
          "Plan weekend trips to Beaujolais or take short train rides to the Alps for snow sports.",
        ],
      },
    ],
    transport: "Metro, bus, tramways and funicular.",
    famousPlaces: "Basilica of Notre-Dame de Fourvière, Parc de la Tête d'Or.",
    sportsFacilities: "University sports centers, Rhône river paths.",
    studentLife: "Vibrant nightlife, student associations.",
    schoolsCount: schools.filter((s) => s.city === "Lyon").length,
  },
  {
    name: "Cergy",
    emoji: "🌳",
    description: "Modern city in Paris' green belt, lively student hub.",
    localInsights: [
      {
        title: "Campus",
        description: "Green campus of CY Tech, served by RER A and buses 25 min from Paris center.",
        tips: [
          "RER A runs late into the evening—great for exploring Paris or late-night returns.",
          "Use buses for easy and cheap access to Port Cergy or leisure island.",
        ],
      },
      {
        title: "Student Life",
        description: "University residences, libraries, cafeterias, and 47 student associations.",
        tips: [
          "Join clubs at the university center—most offer free trial events.",
          "CYU’s cafeterias serve affordable, filling meals (RU Cergy).",
        ],
      },
      {
        title: "Sports Facilities",
        description:
          "273 public/open and campus sports facilities, including sailing, water-skiing, kayaking, ice-hockey at Aren’Ice arena (3,000‑seat).",
        tips: [
          "Try watersports on the lake or join student sailing/kayak clubs for discounted lessons.",
          "Aren’Ice hosts student nights for ice skating and hockey games.",
        ],
      },
      {
        title: "Nearby Attractions",
        description:
          "Leisure lake, parks, Port Cergy terraces, concerts, and cinemas.",
        tips: [
          "Port Cergy is perfect for riverside walks and concerts in spring/summer.",
          "Check the local cinema for French-language deals and VO (original version) film nights.",
        ],
      },
    ],
    transport: "RER A, bus lines; direct train to Paris.",
    famousPlaces: "Axe Majeur, marina, leisure island.",
    sportsFacilities: "Base de loisirs, rowing, swimming.",
    studentLife: "Student festivals, bars, affordable housing.",
    schoolsCount: schools.filter((s) => s.city === "Cergy").length,
  },
  {
    name: "Toulouse",
    emoji: "🛩️",
    description: "The pink city—known for aerospace and warm climate.",
    localInsights: [
      {
        title: "Transport",
        description:
          "Tisséo network (metro, tram, buses) plus Pastel card (~€10/mo for under‑26).",
        tips: [
          "Tisséo network covers metro, tram, buses. Get the Pastel card for affordable rides if you're under 26.",
        ],
      },
      {
        title: "Cycling",
        description:
          "VélôToulouse bike-sharing; good bike lanes, e.g., to INSA and campus.",
        tips: [
          "VélôToulouse bike-sharing is great for students.",
          "Bike lanes expand every year—try cycling to campus.",
        ],
      },
      {
        title: "Student Life",
        description:
          "Ranked France’s #1 student city; vibrant nightlife, 130k+ students, affordable housing & food halls (like Cartoucherie).",
        tips: [
          "Check out Cartoucherie food halls for budget eats and meeting friends.",
          "Many student events around universities—join at least one club or activity.",
        ],
      },
      {
        title: "Sports & Heritage",
        description:
          "City is rugby capital—Stade Toulousain, Toulouse FC (football), Stade Municipal; rich heritage along Canal du Midi, Romanesque basilica.",
        tips: [
          "Catch a rugby or football match for authentic Toulouse spirit.",
          "Walk along Canal du Midi for heritage sites and relaxing views.",
        ],
      },
    ],
    transport: "Metro, tram, bus.",
    famousPlaces: "Capitole, Canal du Midi, Cité de l'Espace.",
    sportsFacilities: "Stadium de Toulouse, parks along Garonne.",
    studentLife: "Cafés, rugby games, summer festivals.",
    schoolsCount: schools.filter((s) => s.city === "Toulouse").length,
  },
  {
    name: "Rouen",
    emoji: "⛪",
    description: "Medieval history on the Seine, lively student city.",
    localInsights: [
      {
        title: "Old Town & Culture",
        description:
          "Historic old town, Joan of Arc festival, museums (Beaux-Arts), CROUS student residencies.",
        tips: [
          "Don't miss the Joan of Arc festival each year.",
          "Beaux-Arts museum is a great student-friendly spot on weekends.",
        ],
      },
      {
        title: "Transport",
        description:
          "Public transport via Réseau Astuce local network; bike rentals.",
        tips: [
          "Get a student discount transit card for city buses and trams.",
        ],
      },
      {
        title: "Sports",
        description:
          "University sports facilities: gymnasiums, fields, tennis courts.",
        tips: [
          "Check out university gyms for affordable sports facilities.",
        ],
      },
      {
        title: "Nearby",
        description:
          "Seine valley, Monet’s Giverny within easy train reach.",
        tips: [
          "Take a day-trip to Monet’s Giverny!",
        ],
      },
    ],
    transport: "Metro, bus, TEOR.",
    famousPlaces: "Rouen Cathedral, Gros-Horloge.",
    sportsFacilities: "Kindarena, Seine river walks.",
    studentLife: "Student parties, riverside bars.",
    schoolsCount: schools.filter((s) => s.city === "Rouen").length,
  },
  {
    name: "Reims",
    emoji: "🍾",
    description: "Champagne capital with rich history and student life.",
    localInsights: [
      {
        title: "Transport",
        description: "Public transport (bus & tram), bike/sharing (Vél’hop).",
        tips: [
          "tram/bus offer easy access to all university campuses.",
          "Try Vél’hop for convenient bike-sharing!",
        ],
      },
      {
        title: "Champagne Houses & Events",
        description:
          "Champagne house tours with student discounts; annual national fairs and festivals.",
        tips: [
          "Look for student discount tickets at local Champagne houses.",
          "Habits de Lumière festival in December is a must-see.",
        ],
      },
      {
        title: "Sports",
        description:
          "University gyms, stadiums, aquatic centres.",
        tips: [
          "Check out university gym passes for affordable fitness.",
        ],
      },
      {
        title: "Landmarks",
        description:
          "Reims Cathedral, Palais du Tau; annual festivals.",
        tips: [
          "Festivals and culture are all around the city centre.",
        ],
      },
    ],
    transport: "Tram, bus, TGV to Paris.",
    famousPlaces: "Reims Cathedral, Champagne cellars.",
    sportsFacilities: "Stade Auguste Delaune, local gyms.",
    studentLife: "Festivals, cellar tours, city squares.",
    schoolsCount: schools.filter((s) => s.city === "Reims").length,
  },
  {
    name: "Lille",
    emoji: "🌧️",
    description: "Young, vibrant and friendly in France's north.",
    localInsights: [
      {
        title: "Transport",
        description: "Good tram, metro, bus network; bike-sharing (V’Lille) and TER regional trains.",
        tips: [
          "Try V’Lille for campus commutes.",
          "Use TER regional trains for day trips in northern France.",
        ],
      },
      {
        title: "Sports",
        description: "Multi-venue halls, Stade Pierre-Mauroy, campus gyms.",
        tips: [
          "Check out student discounts at Stade Pierre-Mauroy events.",
        ],
      },
      {
        title: "Culture",
        description: "Vieux Lille cafes, museums (Palais des Beaux-Arts), student-friendly discounts.",
        tips: [
          "Explore Vieux Lille’s cafes for a real local vibe.",
          "Visit Palais des Beaux-Arts with your student ID for reduced entry.",
          "Attend the grand Braderie festival for a unique city-wide market experience.",
        ],
      },
    ],
    transport: "Metro, tram, bus.",
    famousPlaces: "Grand Place, Vieux Lille.",
    sportsFacilities: "Stade Pierre-Mauroy, parks.",
    studentLife: "Nightlife, international students, cheap eats.",
    schoolsCount: schools.filter((s) => s.city === "Lille").length,
  },
  {
    name: "Strasbourg",
    emoji: "🗺️",
    description: "European city with Franco-German heritage.",
    localInsights: [
      {
        title: "Culture & Lifestyle",
        description:
          "Strong Franco-German heritage, world-famous Christmas market.",
        tips: [
          "Visit the European Parliament if you enjoy politics.",
          "Plan for city-crossing tram rides—Strasbourg is cyclist and pedestrian-friendly.",
          "Don't miss the Strasbourg Christmas market.",
        ],
      },
      {
        title: "Events & Outdoors",
        description: "Cross-border EU events, excellent river/canal activities.",
        tips: [
          "Explore riverside walks and canal kayaking.",
        ],
      },
    ],
    transport: "Tram, bus, bikes.",
    famousPlaces: "Petite France, Cathedral, EU Parliament.",
    sportsFacilities: "Stade de la Meinau, Rhenus.",
    studentLife: "Christmas market, cross-border events.",
    schoolsCount: schools.filter((s) => s.city === "Strasbourg").length,
  },
  {
    name: "Bordeaux",
    emoji: "🍇",
    description: "Wine capital by the Atlantic, UNESCO World Heritage.",
    localInsights: [
      {
        title: "Transport",
        description:
          "Tram, bus, bike all provide easy access to university and city nightlife.",
        tips: [
          "Use the TBM app to get real-time transit info.",
          "Bike paths lead along the river—great for leisure rides.",
        ],
      },
      {
        title: "Wine & Culture",
        description:
          "City is famous for wine, festivals, and riverfront events.",
        tips: [
          "Tour Cité du Vin (Wine Museum) with student pricing.",
        ],
      },
      {
        title: "Sports & Outdoor",
        description:
          "Stadium and river activities available for students.",
        tips: [
          "Catch a game or jog at Matmut Atlantique stadium.",
        ],
      },
    ],
    transport: "Tram, bus, bike.",
    famousPlaces: "Place de la Bourse, Cité du Vin.",
    sportsFacilities: "Matmut Atlantique stadium.",
    studentLife: "River festivals, food markets.",
    schoolsCount: schools.filter((s) => s.city === "Bordeaux").length,
  },
  {
    name: "Nice",
    emoji: "🏖️",
    description: "Sunny Riviera, Mediterranean beaches and culture.",
    localInsights: [
      {
        title: "Transport & Outdoors",
        description:
          "Nice tramway, bus, bike-sharing (Vélobleu); coastal and hill hikes nearby.",
        tips: [
          "Use Vélobleu bikes for exploring beach and hill routes.",
          "Catch the tram for quick downtown access.",
        ],
      },
      {
        title: "Sports & Lifestyle",
        description:
          "Mediterranean beaches for swimming, water sports; tennis, student gyms.",
        tips: [
          "Join a campus gym right by the beach.",
          "Try paddleboard or kayak rentals in summer.",
        ],
      },
      {
        title: "Culture & Nearby",
        description:
          "Promenade des Anglais, old town cafés, carnivals, Jazz Festival.",
        tips: [
          "Visit the Nice Jazz Festival every July.",
          "Day-trip to Cannes, Monaco, or Mercantour mountains with fellow students.",
        ],
      },
    ],
    transport: "Tram, bus.",
    famousPlaces: "Promenade des Anglais, Vieux Nice.",
    sportsFacilities: "Beach sports, Stade Allianz Riviera.",
    studentLife: "Seafood, nightlife, international vibe.",
    schoolsCount: schools.filter((s) => s.city === "Nice").length,
  },
  {
    name: "Sophia Antipolis",
    emoji: "🌲",
    description: "Innovative science and tech park near Nice.",
    localInsights: [
      {
        title: "Tech & Transport",
        description:
          "Europe's largest tech park with high density of startups, R&D. Served by Lignes d’Azur buses, good road links, campus bike paths.",
        tips: [
          "Join on-campus innovation clubs for networking.",
          "Bike or bus between different tech campuses.",
        ],
      },
      {
        title: "Sports & Lifestyle",
        description:
          "Nature, hiking trails, Mediterranean micro-climate, fitness culture, local gyms.",
        tips: [
          "Try local fitness classes or join a nature hiking group.",
          "Make the most of Sophia/Valbonne cultural events for students.",
        ],
      },
    ],
    transport: "Bus, car.",
    famousPlaces: "Tech business hubs, close to Antibes beaches.",
    sportsFacilities: "Campus sports, cycling trails.",
    studentLife: "Research, green spaces, student cafés.",
    schoolsCount: schools.filter((s) => s.city === "Sophia Antipolis").length,
  },
  {
    name: "Marseille",
    emoji: "⛵",
    description: "Historic port city on the Mediterranean.",
    localInsights: [
      {
        title: "Transport",
        description:
          "RTM metro, tram, buses; Vélos and Ferries for Frioul & Calanques.",
        tips: [
          "Hop on a ferry for day-trips to Frioul islands or Calanques.",
        ],
      },
      {
        title: "Sports & Outdoors",
        description:
          "Vieux-Port waterfront gyms, water sports (sailing, paddle), student clubs, Stade Vélodrome.",
        tips: [
          "Try out sailing or paddle-boarding with student clubs.",
          "See a match at Stade Vélodrome for true Marseille spirit.",
        ],
      },
      {
        title: "Culture & Events",
        description:
          "Multicultural food, Mucem, concerts; Fête de la Musique June; Fiesta des Suds in October.",
        tips: [
          "Make sure to attend the Fiesta des Suds festival in October.",
        ],
      },
      {
        title: "Outdoors",
        description:
          "Calanques National Park, beaches, hiking routes.",
        tips: [
          "Go hiking in Calanques NP for gorgeous Mediterranean views.",
        ],
      },
    ],
    transport: "Metro, tram, bus, ferry.",
    famousPlaces: "Vieux-Port, Notre-Dame de la Garde.",
    sportsFacilities: "Vélodrome stadium, coastal runs.",
    studentLife: "Diverse cuisine, concerts, seaside venues.",
    schoolsCount: schools.filter((s) => s.city === "Marseille").length,
  },
  {
    name: "Grenoble",
    emoji: "🏔️",
    description: "Alpine student city and innovation hub.",
    localInsights: [
      {
        title: "Transport & Outdoors",
        description:
          "Tram/bus network; bike-sharing. Proximity to Alps for skiing, mountaineering, hiking.",
        tips: [
          "Use bike-sharing to explore parks and campus.",
          "Ski and climbing clubs welcome international students.",
        ],
      },
      {
        title: "Festivals & Student Life",
        description:
          "International events: Fête des Lumières, climbing festivals, Grenoble Jazz Festival.",
        tips: [
          "Attend the Grenoble Jazz Festival and local climbing meets.",
        ],
      },
      {
        title: "Campus & Local Life",
        description:
          "Campus gyms, student mountain sport associations.",
        tips: [
          "Join a mountain sports association for trips to the Alps.",
          "Sample the local beer scene with student friends after ski days.",
        ],
      },
    ],
    transport: "Tram, bus.",
    famousPlaces: "Bastille, cable car, Isère river.",
    sportsFacilities: "Ski, mountain sports, stadium.",
    studentLife: "Ski trips, tech events, outdoor life.",
    schoolsCount: schools.filter((s) => s.city === "Grenoble").length,
  },
  {
    name: "Nantes",
    emoji: "🦑",
    description: "Atlantic city with creative and green spirit.",
    localInsights: [
      {
        title: "Transport",
        description:
          "Tram, bus, Navibus river shuttles; bike-sharing (Bicloo).",
        tips: [
          "Use Bicloo bike-sharing for easy city transport.",
          "Try a Navibus river shuttle ride for a unique commute.",
        ],
      },
      {
        title: "Sports & Student Life",
        description:
          "Université teams, St-Jean football pitches, rowing on Erdre/Loire.",
        tips: [
          "Join a sports team or try rowing in the city rivers.",
        ],
      },
      {
        title: "Culture",
        description:
          "Machines de l’Île, Voyage à Nantes summer art trail. Erasmus community, bar/resto deals, and cheap costs.",
        tips: [
          "Check out the Machines de l’Île for creative inspiration.",
          "Look for Erasmus bar deals and food discounts!",
        ],
      },
    ],
    transport: "Tram, bus, ferry.",
    famousPlaces: "Château des Ducs, Machines de l’Île.",
    sportsFacilities: "Stade de la Beaujoire, riverside parks.",
    studentLife: "Festivals, clubs, local food.",
    schoolsCount: schools.filter((s) => s.city === "Nantes").length,
  },
  {
    name: "La Rochelle",
    emoji: "⚓",
    description: "Coastal charm, eco-friendly and marine studies.",
    localInsights: [
      {
        title: "Transport",
        description:
          "RTC bus, bike paths; Ile de Ré ferry connections.",
        tips: [
          "Take the ferry for day-trips to Ile de Ré.",
          "Bike along coastal paths for ocean views.",
        ],
      },
      {
        title: "Sports & Outdoors",
        description:
          "Sailing, surfing, kayaking; university sports centre.",
        tips: [
          "Join university water sports clubs.",
        ],
      },
      {
        title: "Lifestyle & Festivals",
        description:
          "Port city vibes, beaches; Francofolies music festival July; Tour du Monde student events.",
        tips: [
          "Don’t miss the Francofolies music festival in July.",
          "Check out Tour du Monde for international student culture nights.",
        ],
      },
      {
        title: "Nature & Day Trips",
        description: "Fort Boyard boat tours, Île de Ré day trips.",
        tips: [
          "Book a boat tour to Fort Boyard for a fun weekend.",
        ],
      },
    ],
    transport: "Bus, bike, ferry.",
    famousPlaces: "Old Port, towers, Aquarium.",
    sportsFacilities: "Water sports, yachting, cycling.",
    studentLife: "Seafood, beach, student nights.",
    schoolsCount: schools.filter((s) => s.city === "La Rochelle").length,
  },
];
