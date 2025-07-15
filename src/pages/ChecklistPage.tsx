
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
    if (!loading && completions.length > 0) {
      const dbCompletedModules = completions.map(c => c.module_id);
      
      // Only update if there's a difference to avoid infinite loops
      const currentCompleted = userProgress.completedModules || [];
      const isDifferent = 
        dbCompletedModules.length !== currentCompleted.length ||
        !dbCompletedModules.every(id => currentCompleted.includes(id));

      if (isDifferent) {
        setUserProgress({
          ...userProgress,
          completedModules: dbCompletedModules
        });
      }
    }
  }, [completions, loading, userProgress, setUserProgress]);

  // Enhanced userProgress with database tracking
  const enhancedUserProgress = {
    ...userProgress,
    completedModules: completions.map(c => c.module_id),
    markComplete: async (moduleId: string) => {
      await markModuleComplete(moduleId);
      // Update local state for immediate UI feedback
      const updatedModules = [...(completions.map(c => c.module_id)), moduleId];
      setUserProgress({
        ...userProgress,
        completedModules: updatedModules
      });
    },
    markIncomplete: async (moduleId: string) => {
      await markModuleIncomplete(moduleId);
      // Update local state for immediate UI feedback
      const updatedModules = completions.map(c => c.module_id).filter(id => id !== moduleId);
      setUserProgress({
        ...userProgress,
        completedModules: updatedModules
      });
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
