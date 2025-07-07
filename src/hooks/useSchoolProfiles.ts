
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useSchoolProfiles() {
  return useQuery({
    queryKey: ['school-profiles'],
    queryFn: async () => {
      console.log('Fetching all school profiles...');
      const { data, error } = await supabase
        .from('school_profiles')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching school profiles:', error);
        throw error;
      }
      console.log('Fetched school profiles:', data?.length, 'schools');
      return data || [];
    },
    staleTime: 15 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useSchoolProfileBySlug(slug: string | null) {
  return useQuery({
    queryKey: ['school-profiles', 'by-slug', slug],
    queryFn: async () => {
      if (!slug) return null;
      
      console.log('Fetching school profile by slug:', slug);
      const { data, error } = await supabase
        .from('school_profiles')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching school profile:', error);
        throw error;
      }
      console.log('Fetched school profile:', data);
      return data;
    },
    enabled: !!slug,
    staleTime: 30 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useSchoolProfilesByCity(city: string | null) {
  return useQuery({
    queryKey: ['school-profiles', 'by-city', city],
    queryFn: async () => {
      if (!city) return [];
      
      console.log('Fetching school profiles for city:', city);
      const { data, error } = await supabase
        .from('school_profiles')
        .select('*')
        .eq('city', city)
        .order('name');
      
      if (error) {
        console.error('Error fetching school profiles by city:', error);
        throw error;
      }
      console.log('Fetched school profiles for', city, ':', data?.length, 'schools');
      return data || [];
    },
    enabled: !!city,
    staleTime: 15 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
