
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
      const { data, error } = await supabase
        .from('module_completions')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setCompletions(data || []);
    } catch (error: any) {
      console.error('Error fetching module completions:', error);
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
      const { data, error } = await supabase
        .from('module_completions')
        .upsert({
          user_id: user.id,
          module_id: moduleId,
          notes: notes,
        })
        .select()
        .single();

      if (error) throw error;

      setCompletions(prev => {
        const existing = prev.find(c => c.module_id === moduleId);
        if (existing) {
          return prev.map(c => c.module_id === moduleId ? data : c);
        }
        return [...prev, data];
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
