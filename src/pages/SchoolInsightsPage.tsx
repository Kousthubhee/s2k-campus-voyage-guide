
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, MapPin, School, Users, Sparkles } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { CityInsightsCard } from "@/components/school-insights/CityInsightsCard";
import { InsightsDialog } from "@/components/school-insights/InsightsDialog";
import { SchoolProfilesRouter } from "@/components/school-profiles/SchoolProfilesRouter";
import { SchoolSearch } from "@/components/school-insights/SchoolSearch";
import { SubjectFilter } from "./school-insights/SubjectFilter";
import { useSchoolProfiles, useSchoolProfilesByCity } from "@/hooks/useSchoolProfiles";
import { useCities, useCityByName } from "@/hooks/useCities";

interface SchoolInsightsPageProps {
  onBack: () => void;
}

export function SchoolInsightsPage({ onBack }: SchoolInsightsPageProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showCityInsights, setShowCityInsights] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch data from database using new school_profiles hooks
  const { data: cities = [], isLoading: citiesLoading, refetch: refetchCities } = useCities();
  const { data: allSchools = [], isLoading: schoolsLoading, refetch: refetchAllSchools } = useSchoolProfiles();
  const { data: citySchools = [], refetch: refetchCitySchools } = useSchoolProfilesByCity(selectedCity);
  const { data: cityDetails, refetch: refetchCityDetails } = useCityByName(selectedCity);

  const queryClient = useQueryClient();

  // Manual refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await queryClient.invalidateQueries({ queryKey: ['school-profiles'] });
      await queryClient.invalidateQueries({ queryKey: ['cities'] });
      
      await Promise.all([
        refetchCities(),
        refetchAllSchools(),
        selectedCity && refetchCitySchools(),
        selectedCity && refetchCityDetails()
      ].filter(Boolean));
      
      console.log('Data refreshed successfully');
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Use appropriate data source based on search/selection
  const displaySchools = searchTerm.trim() 
    ? allSchools.filter(school => 
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (school.programs || []).some(program => program.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (school.subjects || []).some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : (selectedCity ? citySchools : allSchools);
    
  const availableSubjects = selectedCity && citySchools
    ? Array.from(new Set(citySchools.flatMap((s) => s.subjects || []))).sort()
    : [];
    
  let filteredSchools = displaySchools;
  if (subjectFilter !== "All" && selectedCity) {
    filteredSchools = displaySchools.filter((school) =>
      (school.subjects || []).includes(subjectFilter)
    );
  }

  // If we're viewing schools, use the SchoolProfilesRouter
  if (selectedCity || searchTerm) {
    return (
      <SchoolProfilesRouter
        selectedCity={selectedCity}
        onBack={() => {
          if (selectedCity) {
            setSelectedCity(null);
            setSubjectFilter("All");
          } else {
            onBack();
          }
        }}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Checklist
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <School className="h-6 w-6 text-blue-600" />
            Schools & Local Insights
          </h1>
        </div>
        
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>

      {/* Global search functionality */}
      <SchoolSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Cities Grid - show when no city is selected and no search */}
      {!searchTerm && !citiesLoading && (
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Explore French Cities</h2>
            <p className="text-gray-600">Choose a city to discover schools and local insights</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cities.map((city) => {
              // Calculate actual school count for this city from school_profiles
              const actualSchoolCount = allSchools.filter(school => school.city === city.name).length;
              
              return (
                <Card 
                  key={city.id} 
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                  onClick={() => setSelectedCity(city.name)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{city.emoji || '🌆'}</span>
                        <h3 className="font-bold text-gray-900">{city.name}</h3>
                      </div>
                      <ArrowLeft className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors rotate-180" />
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {city.description || 'Discover what this city has to offer for international students.'}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <School className="h-3 w-3" />
                          {actualSchoolCount} Schools
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCity(city.name);
                          setShowCityInsights(true);
                        }}
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        Local Tips
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
      
      {/* City Insights Dialog */}
      {selectedCity && cityDetails && (
        <InsightsDialog
          open={showCityInsights}
          onOpenChange={setShowCityInsights}
          cityName={cityDetails.name}
          localInsights={Array.isArray(cityDetails.local_insights) ? (cityDetails.local_insights as any[]).map((insight, index) => ({
            id: `insight-${index}`,
            type: insight.type || 'general',
            title: insight.title || '',
            description: insight.description || ''
          })) : []}
          transport={cityDetails.transport || ""}
          famousPlaces={cityDetails.famous_places || ""}
          sportsFacilities={cityDetails.sports_facilities || ""}
          studentLife={cityDetails.student_life || ""}
        />
      )}
      
      {/* Loading State */}
      {(citiesLoading || schoolsLoading) && (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-2 text-gray-600">
            <RefreshCw className="h-5 w-5 animate-spin" />
            Loading schools and city data...
          </div>
        </div>
      )}

      {/* Default State */}
      {!citiesLoading && !schoolsLoading && !searchTerm && cities.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Cities Available</h3>
            <p className="text-gray-600">
              City data is being updated. Please check back later or try refreshing the page.
            </p>
            <Button onClick={handleRefresh} className="mt-4">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
