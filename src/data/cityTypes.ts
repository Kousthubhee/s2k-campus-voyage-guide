
export interface LocalInsight {
  title: string;
  description: string;
  tips: string[];
  sources?: string[];
}

export interface City {
  name: string;
  emoji: string;
  description: string;
  localInsights: LocalInsight[];
  transport: string;
  famousPlaces: string;
  sportsFacilities: string;
  studentLife: string;
  schoolsCount: number;
}
