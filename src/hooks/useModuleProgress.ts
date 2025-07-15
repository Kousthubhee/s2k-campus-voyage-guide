
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
  const [pendingChanges, setPendingChanges] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  const fetchCompletions = async () => {
    if (!user) {
      console.log('No user found, setting loading to false');
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching completions for user:', user.id);
      
      const { data: userProgress, error: progressError } = await supabase
        .from('user_progress')
        .select('completed_modules')
        .eq('user_id', user.id)
        .maybeSingle();

      console.log('Database query result:', { userProgress, progressError });

      if (!progressError && userProgress?.completed_modules) {
        console.log('Found completed modules in database:', userProgress.completed_modules);
        const dbCompletions = userProgress.completed_modules.map((moduleId: string) => ({
          id: crypto.randomUUID(),
          user_id: user.id,
          module_id: moduleId,
          completed_at: new Date().toISOString(),
        }));
        setCompletions(dbCompletions);
      } else {
        console.log('No database progress found, initializing empty');
        setCompletions([]);
        
        await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            completed_modules: []
          }, {
            onConflict: 'user_id'
          });
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

    console.log('Marking module complete locally:', moduleId);
    
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
    setPendingChanges(prev => new Set([...prev, moduleId]));
  };

  const markModuleIncomplete = async (moduleId: string) => {
    if (!user) {
      toast.error('Please sign in to track progress');
      return;
    }

    console.log('Marking module incomplete locally:', moduleId);
    
    const updatedCompletions = completions.filter(c => c.module_id !== moduleId);
    setCompletions(updatedCompletions);
    setPendingChanges(prev => new Set([...prev, moduleId]));
  };

  const saveAllChanges = async () => {
    if (!user || pendingChanges.size === 0) {
      return;
    }

    try {
      console.log('Saving all changes to database');
      const completedModuleIds = completions.map(c => c.module_id);
      
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
      setPendingChanges(new Set());
    } catch (error: any) {
      console.error('Error saving changes:', error);
      throw error;
    }
  };

  const discardChanges = () => {
    console.log('Discarding pending changes');
    setPendingChanges(new Set());
    fetchCompletions(); // Reload from database
  };

  const isModuleComplete = (moduleId: string) => {
    const isComplete = completions.some(c => c.module_id === moduleId);
    console.log(`Module ${moduleId} is complete:`, isComplete);
    return isComplete;
  };

  const getModuleCompletion = (moduleId: string) => {
    return completions.find(c => c.module_id === moduleId);
  };

  const hasUnsavedChanges = () => {
    return pendingChanges.size > 0;
  };

  useEffect(() => {
    console.log('useEffect triggered for user:', user?.id);
    fetchCompletions();
  }, [user?.id]);

  return {
    completions,
    loading,
    markModuleComplete,
    markModuleIncomplete,
    isModuleComplete,
    getModuleCompletion,
    refetch: fetchCompletions,
    saveAllChanges,
    discardChanges,
    hasUnsavedChanges,
    pendingChanges: Array.from(pendingChanges)
  };
};
