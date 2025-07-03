
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, BookOpen, Euro, Phone, Mail, Globe } from "lucide-react";
import React from "react";

interface SchoolCardProps {
  school: any;
  onClick: () => void;
}

export function SchoolCard({ school, onClick }: SchoolCardProps) {
  // Parse tuition fees if they exist
  const tuitionFees = school.tuition_fees;
  const contactInfo = school.contact_info;
  
  const formatTuitionFee = (fees: any) => {
    if (!fees) return 'Contact for details';
    if (typeof fees === 'object') {
      if (fees.annual) return `€${fees.annual}/year`;
      if (fees.semester) return `€${fees.semester}/semester`;
      if (fees.range) return `€${fees.range}`;
      return 'Contact for details';
    }
    return fees.toString();
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{school.name}</CardTitle>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {school.city || school.location}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {school.website && (
              <a
                href={school.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-500 hover:text-blue-700 p-1"
                onClick={e => e.stopPropagation()}
                title="Visit website"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm">{school.description}</p>
        
        {/* Tuition Fee Information */}
        <div className="flex items-center">
          <Euro className="h-4 w-4 mr-2 text-green-600" />
          <span className="text-sm font-medium">Tuition: {formatTuitionFee(tuitionFees)}</span>
        </div>

        {/* Contact Information */}
        {contactInfo && (
          <div className="space-y-1">
            {contactInfo.phone && (
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-3 w-3 mr-2" />
                <span>{contactInfo.phone}</span>
              </div>
            )}
            {contactInfo.email && (
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-3 w-3 mr-2" />
                <span>{contactInfo.email}</span>
              </div>
            )}
          </div>
        )}
        
        {/* Programs/Subjects */}
        <div>
          <div className="flex items-center mb-2">
            <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium">Programs:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {(school.programs || school.subjects || []).slice(0, 3).map((program: string, idx: number) => (
              <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {program}
              </span>
            ))}
            {(school.programs || school.subjects || []).length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                +{(school.programs || school.subjects || []).length - 3} more
              </span>
            )}
          </div>
        </div>

        <Button className="w-full mt-4" size="sm">View Details</Button>
      </CardContent>
    </Card>
  );
}
