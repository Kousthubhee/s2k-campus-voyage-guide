import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Euro, Users, Home, Star } from 'lucide-react';

interface HousingSite {
  name: string;
  url: string;
  description: string;
  type: 'general' | 'student' | 'university' | 'short-term' | 'coliving';
  price: 'free' | 'paid' | 'commission';
  rating: number;
  features: string[];
  cities: string[];
  popularity: 'high' | 'medium' | 'low';
}

export const HousingSitesDirectory = () => {
  const housingSites: HousingSite[] = [
    {
      name: 'CROUS',
      url: 'https://www.messervices.etudiant.gouv.fr',
      description: 'Official student housing from French government - most affordable option',
      type: 'university',
      price: 'free',
      rating: 4.2,
      features: ['Government-subsidized', 'Very affordable', 'Campus locations', 'Priority system'],
      cities: ['All major cities'],
      popularity: 'high'
    },
    {
      name: 'Studapart',
      url: 'https://www.studapart.com',
      description: 'Leading platform specialized in student housing across France',
      type: 'student',
      price: 'free',
      rating: 4.5,
      features: ['Student-verified', 'Virtual tours', '24/7 support', 'Instant booking'],
      cities: ['Paris', 'Lyon', 'Toulouse', 'Marseille', 'Bordeaux', 'Nice'],
      popularity: 'high'
    },
    {
      name: 'SeLoger',
      url: 'https://www.seloger.com',
      description: 'France\'s largest rental platform with extensive listings',
      type: 'general',
      price: 'free',
      rating: 4.3,
      features: ['Largest inventory', 'Advanced filters', 'Virtual tours', 'Mobile app'],
      cities: ['All French cities'],
      popularity: 'high'
    },
    {
      name: 'Leboncoin',
      url: 'https://www.leboncoin.fr',
      description: 'Popular classified ads with direct owner contact',
      type: 'general',
      price: 'free',
      rating: 4.1,
      features: ['Direct owner contact', 'Competitive prices', 'No agency fees', 'Wide selection'],
      cities: ['All French cities'],
      popularity: 'high'
    },
    {
      name: 'Student.com',
      url: 'https://www.student.com',
      description: 'Global student accommodation marketplace',
      type: 'student',
      price: 'free',
      rating: 4.4,
      features: ['International students', 'Verified properties', 'Book online', 'Student support'],
      cities: ['Paris', 'Lyon', 'Toulouse', 'Bordeaux', 'Lille'],
      popularity: 'high'
    },
    {
      name: 'Nexity Studéa',
      url: 'https://www.nexity-studea.com',
      description: 'Premium student residences with modern facilities',
      type: 'student',
      price: 'free',
      rating: 4.4,
      features: ['Modern facilities', 'All-inclusive', 'Common areas', '24/7 security'],
      cities: ['Paris', 'Lyon', 'Lille', 'Bordeaux', 'Nice', 'Strasbourg'],
      popularity: 'medium'
    },
    {
      name: 'Uniplaces',
      url: 'https://www.uniplaces.com',
      description: 'International student housing with verified listings',
      type: 'student',
      price: 'commission',
      rating: 4.2,
      features: ['Student-verified', 'International support', 'Secure payments', 'Quality guarantee'],
      cities: ['Paris', 'Lyon', 'Toulouse', 'Bordeaux', 'Montpellier'],
      popularity: 'medium'
    },
    {
      name: 'PAP (Particulier à Particulier)',
      url: 'https://www.pap.fr',
      description: 'Direct rentals from private owners without agency fees',
      type: 'general',
      price: 'free',
      rating: 4.0,
      features: ['No agency fees', 'Direct contact', 'Owner verified', 'Good value'],
      cities: ['Paris', 'Lyon', 'Marseille', 'Major cities'],
      popularity: 'medium'
    },
    {
      name: 'The Student Hotel',
      url: 'https://www.thestudenthotel.com',
      description: 'Premium co-living spaces with international community',
      type: 'coliving',
      price: 'free',
      rating: 4.6,
      features: ['All-inclusive', 'International community', 'Modern amenities', 'Flexible stays'],
      cities: ['Paris', 'Lyon'],
      popularity: 'medium'
    },
    {
      name: 'Spotahome',
      url: 'https://www.spotahome.com',
      description: 'Book accommodation online without viewings',
      type: 'general',
      price: 'commission',
      rating: 4.0,
      features: ['360° videos', 'Online booking', 'No viewings needed', 'Verified properties'],
      cities: ['Paris', 'Lyon'],
      popularity: 'low'
    },
    {
      name: 'Airbnb (Monthly)',
      url: 'https://www.airbnb.com',
      description: 'Short to medium-term furnished rentals',
      type: 'short-term',
      price: 'commission',
      rating: 4.3,
      features: ['Immediate booking', 'Furnished', 'Flexible dates', 'Host reviews'],
      cities: ['All French cities'],
      popularity: 'high'
    },
    {
      name: 'Chez Nestor',
      url: 'https://chez-nestor.com',
      description: 'Co-living spaces designed for young professionals and students',
      type: 'coliving',
      price: 'free',
      rating: 4.3,
      features: ['All-inclusive', 'Community events', 'Modern spaces', 'Flexible lease'],
      cities: ['Paris', 'Lyon', 'Bordeaux', 'Lille'],
      popularity: 'medium'
    },
    {
      name: 'Lokaviz',
      url: 'https://www.lokaviz.fr',
      description: 'CROUS platform for private student accommodation',
      type: 'student',
      price: 'free',
      rating: 4.1,
      features: ['CROUS endorsed', 'Student-focused', 'Verified landlords', 'Support available'],
      cities: ['All university cities'],
      popularity: 'medium'
    },
    {
      name: 'HousingAnywhere',
      url: 'https://housinganywhere.com',
      description: 'International platform for medium-term rentals',
      type: 'general',
      price: 'commission',
      rating: 4.0,
      features: ['Book online', 'Secure payments', 'No deposits', 'International support'],
      cities: ['Paris', 'Lyon', 'Toulouse', 'Nice'],
      popularity: 'low'
    },
    {
      name: 'Flatlooker',
      url: 'https://www.flatlooker.com',
      description: 'Student and young professional accommodation search',
      type: 'student',
      price: 'free',
      rating: 3.9,
      features: ['Student-focused', 'Roommate matching', 'Easy search', 'Mobile friendly'],
      cities: ['Paris', 'Lyon', 'Toulouse', 'Bordeaux'],
      popularity: 'low'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'university': return 'bg-green-100 text-green-800';
      case 'general': return 'bg-purple-100 text-purple-800';
      case 'short-term': return 'bg-orange-100 text-orange-800';
      case 'coliving': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriceColor = (price: string) => {
    switch (price) {
      case 'free': return 'bg-green-100 text-green-800';
      case 'paid': return 'bg-yellow-100 text-yellow-800';
      case 'commission': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPopularityIcon = (popularity: string) => {
    switch (popularity) {
      case 'high': return <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />;
      case 'medium': return <Star className="h-4 w-4 text-yellow-400" />;
      case 'low': return <Star className="h-4 w-4 text-gray-300" />;
      default: return null;
    }
  };

  const sortedSites = [...housingSites].sort((a, b) => {
    const popularityOrder = { high: 3, medium: 2, low: 1 };
    if (popularityOrder[b.popularity] !== popularityOrder[a.popularity]) {
      return popularityOrder[b.popularity] - popularityOrder[a.popularity];
    }
    return b.rating - a.rating;
  });

  return (
    <div className="space-y-6">
      {/* Header with Enhanced Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-6 w-6" />
            Comprehensive Housing Directory ({housingSites.length} Sites)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Your complete guide to finding accommodation in France. We've curated the best platforms 
            to help you secure housing before or after arrival.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="font-bold text-blue-600">{sortedSites.filter(s => s.type === 'student').length}</div>
              <div className="text-xs text-blue-800">Student-focused</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="font-bold text-green-600">{sortedSites.filter(s => s.price === 'free').length}</div>
              <div className="text-xs text-green-800">Free to use</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="font-bold text-yellow-600">{sortedSites.filter(s => s.popularity === 'high').length}</div>
              <div className="text-xs text-yellow-800">Highly popular</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="font-bold text-purple-600">{sortedSites.filter(s => s.type === 'coliving').length}</div>
              <div className="text-xs text-purple-800">Co-living</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-blue-50">
              🎓 Student Housing Specialists
            </Badge>
            <Badge variant="outline" className="bg-green-50">
              🏛️ Government Programs
            </Badge>
            <Badge variant="outline" className="bg-purple-50">
              🏠 General Marketplaces
            </Badge>
            <Badge variant="outline" className="bg-pink-50">
              🤝 Co-living Spaces
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Sites Grid with Enhanced Layout */}
      <div className="grid gap-4">
        {sortedSites.map((site, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{site.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      {getPopularityIcon(site.popularity)}
                      <span className="text-sm font-medium text-muted-foreground">{site.rating}/5</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{site.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getTypeColor(site.type)}>
                      {site.type.charAt(0).toUpperCase() + site.type.slice(1)}
                    </Badge>
                    <Badge className={getPriceColor(site.price)}>
                      {site.price === 'free' ? '✓ Free' : site.price === 'paid' ? '💳 Paid' : '% Commission'}
                    </Badge>
                    {site.popularity === 'high' && (
                      <Badge variant="default" className="bg-yellow-500">
                        🔥 Top Choice
                      </Badge>
                    )}
                    {site.type === 'university' && (
                      <Badge variant="default" className="bg-green-600">
                        🏛️ Official
                      </Badge>
                    )}
                  </div>
                </div>
                <Button asChild size="sm" className="ml-4">
                  <a href={site.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Site
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Features */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    Key Features
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {site.features.map((feature, fIndex) => (
                      <Badge key={fIndex} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Cities */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Coverage
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {site.cities.slice(0, 4).map((city, cIndex) => (
                      <Badge key={cIndex} variant="outline" className="text-xs">
                        {city}
                      </Badge>
                    ))}
                    {site.cities.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{site.cities.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Tips Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            💡 Pro Housing Search Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-blue-800">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="font-bold text-blue-600">1.</span>
                <div>
                  <strong>Start with CROUS:</strong> Apply first - it's the most affordable and reliable option for students.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-blue-600">2.</span>
                <div>
                  <strong>Use Multiple Platforms:</strong> Don't rely on just one site. Check Studapart, SeLoger, and Leboncoin simultaneously.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-blue-600">3.</span>
                <div>
                  <strong>Budget Planning:</strong> Expect 1-2 months deposit plus first month's rent (€800-2000 total in Paris).
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="font-bold text-blue-600">4.</span>
                <div>
                  <strong>Timeline:</strong> Start searching 2-3 months before arrival. Popular areas fill up fast.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-blue-600">5.</span>
                <div>
                  <strong>Documents Ready:</strong> Have passport, income proof, and guarantor documents translated and ready.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-blue-600">6.</span>
                <div>
                  <strong>Backup Plan:</strong> Consider Airbnb for your first 2-4 weeks while you search in person.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links Card */}
      <Card>
        <CardHeader>
          <CardTitle>🔗 Essential Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" size="sm" asChild>
              <a href="https://www.caf.fr" target="_blank">
                💰 CAF Housing Aid
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://www.service-public.fr/particuliers/vosdroits/F1169" target="_blank">
                📋 Rental Rights
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://www.anil.org" target="_blank">
                🏠 Housing Info
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://www.luko.eu" target="_blank">
                🛡️ Housing Insurance
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
