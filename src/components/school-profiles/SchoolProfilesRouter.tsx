
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, School, MapPin } from 'lucide-react';
import { useSchoolProfiles, useSchoolProfilesByCity } from '@/hooks/useSchoolProfiles';
import { useCityByName } from '@/hooks/useCities';
import { SchoolDetailPage } from './SchoolDetailPage';
import { ProgramDetailPage } from './ProgramDetailPage';
import { CityInsightsCard } from '@/components/school-insights/CityInsightsCard';
import { InsightsDialog } from '@/components/school-insights/InsightsDialog';

interface SchoolProfilesRouterProps {
  selectedCity?: string | null;
  onBack: () => void;
}

interface LocalInsight {
  id: string;
  type: string;
  title: string;
  description: string;
}

export const SchoolProfilesRouter = ({ selectedCity, onBack }: SchoolProfilesRouterProps) => {
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'program'>('list');
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [showInsightsDialog, setShowInsightsDialog] = useState(false);

  const { data: allSchools = [], isLoading: allLoading } = useSchoolProfiles();
  const { data: citySchools = [], isLoading: cityLoading } = useSchoolProfilesByCity(selectedCity);
  const { data: cityDetails, isLoading: cityDetailsLoading } = useCityByName(selectedCity);

  const schools = selectedCity ? citySchools : allSchools;
  const isLoading = selectedCity ? cityLoading : allLoading;

  const handleSchoolClick = (slug: string) => {
    setSelectedSchool(slug);
    setCurrentView('detail');
  };

  const handleProgramClick = (programName: string) => {
    setSelectedProgram(programName);
    setCurrentView('program');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedSchool(null);
    setSelectedProgram(null);
  };

  const handleBackToDetail = () => {
    setCurrentView('detail');
    setSelectedProgram(null);
  };

  const handleShowAllInsights = () => {
    setShowInsightsDialog(true);
  };

  // Helper function to safely get local insights as array
  const getLocalInsights = (cityData: any): LocalInsight[] => {
    if (!cityData?.local_insights) return [];
    
    // If it's already an array, return it
    if (Array.isArray(cityData.local_insights)) {
      return cityData.local_insights.map((insight: any, index: number) => ({
        id: insight.id || `insight-${index}`,
        type: insight.type || 'general',
        title: insight.title || '',
        description: insight.description || ''
      }));
    }
    
    // If it's a string, try to parse it
    if (typeof cityData.local_insights === 'string') {
      try {
        const parsed = JSON.parse(cityData.local_insights);
        if (Array.isArray(parsed)) {
          return parsed.map((insight: any, index: number) => ({
            id: insight.id || `insight-${index}`,
            type: insight.type || 'general',
            title: insight.title || '',
            description: insight.description || ''
          }));
        }
      } catch (e) {
        console.error('Error parsing local_insights:', e);
      }
    }
    
    return [];
  };

  if (currentView === 'program' && selectedSchool && selectedProgram) {
    return (
      <ProgramDetailPage
        slug={selectedSchool}
        programName={selectedProgram}
        onBack={handleBackToDetail}
      />
    );
  }

  if (currentView === 'detail' && selectedSchool) {
    return (
      <SchoolDetailPage
        slug={selectedSchool}
        onBack={handleBackToList}
        onProgramClick={handleProgramClick}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <School className="h-6 w-6 text-blue-600" />
          {selectedCity ? `Schools in ${selectedCity}` : 'All Schools'}
        </h1>
      </div>

      {/* Show City Insights Card when viewing a specific city */}
      {selectedCity && cityDetails && !cityDetailsLoading && (
        <div className="mb-8">
          <CityInsightsCard
            cityName={cityDetails.name}
            transport={cityDetails.transport || ""}
            famousPlaces={cityDetails.famous_places || ""}
            sportsFacilities={cityDetails.sports_facilities || ""}
            studentLife={cityDetails.student_life || ""}
            onShowAll={handleShowAllInsights}
          />
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : schools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <Card 
              key={school.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleSchoolClick(school.slug)}
            >
              <CardContent className="p-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {school.name}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {school.city}
                  </div>
                  {school.overview && (
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {school.overview}
                    </p>
                  )}
                  {school.programs && school.programs.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {school.programs.slice(0, 3).map((program, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                          {program}
                        </span>
                      ))}
                      {school.programs.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{school.programs.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <School className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Schools Found</h3>
            <p className="text-gray-600">
              {selectedCity 
                ? `No schools are currently listed for ${selectedCity}.`
                : 'No schools are available at the moment.'
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Insights Dialog */}
      {selectedCity && cityDetails && (
        <InsightsDialog
          open={showInsightsDialog}
          onOpenChange={setShowInsightsDialog}
          cityName={cityDetails.name}
          localInsights={getLocalInsights(cityDetails)}
          transport={cityDetails.transport || ""}
          famousPlaces={cityDetails.famous_places || ""}
          sportsFacilities={cityDetails.sports_facilities || ""}
          studentLife={cityDetails.student_life || ""}
        />
      )}
    </div>
  );
};
