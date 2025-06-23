
import { HECParisDetail } from "./schools/HECParisDetail";
import { SorbonneDetail } from "./schools/SorbonneDetail";
import { NEOMADetail } from "./schools/NEOMADetail";
import { PSLDetail } from "./schools/PSLDetail";
import { SchoolDetail } from "./SchoolDetail";

interface SchoolDetailRouterProps {
  school: any;
  onBack: () => void;
}

export function SchoolDetailRouter({ school, onBack }: SchoolDetailRouterProps) {
  // Route to specific school detail components based on school ID
  switch (school.id) {
    case "hec-paris":
      return <HECParisDetail onBack={onBack} />;
      
    case "sorbonne":
      return <SorbonneDetail onBack={onBack} />;
      
    case "psl":
      return <PSLDetail onBack={onBack} />;
      
    case "neoma-rouen":
      return <NEOMADetail onBack={onBack} campus="Rouen" />;
      
    case "neoma-paris":
      return <NEOMADetail onBack={onBack} campus="Paris" />;
      
    case "neoma-reims":
      return <NEOMADetail onBack={onBack} campus="Reims" />;
      
    // All other schools will use the generic SchoolDetail component for now
    // Individual detail components can be created for each school as needed
    default:
      return (
        <SchoolDetail
          school={{
            ...school,
            programs: school.subjects || [],
            website: school.website || "",
            location: school.city || "",
          }}
          onBack={onBack}
        />
      );
  }
}
