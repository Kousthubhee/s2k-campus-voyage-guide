
import React, { useEffect } from 'react';
import { ChecklistModule } from '@/components/ChecklistModule';
import checklistModules from '@/constants/checklistModules';
import { useModuleProgress } from '@/hooks/useModuleProgress';

interface ChecklistPageProps {
  userProgress: any;
  setUserProgress: (progress: any) => void;
  onSchoolSelect: (school: any) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const ChecklistPage = ({
  userProgress,
  setUserProgress,
  onSchoolSelect,
  currentPage,
  setCurrentPage
}: ChecklistPageProps) => {
  const { completions, markModuleComplete, markModuleIncomplete, isModuleComplete, loading } = useModuleProgress();

  // Sync database completions with local state
  useEffect(() => {
    if (!loading && completions.length >= 0) {
      const dbCompletedModules = completions.map(c => c.module_id);
      console.log('Syncing completions to local state:', dbCompletedModules);
      
      // Always update to ensure consistency
      setUserProgress({
        ...userProgress,
        completedModules: dbCompletedModules
      });
    }
  }, [completions, loading]);

  // Enhanced userProgress with database tracking
  const enhancedUserProgress = {
    ...userProgress,
    completedModules: completions.map(c => c.module_id),
    markComplete: async (moduleId: string) => {
      console.log('Enhanced markComplete called for:', moduleId);
      await markModuleComplete(moduleId);
    },
    markIncomplete: async (moduleId: string) => {
      console.log('Enhanced markIncomplete called for:', moduleId);
      await markModuleIncomplete(moduleId);
    },
    isComplete: (moduleId: string) => {
      return isModuleComplete(moduleId);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading your progress...</div>
      </div>
    );
  }

  return (
    <ChecklistModule
      modules={checklistModules}
      userProgress={enhancedUserProgress}
      setUserProgress={setUserProgress}
      onSchoolSelect={onSchoolSelect}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};
