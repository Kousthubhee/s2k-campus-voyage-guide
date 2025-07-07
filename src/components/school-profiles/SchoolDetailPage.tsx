
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ExternalLink, 
  MapPin, 
  BookOpen, 
  Users, 
  Home, 
  Euro, 
  Award, 
  Globe, 
  Download,
  Phone,
  Mail,
  Linkedin,
  Instagram,
  Clock,
  GraduationCap,
  AlertCircle,
  Star,
  Building,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useSchoolProfileBySlug } from '@/hooks/useSchoolProfiles';

interface SchoolDetailPageProps {
  slug: string;
  onBack: () => void;
  onProgramClick: (programName: string) => void;
}

interface ContactLinks {
  website?: string;
  linkedin?: string;
  instagram?: string;
  email?: string;
  phone?: string;
}

export const SchoolDetailPage = ({ slug, onBack, onProgramClick }: SchoolDetailPageProps) => {
  const { data: school, isLoading, error } = useSchoolProfileBySlug(slug);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Schools
        </Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !school) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Schools
        </Button>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="text-center py-12">
            <AlertCircle className="h-16 w-16 mx-auto mb-4 text-red-400" />
            <h3 className="text-lg font-semibold text-red-900 mb-2">School Not Found</h3>
            <p className="text-red-600">The school profile could not be found or loaded.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Parse JSON fields safely with proper typing
  const contactLinks: ContactLinks = (typeof school.contact_links === 'object' && school.contact_links && !Array.isArray(school.contact_links)) 
    ? school.contact_links as ContactLinks 
    : {};
  
  const detailedPrograms = typeof school.detailed_programs === 'object' && school.detailed_programs && !Array.isArray(school.detailed_programs)
    ? school.detailed_programs as Record<string, any>
    : {};
  
  const brochures = typeof school.brochures === 'object' && school.brochures && !Array.isArray(school.brochures)
    ? school.brochures as Record<string, string[]>
    : {};

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Button variant="ghost" onClick={onBack} className="mb-6 hover:bg-blue-50">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Schools
      </Button>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-xl p-8 mb-8 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
            <GraduationCap className="h-10 w-10 text-blue-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">{school.name}</h1>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span className="text-xl">{school.city}, France</span>
            </div>
          </div>
        </div>
        {school.overview && (
          <p className="text-lg leading-relaxed opacity-95 max-w-4xl">{school.overview}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - spans 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Programs & Subjects */}
          <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <BookOpen className="h-5 w-5" />
                Academic Programs & Subjects
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {school.programs && school.programs.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Programs Offered ({school.programs.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {school.programs.map((program, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => onProgramClick(program)}
                        className="justify-start hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 text-left h-auto p-4 border-2 hover:scale-105 transition-all duration-200"
                      >
                        <div className="flex flex-col items-start w-full">
                          <span className="font-medium text-gray-900">{program}</span>
                          <span className="text-xs text-blue-600 mt-1">Click for details →</span>
                        </div>
                        <ExternalLink className="h-4 w-4 ml-auto text-blue-500" />
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {school.subjects && school.subjects.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Subject Areas ({school.subjects.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {school.subjects.map((subject, index) => (
                      <Badge key={index} variant="secondary" className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 hover:from-blue-200 hover:to-indigo-200 border border-blue-200">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {school.degrees && school.degrees.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Degree Levels</h4>
                  <div className="flex flex-wrap gap-2">
                    {school.degrees.map((degree, index) => (
                      <Badge key={index} variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                        {degree}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {school.language && (
                <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-1 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Language of Instruction
                  </h4>
                  <p className="text-yellow-700">{school.language}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-2 text-green-900">
                <Globe className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactLinks.website && (
                  <a 
                    href={contactLinks.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border-2 border-green-200 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 hover:scale-105 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">Official Website</span>
                      <p className="text-sm text-gray-500">Visit school website</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </a>
                )}
                
                {contactLinks.linkedin && (
                  <a 
                    href={contactLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border-2 border-green-200 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 hover:scale-105 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                      <Linkedin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">LinkedIn</span>
                      <p className="text-sm text-gray-500">Professional network</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </a>
                )}
                
                {contactLinks.instagram && (
                  <a 
                    href={contactLinks.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border-2 border-green-200 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 hover:scale-105 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-pink-200 rounded-full flex items-center justify-center">
                      <Instagram className="h-6 w-6 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">Instagram</span>
                      <p className="text-sm text-gray-500">Campus life & updates</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </a>
                )}
                
                {contactLinks.email && (
                  <a 
                    href={`mailto:${contactLinks.email}`}
                    className="flex items-center gap-3 p-4 border-2 border-green-200 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 hover:scale-105 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">Email</span>
                      <p className="text-sm text-gray-500 break-all">{contactLinks.email}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </a>
                )}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>💡 Tip:</strong> Some advanced international student services may not be listed on official websites.
                  We recommend contacting the school directly for more information about support services.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - 1 column, stacked vertically */}
        <div className="space-y-6">
          {/* Key Information */}
          <Card className="border-l-4 border-l-purple-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <Award className="h-5 w-5" />
                Key Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {school.global_rankings && (
                <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-1 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Global Rankings
                  </h4>
                  <p className="text-sm text-yellow-700">{school.global_rankings}</p>
                </div>
              )}
              
              {school.recognitions && (
                <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-1 flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Accreditations
                  </h4>
                  <p className="text-sm text-blue-700">{school.recognitions}</p>
                </div>
              )}
              
              {school.fees && (
                <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-1 flex items-center gap-2">
                    <Euro className="h-4 w-4" />
                    Tuition Fees
                  </h4>
                  <p className="text-sm text-green-700">{school.fees}</p>
                </div>
              )}
              
              {school.living_costs && (
                <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-1 flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Living Costs
                  </h4>
                  <p className="text-sm text-orange-700">{school.living_costs}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Admission Requirements */}
          <Card className="border-l-4 border-l-red-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
              <CardTitle className="flex items-center gap-2 text-red-900">
                <BookOpen className="h-5 w-5" />
                Admission Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {school.admission_requirements && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">General Requirements</h4>
                  <p className="text-sm text-gray-700">{school.admission_requirements}</p>
                </div>
              )}
              {school.language_tests && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Language Tests</h4>
                  <p className="text-sm text-gray-700">{school.language_tests}</p>
                </div>
              )}
              {school.entrance_exams && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Entrance Exams</h4>
                  <p className="text-sm text-gray-700">{school.entrance_exams}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Campus Life & Facilities */}
          <Card className="border-l-4 border-l-teal-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50">
              <CardTitle className="flex items-center gap-2 text-teal-900">
                <Building className="h-5 w-5" />
                Campus Life & Facilities
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {school.facilities && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Facilities</h4>
                  <p className="text-sm text-gray-700">{school.facilities}</p>
                </div>
              )}
              {school.housing && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Housing</h4>
                  <p className="text-sm text-gray-700">{school.housing}</p>
                </div>
              )}
              {school.student_services && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Student Services</h4>
                  <p className="text-sm text-gray-700">{school.student_services}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Indian Community */}
          <Card className="border-l-4 border-l-orange-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <Users className="h-5 w-5" />
                Indian Community
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {school.indian_community && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Student Community</h4>
                  <p className="text-sm text-gray-700">{school.indian_community}</p>
                </div>
              )}
              {school.cultural_societies && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cultural Societies</h4>
                  <p className="text-sm text-gray-700">{school.cultural_societies}</p>
                </div>
              )}
              {school.indian_amenities && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Indian Amenities</h4>
                  <p className="text-sm text-gray-700">{school.indian_amenities}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Student Support Services */}
          <Card className="border-l-4 border-l-indigo-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
              <CardTitle className="flex items-center gap-2 text-indigo-900">
                <Calendar className="h-5 w-5" />
                Student Support Services
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Academic Support</h4>
                <p className="text-sm text-gray-700">Tutoring services, study groups, and academic counseling</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Career Services</h4>
                <p className="text-sm text-gray-700">Job placement assistance, internship programs, and career guidance</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">International Support</h4>
                <p className="text-sm text-gray-700">Visa assistance, orientation programs, and cultural integration support</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
