
import { useState } from "react";
import { CityCard } from "@/components/school-insights/CityCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCities } from "@/hooks/useCities";
import { useSchools } from "@/hooks/useSchools";

interface CitySelectionProps {
  cityList: string[];
  onSelect: (city: string) => void;
}

export function CitySelection({ cityList, onSelect }: CitySelectionProps) {
  const [programFilter, setProgramFilter] = useState<string>("All");
  
  const { data: cities = [] } = useCities();
  const { data: schools = [] } = useSchools();

  console.log('CitySelection - Total schools in database:', schools.length);
  console.log('CitySelection - Schools by city breakdown:', 
    cityList.reduce((acc, city) => {
      acc[city] = schools.filter(s => s.city === city).length;
      return acc;
    }, {} as Record<string, number>)
  );

  // Get all unique programs from all schools
  const allPrograms = Array.from(
    new Set(
      schools.flatMap(school => school.subjects || [])
    )
  ).sort();

  // Calculate actual school counts per city from the schools data
  const getSchoolCountForCity = (cityName: string) => {
    const citySchools = schools.filter(school => school.city === cityName);
    console.log(`Schools in ${cityName}:`, citySchools.length);
    return citySchools.length;
  };

  // Filter cities based on selected program
  const filteredCities = programFilter === "All" 
    ? cityList 
    : cityList.filter(cityName => {
        const citySchools = schools.filter(school => school.city === cityName);
        return citySchools.some(school => 
          (school.subjects || []).includes(programFilter)
        );
      });

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Explore by City</h2>
        
        <div className="flex items-center gap-2">
          <label htmlFor="program-filter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Filter by Program:
          </label>
          <Select value={programFilter} onValueChange={setProgramFilter}>
            <SelectTrigger className="w-48" id="program-filter">
              <SelectValue placeholder="All Programs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Programs</SelectItem>
              {allPrograms.map(program => (
                <SelectItem key={program} value={program}>
                  {program}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-6">
        {filteredCities.map((cityName) => {
          const cityDef = cities.find(c => c.name === cityName);
          if (!cityDef) return null;
          
          // Use dynamically calculated school count instead of cached value
          const actualSchoolCount = getSchoolCountForCity(cityName);
          
          return (
            <CityCard
              key={cityName}
              name={cityDef.name}
              emoji={cityDef.emoji || ""}
              description={cityDef.description || ""}
              schoolsCount={actualSchoolCount}
              onClick={() => onSelect(cityName)}
              localInsights={cityDef.local_insights as any}
            />
          );
        })}
      </div>

      {filteredCities.length === 0 && programFilter !== "All" && (
        <div className="text-center py-8 text-gray-500">
          No cities found with schools offering "{programFilter}" programs.
        </div>
      )}
    </div>
  );
}
