
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, MapPin, GraduationCap, Info } from 'lucide-react';

interface City {
  name: string;
  emoji: string;
  description: string;
  schoolCount: number;
  programs: string[];
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
    name: 'Paris',
    emoji: '🗼',
    description: 'Capital of France with world-class universities and cultural heritage',
    schoolCount: 25,
    programs: ['Business & Management', 'Engineering', 'Arts & Design', 'Medicine & Health'],
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
    name: 'Lyon',
    emoji: '🦁',
    description: 'France\'s culinary capital and major student city',
    schoolCount: 18,
    programs: ['Business & Management', 'Engineering', 'Medicine & Health', 'Social Sciences'],
    localInsights: [
      {
        title: 'Transportation',
        description: 'Excellent public transport network',
        tips: [
          'TCL network: metro, trams, buses, funiculars',
          'Vélo\'v bike-sharing system throughout the city',
          'TER trains connect to nearby cities and ski resorts'
        ]
      },
      {
        title: 'Cost of Living',
        description: 'More affordable than Paris with excellent quality of life',
        tips: [
          'Average rent: €400-600 for student housing',
          'Excellent student restaurants (RU) at €3.30 per meal',
          'Part-time work opportunities in hospitality and retail'
        ]
      }
    ]
  },
  {
    name: 'Marseille',
    emoji: '⛵',
    description: 'Mediterranean port city with diverse academic programs',
    schoolCount: 12,
    programs: ['Engineering', 'Medicine & Health', 'Languages & Literature', 'Social Sciences'],
    localInsights: [
      {
        title: 'Transportation',
        description: 'Coastal city transport options',
        tips: [
          'RTM metro, trams, and buses cover the metropolitan area',
          'Ferry connections to Corsica and North Africa',
          'Airport shuttle connects to city center'
        ]
      },
      {
        title: 'Student Life',
        description: 'Vibrant Mediterranean lifestyle',
        tips: [
          'Beach access for outdoor activities year-round',
          'Diverse cultural scene with international influences',
          'Lower cost of living compared to Paris and Lyon'
        ]
      }
    ]
  },
  {
    name: 'Toulouse',
    emoji: '🚀',
    description: 'Pink city and aerospace hub with vibrant student life',
    schoolCount: 15,
    programs: ['Engineering', 'Computer Science', 'Business & Management', 'Languages & Literature'],
    localInsights: [
      {
        title: 'Transportation',
        description: 'Aerospace city transport network',
        tips: [
          'Tisséo metro, trams, and buses',
          'VélôToulouse bike-sharing system',
          'Airport connections to major European cities'
        ]
      },
      {
        title: 'Industry Connections',
        description: 'Strong ties to aerospace and technology sectors',
        tips: [
          'Internship opportunities at Airbus and other aerospace companies',
          'Tech startup ecosystem for computer science students',
          'Research partnerships with CNES (French Space Agency)'
        ]
      }
    ]
  },
  {
    name: 'Nice',
    emoji: '🏖️',
    description: 'French Riviera destination with international programs',
    schoolCount: 8,
    programs: ['Business & Management', 'Arts & Design', 'Languages & Literature'],
    localInsights: [
      {
        title: 'Transportation',
        description: 'French Riviera transport hub',
        tips: [
          'Tram and bus network covers Nice and surroundings',
          'Train connections along the Mediterranean coast',
          'Nice Côte d\'Azur Airport serves international destinations'
        ]
      },
      {
        title: 'International Environment',
        description: 'Multicultural student community',
        tips: [
          'High concentration of international students',
          'English-taught programs available',
          'Networking opportunities with global business community'
        ]
      }
    ]
  },
  {
    name: 'Strasbourg',
    emoji: '🏛️',
    description: 'European capital with Franco-German heritage',
    schoolCount: 10,
    programs: ['Social Sciences', 'Languages & Literature', 'Medicine & Health', 'Engineering'],
    localInsights: [
      {
        title: 'European Opportunities',
        description: 'Gateway to European institutions and careers',
        tips: [
          'Internships at European Parliament and Council of Europe',
          'Strong German language programs and exchange opportunities',
          'Cross-border study programs with German universities'
        ]
      },
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
    : cities.filter(city => city.programs.includes(selectedProgram));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Study Destination in France
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Explore French cities and discover the perfect place for your academic journey
        </p>
        
        {/* Filter */}
        <div className="flex justify-center mb-8">
          <div className="w-80">
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Filter by program" />
              </SelectTrigger>
              <SelectContent>
                {programs.map((program) => (
                  <SelectItem key={program} value={program} className="text-base py-3">
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCities.map((city) => (
          <Card 
            key={city.name} 
            className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg overflow-hidden"
            onClick={() => onCitySelect(city.name)}
          >
            <CardContent className="p-0">
              {/* City Header */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{city.emoji}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{city.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>France</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  {city.description}
                </p>
                
                <div className="flex items-center gap-4">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    {city.schoolCount} Schools
                  </Badge>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white hover:bg-gray-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCity(city);
                        }}
                      >
                        <Info className="h-4 w-4 mr-1" />
                        Local Tips
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3 text-2xl">
                          <span className="text-3xl">{city.emoji}</span>
                          Local Insights for {city.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-8 mt-6">
                        {city.localInsights.map((insight, index) => (
                          <div key={index} className="border-l-4 border-blue-500 pl-6 pb-6 border-b border-gray-100 last:border-b-0">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                              {insight.title}
                            </h3>
                            <p className="text-gray-600 mb-4 text-lg">
                              {insight.description}
                            </p>
                            <div className="grid gap-3">
                              {insight.tips.map((tip, tipIndex) => (
                                <div key={tipIndex} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-700 leading-relaxed">{tip}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              {/* Programs */}
              <div className="p-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Popular Programs</h4>
                <div className="flex flex-wrap gap-2">
                  {city.programs.slice(0, 3).map((program, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs px-2 py-1">
                      {program}
                    </Badge>
                  ))}
                  {city.programs.length > 3 && (
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      +{city.programs.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCities.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏫</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No cities found</h3>
          <p className="text-gray-600">Try selecting a different program filter</p>
        </div>
      )}
    </div>
  );
};
