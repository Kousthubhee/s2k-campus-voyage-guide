import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });
}

export function useCityByName(cityName: string | null) {
  return useQuery({
    queryKey: ['cities', cityName],
    queryFn: async () => {
      if (!cityName) return null;
      
      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .eq('name', cityName)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!cityName,
  });
}