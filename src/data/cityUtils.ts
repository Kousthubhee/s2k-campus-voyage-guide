
import { City } from "./cityTypes";
import { cityData } from "./cityList";
import { schools } from "./schoolList";

export function getCityDetails(cityName: string): City {
  return (
    cityData.find((c) => c.name === cityName) || {
      name: cityName,
      emoji: "",
      description: "",
      localInsights: [],
      transport: "Local buses and trams available.",
      famousPlaces: "",
      sportsFacilities: "",
      studentLife: "",
      schoolsCount: schools.filter((s) => s.city === cityName).length,
    }
  );
}
