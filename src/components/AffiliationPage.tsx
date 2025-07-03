
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Award, Shield, Globe, CreditCard, Plane, Home, Briefcase, GraduationCap, Heart } from 'lucide-react';

interface Partner {
  id: number;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  website: string;
  logo: string; // emoji for now
  featured: boolean;
  tags: string[];
  discount?: string;
}

interface BenefitCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon: Icon, title, description, bgColor, iconColor }) => (
  <Card className={`${bgColor} border-0 h-full hover:shadow-lg transition-shadow`}>
    <CardContent className="p-6 text-center">
      <div className="flex justify-center mb-4">
        <div className={`${iconColor} p-3 rounded-full bg-white/20`}>
          <Icon className="h-8 w-8" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/90 text-sm">{description}</p>
    </CardContent>
  </Card>
);

interface PartnerCardProps {
  partner: Partner;
  onLearnMore: (partner: Partner) => void;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner, onLearnMore }) => (
  <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${partner.featured ? 'ring-2 ring-blue-500' : ''}`}>
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{partner.logo}</div>
          <div>
            <CardTitle className="text-lg">{partner.name}</CardTitle>
            <Badge variant="secondary" className="text-xs">{partner.category}</Badge>
          </div>
        </div>
        {partner.featured && (
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">Featured</Badge>
        )}
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-gray-600 text-sm line-clamp-2">{partner.description}</p>
      
      {partner.discount && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="text-green-800 font-semibold text-sm">{partner.discount}</div>
        </div>
      )}
      
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Key Benefits:</h4>
        <ul className="space-y-1">
          {partner.benefits.slice(0, 3).map((benefit, index) => (
            <li key={index} className="text-xs text-gray-600 flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex flex-wrap gap-1">
        {partner.tags.slice(0, 3).map((tag, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex gap-2 pt-2">
        <Button 
          size="sm" 
          className="flex-1"
          onClick={() => onLearnMore(partner)}
        >
          Learn More
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.open(partner.website, '_blank')}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

export const AffiliationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const partners: Partner[] = [
    {
      id: 1,
      name: 'Campus France',
      category: 'Education',
      description: 'Official French government agency for international student services and support.',
      benefits: [
        'Official visa guidance',
        'University application support',
        'Student service coordination',
        'Academic credential validation'
      ],
      website: 'https://campusfrance.org',
      logo: '🎓',
      featured: true,
      tags: ['Official', 'Education', 'Visa'],
      discount: 'Free consultation services'
    },
    {
      id: 2,
      name: 'HDFC Bank',
      category: 'Banking',
      description: 'Leading Indian bank offering international banking solutions for students studying abroad.',
      benefits: [
        'Student forex cards',
        'Education loans up to ₹1.5 Cr',
        'Zero processing fees',
        'Quick loan approval',
        'International wire transfers'
      ],
      website: 'https://hdfcbank.com',
      logo: '🏦',
      featured: true,
      tags: ['Banking', 'Loans', 'Forex'],
      discount: 'Up to 0.5% off on forex rates'
    },
    {
      id: 3,
      name: 'Niyo Global',
      category: 'Banking',
      description: 'Digital banking platform designed for international students and travelers.',
      benefits: [
        'Zero forex markup',
        'Global debit card',
        'Real-time spending alerts',
        'Multi-currency wallet',
        'No hidden charges'
      ],
      website: 'https://goniyo.com',
      logo: '💳',
      featured: true,
      tags: ['Digital Banking', 'Forex', 'Cards'],
      discount: 'Zero joining fees for students'
    },
    {
      id: 4,
      name: 'Revolut',
      category: 'Banking',
      description: 'European digital bank offering multi-currency accounts and international money transfers.',
      benefits: [
        'Multi-currency accounts',
        'Fee-free spending abroad',
        'Instant money transfers',
        'Budgeting tools',
        'Cryptocurrency support'
      ],
      website: 'https://revolut.com',
      logo: '🌍',
      featured: false,
      tags: ['Digital Banking', 'Multi-currency', 'Europe'],
      discount: '3 months free premium'
    },
    {
      id: 5,
      name: 'Uniplaces',
      category: 'Accommodation',
      description: 'Student accommodation booking platform with verified properties across Europe.',
      benefits: [
        'Verified student housing',
        'No deposit booking',
        'Virtual tours available',
        '24/7 customer support',
        'Flexible cancellation'
      ],
      website: 'https://uniplaces.com',
      logo: '🏠',
      featured: false,
      tags: ['Housing', 'Students', 'Europe'],
      discount: '€50 off first booking'
    },
    {
      id: 6,
      name: 'StudyPortals',
      category: 'Education',
      description: 'Comprehensive platform for finding and comparing study programs worldwide.',
      benefits: [
        'Program search and comparison',
        'University rankings',
        'Application guidance',
        'Scholarship information',
        'Student reviews'
      ],
      website: 'https://studyportals.com',
      logo: '📚',
      featured: false,
      tags: ['Education', 'Research', 'Global'],
      discount: 'Free premium account for 6 months'
    },
    {
      id: 7,
      name: 'GoEuro (Omio)',
      category: 'Travel',
      description: 'European travel booking platform for trains, buses, and flights.',
      benefits: [
        'Best price comparison',
        'Mobile tickets',
        'Multi-modal journey planning',
        'Real-time updates',
        'Customer support in multiple languages'
      ],
      website: 'https://omio.com',
      logo: '🚄',
      featured: false,
      tags: ['Travel', 'Transport', 'Europe'],
      discount: '10% off first booking'
    },
    {
      id: 8,
      name: 'Wise (TransferWise)',
      category: 'Banking',
      description: 'International money transfer service with real exchange rates.',
      benefits: [
        'Real exchange rates',
        'Low transfer fees',
        'Multi-currency account',
        'Debit card available',
        'Fast transfers'
      ],
      website: 'https://wise.com',
      logo: '💸',
      featured: true,
      tags: ['Money Transfer', 'Forex', 'International'],
      discount: 'First transfer fee-free'
    },
    {
      id: 9,
      name: 'French National Railways (SNCF)',
      category: 'Travel',
      description: 'Official French railway company offering student discounts and travel passes.',
      benefits: [
        'Student discounts up to 60%',
        'Annual travel passes',
        'High-speed train access',
        'Mobile booking',
        'Group booking discounts'
      ],
      website: 'https://sncf-connect.com',
      logo: '🚆',
      featured: false,
      tags: ['Transport', 'France', 'Student Discounts'],
      discount: 'Up to 60% student discount'
    },
    {
      id: 10,
      name: 'CAF (Caisse d\'Allocations Familiales)',
      category: 'Government',
      description: 'French government agency providing housing and family allowances to eligible students.',
      benefits: [
        'Housing allowance (APL)',
        'Monthly financial support',
        'Online application process',
        'Direct bank transfers',
        'Multilingual support'
      ],
      website: 'https://caf.fr',
      logo: '🏛️',
      featured: true,
      tags: ['Government', 'Housing Aid', 'Financial Support'],
      discount: 'Up to €300/month housing allowance'
    }
  ];

  const categories = ['All', ...Array.from(new Set(partners.map(p => p.category)))];

  const filteredPartners = selectedCategory === 'All' 
    ? partners 
    : partners.filter(p => p.category === selectedCategory);

  const benefits = [
    {
      icon: Shield,
      title: 'Verified Partners',
      description: 'All our partners are thoroughly vetted and trusted by thousands of students.',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      iconColor: 'text-blue-500'
    },
    {
      icon: Award,
      title: 'Exclusive Discounts',
      description: 'Get special student rates and exclusive offers not available elsewhere.',
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
      iconColor: 'text-green-500'
    },
    {
      icon: Globe,
      title: 'Comprehensive Support',
      description: 'From banking to housing, we cover all aspects of your study abroad journey.',
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
      iconColor: 'text-purple-500'
    },
    {
      icon: Heart,
      title: 'Student-Focused',
      description: 'Every partnership is designed specifically for international student needs.',
      bgColor: 'bg-gradient-to-br from-red-500 to-red-600',
      iconColor: 'text-red-500'
    }
  ];

  const handleLearnMore = (partner: Partner) => {
    setSelectedPartner(partner);
  };

  if (selectedPartner) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedPartner(null)}
          className="mb-6"
        >
          ← Back to Partners
        </Button>
        
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{selectedPartner.logo}</div>
              <div>
                <CardTitle className="text-2xl mb-2">{selectedPartner.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{selectedPartner.category}</Badge>
                  {selectedPartner.featured && (
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">Featured Partner</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed">{selectedPartner.description}</p>
            
            {selectedPartner.discount && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-1">🎉 Exclusive Student Offer</h3>
                <p className="text-green-700">{selectedPartner.discount}</p>
              </div>
            )}
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Key Benefits & Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedPartner.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedPartner.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={() => window.open(selectedPartner.website, '_blank')}
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Visit {selectedPartner.name}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setSelectedPartner(null)}
              >
                Back to Partners
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Trusted Partners</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We've partnered with leading organizations to provide you with exclusive benefits, 
          discounts, and comprehensive support throughout your study abroad journey.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose Our Partners?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
            className="mb-2"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredPartners.map((partner) => (
          <PartnerCard 
            key={partner.id} 
            partner={partner} 
            onLearnMore={handleLearnMore}
          />
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Take advantage of these exclusive partnerships and make your study abroad journey smoother and more affordable.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            Browse All Partners
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};
