
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
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: true, // Refetch when window regains focus
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
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
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
    staleTime: 1000 * 60 * 2, // Search results are fresh for 2 minutes
    refetchOnWindowFocus: true,
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
    staleTime: 1000 * 60 * 10, // School details stay fresh for 10 minutes
    refetchOnWindowFocus: true,
  });
}
