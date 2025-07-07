
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
  ChevronDown,
  ChevronUp,
  Download,
  Phone,
  Mail,
  Linkedin,
  Instagram
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
  const [openSections, setOpenSections] = useState<string[]>(['overview']);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Schools
        </Button>
        <div className="space-y-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
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
      <div className="max-w-6xl mx-auto p-6">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Schools
        </Button>
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">School Not Found</h3>
            <p className="text-gray-600">The school profile could not be found or loaded.</p>
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

  const Section = ({ id, title, icon: Icon, children }: { 
    id: string; 
    title: string; 
    icon: any; 
    children: React.ReactNode; 
  }) => {
    const isOpen = openSections.includes(id);
    return (
      <Collapsible open={isOpen} onOpenChange={() => toggleSection(id)}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-blue-600" />
                  {title}
                </div>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>{children}</CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Schools
      </Button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-5 w-5 text-gray-500" />
          <span className="text-gray-600">{school.city}, France</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{school.name}</h1>
        {school.overview && (
          <p className="text-xl text-gray-700 leading-relaxed">{school.overview}</p>
        )}
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {/* Overview & Reputation */}
        <Section id="overview" title="Overview & Reputation" icon={Award}>
          <div className="space-y-4">
            {school.global_rankings && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Global Rankings</h4>
                <p className="text-gray-700">{school.global_rankings}</p>
              </div>
            )}
            {school.recognitions && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Accreditations & Recognition</h4>
                <p className="text-gray-700">{school.recognitions}</p>
              </div>
            )}
          </div>
        </Section>

        {/* Programs & Subjects */}
        <Section id="programs" title="Programs & Subjects" icon={BookOpen}>
          <div className="space-y-6">
            {school.programs && school.programs.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Available Programs</h4>
                <div className="flex flex-wrap gap-2">
                  {school.programs.map((program, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => onProgramClick(program)}
                      className="hover:bg-blue-50"
                    >
                      {program}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {school.subjects && school.subjects.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Subject Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {school.subjects.map((subject, index) => (
                    <Badge key={index} variant="secondary">{subject}</Badge>
                  ))}
                </div>
              </div>
            )}

            {school.degrees && school.degrees.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Degree Levels</h4>
                <div className="flex flex-wrap gap-2">
                  {school.degrees.map((degree, index) => (
                    <Badge key={index} variant="outline">{degree}</Badge>
                  ))}
                </div>
              </div>
            )}

            {school.language && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Language of Instruction</h4>
                <p className="text-gray-700">{school.language}</p>
              </div>
            )}
          </div>
        </Section>

        {/* Admission Requirements */}
        <Section id="admission" title="Admission Requirements" icon={BookOpen}>
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
        </Section>

        {/* Fees & Scholarships */}
        <Section id="fees" title="Fees & Scholarships" icon={Euro}>
          <div className="space-y-4">
            {school.fees && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Tuition Fees</h4>
                <p className="text-gray-700">{school.fees}</p>
              </div>
            )}
            {school.scholarships && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Scholarships & Financial Aid</h4>
                <p className="text-gray-700">{school.scholarships}</p>
              </div>
            )}
          </div>
        </Section>

        {/* Living Costs & Housing */}
        <Section id="living" title="Living Costs & Housing" icon={Home}>
          <div className="space-y-4">
            {school.living_costs && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Monthly Living Costs</h4>
                <p className="text-gray-700">{school.living_costs}</p>
              </div>
            )}
            {school.housing && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Housing Options</h4>
                <p className="text-gray-700">{school.housing}</p>
              </div>
            )}
          </div>
        </Section>

        {/* Campus Facilities */}
        {school.facilities && (
          <Section id="facilities" title="Campus Facilities" icon={MapPin}>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Available Facilities</h4>
              <p className="text-gray-700">{school.facilities}</p>
            </div>
            {school.student_services && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Student Services</h4>
                <p className="text-gray-700">{school.student_services}</p>
              </div>
            )}
          </Section>
        )}

        {/* Indian Community */}
        <Section id="indian-community" title="Indian Community & Culture" icon={Users}>
          <div className="space-y-4">
            {school.indian_community && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Indian Student Community</h4>
                <p className="text-gray-700">{school.indian_community}</p>
              </div>
            )}
            {school.cultural_societies && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Cultural Societies</h4>
                <p className="text-gray-700">{school.cultural_societies}</p>
              </div>
            )}
            {school.indian_amenities && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Indian Amenities & Services</h4>
                <p className="text-gray-700">{school.indian_amenities}</p>
              </div>
            )}
          </div>
        </Section>

        {/* Contact Links */}
        <Section id="contact" title="Contact & Links" icon={Globe}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactLinks.website && (
                <a 
                  href={contactLinks.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Globe className="h-5 w-5 text-blue-600" />
                  <span>Official Website</span>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </a>
              )}
              {contactLinks.linkedin && (
                <a 
                  href={contactLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-blue-600" />
                  <span>LinkedIn</span>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </a>
              )}
              {contactLinks.instagram && (
                <a 
                  href={contactLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-pink-600" />
                  <span>Instagram</span>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </a>
              )}
              {contactLinks.email && (
                <a 
                  href={`mailto:${contactLinks.email}`}
                  className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Mail className="h-5 w-5 text-gray-600" />
                  <span>Email</span>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </a>
              )}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};
