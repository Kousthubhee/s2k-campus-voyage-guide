
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface UserProgress {
  keys: number;
  completed_modules: string[];
  unlocked_modules: string[];
  current_page: string;
}

const defaultProgress: UserProgress = {
  keys: 4,
  completed_modules: [],
  unlocked_modules: ['school', 'pre-arrival-1', 'pre-arrival-2'],
  current_page: 'checklist'
};

export function useSupabaseProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProgress(defaultProgress);
      setLoading(false);
      return;
    }

    loadProgress();
  }, [user]);

  const loadProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading progress:', error);
        return;
      }

      if (data) {
        setProgress({
          keys: data.keys || 4,
          completed_modules: data.completed_modules || [],
          unlocked_modules: data.unlocked_modules || ['school', 'pre-arrival-1', 'pre-arrival-2'],
          current_page: data.current_page || 'checklist'
        });
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (newProgress: Partial<UserProgress>) => {
    if (!user) return;

    const updatedProgress = { ...progress, ...newProgress };
    setProgress(updatedProgress);

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          keys: updatedProgress.keys,
          completed_modules: updatedProgress.completed_modules,
          unlocked_modules: updatedProgress.unlocked_modules,
          current_page: updatedProgress.current_page
        });

      if (error) {
        console.error('Error updating progress:', error);
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const resetProgress = async () => {
    if (!user) return;

    setProgress(defaultProgress);

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          ...defaultProgress
        });

      if (error) {
        console.error('Error resetting progress:', error);
      }
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  };

  return [progress, updateProgress, resetProgress, loading] as const;
}
