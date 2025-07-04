
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
    staleTime: 15 * 60 * 1000, // Cache for 15 minutes (increased from 10)
    gcTime: 60 * 60 * 1000, // Keep in cache for 1 hour (increased from 30)
    refetchOnWindowFocus: false,
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
    staleTime: 15 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
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
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,long_description.ilike.%${searchTerm}%`)
        .order('name');
      
      if (error) {
        console.error('Error searching schools:', error);
        throw error;
      }
      console.log('Search results for', searchTerm, ':', data?.length, 'schools');
      return data || [];
    },
    enabled: !!searchTerm.trim(),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
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
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching school details:', error);
        throw error;
      }
      console.log('Fetched school details for:', data?.name || 'Unknown school');
      return data;
    },
    enabled: !!schoolId,
    staleTime: 30 * 60 * 1000, // Cache detail pages longer (increased from 15)
    gcTime: 2 * 60 * 60 * 1000, // Keep in cache for 2 hours (increased from 45)
    refetchOnWindowFocus: false,
  });
}
