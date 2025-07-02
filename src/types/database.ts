// Database types that match Supabase schema
export interface DatabaseCity {
  id: string;
  name: string;
  emoji: string | null;
  description: string | null;
  local_insights: LocalInsight[] | null;
  transport: string | null;
  famous_places: string | null;
  sports_facilities: string | null;
  student_life: string | null;
  schools_count: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseSchool {
  id: string;
  name: string;
  city: string;
  description: string | null;
  subjects: string[] | null;
  programs: string[] | null;
  website: string | null;
  contact_info: any;
  image_url: string | null;
  ranking: number | null;
  tuition_fees: any;
  created_at: string | null;
  updated_at: string | null;
  emoji?: string | null;
  long_description?: string | null;
  detailed_programs?: any;
  specializations?: any;
  rankings?: any;
  accreditations?: any;
  recognition?: any;
}

export interface LocalInsight {
  title: string;
  description: string;
  tips: string[];
}