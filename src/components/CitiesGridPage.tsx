
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, X } from 'lucide-react';

interface City {
  name: string;
  emoji: string;
  description: string;
  schoolCount: number;
  localTips: string;
  localInsights: {
    title: string;
    description: string;
    tips: string[];
  }[];
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
    localTips: 'Local Tips',
    localInsights: [
      {
        title: 'Transportation',
        description: 'Navigate Bordeaux efficiently with trams and buses',
        tips: [
          'Get a TBM monthly pass for unlimited public transport',
          'Use V³ bike-sharing system for short trips',
          'Bordeaux airport connects to city center via shuttle'
        ]
      },
      {
        title: 'Student Life & Culture',
        description: 'Bordeaux offers rich cultural experiences and vibrant student life',
        tips: [
          'Visit the wine museums and vineyards in the region',
          'Join student associations at your university',
          'Explore the historic city center (UNESCO site)'
        ]
      }
    ]
  },
  {
    name: 'Cergy',
    emoji: '🌲',
    description: 'Modern city in Paris\' green belt, lively student hub.',
    schoolCount: 5,
    localTips: 'Local Tips',
    localInsights: [
      {
        title: 'Transportation',
        description: 'Easy access to Paris and surrounding areas',
        tips: [
          'RER A connects directly to central Paris in 45 minutes',
          'Navigo weekly/monthly pass covers all zones',
          'Regular bus services within Cergy-Pontoise'
        ]
      }
    ]
  },
  {
    name: 'Grenoble',
    emoji: '⛰️',
    description: 'Alpine city known for technology and winter sports.',
    schoolCount: 5,
    localTips: 'Local Tips',
    localInsights: [
      {
        title: 'Transportation',
        description: 'Efficient public transport in mountain setting',
        tips: [
          'TAG network covers trams, buses throughout the city',
          'Student discounts available for ski resorts',
          'Cable car (Bastille) offers scenic city views'
        ]
      }
    ]
  },
  {
    name: 'Lille',
    emoji: '🏢',
    description: 'Young, vibrant and friendly in France\'s north.',
    schoolCount: 0,
    localTips: 'Local Tips',
    localInsights: [
      {
        title: 'Transportation',
        description: 'Well-connected northern French city',
        tips: [
          'Metro and bus network covers greater Lille area',
          'High-speed trains to Paris, Brussels, London',
          'Student transport discounts available'
        ]
      }
    ]
  },
  {
    name: 'Lyon',
    emoji: '🦁',
    description: 'France\'s culinary capital and student city.',
    schoolCount: 5,
    localTips: 'Local Tips',
    localInsights: [
      {
        title: 'Transportation',
        description: 'Excellent public transport network',
        tips: [
          'TCL network: metro, trams, buses, funiculars',
          'Vélo\'v bike-sharing system throughout the city',
          'TER trains connect to nearby cities and ski resorts'
        ]
      }
    ]
  },
  {
    name: 'Marseille',
    emoji: '⛵',
    description: 'Mediterranean port city with rich multicultural heritage.',
    schoolCount: 5,
    localTips: 'Local Tips',
    localInsights: [
      {
        title: 'Transportation',
        description: 'Coastal city transport options',
        tips: [
          'RTM metro, trams, and buses cover the metropolitan area',
          'Ferry connections to Corsica and North Africa',
          'Airport shuttle connects to city center'
        ]
      }
    ]
  },
  {
    name: 'Nice',
    emoji: '🏖️',
    description: 'Sunny Riviera, Mediterranean beaches and culture.',
    schoolCount: 5,
    localTips: 'Local Tips',
    localInsights: [
      {
        title: 'Transportation',
        description: 'French Riviera transport hub',
        tips: [
          'Tram and bus network covers Nice and surroundings',
          'Train connections along the Mediterranean coast',
          'Nice Côte d\'Azur Airport serves international destinations'
        ]
      }
    ]
  },
  {
    name: 'Paris',
    emoji: '🗼',
    description: 'The heart of France – rich history, fashion, and art.',
    schoolCount: 5,
    localTips: 'Local Tips',
    localInsights: [
      {
        title: 'Transportation',
        description: 'Navigate Paris efficiently with metro, buses, bikes, and intercity options',
        tips: [
          'Get a Navigo card (€350/year student pass) via the Île-de-France Mobilités app for unlimited Métro, bus, and tram travel',
          'Use Vélib\' bikes through the Vélib\' Métropole app for short trips',
          'FlixBus connects to Lyon, Toulouse, and more from Paris-Bercy Seine—book via the FlixBus app (from €5)',
          'SNCF TGV trains to other cities (e.g., Lyon in 2 hours) via SNCF Connect app'
        ]
      },
      {
        title: 'Student Life & Culture',
        description: 'Paris blends historic charm with a vibrant student scene',
        tips: [
          'Use your student ID for discounts (e.g., €10 at Louvre vs €17 full price)',
          'Join student organizations at your university',
          'Explore free museums on first Sunday mornings',
          'Take advantage of student meal plans at CROUS cafeterias'
        ]
      }
    ]
  },
  {
    name: 'Reims',
    emoji: '🍾',
    description: 'Champagne capital with rich history and student life.',
    schoolCount: 5,
    localTips: 'Local Tips',
    localInsights: [
      {
        title: 'Transportation',
        description: 'Historic city with good connections',
        tips: [
          'Citura bus network covers the city',
          'TGV connections to Paris in 45 minutes',
          'Regional trains to other Champagne towns'
        ]
      }
    ]
  },
  {
    name: 'Rouen',
    emoji: '🏰',
    description: 'Medieval history on the Seine, lively student city.',
    schoolCount: 5,
    localTips: 'Local Tips',
    localInsights: [
      {
        title: 'Transportation',
        description: 'Norman capital transport options',
        tips: [
          'TEOR bus rapid transit and regular bus lines',
          'Trains to Paris in 1.5 hours',
          'Ferry connections to England via nearby ports'
        ]
      }
    ]
  },
  {
    name: 'Sophia Antipolis',
    emoji: '🌲',
    description: 'Innovative science and tech park near Nice.',
    schoolCount: 4,
    localTips: 'Local Tips',
    localInsights: [
      {
        title: 'Transportation',
        description: 'Tech hub transport connections',
        tips: [
          'Bus connections to Nice and surrounding areas',
          'Car-sharing services popular in tech community',
          'Bike paths throughout the technology park'
        ]
      }
    ]
  },
  {
    name: 'Strasbourg',
    emoji: '🏛️',
    description: 'European city with Franco-German heritage.',
    schoolCount: 5,
    localTips: 'Local Tips',
    localInsights: [
      {
        title: 'Transportation',
        description: 'European capital transport hub',
        tips: [
          'CTS tram and bus network covers the metropolitan area',
          'Vélhop bike-sharing system',
          'Direct trains to Germany and other European cities'
        ]
      }
    ]
  },
  {
    name: 'Toulouse',
    emoji: '🚀',
    description: 'Pink city, aerospace hub with vibrant student life.',
    schoolCount: 0,
    localTips: 'Local Tips',
    localInsights: [
      {
        title: 'Transportation',
        description: 'Aerospace city transport network',
        tips: [
          'Tisséo metro, trams, and buses',
          'VélôToulouse bike-sharing system',
          'Airport connections to major European cities'
        ]
      }
    ]
  }
];

const programs = [
  'All Programs',
  'Business & Management',
  'Engineering',
  'Computer Science',
  'Arts & Design',
  'Medicine & Health',
  'Social Sciences',
  'Languages & Literature'
];

export const CitiesGridPage: React.FC<CitiesGridPageProps> = ({ onCitySelect }) => {
  const [selectedProgram, setSelectedProgram] = useState('All Programs');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const filteredCities = selectedProgram === 'All Programs' 
    ? cities 
    : cities.filter(city => {
        // This is a placeholder filter - in a real app, you'd filter based on actual program data
        return city.schoolCount > 0;
      });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Study Destination</h1>
        <p className="text-lg text-gray-600 mb-6">
          Explore French cities and discover schools that match your academic goals
        </p>
        
        {/* Program Filter */}
        <div className="max-w-xs mx-auto">
          <Select value={selectedProgram} onValueChange={setSelectedProgram}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by program" />
            </SelectTrigger>
            <SelectContent>
              {programs.map((program) => (
                <SelectItem key={program} value={program}>
                  {program}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCities.map((city) => (
          <Card 
            key={city.name} 
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1 border border-gray-200"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{city.emoji}</span>
                  <h3 className="text-lg font-bold text-gray-900">{city.name}</h3>
                </div>
                <ArrowRight 
                  className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors cursor-pointer" 
                  onClick={() => onCitySelect(city.name)}
                />
              </div>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {city.description}
              </p>
              
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1">
                  {city.schoolCount} Schools
                </Badge>
                <Dialog>
                  <DialogTrigger asChild>
                    <Badge 
                      variant="outline" 
                      className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 cursor-pointer text-xs font-medium px-2 py-1"
                      onClick={() => setSelectedCity(city)}
                    >
                      {city.localTips}
                    </Badge>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <span className="text-2xl">{city.emoji}</span>
                        Local Insights for {city.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 mt-4">
                      {city.localInsights.map((insight, index) => (
                        <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {insight.title}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {insight.description}
                          </p>
                          <ul className="space-y-2">
                            {insight.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="text-blue-600 font-bold">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
