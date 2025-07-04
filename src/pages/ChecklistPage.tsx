
import React from 'react';
import { ChecklistModule } from '@/components/ChecklistModule';
import checklistModules from '@/constants/checklistModules';

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
  return (
    <ChecklistModule
      modules={checklistModules}
      userProgress={userProgress}
      setUserProgress={setUserProgress}
      onSchoolSelect={onSchoolSelect}
      currentPage={currentPage}
    />
  );
};
