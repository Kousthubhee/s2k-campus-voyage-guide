
import { ChevronLeft, Users, MapPin, Calendar, Globe } from 'lucide-react';

interface School {
  id: string;
  name: string;
  location: string;
  type: string;
  established: string;
  students: string;
  website: string;
  description: string;
  programs: string[];
  admissionRequirements: string[];
  tuitionFees: string;
}

const schools: School[] = [
  {
    id: 'neoma',
    name: 'NEOMA Business School',
    location: 'Reims, Rouen',
    type: 'Business School',
    established: '2013',
    students: '9,500+',
    website: 'neoma-bs.fr',
    description: 'NEOMA Business School is a leading French business school formed by the merger of Reims Management School and Rouen Business School.',
    programs: ['Master in Management', 'MBA', 'MSc in Finance', 'MSc in Marketing', 'Executive Programs'],
    admissionRequirements: ['Bachelor\'s degree', 'GMAT/GRE scores', 'English proficiency (TOEFL/IELTS)', 'Personal statement', 'Letters of recommendation'],
    tuitionFees: '€15,000 - €35,000 per year'
  },
  {
    id: 'emlyon',
    name: 'emlyon business school',
    location: 'Lyon, Paris, Shanghai',
    type: 'Business School',
    established: '1872',
    students: '8,000+',
    website: 'emlyon.com',
    description: 'One of the oldest business schools in Europe, known for its entrepreneurial spirit and innovation.',
    programs: ['Global MBA', 'Master in Management', 'MSc in Digital Marketing & Data Science', 'MSc in Management', 'Executive MBA'],
    admissionRequirements: ['Bachelor\'s degree', 'GMAT/GRE scores', 'English proficiency', 'Work experience (for MBA)', 'Interview'],
    tuitionFees: '€18,000 - €45,000 per year'
  },
  {
    id: 'essec',
    name: 'ESSEC Business School',
    location: 'Cergy-Pontoise, Singapore, Morocco',
    type: 'Business School',
    established: '1907',
    students: '6,000+',
    website: 'essec.edu',
    description: 'ESSEC is a prestigious French business school known for its academic excellence and international outlook.',
    programs: ['Master in Management', 'Global MBA', 'Advanced Master in Strategy', 'MSc in Data Sciences', 'Executive Education'],
    admissionRequirements: ['Bachelor\'s degree', 'GMAT/SAT scores', 'English proficiency', 'Personal essays', 'Interview'],
    tuitionFees: '€17,000 - €39,000 per year'
  }
];

interface SchoolInfoProps {
  schoolId: string;
  onBack: () => void;
}

export function SchoolInfo({ schoolId, onBack }: SchoolInfoProps) {
  const school = schools.find(s => s.id === schoolId);

  if (!school) {
    return (
      <div className="p-6">
        <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
          <ChevronLeft size={20} />
          Back to Schools
        </button>
        <p>School not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
        <ChevronLeft size={20} />
        Back to Schools
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="s2k-gradient p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">{school.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm opacity-90">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              {school.location}
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              Est. {school.established}
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} />
              {school.students} students
            </div>
            <div className="flex items-center gap-1">
              <Globe size={16} />
              {school.website}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">About</h2>
            <p className="text-gray-600 leading-relaxed">{school.description}</p>
          </section>

          {/* Programs */}
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Programs Offered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {school.programs.map((program, index) => (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <span className="text-blue-800 font-medium">{program}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Admission Requirements */}
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Admission Requirements</h2>
            <ul className="space-y-2">
              {school.admissionRequirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">{req}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tuition Fees */}
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Tuition Fees</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <span className="text-yellow-800 font-semibold">{school.tuitionFees}</span>
              <p className="text-yellow-700 text-sm mt-1">
                *Fees may vary by program and student status. Contact the school for detailed information.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
