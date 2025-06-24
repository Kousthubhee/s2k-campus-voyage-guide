
import { HECParisDetail } from "./schools/HECParisDetail";
import { SorbonneDetail } from "./schools/SorbonneDetail";
import { NEOMADetail } from "./schools/NEOMADetail";
import { PSLDetail } from "./schools/PSLDetail";
import { IESEGLilleDetail } from "./schools/IESEGLilleDetail";
import { HEILilleDetail } from "./schools/HEILilleDetail";
import { UniversiteStrasbourgDetail } from "./schools/UniversiteStrasbourgDetail";
import { INSAStrasbourgDetail } from "./schools/INSAStrasbourgDetail";
import { EMStrasbourgDetail } from "./schools/EMStrasbourgDetail";
import { SciencesPoStrasbourgDetail } from "./schools/SciencesPoStrasbourgDetail";
import { UniversiteBordeauxDetail } from "./schools/UniversiteBordeauxDetail";
import { KEDGEBordeauxDetail } from "./schools/KEDGEBordeauxDetail";
import { ENSEIRBMATMECADetail } from "./schools/ENSEIRBMATMECADetail";
import { SciencesPoBordeauxDetail } from "./schools/SciencesPoBordeauxDetail";
import { AixMarseilleUniversiteDetail } from "./schools/AixMarseilleUniversiteDetail";
import { KEDGEMarseilleDetail } from "./schools/KEDGEMarseilleDetail";
import { UniversiteGrenobleAlpesDetail } from "./schools/UniversiteGrenobleAlpesDetail";
import { GrenobleINPDetail } from "./schools/GrenobleINPDetail";
import { CentraleLyonDetail } from "./schools/CentraleLyonDetail";
import { INSALyonDetail } from "./schools/INSALyonDetail";
import { ClaudeBernardLyonDetail } from "./schools/ClaudeBernardLyonDetail";
import { EMLyonDetail } from "./schools/EMLyonDetail";
import { LumiereLyon2Detail } from "./schools/LumiereLyon2Detail";
import { ISAESUPAERODetail } from "./schools/ISAESUPAERODetail";
import { EcolePolytechniqueDetail } from "./schools/EcolePolytechniqueDetail";
import { ESCPDetail } from "./schools/ESCPDetail";
import { SciencesPoParisDetail } from "./schools/SciencesPoParisDetail";
import { TelecomParisDetail } from "./schools/TelecomParisDetail";
import { ESSECDetail } from "./schools/ESSECDetail";
import { INSAToulouseDetail } from "./schools/INSAToulouseDetail";
import { PaulSabatierDetail } from "./schools/PaulSabatierDetail";
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

    case "polytechnique":
      return <EcolePolytechniqueDetail onBack={onBack} />;

    case "escp":
      return <ESCPDetail onBack={onBack} />;

    case "sciencespo-paris":
      return <SciencesPoParisDetail onBack={onBack} />;

    case "telecom-paris":
      return <TelecomParisDetail onBack={onBack} />;

    case "essec":
      return <ESSECDetail onBack={onBack} />;
      
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

    case "sciences-po-strasbourg":
      return <SciencesPoStrasbourgDetail onBack={onBack} />;

    case "bordeaux-univ":
    case "universite-bordeaux":
      return <UniversiteBordeauxDetail onBack={onBack} />;

    case "kedge-bordeaux":
      return <KEDGEBordeauxDetail onBack={onBack} />;

    case "enseirb":
    case "enseirb-matmeca":
      return <ENSEIRBMATMECADetail onBack={onBack} />;

    case "sciences-po-bordeaux":
      return <SciencesPoBordeauxDetail onBack={onBack} />;

    case "amu":
    case "aix-marseille-universite":
      return <AixMarseilleUniversiteDetail onBack={onBack} />;

    case "kedge-marseille":
      return <KEDGEMarseilleDetail onBack={onBack} />;

    case "grenoble-univ":
    case "universite-grenoble-alpes":
      return <UniversiteGrenobleAlpesDetail onBack={onBack} />;

    case "grenoble-inp":
      return <GrenobleINPDetail onBack={onBack} />;

    case "centrale-lyon":
      return <CentraleLyonDetail onBack={onBack} />;

    case "insa-lyon":
      return <INSALyonDetail onBack={onBack} />;

    case "claude-bernard":
      return <ClaudeBernardLyonDetail onBack={onBack} />;

    case "em-lyon":
      return <EMLyonDetail onBack={onBack} />;

    case "lumiere-lyon2":
      return <LumiereLyon2Detail onBack={onBack} />;

    case "supaero":
      return <ISAESUPAERODetail onBack={onBack} />;

    case "insa-toulouse":
      return <INSAToulouseDetail onBack={onBack} />;

    case "paul-sabatier":
      return <PaulSabatierDetail onBack={onBack} />;
      
    // All other schools will use the generic SchoolDetail component
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
