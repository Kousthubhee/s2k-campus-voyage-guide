
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Award, Users, MapPin, Globe, Building2, Star } from 'lucide-react';

export const AffiliationPage = () => {
  const partners = [
    {
      name: 'Campus France',
      category: 'Government Agency',
      description: 'Official French government agency promoting French higher education internationally',
      logo: '🇫🇷',
      website: 'https://www.campusfrance.org',
      services: ['Visa Assistance', 'University Applications', 'Scholarship Information'],
      established: '2007',
      locations: '120+ countries'
    },
    {
      name: 'BNP Paribas',
      category: 'Banking',
      description: 'Leading French bank offering student banking services and financial solutions',
      logo: '🏦',
      website: 'https://group.bnpparibas',
      services: ['Student Accounts', 'International Transfers', 'Student Loans'],
      established: '1966',
      locations: 'Worldwide'
    },
    {
      name: 'Studapart',
      category: 'Housing',
      description: 'Specialized platform for student accommodation across France',
      logo: '🏠',
      website: 'https://www.studapart.com',
      services: ['Student Housing', 'Booking Assistance', 'Accommodation Verification'],
      established: '2013',
      locations: 'Major French Cities'
    },
    {
      name: 'CROUS',
      category: 'Student Services',
      description: 'Regional student welfare organization providing housing, dining, and financial aid',
      logo: '🎓',
      website: 'https://www.cnous.fr',
      services: ['Student Housing', 'Dining Services', 'Financial Aid'],
      established: '1955',
      locations: 'All French Regions'
    },
    {
      name: 'French Consulates',
      category: 'Government',
      description: 'Official French diplomatic missions handling visa applications and student services',
      logo: '🏛️',
      website: 'https://www.diplomatie.gouv.fr',
      services: ['Visa Processing', 'Document Authentication', 'Consular Services'],
      established: 'Various',
      locations: 'Global Network'
    },
    {
      name: 'Educational Institutions',
      category: 'Universities',
      description: 'Partner universities and grandes écoles across France',
      logo: '🎒',
      website: '#',
      services: ['Admissions Support', 'Program Information', 'Academic Guidance'],
      established: 'Various',
      locations: 'Throughout France'
    }
  ];

  const stats = [
    { icon: Building2, label: 'Partner Organizations', value: '50+' },
    { icon: Users, label: 'Students Helped', value: '10,000+' },
    { icon: MapPin, label: 'Cities Covered', value: '25+' },
    { icon: Star, label: 'Success Rate', value: '95%' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Trusted Partners</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We collaborate with leading organizations to provide you with comprehensive support 
          throughout your French education journey.
        </p>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {partners.map((partner, index) => (
          <Card key={index} className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="pb-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl bg-gray-50 w-16 h-16 rounded-lg flex items-center justify-center">
                  {partner.logo}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2 leading-tight">{partner.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs font-medium">
                    {partner.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6 pt-0">
              <p className="text-gray-600 leading-relaxed">
                {partner.description}
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {partner.services.map((service, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs py-1">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="font-medium text-gray-900 block">Founded</span>
                    <span className="text-gray-600">{partner.established}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="font-medium text-gray-900 block">Coverage</span>
                    <span className="text-gray-600">{partner.locations}</span>
                  </div>
                </div>
              </div>
              
              {partner.website !== '#' && (
                <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                  <a href={partner.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    Visit Website
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 border-0 shadow-xl">
        <CardContent className="p-12 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Award className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Start Your French Education Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our network of trusted partners is here to support you every step of the way. 
              From university applications to visa processing, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                <Award className="h-5 w-5 mr-2" />
                Get Started Today
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                <Users className="h-5 w-5 mr-2" />
                Contact Our Team
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
