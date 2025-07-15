
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
      // First try to fetch from the database if user_progress table exists
      const { data: userProgress, error: progressError } = await supabase
        .from('user_progress')
        .select('completed_modules')
        .eq('user_id', user.id)
        .single();

      if (!progressError && userProgress?.completed_modules) {
        // Convert the completed modules array to our completion format
        const dbCompletions = userProgress.completed_modules.map((moduleId: string) => ({
          id: crypto.randomUUID(),
          user_id: user.id,
          module_id: moduleId,
          completed_at: new Date().toISOString(),
        }));
        setCompletions(dbCompletions);
      } else {
        // Fallback to localStorage
        const stored = localStorage.getItem(`module_completions_${user.id}`);
        if (stored) {
          const parsedCompletions = JSON.parse(stored);
          setCompletions(parsedCompletions);
        } else {
          setCompletions([]);
        }
      }
    } catch (error: any) {
      console.error('Error fetching module completions:', error);
      // Fallback to localStorage on any error
      const stored = localStorage.getItem(`module_completions_${user.id}`);
      if (stored) {
        const parsedCompletions = JSON.parse(stored);
        setCompletions(parsedCompletions);
      } else {
        setCompletions([]);
      }
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
      // Create a completion record
      const completion: ModuleCompletion = {
        id: crypto.randomUUID(),
        user_id: user.id,
        module_id: moduleId,
        completed_at: new Date().toISOString(),
        notes: notes,
      };

      const updatedCompletions = [...completions];
      const existingIndex = updatedCompletions.findIndex(c => c.module_id === moduleId);
      
      if (existingIndex >= 0) {
        updatedCompletions[existingIndex] = completion;
      } else {
        updatedCompletions.push(completion);
      }

      setCompletions(updatedCompletions);
      
      // Try to save to database first
      try {
        const completedModuleIds = updatedCompletions.map(c => c.module_id);
        
        const { error: upsertError } = await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            completed_modules: completedModuleIds
          }, {
            onConflict: 'user_id'
          });

        if (upsertError) {
          console.error('Database save failed, using localStorage:', upsertError);
          throw upsertError;
        }
      } catch (dbError) {
        console.error('Database operation failed, falling back to localStorage:', dbError);
      }
      
      // Always save to localStorage as backup
      localStorage.setItem(`module_completions_${user.id}`, JSON.stringify(updatedCompletions));

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
