
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { CityCard } from "@/components/school-insights/CityCard";
import { CityInsightsCard } from "@/components/school-insights/CityInsightsCard";
import { InsightsDialog } from "@/components/school-insights/InsightsDialog";
import { SchoolDetailRouter } from "@/components/school-insights/SchoolDetailRouter";
import { SchoolSearch } from "@/components/school-insights/SchoolSearch";
import { CitySelection } from "./school-insights/CitySelection";
import { SubjectFilter } from "./school-insights/SubjectFilter";
import { SchoolsGrid } from "./school-insights/SchoolsGrid";
import { useSchools, useSchoolsByCity, useSchoolSearch } from "@/hooks/useSchools";
import { useCities, useCityByName } from "@/hooks/useCities";
import { DatabaseCity, DatabaseSchool, LocalInsight } from "@/types/database";
import { useEffect } from "react";

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

  const cityList = cities.map(city => city.name);
  const queryClient = useQueryClient();

  // Manual refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Invalidate all related queries
      await queryClient.invalidateQueries({ queryKey: ['schools'] });
      await queryClient.invalidateQueries({ queryKey: ['cities'] });
      
      // Refetch current data
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
              <h1 className="text-2xl font-bold text-gray-900">School Insights</h1>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => setSelectedCity(null)} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cities
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">{selectedCity} – Schools & Info</h1>
            </>
          )}
        </div>
        
        {/* Refresh button */}
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

      {/* Global search functionality - always visible */}
      <SchoolSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {!selectedCity && !searchTerm && !citiesLoading && (
        <CitySelection cityList={cityList} onSelect={setSelectedCity} />
      )}
      
      {selectedCity && cityDetails && (
        <div className="mb-4">
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
      
      {selectedCity && availableSubjects.length > 1 && (
        <SubjectFilter
          availableSubjects={availableSubjects}
          subjectFilter={subjectFilter}
          setSubjectFilter={setSubjectFilter}
        />
      )}
      
      {citiesLoading || schoolsLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (selectedCity || searchTerm) ? (
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
        <div className="text-gray-500 text-center">
          Select a city to explore school insights or search for specific schools.
        </div>
      )}
    </div>
  );
}
