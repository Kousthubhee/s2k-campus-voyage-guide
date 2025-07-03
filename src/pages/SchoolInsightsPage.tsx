
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, MapPin, School, Users, Sparkles } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { CityInsightsCard } from "@/components/school-insights/CityInsightsCard";
import { InsightsDialog } from "@/components/school-insights/InsightsDialog";
import { SchoolDetailRouter } from "@/components/school-insights/SchoolDetailRouter";
import { SchoolSearch } from "@/components/school-insights/SchoolSearch";
import { SubjectFilter } from "./school-insights/SubjectFilter";
import { SchoolsGrid } from "./school-insights/SchoolsGrid";
import { useSchools, useSchoolsByCity, useSchoolSearch } from "@/hooks/useSchools";
import { useCities, useCityByName } from "@/hooks/useCities";
import { DatabaseCity, DatabaseSchool, LocalInsight } from "@/types/database";

interface SchoolInsightsPageProps {
  onBack: () => void;
}

export function SchoolInsightsPage({ onBack }: SchoolInsightsPageProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showCityInsights, setShowCityInsights] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<any | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch data from database
  const { data: cities = [], isLoading: citiesLoading, refetch: refetchCities } = useCities();
  const { data: allSchools = [], isLoading: schoolsLoading, refetch: refetchAllSchools } = useSchools();
  const { data: citySchools = [], refetch: refetchCitySchools } = useSchoolsByCity(selectedCity);
  const { data: searchResults = [], refetch: refetchSearchResults } = useSchoolSearch(searchTerm);
  const { data: cityDetails, refetch: refetchCityDetails } = useCityByName(selectedCity);

  const queryClient = useQueryClient();

  // Manual refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await queryClient.invalidateQueries({ queryKey: ['schools'] });
      await queryClient.invalidateQueries({ queryKey: ['cities'] });
      
      await Promise.all([
        refetchCities(),
        refetchAllSchools(),
        selectedCity && refetchCitySchools(),
        selectedCity && refetchCityDetails(),
        searchTerm && refetchSearchResults()
      ].filter(Boolean));
      
      console.log('Data refreshed successfully');
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Use appropriate data source based on search/selection
  const displaySchools = searchTerm.trim() ? searchResults : (selectedCity ? citySchools : allSchools);
    
  const availableSubjects = selectedCity && citySchools
    ? Array.from(new Set(citySchools.flatMap((s) => s.subjects || []))).sort()
    : [];
    
  let filteredSchools = displaySchools;
  if (subjectFilter !== "All" && selectedCity) {
    filteredSchools = displaySchools.filter((school) =>
      (school.subjects || []).includes(subjectFilter)
    );
  }

  if (selectedSchool) {
    return (
      <SchoolDetailRouter
        school={selectedSchool}
        onBack={() => setSelectedSchool(null)}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {!selectedCity ? (
            <>
              <Button variant="ghost" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Checklist
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <School className="h-6 w-6 text-blue-600" />
                Schools & Local Insights
              </h1>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => setSelectedCity(null)} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cities
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-blue-600" />
                {selectedCity} – Schools & Local Insights
              </h1>
            </>
          )}
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
      {!selectedCity && !searchTerm && !citiesLoading && (
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Explore French Cities</h2>
            <p className="text-gray-600">Choose a city to discover schools and local insights</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cities.map((city) => (
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
                        {city.schools_count || 0} Schools
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
            ))}
          </div>
        </div>
      )}
      
      {/* City Insights Card */}
      {selectedCity && cityDetails && (
        <div className="mb-6">
          <CityInsightsCard
            cityName={cityDetails.name}
            transport={cityDetails.transport || ""}
            famousPlaces={cityDetails.famous_places || ""}
            sportsFacilities={cityDetails.sports_facilities || ""}
            studentLife={cityDetails.student_life || ""}
            onShowAll={() => setShowCityInsights(true)}
          />
          <InsightsDialog
            open={showCityInsights}
            onOpenChange={setShowCityInsights}
            cityName={cityDetails.name}
            localInsights={(cityDetails.local_insights as unknown as LocalInsight[]) || []}
            transport={cityDetails.transport || ""}
            famousPlaces={cityDetails.famous_places || ""}
            sportsFacilities={cityDetails.sports_facilities || ""}
            studentLife={cityDetails.student_life || ""}
          />
        </div>
      )}
      
      {/* Subject Filter */}
      {selectedCity && availableSubjects.length > 1 && (
        <SubjectFilter
          availableSubjects={availableSubjects}
          subjectFilter={subjectFilter}
          setSubjectFilter={setSubjectFilter}
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
      
      {/* Schools Grid */}
      {!citiesLoading && !schoolsLoading && (selectedCity || searchTerm) && (
        <>
          {filteredSchools.length > 0 ? (
            <SchoolsGrid
              displayedSchools={filteredSchools.map(school => ({
                id: school.id,
                name: school.name,
                city: school.city,
                description: school.description || "",
                levels: school.programs || [],
                subjects: school.subjects || [],
                website: school.website || "",
              }))}
              onSelectSchool={(school) =>
                setSelectedSchool({
                  ...school,
                  programs: school.subjects || [],
                  website: school.website || "",
                  location: school.city || "",
                })
              }
              selectedCity={selectedCity}
              searchTerm={searchTerm}
            />
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <School className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchTerm ? 'No Schools Found' : 'No Schools Available'}
                </h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? `No schools match your search "${searchTerm}". Try different keywords.`
                    : selectedCity 
                    ? `No schools are currently listed for ${selectedCity}.`
                    : 'Select a city to explore available schools.'
                  }
                </p>
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm('')}
                    className="mt-4"
                  >
                    Clear Search
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Default State */}
      {!citiesLoading && !schoolsLoading && !selectedCity && !searchTerm && cities.length === 0 && (
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
