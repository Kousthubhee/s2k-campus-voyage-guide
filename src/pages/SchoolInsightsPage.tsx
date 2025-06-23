
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CityCard } from "@/components/school-insights/CityCard";
import { CityInsightsCard } from "@/components/school-insights/CityInsightsCard";
import { InsightsDialog } from "@/components/school-insights/InsightsDialog";
import { SchoolDetailRouter } from "@/components/school-insights/SchoolDetailRouter";
import { schools } from "@/data/schoolList";
import { getCityDetails } from "@/data/cityUtils";
import { CitySelection } from "./school-insights/CitySelection";
import { SubjectFilter } from "./school-insights/SubjectFilter";
import { SchoolsGrid } from "./school-insights/SchoolsGrid";

interface SchoolInsightsPageProps {
  onBack: () => void;
}

export function SchoolInsightsPage({ onBack }: SchoolInsightsPageProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string>("All");
  const [showCityInsights, setShowCityInsights] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<any | null>(null);

  const cityList = Array.from(new Set(schools.map((s) => s.city)));
  const citySchools = selectedCity
    ? schools.filter((school) => school.city === selectedCity)
    : [];
  const availableSubjects = selectedCity
    ? Array.from(new Set(citySchools.flatMap((s) => s.subjects || []))).sort()
    : [];
  let displayedSchools = citySchools;
  if (subjectFilter !== "All" && selectedCity) {
    displayedSchools = citySchools.filter((school) =>
      (school.subjects || []).includes(subjectFilter)
    );
  }
  const cityDetails = selectedCity ? getCityDetails(selectedCity) : null;

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
      <div className="flex items-center mb-6">
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
      {!selectedCity && (
        <CitySelection cityList={cityList} onSelect={setSelectedCity} />
      )}
      {selectedCity && (
        <div className="mb-4">
          <CityInsightsCard
            cityName={cityDetails.name}
            transport={cityDetails.transport}
            famousPlaces={cityDetails.famousPlaces}
            sportsFacilities={cityDetails.sportsFacilities}
            studentLife={cityDetails.studentLife}
            onShowAll={() => setShowCityInsights(true)}
          />
          <InsightsDialog
            open={showCityInsights}
            onOpenChange={setShowCityInsights}
            cityName={cityDetails.name}
            localInsights={cityDetails.localInsights}
            transport={cityDetails.transport}
            famousPlaces={cityDetails.famousPlaces}
            sportsFacilities={cityDetails.sportsFacilities}
            studentLife={cityDetails.studentLife}
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
      {selectedCity ? (
        <SchoolsGrid
          displayedSchools={displayedSchools}
          onSelectSchool={(school) =>
            setSelectedSchool({
              ...school,
              programs: school.subjects || [],
              website: school.website || "",
              location: school.city || "",
            })
          }
          selectedCity={selectedCity}
        />
      ) : (
        <div className="text-gray-500 text-center">
          Select a city to explore school insights.
        </div>
      )}
    </div>
  );
}
