import React, { useEffect } from 'react';
import { ChecklistModule } from '@/components/ChecklistModule';
import checklistModules from '@/constants/checklistModules';
import { useModuleProgress } from '@/hooks/useModuleProgress';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import { SaveChangesPrompt } from '@/components/SaveChangesPrompt';

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
  

  const { 
    completions, 
    markModuleComplete, 
    markModuleIncomplete, 
    isModuleComplete, 
    loading,
    saveAllChanges,
    discardChanges,
    hasUnsavedChanges
  } = useModuleProgress();

  const {
    hasUnsavedChanges: hasChanges,
    isSaving,
    markAsChanged,
    saveChanges,
    promptBeforeLeaving
  } = useUnsavedChanges({
    onSave: saveAllChanges,
    onDiscard: discardChanges
  });

  // Sync database completions with local state
  useEffect(() => {
    if (!loading) {
      const dbCompletedModules = completions.map(c => c.module_id);
      console.log('Syncing completions to local state:', dbCompletedModules);
      
      setUserProgress(prevProgress => ({
        ...prevProgress,
        completedModules: dbCompletedModules
      }));
    }
  }, [completions, loading, setUserProgress]);

  // Enhanced userProgress with database tracking and save functionality
  const enhancedUserProgress = {
    ...userProgress,
    completedModules: completions.map(c => c.module_id),
    markComplete: async (moduleId: string) => {
      console.log('Enhanced markComplete called for:', moduleId);
      await markModuleComplete(moduleId);
      markAsChanged();
    },
    markIncomplete: async (moduleId: string) => {
      console.log('Enhanced markIncomplete called for:', moduleId);
      await markModuleIncomplete(moduleId);
      markAsChanged();
    },
    isComplete: (moduleId: string) => {
      return isModuleComplete(moduleId);
    }
  };

  // Prompt before navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges()) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeUnload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading your progress...</div>
      </div>
    );
  }

  return (
    <>
      <ChecklistModule
        modules={checklistModules}
        userProgress={enhancedUserProgress}
        setUserProgress={setUserProgress}
        onSchoolSelect={onSchoolSelect}
        currentPage={currentPage}
        setCurrentPage={async (page: string) => {
          await promptBeforeLeaving();
          setCurrentPage(page);
        }}
      />
      
      <SaveChangesPrompt
        hasUnsavedChanges={hasUnsavedChanges() || hasChanges}
        isSaving={isSaving}
        onSave={saveChanges}
        onDiscard={() => {
          discardChanges();
          markAsChanged();
        }}
      />
    </>
  );
};
