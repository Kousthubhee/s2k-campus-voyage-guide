
import { HECParisDetail } from "./schools/HECParisDetail";
import { SorbonneDetail } from "./schools/SorbonneDetail";
import { NEOMADetail } from "./schools/NEOMADetail";
import { PSLDetail } from "./schools/PSLDetail";
import { IESEGLilleDetail } from "./schools/IESEGLilleDetail";
import { HEILilleDetail } from "./schools/HEILilleDetail";
import { UniversiteStrasbourgDetail } from "./schools/UniversiteStrasbourgDetail";
import { INSAStrasbourgDetail } from "./schools/INSAStrasbourgDetail";
import { EMStrasbourgDetail } from "./schools/EMStrasbourgDetail";
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

    case "ieseg":
      return <IESEGLilleDetail onBack={onBack} />;

    case "hei":
      return <HEILilleDetail onBack={onBack} />;

    case "strasbourg-univ":
      return <UniversiteStrasbourgDetail onBack={onBack} />;

    case "insa-strasbourg":
      return <INSAStrasbourgDetail onBack={onBack} />;

    case "em-strasbourg":
      return <EMStrasbourgDetail onBack={onBack} />;
      
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
