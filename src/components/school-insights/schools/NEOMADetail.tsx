
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, GraduationCap, Calendar, Globe, Phone, Mail, ExternalLink, Award } from "lucide-react";

interface NEOMADetailProps {
  onBack: () => void;
  campus: string;
}

export function NEOMADetail({ onBack, campus }: NEOMADetailProps) {
  const getCampusSpecificInfo = () => {
    switch (campus) {
      case "Rouen":
        return {
          description: "Main campus with comprehensive programs",
          programs: ["Programme Grande École", "MSc in Finance", "Global MBA", "Bachelor in Business Administration"],
          specialties: "Full range of business programs, international focus"
        };
      case "Paris":
        return {
          description: "Executive and specialized programs",
          programs: ["Executive MBA", "MSc programs", "Executive Education"],
          specialties: "Executive education, part-time programs"
        };
      case "Reims":
        return {
          description: "Core business and undergraduate programs",
          programs: ["Programme Grande École", "Bachelor programs", "MSc International Business"],
          specialties: "Undergraduate focus, international business"
        };
      default:
        return {
          description: "NEOMA Business School campus",
          programs: ["Various business programs"],
          specialties: "Business education"
        };
    }
  };

  const campusInfo = getCampusSpecificInfo();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
        </Button>
        
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="text-5xl mr-4">🏢</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">NEOMA Business School</h1>
              <p className="text-lg text-gray-600">{campus} Campus - {campusInfo.description}</p>
              <div className="flex items-center mt-2 text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{campus}, France</span>
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
            <div className="space-y-3">
              {campusInfo.programs.map((program, index) => (
                <div key={index} className="bg-blue-50 border border-blue-100 p-3 rounded-lg">
                  <div className="font-semibold text-blue-900">{program}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-600" />
              Tuition & Fees
            </h3>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 bg-blue-50 pl-3 py-2">
                <div className="font-semibold text-blue-900">Programme Grande École</div>
                <div className="text-sm text-gray-600">€16,500–19,000/year</div>
              </div>
              <div className="border-l-4 border-green-500 bg-green-50 pl-3 py-2">
                <div className="font-semibold text-green-900">MSc Programs</div>
                <div className="text-sm text-gray-600">€18,000–25,000/year</div>
              </div>
              <div className="border-l-4 border-purple-500 bg-purple-50 pl-3 py-2">
                <div className="font-semibold text-purple-900">Global MBA</div>
                <div className="text-sm text-gray-600">€39,000 total</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-purple-600" />
              Admission Requirements
            </h3>
            <div className="space-y-2 text-sm">
              <p>• Bachelor's degree for Master's programs</p>
              <p>• GMAT/GRE scores (recommended)</p>
              <p>• English proficiency (TOEFL/IELTS)</p>
              <p>• Personal statement and CV</p>
              <p>• 2-3 recommendation letters</p>
              <p>• Interview (for some programs)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-600" />
              Accreditations & Rankings
            </h3>
            <div className="space-y-3">
              <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg">
                <div className="font-semibold text-yellow-800">Triple Crown</div>
                <div className="text-sm text-yellow-700">AACSB, EQUIS, AMBA accredited</div>
              </div>
              <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
                <div className="font-semibold text-green-800">Campus Specialty</div>
                <div className="text-sm text-green-700">{campusInfo.specialties}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-400" />
              <a href="mailto:international.admissions@neoma-bs.fr" className="text-blue-600 hover:underline">
                international.admissions@neoma-bs.fr
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-400" />
              <span>+33 3 44 63 33 00</span>
            </div>
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-gray-400" />
              <a 
                href="https://www.neoma-bs.com/en/"
                target="_blank"
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline flex items-center"
              >
                www.neoma-bs.com/en/
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Application Deadlines</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-semibold text-sm text-blue-800">Fall Intake</h4>
              <p className="text-sm text-gray-700">September 2025</p>
              <p className="text-xs text-gray-500">Deadline: April 30, 2025</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-semibold text-sm text-green-800">Spring Intake</h4>
              <p className="text-sm text-gray-700">February 2026</p>
              <p className="text-xs text-gray-500">Deadline: November 30, 2025</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="font-semibold text-sm text-purple-800">Early Decision</h4>
              <p className="text-sm text-gray-700">September 2025</p>
              <p className="text-xs text-gray-500">Deadline: February 28, 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
