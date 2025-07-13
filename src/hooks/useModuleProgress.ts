
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface ModuleCompletion {
  id: string;
  user_id: string;
  module_id: string;
  completed_at: string;
  notes?: string;
}

export const useModuleProgress = () => {
  const [completions, setCompletions] = useState<ModuleCompletion[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCompletions = async () => {
    if (!user) return;

    try {
      // For now, we'll use a workaround until the types are updated
      const { data, error } = await supabase
        .rpc('get_module_completions', { user_uuid: user.id })
        .select('*');

      if (error) {
        console.error('Error fetching module completions:', error);
        // If RPC doesn't exist, fall back to empty array
        setCompletions([]);
      } else {
        setCompletions(data || []);
      }
    } catch (error: any) {
      console.error('Error fetching module completions:', error);
      setCompletions([]);
    } finally {
      setLoading(false);
    }
  };

  const markModuleComplete = async (moduleId: string, notes?: string) => {
    if (!user) {
      toast.error('Please sign in to track progress');
      return;
    }

    try {
      // Create a completion record manually for now
      const completion: ModuleCompletion = {
        id: crypto.randomUUID(),
        user_id: user.id,
        module_id: moduleId,
        completed_at: new Date().toISOString(),
        notes: notes,
      };

      setCompletions(prev => {
        const existing = prev.find(c => c.module_id === moduleId);
        if (existing) {
          return prev.map(c => c.module_id === moduleId ? completion : c);
        }
        return [...prev, completion];
      });

      toast.success('Module marked as complete!');
    } catch (error: any) {
      console.error('Error marking module complete:', error);
      toast.error('Failed to update progress');
    }
  };

  const isModuleComplete = (moduleId: string) => {
    return completions.some(c => c.module_id === moduleId);
  };

  const getModuleCompletion = (moduleId: string) => {
    return completions.find(c => c.module_id === moduleId);
  };

  useEffect(() => {
    fetchCompletions();
  }, [user]);

  return {
    completions,
    loading,
    markModuleComplete,
    isModuleComplete,
    getModuleCompletion,
    refetch: fetchCompletions,
  };
};
