
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MapPin, Users, Calendar, Globe, Phone, Mail } from 'lucide-react';

interface SchoolDetailsProps {
  school: any;
  onBack: () => void;
}

export const SchoolDetails = ({ school, onBack }: SchoolDetailsProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Schools
        </Button>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <div className="text-6xl mr-4">{school.image}</div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{school.name}</h1>
            <p className="text-xl opacity-90">{school.description}</p>
            <div className="flex items-center mt-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{school.location}</span>
              <span className="ml-4 bg-white bg-opacity-20 px-2 py-1 rounded">
                {school.ranking}
              </span>
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
              {school.programs.map((program, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{program}</span>
                  <span className="text-sm text-gray-500">Available</span>
                </div>
              ))}
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
              <div className="text-2xl font-bold text-green-600">{school.tuition}</div>
              <div className="text-sm text-gray-600">
                <p>• Application fee: €100-200</p>
                <p>• Living expenses: €800-1,200/month</p>
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
              <p>• Bachelor's degree (any field)</p>
              <p>• GMAT/GRE scores</p>
              <p>• English proficiency (TOEFL/IELTS)</p>
              <p>• Personal statement</p>
              <p>• 2-3 recommendation letters</p>
              <p>• Work experience (preferred)</p>
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
                <span>admissions@{school.name.toLowerCase().replace(/\s+/g, '')}.edu</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span>+33 1 XX XX XX XX</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-gray-400" />
                <span>www.{school.name.toLowerCase().replace(/\s+/g, '')}.edu</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Application Deadlines</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="font-semibold text-blue-900">Fall Intake</div>
              <div className="text-sm text-blue-700">September 2025</div>
              <div className="text-xs text-blue-600 mt-1">Deadline: March 15, 2025</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="font-semibold text-green-900">Spring Intake</div>
              <div className="text-sm text-green-700">January 2026</div>
              <div className="text-xs text-green-600 mt-1">Deadline: October 15, 2025</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="font-semibold text-purple-900">Summer Intake</div>
              <div className="text-sm text-purple-700">June 2025</div>
              <div className="text-xs text-purple-600 mt-1">Deadline: January 15, 2025</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
