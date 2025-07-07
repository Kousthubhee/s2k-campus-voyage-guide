
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Clock, Euro, BookOpen, Award } from 'lucide-react';
import { useSchoolProfileBySlug } from '@/hooks/useSchoolProfiles';

interface ProgramDetailPageProps {
  slug: string;
  programName: string;
  onBack: () => void;
}

export const ProgramDetailPage = ({ slug, programName, onBack }: ProgramDetailPageProps) => {
  const { data: school, isLoading, error } = useSchoolProfileBySlug(slug);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
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
      <div className="max-w-4xl mx-auto p-6">
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

  // Parse detailed programs
  const detailedPrograms = typeof school.detailed_programs === 'object' ? school.detailed_programs : {};
  const brochures = typeof school.brochures === 'object' ? school.brochures : {};
  
  const programDetails = detailedPrograms[programName];
  const programBrochures = brochures[programName] || [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to {school.name}
      </Button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{programName}</h1>
        <p className="text-xl text-gray-600">{school.name} • {school.city}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Program Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Program Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {programDetails?.description ? (
                <p className="text-gray-700 leading-relaxed">{programDetails.description}</p>
              ) : (
                <p className="text-gray-600 italic">
                  Detailed program information is available upon request. Contact the school for more details about {programName}.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Specializations */}
          {programDetails?.specializations && programDetails.specializations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  Specializations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {programDetails.specializations.map((spec: string, index: number) => (
                    <Badge key={index} variant="secondary">{spec}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Admission Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Admission Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {school.admission_requirements && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">General Requirements</h4>
                    <p className="text-gray-700">{school.admission_requirements}</p>
                  </div>
                )}
                {school.language_tests && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Language Tests</h4>
                    <p className="text-gray-700">{school.language_tests}</p>
                  </div>
                )}
                {school.entrance_exams && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Entrance Exams</h4>
                    <p className="text-gray-700">{school.entrance_exams}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Program Details */}
          <Card>
            <CardHeader>
              <CardTitle>Program Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {programDetails?.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Duration:</span>
                  <span className="font-medium">{programDetails.duration}</span>
                </div>
              )}
              
              {school.fees && (
                <div className="flex items-start gap-2">
                  <Euro className="h-4 w-4 text-gray-500 mt-1" />
                  <div>
                    <span className="text-sm text-gray-600 block">Fees:</span>
                    <span className="font-medium text-sm">{school.fees}</span>
                  </div>
                </div>
              )}

              {school.language && (
                <div>
                  <span className="text-sm text-gray-600 block">Language:</span>
                  <span className="font-medium text-sm">{school.language}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Brochures */}
          {programBrochures.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Downloads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {programBrochures.map((brochure: string, index: number) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => window.open(brochure, '_blank')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Program Brochure {programBrochures.length > 1 ? index + 1 : ''}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Need More Info?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Contact the admissions office for detailed program information and application guidance.
              </p>
              {school.contact_links?.website && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open(school.contact_links.website, '_blank')}
                >
                  Visit School Website
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
