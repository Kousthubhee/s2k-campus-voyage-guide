
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Users, Calendar, Globe, Phone, Mail, ExternalLink } from "lucide-react";

interface NEOMADetailProps {
  onBack: () => void;
  campus: string;
}

export function NEOMADetail({ onBack, campus }: NEOMADetailProps) {
  const isRouen = campus === "Rouen";
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
        </Button>
        
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white mb-8">
          <div className="flex items-center mb-4">
            <div className="text-6xl mr-4">🏢</div>
            <div>
              <h1 className="text-3xl font-bold mb-2">NEOMA Business School</h1>
              <p className="text-xl opacity-90">{isRouen ? "Main Campus" : "Paris & Reims Campus"}</p>
              <div className="flex items-center mt-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{campus}</span>
                <span className="ml-4 bg-white bg-opacity-20 px-2 py-1 rounded">
                  Triple Accredited
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
                <span className="font-medium">Programme Grande École (PGE)</span>
                <span className="text-sm text-blue-600">Master Level</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Global MBA</span>
                <span className="text-sm text-blue-600">International</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">MSc in Management</span>
                <span className="text-sm text-blue-600">Specialized</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Bachelor in Management (BBA)</span>
                <span className="text-sm text-blue-600">4 Years</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Executive Education</span>
                <span className="text-sm text-blue-600">Professional</span>
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
              <div className="text-2xl font-bold text-green-600">€16,500-45,000/year</div>
              <div className="text-sm text-gray-600">
                <p>• PGE: €16,500/year</p>
                <p>• Global MBA: €45,000 (full program)</p>
                <p>• MSc Programs: €18,500-25,000/year</p>
                <p>• BBA: €12,500/year</p>
                <p>• Living expenses: €800-1,200/month</p>
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
              <p>• Bachelor's degree for Master's programs</p>
              <p>• GMAT 550+ or equivalent (MBA/MSc)</p>
              <p>• TOEFL 90+ or IELTS 6.5+ (English programs)</p>
              <p>• TCF B2+ (French programs)</p>
              <p>• Personal statement</p>
              <p>• 2 recommendation letters</p>
              <p>• Interview process</p>
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
                <a href="mailto:international.admissions@neoma-bs.fr" className="text-blue-600 hover:underline">
                  international.admissions@neoma-bs.fr
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span>{isRouen ? "+33 2 32 82 57 00" : "+33 1 55 91 78 00"}</span>
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
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Application Deadlines 2025</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="font-semibold text-blue-900">Round 1</div>
              <div className="text-sm text-blue-700">September 2025 intake</div>
              <div className="text-xs text-blue-600 mt-1">Deadline: December 15, 2024</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="font-semibold text-green-900">Round 2</div>
              <div className="text-sm text-green-700">September 2025 intake</div>
              <div className="text-xs text-green-600 mt-1">Deadline: March 31, 2025</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="font-semibold text-purple-900">Round 3</div>
              <div className="text-sm text-purple-700">September 2025 intake</div>
              <div className="text-xs text-purple-600 mt-1">Deadline: June 30, 2025</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

