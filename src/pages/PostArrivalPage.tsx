
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PostArrivalTaskCards } from '@/components/PostArrivalTaskCards';
import { postArrivalTasks } from '@/data/postArrivalTasks';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import { SaveChangesPrompt } from '@/components/SaveChangesPrompt';
import { useModuleProgress } from '@/hooks/useModuleProgress';

interface PostArrivalPageProps {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export const PostArrivalPage = ({ onBack, onComplete, isCompleted }: PostArrivalPageProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [reminders, setReminders] = useState<{ [id: string]: string }>({});
  const { saveAllChanges, discardChanges, hasUnsavedChanges } = useModuleProgress();

  const {
    hasUnsavedChanges: hasChanges,
    isSaving,
    markAsChanged,
    saveChanges,
    promptBeforeLeaving
  } = useUnsavedChanges({
    onSave: async () => {
      await saveAllChanges();
      // Save local state to localStorage
      localStorage.setItem('postArrivalCompletedSteps', JSON.stringify(completedSteps));
      localStorage.setItem('postArrivalReminders', JSON.stringify(reminders));
    },
    onDiscard: () => {
      discardChanges();
      // Reset local state
      const savedSteps = localStorage.getItem('postArrivalCompletedSteps');
      const savedReminders = localStorage.getItem('postArrivalReminders');
      if (savedSteps) setCompletedSteps(JSON.parse(savedSteps));
      if (savedReminders) setReminders(JSON.parse(savedReminders));
    }
  });

  // Load saved state on mount
  useEffect(() => {
    const savedSteps = localStorage.getItem('postArrivalCompletedSteps');
    const savedReminders = localStorage.getItem('postArrivalReminders');
    
    if (savedSteps) {
      setCompletedSteps(JSON.parse(savedSteps));
    }
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);

  const handleStepsChange = (newSteps: string[]) => {
    setCompletedSteps(newSteps);
    markAsChanged();
  };

  const handleRemindersChange = (newReminders: { [id: string]: string }) => {
    setReminders(newReminders);
    markAsChanged();
  };

  const handleBack = async () => {
    await promptBeforeLeaving();
    onBack();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Post-Arrival Tasks</h1>
      </div>
      
      <p className="text-lg text-gray-600 mb-8">
        Essential tasks to complete after arriving in France to ensure a smooth transition.
      </p>

      <PostArrivalTaskCards
        tasks={postArrivalTasks}
        completedSteps={completedSteps}
        setCompletedSteps={handleStepsChange}
        reminders={reminders}
        setReminders={handleRemindersChange}
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
    </div>
  );
};
