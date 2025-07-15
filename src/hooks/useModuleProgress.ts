
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
      console.log('Fetching completions for user:', user.id);
      
      // First try to fetch from the database
      const { data: userProgress, error: progressError } = await supabase
        .from('user_progress')
        .select('completed_modules')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!progressError && userProgress?.completed_modules) {
        console.log('Found completed modules in database:', userProgress.completed_modules);
        // Convert the completed modules array to our completion format
        const dbCompletions = userProgress.completed_modules.map((moduleId: string) => ({
          id: crypto.randomUUID(),
          user_id: user.id,
          module_id: moduleId,
          completed_at: new Date().toISOString(),
        }));
        setCompletions(dbCompletions);
      } else {
        console.log('No database progress found, checking localStorage');
        // Fallback to localStorage
        const stored = localStorage.getItem(`module_completions_${user.id}`);
        if (stored) {
          const parsedCompletions = JSON.parse(stored);
          console.log('Found localStorage completions:', parsedCompletions);
          setCompletions(parsedCompletions);
          
          // Sync to database
          const completedModuleIds = parsedCompletions.map((c: ModuleCompletion) => c.module_id);
          await supabase
            .from('user_progress')
            .upsert({
              user_id: user.id,
              completed_modules: completedModuleIds
            }, {
              onConflict: 'user_id'
            });
        } else {
          console.log('No progress found anywhere');
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
      console.log('Marking module complete:', moduleId);
      
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
      
      // Save to database
      try {
        const completedModuleIds = updatedCompletions.map(c => c.module_id);
        console.log('Saving to database:', completedModuleIds);
        
        const { error: upsertError } = await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            completed_modules: completedModuleIds
          }, {
            onConflict: 'user_id'
          });

        if (upsertError) {
          console.error('Database save failed:', upsertError);
          throw upsertError;
        }
        console.log('Successfully saved to database');
      } catch (dbError) {
        console.error('Database operation failed, using localStorage only:', dbError);
      }
      
      // Always save to localStorage as backup
      localStorage.setItem(`module_completions_${user.id}`, JSON.stringify(updatedCompletions));

      toast.success('Module marked as complete!');
    } catch (error: any) {
      console.error('Error marking module complete:', error);
      toast.error('Failed to update progress');
    }
  };

  const markModuleIncomplete = async (moduleId: string) => {
    if (!user) {
      toast.error('Please sign in to track progress');
      return;
    }

    try {
      console.log('Marking module incomplete:', moduleId);
      
      const updatedCompletions = completions.filter(c => c.module_id !== moduleId);
      setCompletions(updatedCompletions);
      
      // Save to database
      try {
        const completedModuleIds = updatedCompletions.map(c => c.module_id);
        console.log('Updating database with:', completedModuleIds);
        
        const { error: upsertError } = await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            completed_modules: completedModuleIds
          }, {
            onConflict: 'user_id'
          });

        if (upsertError) {
          console.error('Database save failed:', upsertError);
          throw upsertError;
        }
        console.log('Successfully updated database');
      } catch (dbError) {
        console.error('Database operation failed, using localStorage only:', dbError);
      }
      
      // Always save to localStorage as backup
      localStorage.setItem(`module_completions_${user.id}`, JSON.stringify(updatedCompletions));

      toast.success('Module marked as incomplete!');
    } catch (error: any) {
      console.error('Error marking module incomplete:', error);
      toast.error('Failed to update progress');
    }
  };

  const isModuleComplete = (moduleId: string) => {
    const isComplete = completions.some(c => c.module_id === moduleId);
    console.log(`Module ${moduleId} is complete:`, isComplete);
    return isComplete;
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
    markModuleIncomplete,
    isModuleComplete,
    getModuleCompletion,
    refetch: fetchCompletions,
  };
};
