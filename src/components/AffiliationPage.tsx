
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, ExternalLink, CheckCircle, Clock, Euro, MapPin, Phone, Mail, Globe } from "lucide-react";

interface Partner {
  id: number;
  name: string;
  type: string;
  description: string;
  services: string[];
  rating: number;
  users: string;
  logo: string;
  website: string;
  affiliate?: boolean;
}

const PartnerCard = ({ partner }: { partner: Partner }) => {
  return (
    <Card
      className={`hover:shadow-lg transition-all duration-300 hover:scale-105 ${
        partner.affiliate ? "border-2 border-green-300" : ""
      }`}
    >
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            title={`Visit ${partner.name}`}
            className="inline-block"
          >
            <div className="text-4xl mb-2 transition-transform hover:scale-110">{partner.logo}</div>
          </a>
          <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
          <span
            className={`text-sm px-2 py-1 rounded
                  ${
                    partner.type === "SIM Card & Telecom"
                      ? "bg-orange-100 text-orange-600"
                      : partner.type.toLowerCase().includes("bank")
                      ? "bg-green-100 text-green-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
          >
            {partner.type}
          </span>
          {partner.affiliate && (
            <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-1 rounded inline-block">
              Affiliate
            </span>
          )}
        </div>

        <p className="text-sm text-blue-700 font-medium mb-4 text-center italic">
          {partner.description}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>{partner.rating}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-gray-400 mr-1" />
              <span>{partner.users}</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 mb-2">Services:</div>
            <div className="flex flex-wrap gap-1">
              {partner.services.map((service, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        <a href={partner.website} target="_blank" rel="noopener noreferrer">
          <Button
            className={`w-full ${
              partner.affiliate
                ? "bg-green-600 hover:bg-green-700 text-white"
                : ""
            }`}
            size="sm"
            variant={partner.affiliate ? "default" : "outline"}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit {new URL(partner.website).hostname}
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};

const benefits = [
  {
    id: 1,
    title: "Exclusive Student Discounts",
    description: "Get up to 30% off on essential services like SIM cards, bank accounts, and more",
    icon: "💰",
    details: ["Special rates on telecom services", "Reduced banking fees", "Student-only promotional offers"]
  },
  {
    id: 2,
    title: "Priority Support",
    description: "Access dedicated customer support channels for faster resolution",
    icon: "🎯",
    details: ["Dedicated student helpline", "Priority ticket handling", "24/7 multilingual support"]
  },
  {
    id: 3,
    title: "Simplified Processes",
    description: "Streamlined application processes designed specifically for international students",
    icon: "⚡",
    details: ["Fast-track applications", "Reduced documentation requirements", "Digital-first processes"]
  },
  {
    id: 4,
    title: "Trusted Partners",
    description: "All partners are vetted and trusted by thousands of international students",
    icon: "🛡️",
    details: ["Verified service providers", "Student-reviewed companies", "Regulatory compliance assured"]
  }
];

const BenefitsList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {benefits.map((benefit) => (
        <Card key={benefit.id} className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{benefit.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-3">{benefit.description}</p>
                <ul className="space-y-1">
                  {benefit.details.map((detail, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-500">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const partners: Partner[] = [
  {
    id: 1,
    name: "Orange",
    type: "SIM Card & Telecom",
    description: "Leading French telecom provider with excellent student plans",
    services: ["Mobile Plans", "Internet", "International Calling"],
    rating: 4.2,
    users: "2M+",
    logo: "🍊",
    website: "https://orange.fr",
    affiliate: true
  },
  {
    id: 2,
    name: "Crédit Agricole",
    type: "Banking",
    description: "Student-friendly banking with no monthly fees for students",
    services: ["Student Accounts", "Debit Cards", "Online Banking"],
    rating: 4.0,
    users: "500K+",
    logo: "🏦",
    website: "https://credit-agricole.fr"
  },
  {
    id: 3,
    name: "BNP Paribas",
    type: "Banking",
    description: "International banking services with student benefits",
    services: ["International Transfers", "Student Loans", "Credit Cards"],
    rating: 4.1,
    users: "800K+",
    logo: "💳",
    website: "https://bnpparibas.fr"
  },
  {
    id: 4,
    name: "Bouygues Telecom",
    type: "SIM Card & Telecom",
    description: "Competitive mobile plans with EU roaming included",
    services: ["Mobile Plans", "4G/5G", "EU Roaming"],
    rating: 3.9,
    users: "1M+",
    logo: "📱",
    website: "https://bouyguestelecom.fr",
    affiliate: true
  },
  {
    id: 5,
    name: "LCL",
    type: "Banking",
    description: "Digital banking solutions for modern students",
    services: ["Digital Banking", "Mobile App", "Student Support"],
    rating: 3.8,
    users: "300K+",
    logo: "🏧",
    website: "https://lcl.fr"
  },
  {
    id: 6,
    name: "Free Mobile",
    type: "SIM Card & Telecom",
    description: "Budget-friendly mobile plans perfect for students",
    services: ["Affordable Plans", "No Contract", "EU Roaming"],
    rating: 4.3,
    users: "1.5M+",
    logo: "📶",
    website: "https://mobile.free.fr"
  }
];

export const AffiliationPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Student Partner Network
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Access exclusive deals and services from our trusted partners. Save money and time with special student offers designed just for you.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Why Choose Our Partners?
        </h2>
        <BenefitsList />
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Trusted Partners</h2>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {partners.filter(p => p.affiliate).length} Affiliate Partners
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Want to Become a Partner?
        </h3>
        <p className="text-gray-600 mb-4">
          Join our network and help international students succeed in France
        </p>
        <Button size="lg">
          Contact Partnership Team
        </Button>
      </div>
    </div>
  );
};
