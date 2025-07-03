
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, MapPin, BookOpen, Users } from 'lucide-react';

interface School {
  id: number;
  name: string;
  city: string;
  description: string;
  programs: string[];
  website: string;
  location: string;
}

interface SchoolDetailRouterProps {
  school: School;
  onBack: () => void;
}

export const SchoolDetailRouter = ({ school, onBack }: SchoolDetailRouterProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Schools
      </Button>
      
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">{school.name}</CardTitle>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{school.location || school.city}</span>
              </div>
            </div>
            {school.website && (
              <Button variant="outline" asChild>
                <a href={school.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </a>
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Description */}
          {school.description && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                About
              </h3>
              <p className="text-gray-700 leading-relaxed">{school.description}</p>
            </div>
          )}
          
          {/* Programs/Subjects */}
          {school.programs && school.programs.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Programs & Subjects
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {school.programs.map((program, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium"
                  >
                    {program}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Additional Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
            <p className="text-gray-600 text-sm">
              For detailed admission requirements, application procedures, and contact information, 
              please visit the official website or contact the school directly.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
