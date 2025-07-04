
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, MapPin, BookOpen, Users, Award, Euro, Phone, Mail, Building, Instagram, Linkedin, Globe, Star, Trophy, GraduationCap, Image, Sparkles, Crown, Shield } from 'lucide-react';
import { useSchoolDetail } from '@/hooks/useSchools';
import { Tables } from '@/integrations/supabase/types';

type DatabaseSchool = Tables<'schools'>;

interface School {
  id: number;
  name: string;
  city: string;
  description: string;
  programs: string[];
  website: string;
  location: string;
}

interface SchoolDetailRouterProps {
  school: School;
  onBack: () => void;
}

export const SchoolDetailRouter = ({ school, onBack }: SchoolDetailRouterProps) => {
  const { data: detailedSchool, isLoading, error } = useSchoolDetail(school.id.toString());

  console.log('School detail fetch - ID:', school.id, 'Data:', detailedSchool, 'Error:', error);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Schools
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Use detailed school data if available, otherwise fallback to basic school data
  const schoolData = detailedSchool || {
    id: school.id.toString(),
    name: school.name,
    city: school.city,
    description: school.description,
    website: school.website,
    emoji: "🎓",
    long_description: school.description,
    ranking: null,
    tuition_fees: null,
    contact_info: null,
    detailed_programs: [],
    rankings: [],
    accreditations: [],
    recognition: [],
    specializations: [],
    subjects: school.programs || [],
    programs: school.programs || [],
    image_url: null
  };
  
  console.log('Using school data:', schoolData);
  
  // Safe parsing with fallbacks - handle both string and array/object types
  const parseJsonField = (field: any, fallback: any = []) => {
    try {
      if (typeof field === 'string' && field.trim()) {
        const parsed = JSON.parse(field);
        return Array.isArray(parsed) ? parsed : fallback;
      }
      if (Array.isArray(field)) {
        return field;
      }
      if (typeof field === 'object' && field !== null) {
        return field;
      }
      return fallback;
    } catch (error) {
      console.log('JSON parse error for field:', field, error);
      return fallback;
    }
  };

  const detailedPrograms = parseJsonField(schoolData.detailed_programs, []);
  const rankings = parseJsonField(schoolData.rankings, []);
  const accreditations = parseJsonField(schoolData.accreditations, []);
  const recognition = parseJsonField(schoolData.recognition, []);
  const specializations = parseJsonField(schoolData.specializations, []);
  const subjects = Array.isArray(schoolData.subjects) ? schoolData.subjects : school.programs || [];
  const programs = Array.isArray(schoolData.programs) ? schoolData.programs : school.programs || [];
  
  // Parse contact info safely
  const contactInfo = (() => {
    try {
      if (typeof schoolData.contact_info === 'string' && schoolData.contact_info.trim()) {
        return JSON.parse(schoolData.contact_info);
      }
      if (typeof schoolData.contact_info === 'object' && schoolData.contact_info !== null) {
        return schoolData.contact_info;
      }
      return {};
    } catch {
      return {};
    }
  })();

  // Parse tuition fees safely
  const tuitionFees = (() => {
    try {
      if (typeof schoolData.tuition_fees === 'string' && schoolData.tuition_fees.trim()) {
        return JSON.parse(schoolData.tuition_fees);
      }
      if (typeof schoolData.tuition_fees === 'object' && schoolData.tuition_fees !== null) {
        return schoolData.tuition_fees;
      }
      return null;
    } catch {
      return null;
    }
  })();

  const ranking = schoolData.ranking;
  const longDescription = schoolData.long_description || schoolData.description || school.description;

  const formatTuitionDetails = (fees: any) => {
    if (!fees) return null;
    if (typeof fees === 'object' && fees !== null) {
      return Object.entries(fees).map(([key, value]) => (
        <div key={key} className="flex justify-between items-center py-2 border-b border-green-200 last:border-b-0">
          <span className="capitalize text-gray-700 font-medium">
            {key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}:
          </span>
          <span className="font-semibold text-green-800">
            {String(value).includes('€') ? String(value) : `€${String(value)}`}
          </span>
        </div>
      ));
    }
    return (
      <div className="flex justify-between items-center py-2">
        <span className="text-gray-700 font-medium">Annual Tuition:</span>
        <span className="font-semibold text-green-800">
          {String(fees).includes('€') ? String(fees) : `€${String(fees)}`}
        </span>
      </div>
    );
  };

  const formatProgramDuration = (program: any) => {
    if (program.duration) {
      return `${program.duration} • ${program.type || 'Program'}`;
    }
    return program.type || 'Program';
  };

  const allAchievements = [...rankings, ...accreditations, ...recognition];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
        </Button>
        
        {/* Enhanced School Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-start mb-4">
            {schoolData.image_url ? (
              <div className="mr-6 flex-shrink-0">
                <img 
                  src={schoolData.image_url} 
                  alt={schoolData.name}
                  className="w-20 h-20 rounded-lg object-cover shadow-md"
                />
              </div>
            ) : (
              <div className="text-5xl mr-6 flex-shrink-0">
                {schoolData.emoji || "🎓"}
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-gray-900">{schoolData.name}</h1>
                {ranking && (
                  <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                    <Crown className="h-4 w-4 mr-1" />
                    Rank #{ranking}
                  </div>
                )}
              </div>
              <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                {longDescription}
              </p>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{schoolData.city}, France</span>
              </div>
              {schoolData.website && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-blue-600" />
                  <a 
                    href={schoolData.website}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline flex items-center font-medium"
                  >
                    Visit Website
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Academic Programs & Subjects */}
        <Card className="lg:col-span-2 xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
              Academic Programs & Subjects
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Detailed Programs */}
            {detailedPrograms.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                  Detailed Programs ({detailedPrograms.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detailedPrograms.map((program: any, index: number) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg border-2 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 hover:shadow-md transition-all duration-300"
                    >
                      <div className="font-semibold text-blue-900 mb-2">
                        {program.name || program.title || `Program ${index + 1}`}
                      </div>
                      {program.description && (
                        <div className="text-blue-700 mb-2 text-sm leading-relaxed">
                          {program.description}
                        </div>
                      )}
                      <div className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded-full inline-block font-medium">
                        {formatProgramDuration(program)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Programs */}
            {programs.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Programs Offered ({programs.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {programs.map((program: string, index: number) => (
                    <div 
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full font-medium text-sm hover:bg-blue-200 transition-colors"
                    >
                      {program}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subjects */}
            {subjects.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Subject Areas ({subjects.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject: string, index: number) => (
                    <div 
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-2 rounded-full font-medium text-sm hover:bg-green-200 transition-colors"
                    >
                      {subject}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Show debug info if no data */}
            {detailedPrograms.length === 0 && programs.length === 0 && subjects.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Program information is being updated...</p>
                <p className="text-xs mt-2">School ID: {schoolData.id}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tuition Fees */}
        {tuitionFees && (
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Euro className="h-5 w-5 mr-2 text-green-600" />
                Tuition Fees
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2 bg-green-50 p-4 rounded-lg border-2 border-green-200">
                {formatTuitionDetails(tuitionFees)}
              </div>
              <p className="text-xs text-gray-500 mt-3 italic">
                *Fees may vary based on program and nationality. Contact the school for current information.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Rankings & Recognition */}
        {allAchievements.length > 0 && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                Rankings & Recognition ({allAchievements.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {allAchievements.map((item: any, index: number) => (
                  <div key={index} className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <div className="font-semibold text-yellow-900 mb-1 flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      {item.title || item.name || `Achievement ${index + 1}`}
                    </div>
                    <div className="text-yellow-800 text-sm">{item.description || 'Recognition details available upon request'}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Specializations */}
        {specializations.length > 0 && (
          <Card className="lg:col-span-2 xl:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                Specializations ({specializations.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {specializations.map((spec: any, index: number) => (
                  <div key={index} className="bg-purple-50 border-2 border-purple-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <div className="font-semibold text-purple-900 mb-1 flex items-center">
                      <Star className="h-4 w-4 mr-2" />
                      {spec.title || spec.name || `Specialization ${index + 1}`}
                    </div>
                    <div className="text-purple-800 text-sm">{spec.description || 'Specialization details available'}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Contact Information */}
        <Card className="lg:col-span-2 xl:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Building className="h-5 w-5 mr-2 text-gray-600" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h5 className="font-semibold text-gray-800 mb-3">General Contact</h5>
                {contactInfo?.email && (
                  <div className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Mail className="h-5 w-5 mr-3 text-gray-500" />
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                )}
                {contactInfo?.phone && (
                  <div className="flex items-center p-3 rounded-lg bg-gray-50">
                    <Phone className="h-5 w-5 mr-3 text-gray-500" />
                    <span className="text-gray-700 font-medium">{contactInfo.phone}</span>
                  </div>
                )}
                {!contactInfo?.email && !contactInfo?.phone && (
                  <div className="text-sm text-gray-500 italic">
                    Contact information available on school website
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <h5 className="font-semibold text-gray-800 mb-3">Social Media</h5>
                {contactInfo?.linkedin && (
                  <div className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Linkedin className="h-5 w-5 mr-3 text-gray-500" />
                    <a 
                      href={contactInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                {contactInfo?.instagram && (
                  <div className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Instagram className="h-5 w-5 mr-3 text-gray-500" />
                    <a 
                      href={contactInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Instagram Page
                    </a>
                  </div>
                )}
                {!contactInfo?.linkedin && !contactInfo?.instagram && (
                  <div className="text-sm text-gray-500 italic">
                    Social media links available on request
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h5 className="font-semibold text-gray-800 mb-3">Address</h5>
                {contactInfo?.address && (
                  <div className="flex items-start p-3 rounded-lg bg-gray-50">
                    <Building className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <span className="text-gray-700 font-medium text-sm leading-relaxed">
                      {contactInfo.address}
                    </span>
                  </div>
                )}
                {!contactInfo?.address && (
                  <div className="text-sm text-gray-500 italic">
                    Located in {schoolData.city}, France
                  </div>
                )}
              </div>
            </div>

            {/* Debug information for troubleshooting */}
            {(!detailedSchool || error) && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Some detailed information may not be available yet. 
                  {error && ` (Error: ${error.message})`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
