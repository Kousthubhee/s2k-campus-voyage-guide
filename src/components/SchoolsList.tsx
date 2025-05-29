
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface School {
  id: string;
  name: string;
  location: string;
  type: string;
  ranking: string;
}

const schools: School[] = [
  { id: 'neoma', name: 'NEOMA Business School', location: 'Reims, Rouen', type: 'Business School', ranking: 'Top 10 in France' },
  { id: 'emlyon', name: 'emlyon business school', location: 'Lyon, Paris', type: 'Business School', ranking: 'Top 5 in France' },
  { id: 'essec', name: 'ESSEC Business School', location: 'Cergy-Pontoise', type: 'Business School', ranking: 'Top 3 in France' },
  { id: 'hec', name: 'HEC Paris', location: 'Jouy-en-Josas', type: 'Business School', ranking: '#1 in France' },
  { id: 'insead', name: 'INSEAD', location: 'Fontainebleau', type: 'Business School', ranking: 'Global Top 10' },
  { id: 'sciences-po', name: 'Sciences Po', location: 'Paris', type: 'Political Science', ranking: 'Top University' }
];

interface SchoolsListProps {
  onBack: () => void;
  onSchoolSelect: (schoolId: string) => void;
}

export function SchoolsList({ onBack, onSchoolSelect }: SchoolsListProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
        <ChevronLeft size={20} />
        Back to Checklist
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">French Business Schools</h1>
        <p className="text-gray-600">Explore top French educational institutions and their offerings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schools.map((school) => (
          <div
            key={school.id}
            onClick={() => onSchoolSelect(school.id)}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{school.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{school.location}</p>
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
  );
}
