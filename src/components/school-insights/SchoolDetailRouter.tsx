
import { HECParisDetail } from "./schools/HECParisDetail";
import { SorbonneDetail } from "./schools/SorbonneDetail";
import { NEOMADetail } from "./schools/NEOMADetail";
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
      
    case "neoma-rouen":
      return <NEOMADetail onBack={onBack} campus="Rouen" />;
      
    case "neoma-paris":
      return <NEOMADetail onBack={onBack} campus="Paris" />;
      
    case "neoma-reims":
      return <NEOMADetail onBack={onBack} campus="Reims" />;
      
    // Add more specific school components as needed
    // case "polytechnique":
    //   return <PolytechniqueDetail onBack={onBack} />;
    
    // For schools without specific detail pages, use the generic component
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
