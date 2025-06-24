
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, GraduationCap, Calendar, Globe, Phone, Award, ExternalLink } from "lucide-react";

interface UniversiteStrasbourgDetailProps {
  onBack: () => void;
}

export function UniversiteStrasbourgDetail({ onBack }: UniversiteStrasbourgDetailProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
        </Button>
        
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="text-5xl mr-4">🏛️</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Université de Strasbourg</h1>
              <p className="text-lg text-gray-600">Prestigious Research University</p>
              <div className="flex items-center mt-2 text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                <span>4 rue Blaise Pascal, 67081 Strasbourg Cedex, France</span>
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
                <div className="font-semibold text-blue-900">Life Sciences</div>
                <div className="text-sm text-blue-700">Biochemistry & Biophysics, Neuroscience</div>
              </div>
              <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
                <div className="font-semibold text-green-900">Computer Science & Data</div>
                <div className="text-sm text-green-700">Computer Science, Data Science</div>
              </div>
              <div className="bg-purple-50 border border-purple-100 p-3 rounded-lg">
                <div className="font-semibold text-purple-900">Physical Sciences</div>
                <div className="text-sm text-purple-700">Complex Systems Chemistry</div>
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
                <div className="text-sm text-gray-600">€184–€606/year (depending on program)</div>
              </div>
              <div className="border-l-4 border-green-500 bg-green-50 pl-3 py-2">
                <div className="font-semibold text-green-900">Non-EU Students</div>
                <div className="text-sm text-gray-600">€3,879/year (Master's)</div>
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
              <p>• Bachelor's degree</p>
              <p>• French: DELF B2 for French programs</p>
              <p>• English: IELTS ≥6 / TOEFL 79 for English programs</p>
              <p>• Apply via Campus France</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-600" />
              Rankings & Stats
            </h3>
            <div className="space-y-3">
              <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg">
                <div className="font-semibold text-yellow-800">Global Rankings</div>
                <div className="text-sm text-yellow-700">• QS #456</div>
                <div className="text-sm text-yellow-700">• THE #401–500</div>
              </div>
              <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
                <div className="font-semibold text-green-800">International Profile</div>
                <div className="text-sm text-green-700">20% international students</div>
                <div className="text-sm text-green-700">Renowned research university</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Campus Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h3 className="font-semibold text-sm text-blue-800">Main Campuses</h3>
              <p className="text-sm text-gray-700">Central, Medicine, Cronenbourg</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h3 className="font-semibold text-sm text-green-800">Science Campus</h3>
              <p className="text-sm text-gray-700">Illkirch, Meinau</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <h3 className="font-semibold text-sm text-purple-800">Partner Campuses</h3>
              <p className="text-sm text-gray-700">Haguenau, Colmar, Mulhouse</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Phone className="h-5 w-5 mr-2 text-orange-600" />
            Contact Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-gray-400" />
              <a 
                href="https://www.unistra.fr/en"
                target="_blank"
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline flex items-center"
              >
                www.unistra.fr/en
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
            <div className="text-gray-600">
              <p>Direction des Études & de la Scolarité</p>
              <p>Standard international admissions available</p>
              <p>Member of Eucor, LERU</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
