
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Phone, Mail, CreditCard, Home, BookOpen, Plane, Users, Shield, Gift, Building2, Heart, Smartphone, Globe } from 'lucide-react';

const partners = [
  // French Government & Educational Support
  {
    id: 1,
    name: 'Campus France',
    category: 'Educational Support',
    description: 'Official French agency for international education services and student mobility.',
    services: ['University Applications', 'Visa Guidance', 'Educational Counseling'],
    website: 'https://www.campusfrance.org',
    logo: '🇫🇷',
    verified: true,
    contact: { email: 'info@campusfrance.org', phone: '+33 1 40 40 50 50' },
    benefits: ['Free university application assistance', 'Visa application support', 'Pre-departure orientation sessions']
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
    contact: { email: 'contact@crous-paris.fr', phone: '+33 1 40 51 36 00' },
    benefits: ['Affordable student accommodations', 'University restaurant meal plans', 'Scholarship and grant information']
  },
  {
    id: 3,
    name: 'CAF (Family Allowance Fund)',
    category: 'Student Services',
    description: 'French government agency providing housing allowances to students.',
    services: ['Housing Allowance', 'Student Benefits', 'Financial Support'],
    website: 'https://www.caf.fr',
    logo: '🏛️',
    verified: true,
    contact: { email: 'contact@caf.fr', phone: '3230' },
    benefits: ['Monthly housing allowance up to €250', 'Reduced public transport fares', 'Health insurance supplements']
  },

  // Indian Banks
  {
    id: 4,
    name: 'HDFC Bank',
    category: 'Indian Banking',
    description: 'Leading Indian bank offering international banking solutions for students.',
    services: ['Student Loans', 'International Banking', 'Foreign Exchange'],
    website: 'https://www.hdfcbank.com',
    logo: '🏦',
    verified: true,
    contact: { email: 'support@hdfcbank.com', phone: '+91 22 6160 6161' },
    benefits: ['Education loans up to ₹1.5 crores', 'No collateral for loans up to ₹40 lakhs', 'Competitive interest rates']
  },
  {
    id: 5,
    name: 'State Bank of India',
    category: 'Indian Banking',
    description: 'India\'s largest bank with comprehensive international student banking.',
    services: ['Student Loans', 'Global Banking', 'Forex Services'],
    website: 'https://www.sbi.co.in',
    logo: '🏛️',
    verified: true,
    contact: { email: 'sbicare@sbi.co.in', phone: '1800 1234' },
    benefits: ['Education loans up to ₹1.5 crores', 'Global debit cards', 'Overseas branch network']
  },
  {
    id: 6,
    name: 'ICICI Bank',
    category: 'Indian Banking',
    description: 'Premier Indian bank with specialized student banking products.',
    services: ['Education Loans', 'International Cards', 'Study Abroad Solutions'],
    website: 'https://www.icicibank.com',
    logo: '💳',
    verified: true,
    contact: { email: 'customer.care@icicibank.com', phone: '+91 124 4636 5555' },
    benefits: ['Instant education loan approval', 'Zero processing fees', 'Global customer support']
  },

  // Digital Banking & Fintech
  {
    id: 7,
    name: 'Niyo Global',
    category: 'Digital Banking',
    description: 'Digital banking platform for international students and travelers.',
    services: ['International Cards', 'Zero Forex Markup', 'Digital Banking'],
    website: 'https://www.goniyo.com',
    logo: '💳',
    verified: true,
    contact: { email: 'support@goniyo.com', phone: '+91 80 4718 8888' },
    benefits: ['Zero forex markup on international transactions', 'Free international debit card', 'Real-time expense tracking']
  },
  {
    id: 8,
    name: 'Revolut',
    category: 'Digital Banking',
    description: 'Digital bank offering multi-currency accounts and international money transfers.',
    services: ['Multi-currency Account', 'International Transfers', 'Budgeting Tools'],
    website: 'https://www.revolut.com',
    logo: '🌍',
    verified: true,
    contact: { email: 'help@revolut.com', phone: '+44 20 3322 8352' },
    benefits: ['Hold 30+ currencies in one account', 'Free international money transfers', 'Advanced spending analytics']
  },
  {
    id: 9,
    name: 'Wise (formerly TransferWise)',
    category: 'Digital Banking',
    description: 'Global fintech company for international money transfers and multi-currency accounts.',
    services: ['Money Transfers', 'Multi-currency Account', 'Debit Card'],
    website: 'https://wise.com',
    logo: '💸',
    verified: true,
    contact: { email: 'help@wise.com', phone: '+44 20 3695 7654' },
    benefits: ['Real exchange rates with low fees', 'Multi-currency debit card', 'Instant international transfers']
  },

  // French Banks
  {
    id: 10,
    name: 'BNP Paribas',
    category: 'French Banking',
    description: 'Major French bank offering comprehensive student banking services.',
    services: ['Student Accounts', 'Housing Loans', 'Insurance'],
    website: 'https://www.bnpparibas.fr',
    logo: '🏦',
    verified: true,
    contact: { email: 'contact@bnpparibas.fr', phone: '+33 1 40 14 45 46' },
    benefits: ['Free student banking packages', 'Student housing loan assistance', 'Comprehensive insurance coverage']
  },
  {
    id: 11,
    name: 'Crédit Agricole',
    category: 'French Banking',
    description: 'Leading French bank with specialized student services and international support.',
    services: ['Student Banking', 'International Services', 'Student Loans'],
    website: 'https://www.credit-agricole.fr',
    logo: '🌿',
    verified: true,
    contact: { email: 'contact@credit-agricole.fr', phone: '+33 1 43 23 52 02' },
    benefits: ['Dedicated student advisors', 'International student packages', 'Campus banking services']
  },
  {
    id: 12,
    name: 'Société Générale',
    category: 'French Banking',
    description: 'French banking group with comprehensive student banking solutions.',
    services: ['Student Accounts', 'Mobile Banking', 'International Services'],
    website: 'https://www.societegenerale.fr',
    logo: '🔴',
    verified: true,
    contact: { email: 'contact@societegenerale.fr', phone: '+33 1 42 14 20 00' },
    benefits: ['Free student accounts under 27', 'Mobile banking app', 'International money transfers']
  },

  // Accommodation
  {
    id: 13,
    name: 'Studapart',
    category: 'Accommodation',
    description: 'Leading platform for student housing across France.',
    services: ['Student Housing', 'Room Booking', 'Housing Guarantee'],
    website: 'https://www.studapart.com',
    logo: '🏡',
    verified: true,
    contact: { email: 'contact@studapart.com', phone: '+33 1 76 36 04 01' },
    benefits: ['Verified student accommodations', 'No French guarantor required', 'Book housing before arrival']
  },
  {
    id: 14,
    name: 'UniLodge',
    category: 'Accommodation',
    description: 'Premium student accommodation provider in major French cities.',
    services: ['Furnished Apartments', 'Shared Housing', 'Utilities Included'],
    website: 'https://www.unilodge.fr',
    logo: '🏘️',
    verified: true,
    contact: { email: 'info@unilodge.fr', phone: '+33 1 42 96 18 18' },
    benefits: ['Fully furnished student apartments', 'All utilities and WiFi included', 'Flexible lease terms']
  },
  {
    id: 15,
    name: 'NEXITY Studéa',
    category: 'Accommodation',
    description: 'French student housing specialist with modern residences.',
    services: ['Student Residences', 'Furnished Studios', 'Community Services'],
    website: 'https://www.nexity-studea.com',
    logo: '🏢',
    verified: true,
    contact: { email: 'contact@nexity-studea.com', phone: '+33 1 85 55 85 55' },
    benefits: ['Modern student residences', 'All-inclusive pricing', 'Community events and services']
  },

  // Transportation
  {
    id: 16,
    name: 'SNCF Connect',
    category: 'Transportation',
    description: 'Official French railway service with student discounts.',
    services: ['Train Tickets', 'Student Discounts', 'Travel Cards'],
    website: 'https://www.sncf-connect.com',
    logo: '🚄',
    verified: true,
    contact: { email: 'service.client@sncf.fr', phone: '+33 3635' },
    benefits: ['Up to 60% discount on train tickets', 'Young person travel cards', 'Easy online booking system']
  },
  {
    id: 17,
    name: 'RATP (Paris Metro)',
    category: 'Transportation',
    description: 'Paris public transport authority with student rates.',
    services: ['Metro Passes', 'Student Discounts', 'Monthly Subscriptions'],
    website: 'https://www.ratp.fr',
    logo: '🚇',
    verified: true,
    contact: { email: 'contact@ratp.fr', phone: '+33 3424' },
    benefits: ['50% discount on monthly passes for students', 'Navigo student cards', 'Comprehensive Paris transport']
  },

  // Health Insurance
  {
    id: 18,
    name: 'MGEN',
    category: 'Health Insurance',
    description: 'Student health insurance and mutual insurance services.',
    services: ['Health Insurance', 'Dental Coverage', 'Vision Care'],
    website: 'https://www.mgen.fr',
    logo: '🏥',
    verified: true,
    contact: { email: 'contact@mgen.fr', phone: '+33 3 20 47 62 00' },
    benefits: ['Comprehensive health coverage', 'Student-friendly rates', 'Wide network of healthcare providers']
  },
  {
    id: 19,
    name: 'SMERRA',
    category: 'Health Insurance',
    description: 'Student mutual insurance covering health and wellness.',
    services: ['Student Health Insurance', 'Preventive Care', 'Emergency Coverage'],
    website: 'https://www.smerra.fr',
    logo: '❤️',
    verified: true,
    contact: { email: 'contact@smerra.fr', phone: '+33 4 72 33 25 00' },
    benefits: ['Specialized student health coverage', 'Wellness programs', 'Mental health support']
  },

  // Mobile & Internet
  {
    id: 20,
    name: 'Orange',
    category: 'Mobile & Internet',
    description: 'Leading French telecom provider with student plans.',
    services: ['Mobile Plans', 'Internet', 'Student Discounts'],
    website: 'https://www.orange.fr',
    logo: '📱',
    verified: true,
    contact: { email: 'service.client@orange.fr', phone: '3900' },
    benefits: ['Student mobile plan discounts', 'High-speed internet packages', 'International calling options']
  },
  {
    id: 21,
    name: 'Free Mobile',
    category: 'Mobile & Internet',
    description: 'French telecom operator with affordable student-friendly plans.',
    services: ['Mobile Plans', 'Internet Boxes', 'International Options'],
    website: 'https://mobile.free.fr',
    logo: '📞',
    verified: true,
    contact: { email: 'contact@free.fr', phone: '3244' },
    benefits: ['Budget-friendly mobile plans', 'No contract options', 'Free international roaming in EU']
  }
];

const categories = [
  { name: 'Educational Support', icon: BookOpen, color: 'bg-blue-100 text-blue-800' },
  { name: 'Indian Banking', icon: Building2, color: 'bg-orange-100 text-orange-800' },
  { name: 'French Banking', icon: CreditCard, color: 'bg-green-100 text-green-800' },
  { name: 'Digital Banking', icon: Smartphone, color: 'bg-purple-100 text-purple-800' },
  { name: 'Accommodation', icon: Home, color: 'bg-indigo-100 text-indigo-800' },
  { name: 'Transportation', icon: Plane, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Health Insurance', icon: Heart, color: 'bg-red-100 text-red-800' },
  { name: 'Student Services', icon: Users, color: 'bg-teal-100 text-teal-800' },
  { name: 'Mobile & Internet', icon: Globe, color: 'bg-cyan-100 text-cyan-800' }
];

export const AffiliationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

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
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Trusted Partners</h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          We've partnered with leading organizations to provide you with comprehensive support 
          throughout your study abroad journey in France.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('All')}
            className="mb-2"
          >
            All Partners ({partners.length})
          </Button>
          {categories.map((category) => {
            const Icon = category.icon;
            const count = partners.filter(p => p.category === category.name).length;
            return (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.name)}
                className="flex items-center gap-2 mb-2"
              >
                <Icon className="h-4 w-4" />
                {category.name} ({count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {filteredPartners.map((partner) => {
          const CategoryIcon = getCategoryIcon(partner.category);
          return (
            <Card key={partner.id} className="hover:shadow-lg transition-all duration-300 h-full flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{partner.logo}</div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base leading-tight">{partner.name}</CardTitle>
                    </div>
                  </div>
                </div>
                <Badge className={`${getCategoryColor(partner.category)} text-xs w-fit`}>
                  <CategoryIcon className="h-3 w-3 mr-1" />
                  {partner.category}
                </Badge>
                {partner.verified && (
                  <Badge variant="secondary" className="text-xs w-fit">
                    ✓ Verified
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{partner.description}</p>
                
                <div className="mb-3">
                  <h4 className="font-medium text-xs mb-2 text-gray-700">Services:</h4>
                  <div className="flex flex-wrap gap-1">
                    {partner.services.slice(0, 3).map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {partner.services.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{partner.services.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mb-3 flex-1">
                  <h4 className="font-medium text-xs mb-2 text-gray-700">Key Benefits:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {partner.benefits.slice(0, 2).map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-1 flex-shrink-0">•</span>
                        <span className="line-clamp-2">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 mb-3">
                  {partner.contact.email && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Mail className="h-3 w-3 flex-shrink-0" />
                      <a href={`mailto:${partner.contact.email}`} className="hover:text-blue-600 truncate">
                        {partner.contact.email}
                      </a>
                    </div>
                  )}
                  {partner.contact.phone && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Phone className="h-3 w-3 flex-shrink-0" />
                      <a href={`tel:${partner.contact.phone}`} className="hover:text-blue-600">
                        {partner.contact.phone}
                      </a>
                    </div>
                  )}
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-auto"
                  onClick={() => window.open(partner.website, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
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
