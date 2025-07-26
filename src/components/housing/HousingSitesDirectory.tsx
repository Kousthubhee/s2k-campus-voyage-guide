
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
      name: 'Studapart',
      url: 'https://www.studapart.com',
      description: 'Specialized platform for student housing across France',
      type: 'student',
      price: 'free',
      rating: 4.5,
      features: ['Student-only', 'Verified listings', 'Virtual visits', 'Support team'],
      cities: ['Paris', 'Lyon', 'Toulouse', 'Marseille', 'Bordeaux'],
      popularity: 'high'
    },
    {
      name: 'CROUS',
      url: 'https://www.messervices.etudiant.gouv.fr',
      description: 'Official student housing from French government',
      type: 'university',
      price: 'free',
      rating: 4.2,
      features: ['Government-subsidized', 'Very affordable', 'Campus locations', 'Priority system'],
      cities: ['All major cities'],
      popularity: 'high'
    },
    {
      name: 'SeLoger',
      url: 'https://www.seloger.com',
      description: 'One of France\'s largest rental platforms',
      type: 'general',
      price: 'free',
      rating: 4.3,
      features: ['Large inventory', 'Detailed search', 'Photos & virtual tours', 'Mobile app'],
      cities: ['All French cities'],
      popularity: 'high'
    },
    {
      name: 'Leboncoin',
      url: 'https://www.leboncoin.fr',
      description: 'Popular classified ads site with housing section',
      type: 'general',
      price: 'free',
      rating: 4.1,
      features: ['Direct owner contact', 'Good prices', 'Wide selection', 'No commission'],
      cities: ['All French cities'],
      popularity: 'high'
    },
    {
      name: 'Nexity Studéa',
      url: 'https://www.nexity-studea.com',
      description: 'Premium student residences across France',
      type: 'student',
      price: 'free',
      rating: 4.4,
      features: ['Modern facilities', 'All-inclusive', 'Common areas', 'Security'],
      cities: ['Paris', 'Lyon', 'Lille', 'Bordeaux', 'Nice'],
      popularity: 'medium'
    },
    {
      name: 'PAP (Particulier à Particulier)',
      url: 'https://www.pap.fr',
      description: 'Direct rentals from private owners',
      type: 'general',
      price: 'free',
      rating: 4.0,
      features: ['No agency fees', 'Direct contact', 'Good prices', 'Owner verification'],
      cities: ['Paris', 'Major cities'],
      popularity: 'medium'
    },
    {
      name: 'The Student Hotel',
      url: 'https://www.thestudenthotel.com',
      description: 'International co-living spaces for students',
      type: 'coliving',
      price: 'free',
      rating: 4.6,
      features: ['All-inclusive', 'International community', 'Modern amenities', 'Flexible stays'],
      cities: ['Paris', 'Lyon'],
      popularity: 'medium'
    },
    {
      name: 'Uniplaces',
      url: 'https://www.uniplaces.com',
      description: 'International student housing marketplace',
      type: 'student',
      price: 'commission',
      rating: 4.2,
      features: ['Student-verified', 'International focus', 'Secure booking', 'Support'],
      cities: ['Paris', 'Lyon', 'Toulouse', 'Bordeaux'],
      popularity: 'medium'
    },
    {
      name: 'Spotahome',
      url: 'https://www.spotahome.com',
      description: 'Online-only rentals with virtual viewings',
      type: 'general',
      price: 'commission',
      rating: 4.0,
      features: ['360° videos', 'Book online', 'No viewings needed', 'Verified properties'],
      cities: ['Paris', 'Lyon'],
      popularity: 'low'
    },
    {
      name: 'Airbnb (Long-term)',
      url: 'https://www.airbnb.com',
      description: 'Short to medium-term rentals, good for initial stay',
      type: 'short-term',
      price: 'commission',
      rating: 4.3,
      features: ['Immediate booking', 'Furnished', 'Flexible dates', 'Reviews'],
      cities: ['All French cities'],
      popularity: 'high'
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
      case 'high': return <Star className="h-4 w-4 text-yellow-500" />;
      case 'medium': return <Star className="h-4 w-4 text-gray-400" />;
      case 'low': return <Star className="h-4 w-4 text-gray-300" />;
      default: return null;
    }
  };

  const sortedSites = [...housingSites].sort((a, b) => {
    const popularityOrder = { high: 3, medium: 2, low: 1 };
    return popularityOrder[b.popularity] - popularityOrder[a.popularity];
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-6 w-6" />
            Housing Sites Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Complete list of reliable websites to find accommodation in France. 
            Start with CROUS for affordable options, then explore other platforms.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-blue-50">
              🎓 {sortedSites.filter(s => s.type === 'student').length} Student-focused
            </Badge>
            <Badge variant="outline" className="bg-green-50">
              🏛️ {sortedSites.filter(s => s.type === 'university').length} University
            </Badge>
            <Badge variant="outline" className="bg-purple-50">
              🏠 {sortedSites.filter(s => s.type === 'general').length} General
            </Badge>
            <Badge variant="outline" className="bg-pink-50">
              🤝 {sortedSites.filter(s => s.type === 'coliving').length} Co-living
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Sites Grid */}
      <div className="grid gap-6">
        {sortedSites.map((site, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{site.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      {getPopularityIcon(site.popularity)}
                      <span className="text-sm font-medium">{site.rating}/5</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{site.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getTypeColor(site.type)}>
                      {site.type.charAt(0).toUpperCase() + site.type.slice(1)}
                    </Badge>
                    <Badge className={getPriceColor(site.price)}>
                      {site.price === 'free' ? 'Free' : site.price === 'paid' ? 'Paid' : 'Commission'}
                    </Badge>
                    {site.popularity === 'high' && (
                      <Badge variant="default" className="bg-yellow-500">
                        🔥 Popular
                      </Badge>
                    )}
                  </div>
                </div>
                <Button asChild size="sm">
                  <a href={site.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Site
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Features */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    Key Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
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
                    Available Cities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {site.cities.slice(0, 5).map((city, cIndex) => (
                      <Badge key={cIndex} variant="outline" className="text-xs">
                        {city}
                      </Badge>
                    ))}
                    {site.cities.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{site.cities.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            💡 Housing Search Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-blue-800">
            <div className="flex items-start gap-2">
              <span className="font-semibold">1.</span>
              <div>
                <strong>Start Early:</strong> Begin your housing search 2-3 months before arrival, especially for popular cities like Paris.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">2.</span>
              <div>
                <strong>CROUS Priority:</strong> Apply for CROUS housing first - it's the most affordable option for students.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">3.</span>
              <div>
                <strong>Budget Planning:</strong> Expect to pay 1-2 months deposit plus first month's rent upfront.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">4.</span>
              <div>
                <strong>Documentation:</strong> Prepare income proof, guarantor documents, and passport scans in advance.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">5.</span>
              <div>
                <strong>Transportation:</strong> Check proximity to your university and public transport connections.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
