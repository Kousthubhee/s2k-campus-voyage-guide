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

      // Parse JSON fields if they come as strings
      const parseJSON = (val: any) => {
        if (typeof val === 'string') {
          try {
            return JSON.parse(val);
          } catch {
            return val;
          }
        }
        return val;
      };

      return {
        ...data,
        tuition_fees: parseJSON(data?.tuition_fees),
        contact_info: parseJSON(data?.contact_info),
        detailed_programs: parseJSON(data?.detailed_programs),
        rankings: parseJSON(data?.rankings),
        accreditations: parseJSON(data?.accreditations),
        recognition: parseJSON(data?.recognition),
        specializations: parseJSON(data?.specializations),
        subjects: parseJSON(data?.subjects),
      };
    },
    enabled: !!schoolId,
    staleTime: 15 * 60 * 1000,
    gcTime: 45 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
