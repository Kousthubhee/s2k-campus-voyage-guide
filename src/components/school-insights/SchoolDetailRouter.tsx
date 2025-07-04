
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, MapPin, BookOpen, Users, Award, Euro, Phone, Mail, Building, Instagram, Linkedin, Globe, Star, Trophy, GraduationCap, Image } from 'lucide-react';
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
  // Fetch detailed school information from database
  const { data: detailedSchool, isLoading } = useSchoolDetail(school.id.toString());

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Schools
        </Button>
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-2 text-gray-600">
            Loading school details...
          </div>
        </div>
      </div>
    );
  }

  const schoolData = detailedSchool || {
    ...school,
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
  
  // Safe type casting with proper checks
  const detailedPrograms = Array.isArray(schoolData.detailed_programs) 
    ? (schoolData.detailed_programs as any[]) 
    : [];
  
  const rankings = Array.isArray(schoolData.rankings) 
    ? (schoolData.rankings as any[]) 
    : [];
  
  const accreditations = Array.isArray(schoolData.accreditations) 
    ? (schoolData.accreditations as any[]) 
    : [];
  
  const recognition = Array.isArray(schoolData.recognition) 
    ? (schoolData.recognition as any[]) 
    : [];
  
  const specializations = Array.isArray(schoolData.specializations) 
    ? (schoolData.specializations as any[]) 
    : [];

  const subjects = Array.isArray(schoolData.subjects) 
    ? schoolData.subjects 
    : [];

  const programs = Array.isArray(schoolData.programs) 
    ? schoolData.programs 
    : school.programs || [];

  const tuitionFees = schoolData.tuition_fees;
  const contactInfo = schoolData.contact_info as any;
  const ranking = schoolData.ranking;
  const longDescription = schoolData.long_description || schoolData.description || school.description;

  const formatTuitionDetails = (fees: any) => {
    if (!fees) return null;
    if (typeof fees === 'object') {
      return Object.entries(fees).map(([key, value]) => (
        <div key={key} className="flex justify-between items-center py-2 border-b border-green-200 last:border-b-0">
          <span className="capitalize text-gray-700 font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}:</span>
          <span className="font-bold text-green-800 text-lg">
            {String(value).includes('€') ? String(value) : `€${String(value)}`}
          </span>
        </div>
      ));
    }
    return (
      <div className="flex justify-between items-center py-2">
        <span className="text-gray-700 font-medium">Annual Tuition:</span>
        <span className="font-bold text-green-800 text-lg">
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

  const allAchievements = [...rankings, ...accreditations, ...recognition, ...specializations];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
        </Button>
        
        {/* School Header with Image */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <div className="flex items-start mb-6">
            {schoolData.image_url ? (
              <div className="mr-6 flex-shrink-0">
                <img 
                  src={schoolData.image_url} 
                  alt={schoolData.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
              </div>
            ) : (
              <div className="text-6xl mr-6 flex-shrink-0">
                {schoolData.emoji || "🎓"}
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-4xl font-bold text-gray-900">{schoolData.name}</h1>
                {ranking && (
                  <div className="flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold">
                    <Star className="h-5 w-5 mr-2" />
                    Rank #{ranking}
                  </div>
                )}
              </div>
              <p className="text-xl text-gray-600 mb-3 leading-relaxed">
                {longDescription}
              </p>
              <div className="flex items-center text-gray-500 text-lg">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{schoolData.city}, France</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Programs & Subjects Combined Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <BookOpen className="h-6 w-6 mr-3 text-blue-600" />
              Academic Programs & Subjects
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            
            {/* Detailed Programs */}
            {detailedPrograms.length > 0 && (
              <div className="mb-8">
                <h4 className="font-bold text-gray-800 mb-4 text-lg">Detailed Programs</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {detailedPrograms.map((program: any, index: number) => (
                    <div 
                      key={index}
                      className="p-6 rounded-xl border-2 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <div className="font-bold text-blue-900 mb-3 text-lg">
                        {program.name}
                      </div>
                      {program.description && (
                        <div className="text-blue-700 mb-3 leading-relaxed">
                          {program.description}
                        </div>
                      )}
                      <div className="text-sm text-blue-600 bg-blue-200 px-3 py-2 rounded-full inline-block font-semibold">
                        {formatProgramDuration(program)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Programs */}
            {programs.length > 0 && (
              <div className="mb-8">
                <h4 className="font-bold text-gray-800 mb-4 text-lg">Programs Offered</h4>
                <div className="flex flex-wrap gap-3">
                  {programs.map((program: string, index: number) => (
                    <div 
                      key={index}
                      className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold text-lg"
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
                <h4 className="font-bold text-gray-800 mb-4 text-lg">Subject Areas</h4>
                <div className="flex flex-wrap gap-3">
                  {subjects.map((subject: string, index: number) => (
                    <div 
                      key={index}
                      className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold text-lg"
                    >
                      {subject}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tuition Fees Card */}
        {tuitionFees && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Euro className="h-6 w-6 mr-3 text-green-600" />
                Tuition Fees (Annual)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3 bg-green-50 p-6 rounded-xl border-2 border-green-200">
                {formatTuitionDetails(tuitionFees)}
              </div>
              <p className="text-sm text-gray-500 mt-4 italic">
                *Fees may vary based on program and nationality. Contact the school for the most current information.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Rankings & Recognition Card */}
        {allAchievements.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Award className="h-6 w-6 mr-3 text-yellow-600" />
                Rankings & Recognition
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {allAchievements.map((item: any, index: number) => (
                  <div key={index} className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-xl">
                    <div className="font-bold text-yellow-900 text-lg mb-2">{item.title}</div>
                    <div className="text-yellow-800">{item.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Specializations Card */}
        {specializations.length > 0 && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <GraduationCap className="h-6 w-6 mr-3 text-purple-600" />
                Specializations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {specializations.map((spec: any, index: number) => (
                  <div key={index} className="bg-purple-50 border-2 border-purple-200 p-4 rounded-xl">
                    <div className="font-bold text-purple-900 mb-2">{spec.title || spec.name}</div>
                    <div className="text-purple-800 text-sm">{spec.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Information Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Building className="h-6 w-6 mr-3 text-gray-600" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {schoolData.website && (
                  <div className="flex items-center p-3 rounded-lg bg-gray-50">
                    <Globe className="h-5 w-5 mr-4 text-gray-500" />
                    <a 
                      href={schoolData.website}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline flex items-center font-medium text-lg"
                    >
                      {schoolData.website.replace('https://', '').replace('http://', '')}
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                )}
                {contactInfo?.email && (
                  <div className="flex items-center p-3 rounded-lg bg-gray-50">
                    <Mail className="h-5 w-5 mr-4 text-gray-500" />
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-blue-600 hover:underline font-medium text-lg"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                )}
                {contactInfo?.phone && (
                  <div className="flex items-center p-3 rounded-lg bg-gray-50">
                    <Phone className="h-5 w-5 mr-4 text-gray-500" />
                    <span className="text-gray-700 font-medium text-lg">{contactInfo.phone}</span>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                {contactInfo?.linkedin && (
                  <div className="flex items-center p-3 rounded-lg bg-gray-50">
                    <Linkedin className="h-5 w-5 mr-4 text-gray-500" />
                    <a 
                      href={contactInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium text-lg"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                {contactInfo?.instagram && (
                  <div className="flex items-center p-3 rounded-lg bg-gray-50">
                    <Instagram className="h-5 w-5 mr-4 text-gray-500" />
                    <a 
                      href={contactInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium text-lg"
                    >
                      Instagram Page
                    </a>
                  </div>
                )}
                {contactInfo?.address && (
                  <div className="flex items-start p-3 rounded-lg bg-gray-50">
                    <Building className="h-5 w-5 mr-4 text-gray-500 mt-1" />
                    <span className="text-gray-700 font-medium text-lg leading-relaxed">{contactInfo.address}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
