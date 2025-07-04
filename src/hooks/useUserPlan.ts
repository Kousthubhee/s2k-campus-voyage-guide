
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useUserPlan() {
  return useQuery({
    queryKey: ['user-plan'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_plans')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateUserPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (planType: 'free' | 'paid') => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('user_plans')
        .insert({
          user_id: user.id,
          plan_type: planType,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-plan'] });
    },
  });
}
