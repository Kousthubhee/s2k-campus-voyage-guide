import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, GraduationCap, Calendar, Globe, Phone, Mail, ExternalLink, Award } from "lucide-react";

interface SorbonneDetailProps {
  onBack: () => void;
}

export function SorbonneDetail({ onBack }: SorbonneDetailProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
        </Button>
        
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white mb-8">
          <div className="flex items-center mb-4">
            <div className="text-6xl mr-4">🏛️</div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Sorbonne University</h1>
              <p className="text-xl opacity-90">Prestigious French University</p>
              <div className="flex items-center mt-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
              Programs Offered
            </h3>
            <div className="text-gray-600">
              <p>• Humanities programs</p>
              <p>• Science programs</p>
              <p>• Medicine programs</p>
              <p>• [Details to be updated]</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-600" />
              Tuition & Fees
            </h3>
            <div className="text-gray-600">
              <p>[Details to be updated]</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-purple-600" />
              Admission Requirements
            </h3>
            <div className="text-gray-600">
              <p>[Details to be updated]</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-orange-600" />
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-gray-400" />
                <a 
                  href="https://www.sorbonne-universite.fr/"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline flex items-center"
                >
                  www.sorbonne-universite.fr
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
              <div className="text-gray-600">
                <p>[Contact details to be updated]</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Application Deadlines</h3>
          <div className="text-gray-600">
            <p>[Deadlines to be updated]</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
