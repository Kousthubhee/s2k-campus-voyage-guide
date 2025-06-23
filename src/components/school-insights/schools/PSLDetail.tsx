
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, GraduationCap, Calendar, Globe, Phone, Mail, ExternalLink, Award } from "lucide-react";

interface PSLDetailProps {
  onBack: () => void;
}

export function PSLDetail({ onBack }: PSLDetailProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
        </Button>
        
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="text-5xl mr-4">🎓</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">PSL University</h1>
              <p className="text-lg text-gray-600">Paris Sciences et Lettres - Top Research University</p>
              <div className="flex items-center mt-2 text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                <span>60 Rue Mazarine, 75006 Paris, France</span>
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
                <div className="font-semibold text-blue-900">Sciences</div>
                <div className="text-sm text-blue-700">Physics, Chemistry, Computer Science, Bioengineering</div>
              </div>
              <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
                <div className="font-semibold text-green-900">Engineering</div>
                <div className="text-sm text-green-700">Advanced engineering programs across disciplines</div>
              </div>
              <div className="bg-purple-50 border border-purple-100 p-3 rounded-lg">
                <div className="font-semibold text-purple-900">Economics & Management</div>
                <div className="text-sm text-purple-700">Economics, Political Science, Management</div>
              </div>
              <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg">
                <div className="font-semibold text-orange-900">Humanities & Law</div>
                <div className="text-sm text-orange-700">Over 60 Master's programs across faculties</div>
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
                <div className="text-sm text-gray-600">€250/year + €103 CVEC</div>
                <div className="text-xs text-gray-500">Selective MSc: €6,250 or €3,879</div>
              </div>
              <div className="border-l-4 border-green-500 bg-green-50 pl-3 py-2">
                <div className="font-semibold text-green-900">Non-EU Students</div>
                <div className="text-sm text-gray-600">~€3,879/year</div>
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
              <p>• Bachelor's degree (≥ 180 ECTS)</p>
              <p>• Academic excellence required</p>
              <p>• English: TOEFL 90/IELTS ≥ 6.5 for English tracks</p>
              <p>• French: DELF B2+ for French tracks</p>
              <p>• Application includes CV, transcripts, essays</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-600" />
              Rankings & Accreditations
            </h3>
            <div className="space-y-3">
              <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg">
                <div className="font-semibold text-yellow-800">Global Rankings</div>
                <div className="text-sm text-yellow-700">• QS World University #24 (2025)</div>
                <div className="text-sm text-yellow-700">• THE World University #42 (2025)</div>
              </div>
              <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
                <div className="font-semibold text-green-800">Accreditations</div>
                <div className="text-sm text-green-700">• French Ministry recognized</div>
                <div className="text-sm text-green-700">• Conférence des Grandes Écoles member</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Application Deadlines (2025)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
              <div className="font-semibold text-blue-900">International Master's</div>
              <div className="text-sm text-blue-700">11 January – 11 March 2025</div>
            </div>
            <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
              <div className="font-semibold text-green-900">French National Portal</div>
              <div className="text-sm text-green-700">26 February – 24 March 2025</div>
              <div className="text-xs text-green-600">("Mon Master" portal)</div>
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
                href="https://psl.eu/"
                target="_blank"
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline flex items-center"
              >
                www.psl.eu
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
            <div className="text-gray-600">
              <p>PSL Welcome Desk for international inquiries</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
