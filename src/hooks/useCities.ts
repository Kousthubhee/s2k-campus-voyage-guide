
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      console.log('Fetching cities from database...');
      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching cities:', error);
        throw error;
      }
      console.log('Fetched cities:', data?.length, 'cities');
      return data;
    },
    staleTime: 0, // Always fetch fresh data
    refetchOnWindowFocus: true,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useCityByName(cityName: string | null) {
  return useQuery({
    queryKey: ['cities', cityName],
    queryFn: async () => {
      if (!cityName) return null;
      
      console.log('Fetching city details for:', cityName);
      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .eq('name', cityName)
        .single();
      
      if (error) {
        console.error('Error fetching city details:', error);
        throw error;
      }
      console.log('Fetched city details for:', data?.name);
      return data;
    },
    enabled: !!cityName,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}
