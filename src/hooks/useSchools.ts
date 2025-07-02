import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useSchools() {
  return useQuery({
    queryKey: ['schools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });
}

export function useSchoolsByCity(cityName: string | null) {
  return useQuery({
    queryKey: ['schools', 'by-city', cityName],
    queryFn: async () => {
      if (!cityName) return [];
      
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('city', cityName)
        .order('name');
      
      if (error) throw error;
      return data;
    },
    enabled: !!cityName,
  });
}

export function useSchoolSearch(searchTerm: string) {
  return useQuery({
    queryKey: ['schools', 'search', searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) return [];
      
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%`)
        .order('name');
      
      if (error) throw error;
      return data;
    },
    enabled: !!searchTerm.trim(),
  });
}