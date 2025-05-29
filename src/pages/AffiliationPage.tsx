
import { ExternalLink, Star, Users, Award, Globe } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  website: string;
  rating: number;
  services: string[];
  featured: boolean;
}

const partners: Partner[] = [
  {
    id: '1',
    name: 'Campus France',
    logo: '🇫🇷',
    description: 'Official agency for promoting French higher education and managing international student applications.',
    category: 'Education',
    website: 'https://campusfrance.org',
    rating: 4.8,
    services: ['University Applications', 'Visa Guidance', 'Information Sessions'],
    featured: true
  },
  {
    id: '2',
    name: 'CROUS',
    logo: '🏠',
    description: 'National network providing student services including accommodation, dining, and financial aid.',
    category: 'Student Services',
    website: 'https://crous.fr',
    rating: 4.5,
    services: ['Student Housing', 'Meal Plans', 'Scholarships'],
    featured: true
  },
  {
    id: '3',
    name: 'BNP Paribas Student',
    logo: '🏦',
    description: 'Leading French bank offering specialized services for international students.',
    category: 'Banking',
    website: 'https://bnpparibas.com',
    rating: 4.3,
    services: ['Student Accounts', 'Online Banking', 'International Transfers'],
    featured: false
  },
  {
    id: '4',
    name: 'Studapart',
    logo: '🔑',
    description: 'Online platform for finding student accommodation across France with verified listings.',
    category: 'Housing',
    website: 'https://studapart.com',
    rating: 4.6,
    services: ['Apartment Search', 'Virtual Tours', 'Lease Management'],
    featured: false
  },
  {
    id: '5',
    name: 'LMDE',
    logo: '🏥',
    description: 'Student mutual insurance providing comprehensive health coverage for students.',
    category: 'Insurance',
    website: 'https://lmde.fr',
    rating: 4.2,
    services: ['Health Insurance', 'Dental Coverage', 'Student Support'],
    featured: false
  },
  {
    id: '6',
    name: 'Leboncoin',
    logo: '🛒',
    description: 'Popular classified ads platform for finding affordable furniture and essentials.',
    category: 'Marketplace',
    website: 'https://leboncoin.fr',
    rating: 4.4,
    services: ['Furniture', 'Electronics', 'Local Deals'],
    featured: false
  }
];

export function AffiliationPage() {
  const categories = ['All', 'Education', 'Student Services', 'Banking', 'Housing', 'Insurance', 'Marketplace'];
  const featuredPartners = partners.filter(p => p.featured);
  const regularPartners = partners.filter(p => !p.featured);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Partners</h1>
        <p className="text-gray-600">Trusted organizations and services to support your journey in France</p>
      </div>

      {/* Featured Partners */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredPartners.map((partner) => (
            <div key={partner.id} className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{partner.logo}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{partner.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {partner.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{partner.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">{partner.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Services:</h4>
                <div className="flex flex-wrap gap-2">
                  {partner.services.map((service, index) => (
                    <span key={index} className="bg-white text-gray-700 text-xs px-2 py-1 rounded-full border">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <a 
                href={partner.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Visit Website <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* All Partners */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPartners.map((partner) => (
            <div key={partner.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{partner.logo}</div>
                  <div>
                    <h3 className="font-bold text-gray-800">{partner.name}</h3>
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {partner.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-500 fill-current" />
                  <span className="text-sm">{partner.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{partner.description}</p>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {partner.services.slice(0, 2).map((service, index) => (
                    <span key={index} className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {service}
                    </span>
                  ))}
                  {partner.services.length > 2 && (
                    <span className="text-xs text-gray-500">+{partner.services.length - 2} more</span>
                  )}
                </div>
              </div>

              <a 
                href={partner.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Visit <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Partnership Stats */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Partnership Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Users size={32} className="text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">50,000+</div>
            <div className="text-sm text-gray-600">Students Helped</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Award size={32} className="text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">25+</div>
            <div className="text-sm text-gray-600">Verified Partners</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Globe size={32} className="text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">15</div>
            <div className="text-sm text-gray-600">Cities Covered</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Star size={32} className="text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">4.6</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}
