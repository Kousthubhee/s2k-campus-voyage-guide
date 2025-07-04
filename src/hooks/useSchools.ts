
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useSchools() {
  return useQuery({
    queryKey: ['schools'],
    queryFn: async () => {
      console.log('Fetching all schools from database...');
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching schools:', error);
        throw error;
      }
      console.log('Fetched schools:', data?.length, 'schools');
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });
}

export function useSchoolsByCity(cityName: string | null) {
  return useQuery({
    queryKey: ['schools', 'by-city', cityName],
    queryFn: async () => {
      if (!cityName) return [];
      
      console.log('Fetching schools for city:', cityName);
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('city', cityName)
        .order('name');
      
      if (error) {
        console.error('Error fetching schools by city:', error);
        throw error;
      }
      console.log('Fetched schools for', cityName, ':', data?.length, 'schools');
      return data || [];
    },
    enabled: !!cityName,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useSchoolSearch(searchTerm: string) {
  return useQuery({
    queryKey: ['schools', 'search', searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) return [];
      
      console.log('Searching schools with term:', searchTerm);
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%`)
        .order('name');
      
      if (error) {
        console.error('Error searching schools:', error);
        throw error;
      }
      console.log('Search results for', searchTerm, ':', data?.length, 'schools');
      return data || [];
    },
    enabled: !!searchTerm.trim(),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useSchoolDetail(schoolId: string | null) {
  return useQuery({
    queryKey: ['schools', 'detail', schoolId],
    queryFn: async () => {
      if (!schoolId) return null;
      
      console.log('Fetching school details for ID:', schoolId);
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('id', schoolId)
        .single();
      
      if (error) {
        console.error('Error fetching school details:', error);
        throw error;
      }
      console.log('Fetched school details for:', data?.name);
      return data;
    },
    enabled: !!schoolId,
    staleTime: 10 * 60 * 1000, // Cache detail pages longer
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
