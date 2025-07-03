
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Phone, Mail, CreditCard, Home, BookOpen, Plane, Users, Shield, Gift } from 'lucide-react';

const partners = [
  {
    id: 1,
    name: 'Campus France',
    category: 'Educational Support',
    description: 'Official French agency for international education services and student mobility.',
    services: ['University Applications', 'Visa Guidance', 'Educational Counseling'],
    website: 'https://www.campusfrance.org',
    logo: '🇫🇷',
    verified: true,
    contact: {
      email: 'info@campusfrance.org',
      phone: '+33 1 40 40 50 50'
    },
    benefits: [
      'Free university application assistance',
      'Visa application support',
      'Pre-departure orientation sessions'
    ]
  },
  {
    id: 2,
    name: 'CROUS',
    category: 'Student Services',
    description: 'Regional organization providing student housing, dining, and financial aid.',
    services: ['Student Housing', 'Meal Plans', 'Financial Aid'],
    website: 'https://www.crous-paris.fr',
    logo: '🏠',
    verified: true,
    contact: {
      email: 'contact@crous-paris.fr',
      phone: '+33 1 40 51 36 00'
    },
    benefits: [
      'Affordable student accommodations',
      'University restaurant meal plans',
      'Scholarship and grant information'
    ]
  },
  {
    id: 3,
    name: 'HDFC Bank',
    category: 'Banking',
    description: 'Leading Indian bank offering international banking solutions for students.',
    services: ['Student Loans', 'International Banking', 'Foreign Exchange'],
    website: 'https://www.hdfcbank.com',
    logo: '🏛️',
    verified: true,
    contact: {
      email: 'support@hdfcbank.com',
      phone: '+91 22 6160 6161'
    },
    benefits: [
      'Education loans up to ₹1.5 crores',
      'No collateral for loans up to ₹40 lakhs',
      'Competitive interest rates for students'
    ]
  },
  {
    id: 4,
    name: 'Niyo Global',
    category: 'Banking',
    description: 'Digital banking platform for international students and travelers.',
    services: ['International Cards', 'Zero Forex Markup', 'Digital Banking'],
    website: 'https://www.goniyo.com',
    logo: '💳',
    verified: true,
    contact: {
      email: 'support@goniyo.com',
      phone: '+91 80 4718 8888'
    },
    benefits: [
      'Zero forex markup on international transactions',
      'Free international debit card',
      'Real-time expense tracking'
    ]
  },
  {
    id: 5,
    name: 'Revolut',
    category: 'Banking',
    description: 'Digital bank offering multi-currency accounts and international money transfers.',
    services: ['Multi-currency Account', 'International Transfers', 'Budgeting Tools'],
    website: 'https://www.revolut.com',
    logo: '🌍',
    verified: true,
    contact: {
      email: 'help@revolut.com',
      phone: '+44 20 3322 8352'
    },
    benefits: [
      'Hold 30+ currencies in one account',
      'Free international money transfers',
      'Advanced spending analytics'
    ]
  },
  {
    id: 6,
    name: 'BNP Paribas',
    category: 'Banking',
    description: 'Major French bank offering comprehensive student banking services.',
    services: ['Student Accounts', 'Housing Loans', 'Insurance'],
    website: 'https://www.bnpparibas.fr',
    logo: '🏦',
    verified: true,
    contact: {
      email: 'contact@bnpparibas.fr',
      phone: '+33 1 40 14 45 46'
    },
    benefits: [
      'Free student banking packages',
      'Student housing loan assistance',
      'Comprehensive insurance coverage'
    ]
  },
  {
    id: 7,
    name: 'Studapart',
    category: 'Accommodation',
    description: 'Leading platform for student housing across France.',
    services: ['Student Housing', 'Room Booking', 'Housing Guarantee'],
    website: 'https://www.studapart.com',
    logo: '🏡',
    verified: true,
    contact: {
      email: 'contact@studapart.com',
      phone: '+33 1 76 36 04 01'
    },
    benefits: [
      'Verified student accommodations',
      'No French guarantor required',
      'Book housing before arrival'
    ]
  },
  {
    id: 8,
    name: 'SNCF Connect',
    category: 'Transportation',
    description: 'Official French railway service with student discounts.',
    services: ['Train Tickets', 'Student Discounts', 'Travel Cards'],
    website: 'https://www.sncf-connect.com',
    logo: '🚄',
    verified: true,
    contact: {
      email: 'service.client@sncf.fr',
      phone: '+33 3635'
    },
    benefits: [
      'Up to 60% discount on train tickets',
      'Young person travel cards',
      'Easy online booking system'
    ]
  },
  {
    id: 9,
    name: 'MGEN',
    category: 'Health Insurance',
    description: 'Student health insurance and mutual insurance services.',
    services: ['Health Insurance', 'Dental Coverage', 'Vision Care'],
    website: 'https://www.mgen.fr',
    logo: '🏥',
    verified: true,
    contact: {
      email: 'contact@mgen.fr',
      phone: '+33 3 20 47 62 00'
    },
    benefits: [
      'Comprehensive health coverage',
      'Student-friendly rates',
      'Wide network of healthcare providers'
    ]
  },
  {
    id: 10,
    name: 'UniLodge',
    category: 'Accommodation',
    description: 'Premium student accommodation provider in major French cities.',
    services: ['Furnished Apartments', 'Shared Housing', 'Utilities Included'],
    website: 'https://www.unilodge.fr',
    logo: '🏘️',
    verified: true,
    contact: {
      email: 'info@unilodge.fr',
      phone: '+33 1 42 96 18 18'
    },
    benefits: [
      'Fully furnished student apartments',
      'All utilities and WiFi included',
      'Flexible lease terms'
    ]
  }
];

const categories = [
  { name: 'Educational Support', icon: BookOpen, color: 'bg-blue-100 text-blue-800' },
  { name: 'Banking', icon: CreditCard, color: 'bg-green-100 text-green-800' },
  { name: 'Accommodation', icon: Home, color: 'bg-purple-100 text-purple-800' },
  { name: 'Transportation', icon: Plane, color: 'bg-orange-100 text-orange-800' },
  { name: 'Health Insurance', icon: Shield, color: 'bg-red-100 text-red-800' },
  { name: 'Student Services', icon: Users, color: 'bg-indigo-100 text-indigo-800' }
];

export const AffiliationPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPartners = selectedCategory === 'All' 
    ? partners 
    : partners.filter(partner => partner.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.name === category);
    return categoryData ? categoryData.icon : Gift;
  };

  const getCategoryColor = (category: string) => {
    const categoryData = categories.find(cat => cat.name === category);
    return categoryData ? categoryData.color : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Trusted Partners</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We've partnered with leading organizations to provide you with comprehensive support 
          throughout your study abroad journey in France.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <Button
          variant={selectedCategory === 'All' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('All')}
          className="mb-2"
        >
          All Partners
        </Button>
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.name)}
              className="flex items-center gap-2 mb-2"
            >
              <Icon className="h-4 w-4" />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredPartners.map((partner) => {
          const CategoryIcon = getCategoryIcon(partner.category);
          return (
            <Card key={partner.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{partner.logo}</div>
                    <div>
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                      {partner.verified && (
                        <Badge variant="secondary" className="mt-1">
                          ✓ Verified Partner
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Badge className={getCategoryColor(partner.category)}>
                    <CategoryIcon className="h-3 w-3 mr-1" />
                    {partner.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Services:</h4>
                  <div className="flex flex-wrap gap-1">
                    {partner.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Key Benefits:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {partner.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-1">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 mb-4">
                  {partner.contact.email && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Mail className="h-3 w-3" />
                      <a href={`mailto:${partner.contact.email}`} className="hover:text-blue-600">
                        {partner.contact.email}
                      </a>
                    </div>
                  )}
                  {partner.contact.phone && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Phone className="h-3 w-3" />
                      <a href={`tel:${partner.contact.phone}`} className="hover:text-blue-600">
                        {partner.contact.phone}
                      </a>
                    </div>
                  )}
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open(partner.website, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Partnership Benefits */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Why We Partner With These Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <Shield className="h-8 w-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold mb-2">Trusted & Verified</h3>
              <p className="text-sm text-gray-600">
                All our partners are carefully vetted and verified to ensure reliability and quality service.
              </p>
            </div>
            <div>
              <Gift className="h-8 w-8 mx-auto mb-3 text-green-600" />
              <h3 className="font-semibold mb-2">Exclusive Benefits</h3>
              <p className="text-sm text-gray-600">
                Access special discounts, services, and benefits available only to our community members.
              </p>
            </div>
            <div>
              <Users className="h-8 w-8 mx-auto mb-3 text-purple-600" />
              <h3 className="font-semibold mb-2">Comprehensive Support</h3>
              <p className="text-sm text-gray-600">
                From banking to housing to healthcare - we've got every aspect of your student life covered.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
