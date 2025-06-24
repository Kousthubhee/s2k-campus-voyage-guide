
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, GraduationCap, Calendar, Globe, Phone, Mail, ExternalLink, Award } from "lucide-react";

interface IESEGLilleDetailProps {
  onBack: () => void;
}

export function IESEGLilleDetail({ onBack }: IESEGLilleDetailProps) {
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">IÉSEG School of Management</h1>
              <p className="text-lg text-gray-600">Lille & Paris Campuses</p>
              <div className="flex items-center mt-2 text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Lille & Paris, France</span>
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
                <div className="font-semibold text-blue-900">Grande École Master in Management</div>
                <div className="text-sm text-blue-700">5-year program</div>
              </div>
              <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
                <div className="font-semibold text-green-900">Specialized MSc (15-18 months)</div>
                <div className="text-sm text-green-700">Digital Marketing & CRM, Big Data Analytics, Sustainability Management, Cybersecurity, Fashion Management</div>
              </div>
              <div className="bg-purple-50 border border-purple-100 p-3 rounded-lg">
                <div className="font-semibold text-purple-900">Global MBA</div>
                <div className="text-sm text-purple-700">1-year program</div>
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
                <div className="font-semibold text-blue-900">MSc Programs</div>
                <div className="text-sm text-gray-600">€17,900–€21,200</div>
                <div className="text-xs text-gray-500">Finance Fast Track: €18,200; Regular: €21,200</div>
              </div>
              <div className="border-l-4 border-green-500 bg-green-50 pl-3 py-2">
                <div className="font-semibold text-green-900">Global MBA</div>
                <div className="text-sm text-gray-600">€39,000</div>
              </div>
              <div className="border-l-4 border-purple-500 bg-purple-50 pl-3 py-2">
                <div className="font-semibold text-purple-900">Additional Fees</div>
                <div className="text-sm text-gray-600">Application: €100, CVEC: €100, Alumni: €300</div>
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
              <p>• Bachelor's degree (for MSc/MBA)</p>
              <p>• High school diploma (for Grande École)</p>
              <p>• English: IELTS 6.5 / TOEFL 85 / Duolingo 115</p>
              <p>• GMAT/GRE required for Grande École and MBA</p>
              <p>• Application file, motivation video</p>
              <p>• Recommendation letters, interview</p>
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
                <div className="font-semibold text-yellow-800">Rankings</div>
                <div className="text-sm text-yellow-700">• FT Masters in Management: Top 30 globally</div>
                <div className="text-sm text-yellow-700">• QS Top 10 for Big Data Analytics</div>
              </div>
              <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
                <div className="font-semibold text-green-800">Accreditations</div>
                <div className="text-sm text-green-700">• Triple Crown: EQUIS, AACSB, AMBA</div>
                <div className="text-sm text-green-700">• CGE member</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Program Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
              <div className="font-semibold text-blue-900">International Exposure</div>
              <div className="text-sm text-blue-700">~2,500 exchange students, 300+ partners including Harvard, Bocconi</div>
            </div>
            <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
              <div className="font-semibold text-green-900">Fashion Management MSc</div>
              <div className="text-sm text-green-700">€14,000 for 3 semesters, competitive scholarships available</div>
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
                href="https://www.ieseg.fr/"
                target="_blank"
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline flex items-center"
              >
                www.ieseg.fr
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
            <div className="text-gray-600">
              <p>Campuses in Lille and Paris</p>
              <p>International admissions office available</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
