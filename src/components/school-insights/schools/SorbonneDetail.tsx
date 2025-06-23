
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
        
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="text-5xl mr-4">🏛️</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sorbonne University</h1>
              <p className="text-lg text-gray-600">Leading Research University in Sciences & Humanities</p>
              <div className="flex items-center mt-2 text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                <span>21 rue de l'École de Médecine, 75006 Paris, France</span>
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
                <div className="text-sm text-blue-700">Biomedical Engineering, Chemistry, Data Science, Quantum Physics</div>
              </div>
              <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
                <div className="font-semibold text-green-900">Engineering</div>
                <div className="text-sm text-green-700">Technological Innovation in Health, Environmental Sciences</div>
              </div>
              <div className="bg-purple-50 border border-purple-100 p-3 rounded-lg">
                <div className="font-semibold text-purple-900">Humanities</div>
                <div className="text-sm text-purple-700">History, Territorial Development, Crisis Management</div>
              </div>
              <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg">
                <div className="font-semibold text-orange-900">Medicine</div>
                <div className="text-sm text-orange-700">Brain & Mind Sciences, Medical Research</div>
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
              </div>
              <div className="border-l-4 border-green-500 bg-green-50 pl-3 py-2">
                <div className="font-semibold text-green-900">Non-EU Students</div>
                <div className="text-sm text-gray-600">€3,770–€12,500/year (typical: €10,800–€14,500)</div>
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
              <p>• French proficiency: DELF B2–C1</p>
              <p>• English for Anglophone programs: TOEFL ≥ 90 / IELTS ≥ 6.5</p>
              <p>• Some programs require GPA 3.0+</p>
              <p>• Application includes transcripts, CV</p>
              <p>• Possible interviews for specific programs</p>
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
                <div className="text-sm text-yellow-700">• QS World University #63 (2025)</div>
                <div className="text-sm text-yellow-700">• THE World University #76 (2025)</div>
              </div>
              <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
                <div className="font-semibold text-green-800">Accreditations</div>
                <div className="text-sm text-green-700">• French Ministry of Education recognized</div>
                <div className="text-sm text-green-700">• Public university status</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Application Deadlines</h3>
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
            <div className="font-semibold text-blue-900">Fall 2025 Intake</div>
            <div className="text-sm text-blue-700">Applications typically open March–May 2025</div>
            <div className="text-xs text-blue-600 mt-1">Check specific program deadlines on university website</div>
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
              <p>International student services available</p>
              <p>Faculty-specific admissions offices</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
