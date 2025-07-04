
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useDocumentReviews() {
  return useQuery({
    queryKey: ['document-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('document_reviews')
        .select(`
          *,
          user_documents (
            id,
            name,
            type,
            user_id
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    staleTime: 30 * 1000,
  });
}

export function useCreateDocumentReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewData: {
      document_id: string;
      status: 'approved' | 'rejected' | 'needs_revision';
      review_notes?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('document_reviews')
        .insert({
          ...reviewData,
          reviewer_id: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document-reviews'] });
    },
  });
}

export function useUpdateDocumentReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...updateData
    }: {
      id: string;
      status?: 'approved' | 'rejected' | 'needs_revision';
      review_notes?: string;
    }) => {
      const { data, error } = await supabase
        .from('document_reviews')
        .update({
          ...updateData,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document-reviews'] });
    },
  });
}
