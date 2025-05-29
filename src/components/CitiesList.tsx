
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface City {
  id: string;
  name: string;
  region: string;
  description: string;
  schoolsCount: number;
  image: string;
}

const cities: City[] = [
  { 
    id: 'paris', 
    name: 'Paris', 
    region: 'Île-de-France', 
    description: 'The capital city with prestigious business schools and universities',
    schoolsCount: 8,
    image: '🏛️'
  },
  { 
    id: 'lyon', 
    name: 'Lyon', 
    region: 'Auvergne-Rhône-Alpes', 
    description: 'Major business hub with excellent educational institutions',
    schoolsCount: 3,
    image: '🏙️'
  },
  { 
    id: 'reims', 
    name: 'Reims', 
    region: 'Grand Est', 
    description: 'Historic city home to renowned business schools',
    schoolsCount: 2,
    image: '🍾'
  },
  { 
    id: 'rouen', 
    name: 'Rouen', 
    region: 'Normandy', 
    description: 'Cultural center with quality higher education',
    schoolsCount: 2,
    image: '⛪'
  },
  { 
    id: 'cergy', 
    name: 'Cergy-Pontoise', 
    region: 'Île-de-France', 
    description: 'Modern business district near Paris',
    schoolsCount: 1,
    image: '🏢'
  },
  { 
    id: 'fontainebleau', 
    name: 'Fontainebleau', 
    region: 'Île-de-France', 
    description: 'Historic town with world-class business education',
    schoolsCount: 1,
    image: '🏰'
  }
];

interface CitiesListProps {
  onBack: () => void;
  onCitySelect: (cityId: string) => void;
}

export function CitiesList({ onBack, onCitySelect }: CitiesListProps) {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
        <ChevronLeft size={20} />
        Back to Checklist
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Choose Your City</h1>
        <p className="text-gray-600">Explore French cities and their educational opportunities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
          <div
            key={city.id}
            onClick={() => onCitySelect(city.id)}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer group"
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{city.image}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{city.name}</h3>
              <p className="text-sm text-blue-600 mb-2">{city.region}</p>
            </div>
            
            <p className="text-sm text-gray-600 mb-4 text-center">{city.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin size={14} />
                <span>{city.schoolsCount} schools</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
