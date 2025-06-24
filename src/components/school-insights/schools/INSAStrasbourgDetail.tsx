
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, GraduationCap, Calendar, Globe, ExternalLink } from "lucide-react";

interface INSAStrasbourgDetailProps {
  onBack: () => void;
}

export function INSAStrasbourgDetail({ onBack }: INSAStrasbourgDetailProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
        </Button>
        
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="text-5xl mr-4">🔧</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">INSA Strasbourg</h1>
              <p className="text-lg text-gray-600">Part of INSA Group Engineering Network</p>
              <div className="flex items-center mt-2 text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                <span>24 Boulevard de la Victoire, 67084 Strasbourg, France</span>
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
              <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg">
                <div className="font-semibold text-blue-900">5-year Diplôme d'ingénieur</div>
                <div className="text-sm text-blue-700">Civil Engineering</div>
              </div>
              <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
                <div className="font-semibold text-green-900">Electrical Engineering</div>
                <div className="text-sm text-green-700">Power systems and electronics</div>
              </div>
              <div className="bg-purple-50 border border-purple-100 p-3 rounded-lg">
                <div className="font-semibold text-purple-900">Mechanical Engineering</div>
                <div className="text-sm text-purple-700">Design and manufacturing</div>
              </div>
              <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg">
                <div className="font-semibold text-orange-900">Other Specializations</div>
                <div className="text-sm text-orange-700">Bio, Computer Science, Materials</div>
              </div>
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
                <div className="font-semibold text-blue-900">EU/EEA Students</div>
                <div className="text-sm text-gray-600">€618/year + CVEC</div>
              </div>
              <div className="border-l-4 border-green-500 bg-green-50 pl-3 py-2">
                <div className="font-semibold text-green-900">Non-EU Students</div>
                <div className="text-sm text-gray-600">€2,850–€3,879/year</div>
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
              <p>• Via prépa/licence pathway</p>
              <p>• French B2 or English B2 proficiency</p>
              <p>• Application file and interview</p>
              <p>• Strong STEM background required</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Accreditations</h3>
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
                <div className="font-semibold text-green-800">Official Recognition</div>
                <div className="text-sm text-green-700">• CTI accredited</div>
                <div className="text-sm text-green-700">• CGE member</div>
                <div className="text-sm text-green-700">• Ministry recognized degrees</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-gray-400" />
              <a 
                href="https://www.insa-strasbourg.fr/"
                target="_blank"
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline flex items-center"
              >
                www.insa-strasbourg.fr
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
            <div className="text-gray-600">
              <p>Part of the prestigious INSA Group</p>
              <p>Located at 24 Boulevard de la Victoire, 67084 Strasbourg</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
