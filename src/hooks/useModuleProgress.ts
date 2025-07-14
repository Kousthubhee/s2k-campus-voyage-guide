
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
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data && data.completed_modules) {
        const moduleCompletions = data.completed_modules.map((moduleId: string) => ({
          id: crypto.randomUUID(),
          user_id: user.id,
          module_id: moduleId,
          completed_at: new Date().toISOString(),
        }));
        setCompletions(moduleCompletions);
      } else {
        setCompletions([]);
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
      // Get current progress
      const { data: currentProgress } = await supabase
        .from('user_progress')
        .select('completed_modules')
        .eq('user_id', user.id)
        .single();

      const completedModules = currentProgress?.completed_modules || [];
      
      if (!completedModules.includes(moduleId)) {
        const updatedModules = [...completedModules, moduleId];
        
        const { error } = await supabase
          .from('user_progress')
          .update({ completed_modules: updatedModules })
          .eq('user_id', user.id);

        if (error) throw error;

        const completion: ModuleCompletion = {
          id: crypto.randomUUID(),
          user_id: user.id,
          module_id: moduleId,
          completed_at: new Date().toISOString(),
          notes: notes,
        };

        setCompletions([...completions, completion]);
        toast.success('Module marked as complete!');
      }
    } catch (error: any) {
      console.error('Error marking module complete:', error);
      toast.error('Failed to update progress');
    }
  };

  const unmarkModuleComplete = async (moduleId: string) => {
    if (!user) {
      toast.error('Please sign in to track progress');
      return;
    }

    try {
      // Get current progress
      const { data: currentProgress } = await supabase
        .from('user_progress')
        .select('completed_modules')
        .eq('user_id', user.id)
        .single();

      const completedModules = currentProgress?.completed_modules || [];
      const updatedModules = completedModules.filter((id: string) => id !== moduleId);
      
      const { error } = await supabase
        .from('user_progress')
        .update({ completed_modules: updatedModules })
        .eq('user_id', user.id);

      if (error) throw error;

      setCompletions(completions.filter(c => c.module_id !== moduleId));
      toast.success('Module unmarked as complete!');
    } catch (error: any) {
      console.error('Error unmarking module complete:', error);
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
    unmarkModuleComplete,
    isModuleComplete,
    getModuleCompletion,
    refetch: fetchCompletions,
  };
};
