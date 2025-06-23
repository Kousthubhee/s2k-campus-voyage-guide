
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Users, Calendar, Globe, Phone, Mail, ExternalLink } from "lucide-react";

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
        
        <div className="bg-gradient-to-r from-blue-800 to-indigo-600 rounded-lg p-8 text-white mb-8">
          <div className="flex items-center mb-4">
            <div className="text-6xl mr-4">🏛️</div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Sorbonne University</h1>
              <p className="text-xl opacity-90">Historic University of Excellence</p>
              <div className="flex items-center mt-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Latin Quarter, Paris</span>
                <span className="ml-4 bg-white bg-opacity-20 px-2 py-1 rounded">
                  Founded 1257
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Programs Offered
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Medicine</span>
                <span className="text-sm text-blue-600">Top 5 Europe</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Literature & Humanities</span>
                <span className="text-sm text-blue-600">World Renowned</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Sciences</span>
                <span className="text-sm text-blue-600">Research Excellence</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Engineering</span>
                <span className="text-sm text-blue-600">Polytech Network</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">PhD Programs</span>
                <span className="text-sm text-blue-600">25 Doctoral Schools</span>
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
              <div className="text-2xl font-bold text-green-600">€170-3,770/year</div>
              <div className="text-sm text-gray-600">
                <p>• EU students: €170/year (License), €243/year (Master)</p>
                <p>• Non-EU students: €2,770/year (License), €3,770/year (Master)</p>
                <p>• Medicine: €8,000-15,000/year (non-EU)</p>
                <p>• Living expenses: €1,000-1,500/month</p>
                <p>• Books & materials: €500-800/year</p>
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
            <div className="space-y-2">
              <p>• French Baccalauréat or equivalent</p>
              <p>• TCF/TEF B2+ for French programs</p>
              <p>• TOEFL 80+ or IELTS 6.0+ for English programs</p>
              <p>• Academic transcripts (translated)</p>
              <p>• Motivation letter in French/English</p>
              <p>• 1-2 recommendation letters</p>
              <p>• Portfolio (for arts programs)</p>
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
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <a href="mailto:international@sorbonne-universite.fr" className="text-blue-600 hover:underline">
                  international@sorbonne-universite.fr
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span>+33 1 44 27 44 27</span>
              </div>
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
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Application Deadlines 2025</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="font-semibold text-blue-900">International Applications</div>
              <div className="text-sm text-blue-700">September 2025 intake</div>
              <div className="text-xs text-blue-600 mt-1">Deadline: March 15, 2025</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="font-semibold text-green-900">Master's Programs</div>
              <div className="text-sm text-green-700">September 2025 intake</div>
              <div className="text-xs text-green-600 mt-1">Deadline: April 30, 2025</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
