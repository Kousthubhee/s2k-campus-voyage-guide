
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Clock, Euro, BookOpen, Award, GraduationCap, Star, Building, Users, Globe } from 'lucide-react';
import { useSchoolProfileBySlug } from '@/hooks/useSchoolProfiles';

interface ProgramDetailPageProps {
  slug: string;
  programName: string;
  onBack: () => void;
}

interface ContactLinks {
  website?: string;
  linkedin?: string;
  instagram?: string;
  email?: string;
  phone?: string;
}

interface ProgramDetails {
  description?: string;
  duration?: string;
  specializations?: string[];
}

export const ProgramDetailPage = ({ slug, programName, onBack }: ProgramDetailPageProps) => {
  const { data: school, isLoading, error } = useSchoolProfileBySlug(slug);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to School
        </Button>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !school) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to School
        </Button>
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Program Not Found</h3>
            <p className="text-gray-600">The program details could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Parse detailed programs and brochures with proper typing
  const detailedPrograms = typeof school.detailed_programs === 'object' && school.detailed_programs && !Array.isArray(school.detailed_programs)
    ? school.detailed_programs as Record<string, ProgramDetails>
    : {};
  
  const brochures = typeof school.brochures === 'object' && school.brochures && !Array.isArray(school.brochures)
    ? school.brochures as Record<string, string[]>
    : {};
  
  const contactLinks: ContactLinks = (typeof school.contact_links === 'object' && school.contact_links && !Array.isArray(school.contact_links)) 
    ? school.contact_links as ContactLinks 
    : {};
  
  const programDetails = detailedPrograms[programName];
  const programBrochures = brochures[programName] || [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Button variant="ghost" onClick={onBack} className="mb-6 hover:bg-blue-50">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to {school.name}
      </Button>

      {/* Header */}
      <div className="mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">{programName}</h1>
            <p className="text-xl opacity-90">{school.name} • {school.city}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Program Overview */}
          <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <BookOpen className="h-5 w-5" />
                Program Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {programDetails?.description ? (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed text-lg">{programDetails.description}</p>
                  {programDetails.duration && (
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Duration: {programDetails.duration}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Building className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 italic text-lg">
                    Detailed program information is available upon request. Contact the school for more details about <strong>{programName}</strong>.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Specializations */}
          {programDetails?.specializations && programDetails.specializations.length > 0 && (
            <Card className="border-l-4 border-l-purple-500 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Award className="h-5 w-5" />
                  Specializations Available
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {programDetails.specializations.map((spec: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
                      <Star className="h-4 w-4 text-purple-600" />
                      <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-0">
                        {spec}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Admission Requirements */}
          <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-2 text-green-900">
                <Users className="h-5 w-5" />
                Admission Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {school.admission_requirements && (
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      General Requirements
                    </h4>
                    <p className="text-gray-700 text-sm">{school.admission_requirements}</p>
                  </div>
                )}
                {school.language_tests && (
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Language Tests
                    </h4>
                    <p className="text-gray-700 text-sm">{school.language_tests}</p>
                  </div>
                )}
                {school.entrance_exams && (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 md:col-span-2">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Entrance Exams
                    </h4>
                    <p className="text-gray-700 text-sm">{school.entrance_exams}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Program Details Quick Info */}
          <Card className="border-l-4 border-l-teal-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50">
              <CardTitle className="flex items-center gap-2 text-teal-900">
                <Award className="h-5 w-5" />
                Quick Info
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {programDetails?.duration && (
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <span className="text-sm text-gray-600 block">Duration</span>
                    <span className="font-medium text-blue-900">{programDetails.duration}</span>
                  </div>
                </div>
              )}
              
              {school.fees && (
                <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <Euro className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <span className="text-sm text-gray-600 block">Fees</span>
                    <span className="font-medium text-green-900 text-sm">{school.fees}</span>
                  </div>
                </div>
              )}

              {school.language && (
                <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <span className="text-sm text-gray-600 block mb-1">Language</span>
                  <span className="font-medium text-purple-900 text-sm">{school.language}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Brochures */}
          {programBrochures.length > 0 && (
            <Card className="border-l-4 border-l-orange-500 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <Download className="h-5 w-5" />
                  Downloads
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {programBrochures.map((brochure: string, index: number) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 hover:from-orange-100 hover:to-red-100 hover:border-orange-300 transition-all duration-200"
                      onClick={() => window.open(brochure, '_blank')}
                    >
                      <Download className="h-4 w-4 mr-2 text-orange-600" />
                      Program Brochure {programBrochures.length > 1 ? index + 1 : ''}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact */}
          <Card className="border-l-4 border-l-indigo-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="flex items-center gap-2 text-indigo-900">
                <Globe className="h-5 w-5" />
                Need More Info?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Contact the admissions office for detailed program information and application guidance.
              </p>
              {contactLinks.website && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 hover:from-indigo-100 hover:to-purple-100 hover:border-indigo-300 transition-all duration-200"
                  onClick={() => window.open(contactLinks.website, '_blank')}
                >
                  <Globe className="h-4 w-4 mr-2 text-indigo-600" />
                  Visit School Website
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Living Costs Info */}
          {school.living_costs && (
            <Card className="border-l-4 border-l-pink-500 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50">
                <CardTitle className="flex items-center gap-2 text-pink-900">
                  <Building className="h-5 w-5" />
                  Living Costs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-gray-700">{school.living_costs}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
