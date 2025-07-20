import { useState, useEffect } from 'react';
import { ModuleContent } from './ModuleContent';
import { ModuleCard } from './ModuleCard';
import { useToast } from '@/hooks/use-toast';
import React from 'react';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  type: string;
  keysRequired?: number;
}

interface ChecklistModuleProps {
  modules: Module[];
  userProgress: any;
  setUserProgress: (progress: any) => void;
  onSchoolSelect: (school: any) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const ChecklistHeader = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Your French Study Journey
      </h1>
      <p className="text-xl text-gray-600 dark:text-white max-w-3xl mx-auto">
        Complete these essential modules to unlock resources and earn keys. 
        Each completed module helps you progress toward your study goals in France.
      </p>
    </div>
  );
};

const ProgressSection = ({ 
  modules, 
  completedModulesCount, 
  keys 
}: {
  modules: Module[];
  completedModulesCount: number;
  keys: number;
}) => {
  const progressPercentage = Math.round((completedModulesCount / modules.length) * 100);

  return (
    <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:bg-card rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your Progress</h3>
          <p className="text-gray-600 dark:text-white">
            {completedModulesCount} of {modules.length} modules completed
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600 dark:text-white">
            {progressPercentage}%
          </div>
          <div className="text-sm text-gray-500 dark:text-white/80">Complete</div>
        </div>
      </div>

      <div className="mt-4 bg-gray-200 dark:bg-slate-gray rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-primary dark:to-primary/80 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="mt-4 text-sm text-blue-700 dark:text-primary font-medium">
        🔑 Keys Earned: {keys}
      </div>
    </div>
  );
};

export const ChecklistModule = ({
  modules,
  userProgress,
  setUserProgress,
  onSchoolSelect,
  currentPage,
  setCurrentPage
}: ChecklistModuleProps) => {
  const pageMapping: { [key: string]: string } = {
    'school': 'school-insights',
    'pre-arrival-1': 'pre-arrival-1',
    'pre-arrival-2': 'pre-arrival-2',
    'post-arrival': 'post-arrival',
    'integration': 'integration',
    'finance': 'finance-tracking',
    'suggestions': 'suggestions',
  };

  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const { toast } = useToast();

  // Reset selected module when navigating back to checklist page
  useEffect(() => {
    if (currentPage === 'checklist' && selectedModule) {
      setSelectedModule(null);
    }
  }, [currentPage]);

  // Initialize with some modules unlocked and others requiring keys
  useEffect(() => {
    if (!userProgress.unlockedModules) {
      setUserProgress({
        ...userProgress,
        unlockedModules: ['school', 'pre-arrival-1', 'pre-arrival-2']
      });
    }
  }, [modules, userProgress, setUserProgress]);

  const handleModuleClick = (module: Module) => {
    console.log('Module clicked:', module.id);
    const isUnlocked = userProgress.unlockedModules.includes(module.id);

    // If module is locked and requires keys, check if user has enough keys
    if (!isUnlocked && module.keysRequired) {
      if (userProgress.keys < module.keysRequired) {
        toast({
          title: "Not Enough Keys",
          description: `You need ${module.keysRequired} key${module.keysRequired > 1 ? 's' : ''} to unlock this module.`,
          variant: "destructive",
        });
        return;
      }

      setUserProgress(prevProgress => {
        const alreadyUnlocked = prevProgress.unlockedModules.includes(module.id);
        if (alreadyUnlocked) return prevProgress;

        return {
          ...prevProgress,
          keys: prevProgress.keys - module.keysRequired,
          unlockedModules: [...prevProgress.unlockedModules, module.id]
        };
      });

      toast({
        title: "New Module Unlocked",
        description: `You've unlocked "${module.title}" by spending ${module.keysRequired} key${module.keysRequired > 1 ? 's' : ''}!`,
        variant: "default",
      });

      // After unlocking, navigate to the page
      if (pageMapping[module.id]) {
        console.log('Navigating to unlocked page:', pageMapping[module.id]);
        setCurrentPage(pageMapping[module.id]);
      }
      return;
    }

    if (!isUnlocked && !module.keysRequired) {
      console.log('Module is locked and has no key requirement');
      return;
    }

    // Navigate to the mapped page directly using setCurrentPage
    if (pageMapping[module.id]) {
      console.log('Navigating to page:', pageMapping[module.id]);
      setCurrentPage(pageMapping[module.id]);
      return;
    }

    console.log('Setting selected module:', module.id);
    setSelectedModule(module);
  };

  const handleModuleComplete = (moduleId: string) => {
    if (userProgress.completedModules.includes(moduleId)) return;
    const newProgress = {
      ...userProgress,
      completedModules: [...userProgress.completedModules, moduleId],
      keys: userProgress.keys + 1,
    };

    setUserProgress(newProgress);

    toast({
      title: "Module Completed!",
      description: "You earned a key for completing this module.",
      variant: "default",
    });
  };

  const handleToast = (options: { title: string; description?: string; variant?: "default" | "destructive" }) => {
    toast(options);
  };

  if (selectedModule) {
    return (
      <ModuleContent
        module={selectedModule}
        onBack={() => setSelectedModule(null)}
        onComplete={handleModuleComplete}
        isCompleted={userProgress.completedModules.includes(selectedModule.id)}
        onToast={handleToast}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <ChecklistHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const isCompleted = userProgress.completedModules.includes(module.id);
          const isUnlocked = userProgress.unlockedModules.includes(module.id);

          return (
            <ModuleCard
              key={module.id}
              module={module}
              isCompleted={isCompleted}
              isUnlocked={isUnlocked}
              onModuleClick={handleModuleClick}
              userKeys={userProgress.keys}
            />
          );
        })}
      </div>

      <ProgressSection 
        modules={modules}
        completedModulesCount={userProgress.completedModules.length}
        keys={userProgress.keys}
      />
    </div>
  );
};
