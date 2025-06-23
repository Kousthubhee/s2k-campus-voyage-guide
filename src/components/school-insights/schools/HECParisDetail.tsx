import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Users, Calendar, Globe, Phone, Mail, ExternalLink } from "lucide-react";

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
        
        <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-lg p-8 text-white mb-8">
          <div className="flex items-center mb-4">
            <div className="text-6xl mr-4">🏛️</div>
            <div>
              <h1 className="text-3xl font-bold mb-2">HEC Paris</h1>
              <p className="text-xl opacity-90">Europe's Leading Business School</p>
              <div className="flex items-center mt-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Jouy-en-Josas, Paris Region</span>
                <span className="ml-4 bg-white bg-opacity-20 px-2 py-1 rounded">
                  #1 in Europe (FT Rankings)
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
                <span className="font-medium">Master in Management (Grande École)</span>
                <span className="text-sm text-blue-600">#1 Europe</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">MBA</span>
                <span className="text-sm text-blue-600">Top 5 Global</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Executive MBA</span>
                <span className="text-sm text-blue-600">Elite Program</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">MSc Finance</span>
                <span className="text-sm text-blue-600">#1 Worldwide</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">PhD in Management</span>
                <span className="text-sm text-blue-600">Research Excellence</span>
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
              <div className="text-2xl font-bold text-green-600">€58,000/year</div>
              <div className="text-sm text-gray-600">
                <p>• Master in Management: €58,000</p>
                <p>• MBA: €89,000 (full program)</p>
                <p>• MSc Programs: €45,000-55,000</p>
                <p>• Living expenses: €1,500-2,000/month</p>
                <p>• Books & materials: €1,000/year</p>
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
              <p>• Bachelor's degree (3.5+ GPA preferred)</p>
              <p>• GMAT 700+ or GRE equivalent</p>
              <p>• TOEFL 100+ or IELTS 7.0+</p>
              <p>• 2+ years work experience (MBA)</p>
              <p>• Personal essays & motivation letter</p>
              <p>• 2-3 recommendation letters</p>
              <p>• Interview (final round)</p>
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
                <a href="mailto:admissions@hec.fr" className="text-blue-600 hover:underline">
                  admissions@hec.fr
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

      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Application Deadlines 2025</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="font-semibold text-blue-900">Round 1 (Early)</div>
              <div className="text-sm text-blue-700">September 2025 intake</div>
              <div className="text-xs text-blue-600 mt-1">Deadline: October 1, 2024</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="font-semibold text-green-900">Round 2 (Main)</div>
              <div className="text-sm text-green-700">September 2025 intake</div>
              <div className="text-xs text-green-600 mt-1">Deadline: January 7, 2025</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="font-semibold text-purple-900">Round 3 (Final)</div>
              <div className="text-sm text-purple-700">September 2025 intake</div>
              <div className="text-xs text-purple-600 mt-1">Deadline: April 14, 2025</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}