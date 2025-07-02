import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, GraduationCap, Globe, Award, ExternalLink } from "lucide-react";
import { DatabaseSchool } from "@/types/database";

interface SchoolDetailProps {
  school: DatabaseSchool;
  onBack: () => void;
}

export function SchoolDetail({ school, onBack }: SchoolDetailProps) {
  const detailedPrograms = school.detailed_programs || [];
  const rankings = school.rankings || [];
  const accreditations = school.accreditations || [];
  const recognition = school.recognition || [];
  const specializations = school.specializations || [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
        </Button>
        
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="text-5xl mr-4">{school.emoji || "🎓"}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{school.name}</h1>
              <p className="text-lg text-gray-600">{school.long_description || school.description}</p>
              <div className="flex items-center mt-2 text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{school.city}, France</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Programs Card */}
        {detailedPrograms.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                Programs Offered
              </h3>
              <div className="space-y-3">
                {detailedPrograms.map((program: any, index: number) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border ${
                      index % 2 === 0 
                        ? 'bg-blue-50 border-blue-100' 
                        : 'bg-green-50 border-green-100'
                    }`}
                  >
                    <div className={`font-semibold ${
                      index % 2 === 0 ? 'text-blue-900' : 'text-green-900'
                    }`}>
                      {program.name}
                    </div>
                    <div className={`text-sm ${
                      index % 2 === 0 ? 'text-blue-700' : 'text-green-700'
                    }`}>
                      {program.description}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rankings/Accreditations/Recognition Card */}
        {(rankings.length > 0 || accreditations.length > 0 || recognition.length > 0 || specializations.length > 0) && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-600" />
                {rankings.length > 0 ? 'Rankings' : 
                 accreditations.length > 0 ? 'Accreditations' : 
                 specializations.length > 0 ? 'Specializations' : 'Recognition'}
              </h3>
              <div className="space-y-3">
                {[...rankings, ...accreditations, ...recognition, ...specializations].map((item: any, index: number) => (
                  <div key={index} className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg">
                    <div className="font-semibold text-yellow-800">{item.title}</div>
                    <div className="text-sm text-yellow-700">{item.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Contact Information */}
      {school.website && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-gray-400" />
                <a 
                  href={school.website}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline flex items-center"
                >
                  {school.website.replace('https://', '').replace('http://', '')}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}