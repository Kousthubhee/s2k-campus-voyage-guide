
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { InsightsDialog } from './school-insights/InsightsDialog';

interface LocalInsight {
  id: string;
  type: string;
  title: string;
  description: string;
}

interface City {
  name: string;
  emoji: string;
  description: string;
  schoolCount: number;
  transport?: string;
  famousPlaces?: string;
  sportsFacilities?: string;
  studentLife?: string;
  localInsights?: LocalInsight[];
}

interface CitiesGridPageProps {
  onCitySelect: (cityName: string) => void;
}

const cities: City[] = [
  {
    name: 'Bordeaux',
    emoji: '🍇',
    description: 'Wine capital by the Atlantic, UNESCO World Heritage.',
    schoolCount: 5,
    transport: 'TBM tram and bus network covers the city efficiently. Vélo3 bike-sharing system available.',
    famousPlaces: 'Place de la Bourse, Cité du Vin, Saint-André Cathedral, Rue Sainte-Catherine shopping street.',
    sportsFacilities: 'Matmut Atlantique stadium, numerous tennis clubs, Golf de Bordeaux-Lac.',
    studentLife: 'Vibrant nightlife in Saint-Pierre district, many student bars and cafés.',
    localInsights: [
      {
        id: '1',
        type: 'transport',
        title: 'TBM Monthly Pass',
        description: 'Students get discounted monthly passes for €30. The tram system connects major universities efficiently.'
      },
      {
        id: '2',
        type: 'events',
        title: 'Bordeaux Wine Festival',
        description: 'Biennial wine festival held in June along the Garonne River with free tastings and cultural events.'
      },
      {
        id: '3',
        type: 'student',
        title: 'Student Housing',
        description: 'CROUS provides affordable student housing. Popular student areas include Victoire and Saint-Michel.'
      }
    ]
  },
  {
    name: 'Cergy',
    emoji: '🌲',
    description: 'Modern city in Paris\' green belt, lively student hub.',
    schoolCount: 5,
    transport: 'RER A line connects directly to Paris center. Local bus network serves the new town.',
    famousPlaces: 'Cergy-Pontoise Cathedral, Axe majeur modern art installation, Île de loisirs recreation area.',
    sportsFacilities: 'Base de loisirs with water sports, Golf de Cergy, modern sports complexes.',
    studentLife: 'Active university life with student associations, modern campus facilities.',
    localInsights: [
      {
        id: '1',
        type: 'transport',
        title: 'Navigo Student Discount',
        description: 'Students under 27 get 50% off monthly Navigo passes. RER A provides direct access to Paris.'
      },
      {
        id: '2',
        type: 'places',
        title: 'Île de Loisirs',
        description: 'Large recreation area with beaches, water sports, and outdoor activities perfect for students.'
      }
    ]
  },
  {
    name: 'Grenoble',
    emoji: '⛰️',
    description: 'Alpine city known for technology and winter sports.',
    schoolCount: 5,
    transport: 'TAG tram and bus network. Cable car to Bastille fortress. Proximity to ski resorts.',
    famousPlaces: 'Bastille fortress, Musée de Grenoble, Place Grenette, Parc Paul Mistral.',
    sportsFacilities: 'Numerous ski resorts nearby, Olympic facilities, climbing walls, ice rinks.',
    studentLife: 'Major university city with vibrant student life, mountain sports clubs.',
    localInsights: [
      {
        id: '1',
        type: 'transport',
        title: 'TAG Student Pass',
        description: 'Discounted monthly transport pass for students. Free cable car rides to Bastille with student ID.'
      },
      {
        id: '2',
        type: 'sports',
        title: 'Winter Sports Access',
        description: 'Student discounts at nearby ski resorts. University ski club organizes regular trips.'
      },
      {
        id: '3',
        type: 'events',
        title: 'Festival of Lights',
        description: 'Annual December festival illuminating the city with artistic light installations.'
      }
    ]
  },
  {
    name: 'Lille',
    emoji: '🏢',
    description: 'Young, vibrant and friendly in France\'s north.',
    schoolCount: 0,
    transport: 'Metro, tramway, and bus network. High-speed trains to Paris, Brussels, and London.',
    famousPlaces: 'Grand Place, Palais des Beaux-Arts, Vieux-Lille historic district.',
    sportsFacilities: 'Pierre-Mauroy stadium, numerous sports clubs, proximity to Belgian cycling routes.',
    studentLife: 'Large student population, affordable living, active nightlife in Vieux-Lille.',
    localInsights: [
      {
        id: '1',
        type: 'transport',
        title: 'Ilevia Student Rates',
        description: 'Reduced fare transport passes for students. Direct high-speed rail to major European cities.'
      },
      {
        id: '2',
        type: 'events',
        title: 'Braderie de Lille',
        description: 'Europe\'s largest flea market held annually in September, attracting millions of visitors.'
      }
    ]
  },
  {
    name: 'Lyon',
    emoji: '🦁',
    description: 'France\'s culinary capital and student city.',
    schoolCount: 5,
    transport: 'TCL metro, tram, and bus network. High-speed rail connections to major cities.',
    famousPlaces: 'Vieux Lyon, Basilique Notre-Dame de Fourvière, Parc de la Tête d\'Or.',
    sportsFacilities: 'Groupama Stadium, numerous sports clubs, proximity to Alps and outdoor activities.',
    studentLife: 'Large student population, famous food scene, vibrant cultural life.',
    localInsights: [
      {
        id: '1',
        type: 'transport',
        title: 'TCL Student Pass',
        description: 'Discounted monthly transport passes for students under 27. Extensive metro and tram network.'
      },
      {
        id: '2',
        type: 'events',
        title: 'Festival of Lights',
        description: 'Famous December festival where the entire city is illuminated with artistic light displays.'
      },
      {
        id: '3',
        type: 'student',
        title: 'Student Food Scene',
        description: 'Numerous student-friendly bouchons (traditional restaurants) and affordable food markets.'
      }
    ]
  },
  {
    name: 'Marseille',
    emoji: '⛵',
    description: 'Mediterranean port city with rich multicultural heritage.',
    schoolCount: 5,
    transport: 'RTM metro, tram, and bus network. Ferry connections to Corsica and North Africa.',
    famousPlaces: 'Vieux-Port, Notre-Dame de la Garde, Calanques National Park.',
    sportsFacilities: 'Stade Vélodrome, water sports facilities, hiking in nearby Calanques.',
    studentLife: 'Diverse student population, Mediterranean lifestyle, active cultural scene.',
    localInsights: [
      {
        id: '1',
        type: 'transport',
        title: 'RTM Student Discounts',
        description: 'Reduced rate metro and bus passes for students. Ferry connections for weekend trips.'
      },
      {
        id: '2',
        type: 'places',
        title: 'Calanques Access',
        description: 'Easy access to stunning limestone cliffs and beaches perfect for hiking and swimming.'
      },
      {
        id: '3',
        type: 'events',
        title: 'Marseille Music Festivals',
        description: 'Various music festivals throughout the year, including electronic music and world music events.'
      }
    ]
  },
  {
    name: 'Nice',
    emoji: '🏖️',
    description: 'Sunny Riviera, Mediterranean beaches and culture.',
    schoolCount: 5,
    transport: 'Tramway and bus network. Nice Côte d\'Azur Airport for international connections.',
    famousPlaces: 'Promenade des Anglais, Vieux-Nice, Cours Saleya market, Castle Hill.',
    sportsFacilities: 'Beach volleyball, water sports, hiking in nearby mountains.',
    studentLife: 'Relaxed Mediterranean lifestyle, international student community.',
    localInsights: [
      {
        id: '1',
        type: 'transport',
        title: 'Lignes d\'Azur Student Pass',
        description: 'Discounted tram and bus passes for students. Easy access to Monaco and Cannes.'
      },
      {
        id: '2',
        type: 'events',
        title: 'Nice Carnival',
        description: 'Famous annual carnival in February with parades, flowers, and festivities.'
      },
      {
        id: '3',
        type: 'student',
        title: 'International Community',
        description: 'Large international student population with various cultural exchanges and events.'
      }
    ]
  },
  {
    name: 'Paris',
    emoji: '🗼',
    description: 'The heart of France – rich history, fashion, and art.',
    schoolCount: 5,
    transport: 'Extensive metro, RER, bus, and tram network. Vélib\' bike-sharing system.',
    famousPlaces: 'Eiffel Tower, Louvre Museum, Notre-Dame, Champs-Élysées, Latin Quarter.',
    sportsFacilities: 'Numerous sports clubs, public swimming pools, parks for jogging.',
    studentLife: 'Largest student population in France, countless cultural activities and events.',
    localInsights: [
      {
        id: '1',
        type: 'transport',
        title: 'Navigo Student Discount',
        description: 'Students under 27 get 50% off monthly Navigo passes. Extensive public transport network.'
      },
      {
        id: '2',
        type: 'student',
        title: 'Student Housing',
        description: 'CROUS provides affordable student housing. Many student residences in suburbs with metro access.'
      },
      {
        id: '3',
        type: 'events',
        title: 'Nuit Blanche',
        description: 'Annual all-night arts festival in October with free access to museums and cultural venues.'
      }
    ]
  },
  {
    name: 'Reims',
    emoji: '🍾',
    description: 'Champagne capital with rich history and student life.',
    schoolCount: 5,
    transport: 'Citura bus and tram network. TGV connections to Paris in 45 minutes.',
    famousPlaces: 'Reims Cathedral, Champagne houses, Palace of Tau, Saint-Remi Basilica.',
    sportsFacilities: 'Stade Auguste-Delaune, sports complexes, nearby Champagne vineyards for cycling.',
    studentLife: 'Growing student population, champagne culture, historic charm.',
    localInsights: [
      {
        id: '1',
        type: 'transport',
        title: 'Citura Student Pass',
        description: 'Discounted bus and tram passes for students. Fast TGV connections to Paris.'
      },
      {
        id: '2',
        type: 'events',
        title: 'Champagne Harvest Festival',
        description: 'Annual harvest celebration in September with vineyard tours and tastings.'
      },
      {
        id: '3',
        type: 'places',
        title: 'Champagne House Tours',
        description: 'Student discounts available for tours of famous champagne houses like Veuve Clicquot.'
      }
    ]
  },
  {
    name: 'Rouen',
    emoji: '🏰',
    description: 'Medieval history on the Seine, lively student city.',
    schoolCount: 5,
    transport: 'TCAR bus network and upcoming tram system. Easy access to Paris by train.',
    famousPlaces: 'Rouen Cathedral, Gros-Horloge, Place du Vieux-Marché, Joan of Arc sites.',
    sportsFacilities: 'Sports complexes, Seine riverfront for running, nearby forests for hiking.',
    studentLife: 'Historic student city with active nightlife, affordable living costs.',
    localInsights: [
      {
        id: '1',
        type: 'transport',
        title: 'TCAR Student Rates',
        description: 'Reduced bus fares for students. New tram system launching soon for better connectivity.'
      },
      {
        id: '2',
        type: 'events',
        title: 'Joan of Arc Festival',
        description: 'Annual May festival celebrating Joan of Arc with parades, medieval shows, and historical reenactments.'
      },
      {
        id: '3',
        type: 'student',
        title: 'Student Quarter',
        description: 'Active student life around Place du Vieux-Marché with affordable bars and restaurants.'
      }
    ]
  },
  {
    name: 'Sophia Antipolis',
    emoji: '🌲',
    description: 'Innovative science and tech park near Nice.',
    schoolCount: 4,
    transport: 'Bus connections to Nice and Cannes. Car-friendly technology park layout.',
    famousPlaces: 'Technology park, nearby Antibes old town, proximity to Nice and Cannes.',
    sportsFacilities: 'Modern sports facilities, golf courses, hiking trails, proximity to beaches.',
    studentLife: 'Tech-focused student community, modern facilities, international atmosphere.',
    localInsights: [
      {
        id: '1',
        type: 'transport',
        title: 'Tech Park Shuttle',
        description: 'Free shuttle buses connect different parts of the technology park and nearby cities.'
      },
      {
        id: '2',
        type: 'student',
        title: 'Tech Innovation Hub',
        description: 'Numerous internship and job opportunities in technology companies and startups.'
      }
    ]
  },
  {
    name: 'Strasbourg',
    emoji: '🏛️',
    description: 'European city with Franco-German heritage.',
    schoolCount: 5,
    transport: 'CTS tram and bus network. Cross-border connections to Germany.',
    famousPlaces: 'Strasbourg Cathedral, Petite France, European Parliament, Barrage Vauban.',
    sportsFacilities: 'Sports complexes, Rhine river activities, proximity to Black Forest.',
    studentLife: 'Major European student exchange hub, multicultural atmosphere.',
    localInsights: [
      {
        id: '1',
        type: 'transport',
        title: 'CTS Student Pass',
        description: 'Discounted tram and bus passes for students. Easy cross-border travel to Germany.'
      },
      {
        id: '2',
        type: 'events',
        title: 'Strasbourg Christmas Market',
        description: 'One of France\'s oldest Christmas markets, running from late November to December.'
      },
      {
        id: '3',
        type: 'student',
        title: 'European Exchange Hub',
        description: 'Major destination for European student exchanges with international student services.'
      }
    ]
  },
  {
    name: 'Toulouse',
    emoji: '🚀',
    description: 'Pink city, aerospace hub with vibrant student life.',
    schoolCount: 0,
    transport: 'Tisséo metro, tram, and bus network. Canal du Midi for cycling.',
    famousPlaces: 'Capitole square, Basilique Saint-Sernin, Cité de l\'espace, Airbus facilities.',
    sportsFacilities: 'Stadium de Toulouse, numerous sports clubs, Canal du Midi for cycling.',
    studentLife: 'Large student population, aerospace industry connections, vibrant nightlife.',
    localInsights: [
      {
        id: '1',
        type: 'transport',
        title: 'Tisséo Student Pass',
        description: 'Discounted metro and bus passes for students. Extensive public transport network.'
      },
      {
        id: '2',
        type: 'events',
        title: 'Toulouse Space Festival',
        description: 'Annual festival celebrating aerospace industry with exhibitions and conferences.'
      },
      {
        id: '3',
        type: 'student',
        title: 'Aerospace Opportunities',
        description: 'Major aerospace hub with internship and job opportunities at Airbus and other companies.'
      }
    ]
  }
];

export const CitiesGridPage: React.FC<CitiesGridPageProps> = ({ onCitySelect }) => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [showInsightsDialog, setShowInsightsDialog] = useState(false);

  const handleCitySelect = (cityName: string) => {
    onCitySelect(cityName);
  };

  const handleShowInsights = (city: City, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedCity(city);
    setShowInsightsDialog(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Study Destination</h1>
        <p className="text-lg text-gray-600">
          Explore French cities and discover schools that match your academic goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cities.map((city) => (
          <Card 
            key={city.name} 
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
            onClick={() => handleCitySelect(city.name)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{city.emoji}</span>
                  <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {city.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {city.schoolCount} Schools
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  onClick={(e) => handleShowInsights(city, e)}
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  Local Tips
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCity && (
        <InsightsDialog
          open={showInsightsDialog}
          onOpenChange={setShowInsightsDialog}
          cityName={selectedCity.name}
          localInsights={selectedCity.localInsights || []}
          transport={selectedCity.transport || ''}
          famousPlaces={selectedCity.famousPlaces || ''}
          sportsFacilities={selectedCity.sportsFacilities || ''}
          studentLife={selectedCity.studentLife || ''}
        />
      )}
    </div>
  );
};
