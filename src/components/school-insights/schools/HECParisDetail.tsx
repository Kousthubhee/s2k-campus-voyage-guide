
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Users, Calendar, Globe, Phone, Mail, ExternalLink, Award, GraduationCap } from "lucide-react";

interface HECParisDetailProps {
  onBack: () => void;
}

export function HECParisDetail({ onBack }: HECParisDetailProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
        </Button>
        
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="text-5xl mr-4">🏛️</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">HEC Paris</h1>
                <p className="text-lg text-gray-600 mb-2">Europe's Leading Business School</p>
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>1 rue de la Libération, 78350 Jouy-en-Josas, France</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg">
              <span className="text-blue-800 font-semibold">#1 MIM Globally</span>
              <div className="text-xs text-blue-600">FT Rankings</div>
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
                <div className="font-semibold text-blue-900">Master in Management (MIM)</div>
                <div className="text-sm text-blue-700">2-year Grande École program</div>
                <div className="text-xs text-blue-600 mt-1">#1 Globally (FT Rankings)</div>
              </div>
              <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
                <div className="font-semibold text-green-900">MSc International Finance</div>
                <div className="text-sm text-green-700">Specialized Master's program</div>
              </div>
              <div className="bg-purple-50 border border-purple-100 p-3 rounded-lg">
                <div className="font-semibold text-purple-900">MSc Data Science & AI for Business</div>
                <div className="text-sm text-purple-700">Joint program with École Polytechnique</div>
              </div>
              <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg">
                <div className="font-semibold text-orange-900">MSc Strategic Management</div>
                <div className="text-sm text-orange-700">Advanced management specialization</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-600" />
              Tuition & Fees (2025-26)
            </h3>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 bg-blue-50 pl-3 py-2">
                <div className="font-semibold text-blue-900">MIM Program</div>
                <div className="text-sm text-gray-600">€27,900/year (Total: €55,800)</div>
              </div>
              <div className="border-l-4 border-green-500 bg-green-50 pl-3 py-2">
                <div className="font-semibold text-green-900">MSc International Finance</div>
                <div className="text-sm text-gray-600">€43,000</div>
              </div>
              <div className="border-l-4 border-purple-500 bg-purple-50 pl-3 py-2">
                <div className="font-semibold text-purple-900">MSc Strategic Management</div>
                <div className="text-sm text-gray-600">€37,250 tuition + €1,950 services + €950 admin = €40,150 total</div>
              </div>
              <div className="border-l-4 border-orange-500 bg-orange-50 pl-3 py-2">
                <div className="font-semibold text-orange-900">MSc Data Science & AI</div>
                <div className="text-sm text-gray-600">€40,000 - €45,000 (joint with Polytechnique)</div>
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
              <p>• ≤3 years post-graduation</p>
              <p>• English proficiency: TOEFL 100+ or IELTS 7.0+</p>
              <p>• GMAT/GRE for MIM (~645-700) and most MScs</p>
              <p>• Quantitative background for Data Science programs</p>
              <p>• Application includes CV, essays, online interview</p>
              <p>• 2 professional references required</p>
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
                <div className="text-sm text-yellow-700">• MIM: #1 Globally (Financial Times)</div>
                <div className="text-sm text-yellow-700">• Masters & MScs: Top 3 in Europe</div>
              </div>
              <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
                <div className="font-semibold text-green-800">Accreditations</div>
                <div className="text-sm text-green-700">• Triple Crown: EQUIS, AACSB, AMBA</div>
                <div className="text-sm text-green-700">• "Bienvenue en France" certification</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Application Deadlines - MIM Program (2024-25)</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
              <div className="font-semibold text-blue-900">Round 1</div>
              <div className="text-sm text-blue-700">October 10, 2024</div>
              <div className="text-xs text-blue-600 mt-1">Decision: ~3-4 weeks</div>
            </div>
            <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
              <div className="font-semibold text-green-900">Round 2</div>
              <div className="text-sm text-green-700">January 6, 2025</div>
              <div className="text-xs text-green-600 mt-1">Decision: ~3-4 weeks</div>
            </div>
            <div className="bg-purple-50 border border-purple-100 p-4 rounded-lg">
              <div className="font-semibold text-purple-900">Round 3</div>
              <div className="text-sm text-purple-700">February 27, 2025</div>
              <div className="text-xs text-purple-600 mt-1">Decision: ~3-4 weeks</div>
            </div>
            <div className="bg-orange-50 border border-orange-100 p-4 rounded-lg">
              <div className="font-semibold text-orange-900">Round 4</div>
              <div className="text-sm text-orange-700">April 14, 2025</div>
              <div className="text-xs text-orange-600 mt-1">Decision: ~3-4 weeks</div>
            </div>
            <div className="bg-red-50 border border-red-100 p-4 rounded-lg">
              <div className="font-semibold text-red-900">Round 5</div>
              <div className="text-sm text-red-700">June 4, 2025</div>
              <div className="text-xs text-red-600 mt-1">Final Round</div>
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
              <Mail className="h-4 w-4 mr-2 text-gray-400" />
              <a href="mailto:admissionsmasters@hec.fr" className="text-blue-600 hover:underline">
                admissionsmasters@hec.fr
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-400" />
              <span>+33 1 39 67 70 00</span>
            </div>
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-gray-400" />
              <a 
                href="https://www.hec.edu/"
                target="_blank"
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline flex items-center"
              >
                www.hec.edu
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
