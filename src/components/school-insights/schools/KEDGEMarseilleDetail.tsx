
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, GraduationCap, Calendar, Globe, Award, ExternalLink } from "lucide-react";

interface KEDGEMarseilleDetailProps {
  onBack: () => void;
}

export function KEDGEMarseilleDetail({ onBack }: KEDGEMarseilleDetailProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
        </Button>
        
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="text-5xl mr-4">🏫</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">KEDGE Business School</h1>
              <p className="text-lg text-gray-600">Marseille Campus</p>
              <div className="flex items-center mt-2 text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Marseille, France</span>
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
                <div className="font-semibold text-blue-900">International BBA</div>
                <div className="text-sm text-blue-700">4-year undergraduate program</div>
              </div>
              <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
                <div className="font-semibold text-green-900">MSc Programs</div>
                <div className="text-sm text-green-700">International Business, Digital Marketing, Arts & Creative Industries</div>
              </div>
              <div className="bg-purple-50 border border-purple-100 p-3 rounded-lg">
                <div className="font-semibold text-purple-900">Specialized Programs</div>
                <div className="text-sm text-purple-700">Corporate Finance, Innovation & Entrepreneurship, Sport & Event Management</div>
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
                <div className="font-semibold text-blue-900">MSc International Business</div>
                <div className="text-sm text-gray-600">€9,333/year (~€14,000 total for 18 months)</div>
              </div>
              <div className="border-l-4 border-green-500 bg-green-50 pl-3 py-2">
                <div className="font-semibold text-green-900">MSc Marketing</div>
                <div className="text-sm text-gray-600">€17,500/year</div>
              </div>
              <div className="border-l-4 border-purple-500 bg-purple-50 pl-3 py-2">
                <div className="font-semibold text-purple-900">Global MBA</div>
                <div className="text-sm text-gray-600">€35,500–€52,500</div>
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
              <p>• Bachelor's degree for MSc/MBA</p>
              <p>• English proficiency</p>
              <p>• Program-specific requirements</p>
              <p>• Application file + interview</p>
              <p>• Fees: €100 application + CVEC + €300 alumni fee</p>
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
                <div className="text-sm text-yellow-700">FT Masters in Management #49 globally</div>
                <div className="text-sm text-yellow-700">Global MBA #39 worldwide, #15 Europe</div>
              </div>
              <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
                <div className="font-semibold text-green-800">Accreditations</div>
                <div className="text-sm text-green-700">Triple Crown: EQUIS, AACSB, AMBA</div>
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
                href="https://kedge.edu/"
                target="_blank"
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline flex items-center"
              >
                kedge.edu
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
