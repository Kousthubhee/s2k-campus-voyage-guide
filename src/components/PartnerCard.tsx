
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Users, ExternalLink } from "lucide-react";

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

interface PartnerCardProps {
  partner: Partner;
}

export const PartnerCard = ({ partner }: PartnerCardProps) => {
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
