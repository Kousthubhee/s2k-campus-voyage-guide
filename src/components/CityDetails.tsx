
import { ChevronLeft, ChevronRight, MapPin, Users, Coffee, Home, Car, Euro } from 'lucide-react';

interface School {
  id: string;
  name: string;
  type: string;
  ranking: string;
}

interface LocalInsight {
  icon: any;
  title: string;
  description: string;
}

interface CityData {
  id: string;
  name: string;
  region: string;
  description: string;
  population: string;
  schools: School[];
  localInsights: LocalInsight[];
  averageRent: string;
  publicTransport: string;
}

const citiesData: CityData[] = [
  {
    id: 'paris',
    name: 'Paris',
    region: 'Île-de-France',
    description: 'The capital and largest city of France, known for its culture, fashion, and world-renowned educational institutions.',
    population: '2.1 million',
    averageRent: '€800-1200/month',
    publicTransport: 'Excellent metro system',
    schools: [
      { id: 'hec', name: 'HEC Paris', type: 'Business School', ranking: '#1 in France' },
      { id: 'essec', name: 'ESSEC Business School', type: 'Business School', ranking: 'Top 3 in France' },
      { id: 'sciences-po', name: 'Sciences Po', type: 'Political Science', ranking: 'Top University' },
    ],
    localInsights: [
      { icon: Coffee, title: 'Café Culture', description: 'Enjoy the famous Parisian café culture. Perfect for studying and socializing.' },
      { icon: Car, title: 'Transportation', description: 'Excellent public transport. Get a Navigo monthly pass for unlimited travel.' },
      { icon: Home, title: 'Housing', description: 'Use CROUS for student housing or look into shared apartments in the suburbs.' },
      { icon: Euro, title: 'Cost of Living', description: 'Higher than other French cities. Budget around €1000-1500/month total.' }
    ]
  },
  {
    id: 'lyon',
    name: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    description: 'France\'s second-largest city, known for its cuisine, culture, and strong business education.',
    population: '515,000',
    averageRent: '€500-800/month',
    publicTransport: 'Metro, tram, and bus system',
    schools: [
      { id: 'emlyon', name: 'emlyon business school', type: 'Business School', ranking: 'Top 5 in France' },
      { id: 'iae-lyon', name: 'IAE Lyon', type: 'Business School', ranking: 'Top Public Business School' },
    ],
    localInsights: [
      { icon: Coffee, title: 'Food Capital', description: 'Lyon is the gastronomic capital of France. Enjoy traditional bouchons.' },
      { icon: Car, title: 'Transport', description: 'Efficient TCL network. Student discounts available on monthly passes.' },
      { icon: Home, title: 'Student Life', description: 'Vibrant student areas like Presqu\'île and Vieux Lyon.' },
      { icon: Euro, title: 'Affordability', description: 'More affordable than Paris. Budget around €700-1000/month.' }
    ]
  }
];

interface CityDetailsProps {
  cityId: string;
  onBack: () => void;
  onSchoolSelect: (schoolId: string) => void;
}

export function CityDetails({ cityId, onBack, onSchoolSelect }: CityDetailsProps) {
  const city = citiesData.find(c => c.id === cityId);

  if (!city) {
    return (
      <div className="p-6">
        <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
          <ChevronLeft size={20} />
          Back to Cities
        </button>
        <p>City not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
        <ChevronLeft size={20} />
        Back to Cities
      </button>

      {/* City Header */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="s2k-gradient p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">{city.name}</h1>
          <p className="text-lg opacity-90 mb-4">{city.region}</p>
          <p className="opacity-80">{city.description}</p>
          <div className="flex flex-wrap gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>{city.population} residents</span>
            </div>
            <div className="flex items-center gap-2">
              <Home size={16} />
              <span>{city.averageRent}</span>
            </div>
            <div className="flex items-center gap-2">
              <Car size={16} />
              <span>{city.publicTransport}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Schools */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Schools in {city.name}</h2>
          <div className="space-y-4">
            {city.schools.map((school) => (
              <div
                key={school.id}
                onClick={() => onSchoolSelect(school.id)}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{school.name}</h3>
                    <div className="flex gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{school.type}</span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{school.ranking}</span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Insights */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Local Insights</h2>
          <div className="space-y-4">
            {city.localInsights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Icon size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{insight.title}</h3>
                      <p className="text-sm text-gray-600">{insight.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
