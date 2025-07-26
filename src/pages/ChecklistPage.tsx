
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModuleCard } from '@/components/ModuleCard';
import checklistModules from '@/constants/checklistModules';
import { useLocalStorageProgress } from '@/hooks/useLocalStorageProgress';

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
  const { keysEarned } = useLocalStorageProgress();

  const handleModuleClick = (module: any) => {
    console.log('Module clicked:', module.id, 'Type:', module.type);
    
    // Handle different module types
    switch (module.id) {
      case 'school':
        // Navigate to school insights
        break;
      case 'housing':
        console.log('Navigating to housing page');
        setCurrentPage('housing');
        break;
      case 'finance':
        setCurrentPage('finance');
        break;
      case 'language':
        setCurrentPage('language');
        break;
      case 'pre-arrival-1':
        // Navigate to pre-arrival 1 page
        break;
      case 'pre-arrival-2':
        // Navigate to pre-arrival 2 page
        break;
      case 'post-arrival':
        // Navigate to post-arrival page
        break;
      case 'integration':
        // Navigate to integration page
        break;
      default:
        console.log('No navigation defined for module:', module.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => setCurrentPage('home')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Your Study Abroad Checklist</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Complete these modules to prepare for your journey to France
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>🗝️ Keys available: {keysEarned}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {checklistModules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            isCompleted={userProgress.completedModules.includes(module.id)}
            onClick={() => handleModuleClick(module)}
            keysAvailable={keysEarned}
          />
        ))}
      </div>
    </div>
  );
};
