
import React from 'react';
import { ChecklistModule } from '@/components/ChecklistModule';
import { checklistModules } from '@/constants/checklistModules';
import { useModuleProgress } from '@/hooks/useModuleProgress';
import { useAuth } from '@/hooks/useAuth';

export const ChecklistPage = () => {
  const { user } = useAuth();
  const { 
    completions, 
    loading, 
    markModuleComplete, 
    unmarkModuleComplete, 
    isModuleComplete 
  } = useModuleProgress();

  // Create userProgress object from database data
  const userProgress = {
    keys: completions.length,
    completedModules: completions.map(c => c.module_id),
    unlockedModules: ['school', 'pre-arrival-1', 'pre-arrival-2', ...completions.map(c => c.module_id)]
  };

  const setUserProgress = () => {
    // This will be handled by the individual module actions
  };

  const handleSchoolSelect = (school: any) => {
    console.log('School selected:', school);
  };

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Checklist</h1>
          <p className="text-lg text-gray-600 mb-8">
            Please sign in to track your progress and access the checklist.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ChecklistModule
        modules={checklistModules}
        userProgress={userProgress}
        setUserProgress={setUserProgress}
        onSchoolSelect={handleSchoolSelect}
        currentPage="checklist"
        setCurrentPage={() => {}}
        onModuleComplete={markModuleComplete}
        onModuleUncomplete={unmarkModuleComplete}
        isModuleComplete={isModuleComplete}
      />
    </div>
  );
};
