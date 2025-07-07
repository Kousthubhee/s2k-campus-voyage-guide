
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
  AlertCircle
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
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Schools
      </Button>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">{school.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <MapPin className="h-5 w-5" />
              <span className="text-xl">{school.city}, France</span>
            </div>
          </div>
        </div>
        {school.overview && (
          <p className="text-lg leading-relaxed opacity-90 max-w-4xl">{school.overview}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Programs & Subjects */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <BookOpen className="h-5 w-5" />
                Academic Programs & Subjects
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {school.programs && school.programs.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Programs Offered ({school.programs.length})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {school.programs.map((program, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => onProgramClick(program)}
                        className="justify-start hover:bg-blue-50 hover:border-blue-300 text-left h-auto p-3"
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{program}</span>
                          <span className="text-xs text-gray-500 mt-1">Click for details</span>
                        </div>
                        <ExternalLink className="h-4 w-4 ml-auto" />
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
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
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
                      <Badge key={index} variant="outline" className="border-blue-300 text-blue-700">
                        {degree}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {school.language && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-1">Language of Instruction</h4>
                  <p className="text-yellow-700">{school.language}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="bg-green-50">
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
                    className="flex items-center gap-3 p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Globe className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">Official Website</span>
                      <p className="text-sm text-gray-500">Visit school website</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-green-600" />
                  </a>
                )}
                
                {contactLinks.linkedin && (
                  <a 
                    href={contactLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Linkedin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">LinkedIn</span>
                      <p className="text-sm text-gray-500">Professional network</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-green-600" />
                  </a>
                )}
                
                {contactLinks.instagram && (
                  <a 
                    href={contactLinks.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <Instagram className="h-5 w-5 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">Instagram</span>
                      <p className="text-sm text-gray-500">Campus life & updates</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-green-600" />
                  </a>
                )}
                
                {contactLinks.email && (
                  <a 
                    href={`mailto:${contactLinks.email}`}
                    className="flex items-center gap-3 p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">Email</span>
                      <p className="text-sm text-gray-500">{contactLinks.email}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-green-600" />
                  </a>
                )}
              </div>
              
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>Note:</strong> Some advanced international student services may not be listed on official websites.
                  We recommend contacting the school directly for more information about support services.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Key Information */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="bg-purple-50">
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <Award className="h-5 w-5" />
                Key Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {school.global_rankings && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-1 flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Global Rankings
                  </h4>
                  <p className="text-sm text-yellow-700">{school.global_rankings}</p>
                </div>
              )}
              
              {school.recognitions && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-1">Accreditations</h4>
                  <p className="text-sm text-blue-700">{school.recognitions}</p>
                </div>
              )}
              
              {school.fees && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-1 flex items-center gap-2">
                    <Euro className="h-4 w-4" />
                    Tuition Fees
                  </h4>
                  <p className="text-sm text-green-700">{school.fees}</p>
                </div>
              )}
              
              {school.living_costs && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
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
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="bg-red-50">
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

          {/* Indian Community */}
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="bg-orange-50">
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
        </div>
      </div>
    </div>
  );
};
