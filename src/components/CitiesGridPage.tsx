
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight } from 'lucide-react';

interface City {
  name: string;
  emoji: string;
  description: string;
  schoolCount: number;
}

interface CitiesGridPageProps {
  onCitySelect: (cityName: string) => void;
}

const cities: City[] = [
  {
    name: 'Bordeaux',
    emoji: '🍇',
    description: 'Wine capital by the Atlantic, UNESCO World Heritage.',
    schoolCount: 5
  },
  {
    name: 'Cergy',
    emoji: '🌲',
    description: 'Modern city in Paris\' green belt, lively student hub.',
    schoolCount: 5
  },
  {
    name: 'Grenoble',
    emoji: '⛰️',
    description: 'Alpine city known for technology and winter sports.',
    schoolCount: 5
  },
  {
    name: 'Lille',
    emoji: '🏢',
    description: 'Young, vibrant and friendly in France\'s north.',
    schoolCount: 0
  },
  {
    name: 'Lyon',
    emoji: '🦁',
    description: 'France\'s culinary capital and student city.',
    schoolCount: 5
  },
  {
    name: 'Marseille',
    emoji: '⛵',
    description: 'Mediterranean port city with rich multicultural heritage.',
    schoolCount: 5
  },
  {
    name: 'Nice',
    emoji: '🏖️',
    description: 'Sunny Riviera, Mediterranean beaches and culture.',
    schoolCount: 5
  },
  {
    name: 'Paris',
    emoji: '🗼',
    description: 'The heart of France – rich history, fashion, and art.',
    schoolCount: 5
  },
  {
    name: 'Reims',
    emoji: '🍾',
    description: 'Champagne capital with rich history and student life.',
    schoolCount: 5
  },
  {
    name: 'Rouen',
    emoji: '🏰',
    description: 'Medieval history on the Seine, lively student city.',
    schoolCount: 5
  },
  {
    name: 'Sophia Antipolis',
    emoji: '🌲',
    description: 'Innovative science and tech park near Nice.',
    schoolCount: 4
  },
  {
    name: 'Strasbourg',
    emoji: '🏛️',
    description: 'European city with Franco-German heritage.',
    schoolCount: 5
  },
  {
    name: 'Toulouse',
    emoji: '🚀',
    description: 'Pink city, aerospace hub with vibrant student life.',
    schoolCount: 0
  }
];

export const CitiesGridPage: React.FC<CitiesGridPageProps> = ({ onCitySelect }) => {
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
            onClick={() => onCitySelect(city.name)}
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
                >
                  Local Tips
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
