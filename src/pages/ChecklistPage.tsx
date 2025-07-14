
import React from 'react';
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
  const { markModuleComplete, isModuleComplete } = useModuleProgress();

  // Enhanced userProgress with database tracking
  const enhancedUserProgress = {
    ...userProgress,
    completedModules: userProgress.completedModules || [],
    markComplete: (moduleId: string) => {
      markModuleComplete(moduleId);
      setUserProgress({
        ...userProgress,
        completedModules: [...(userProgress.completedModules || []), moduleId]
      });
    },
    isComplete: (moduleId: string) => {
      return isModuleComplete(moduleId) || (userProgress.completedModules || []).includes(moduleId);
    }
  };

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
