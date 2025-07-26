
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorageProgress } from '@/hooks/useLocalStorageProgress';
import checklistModules from '@/constants/checklistModules';

const SimpleChecklistModule = () => {
  const [progress, setProgress] = useLocalStorageProgress();
  const { toast } = useToast();

  const handleModuleClick = (moduleId: string) => {
    const module = checklistModules.find(m => m.id === moduleId);
    if (!module) return;

    const isUnlocked = progress.unlockedModules.includes(moduleId);
    
    if (!isUnlocked && module.keysRequired) {
      if (progress.keys < module.keysRequired) {
        toast({
          title: "Not Enough Keys",
          description: `You need ${module.keysRequired} key${module.keysRequired > 1 ? 's' : ''} to unlock this module.`,
          variant: "destructive",
        });
        return;
      }

      setProgress({
        ...progress,
        keys: progress.keys - module.keysRequired,
        unlockedModules: [...progress.unlockedModules, moduleId]
      });

      toast({
        title: "Module Unlocked!",
        description: `You've unlocked "${module.title}"!`,
      });
    }
  };

  const handleModuleComplete = (moduleId: string) => {
    if (progress.completedModules.includes(moduleId)) return;
    
    setProgress({
      ...progress,
      completedModules: [...progress.completedModules, moduleId],
      keys: progress.keys + 1,
    });

    toast({
      title: "Module Completed!",
      description: "You earned a key for completing this module.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Your Study Journey Modules
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Complete these essential modules to unlock resources and earn keys.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {checklistModules.map((module) => {
          const isCompleted = progress.completedModules.includes(module.id);
          const isUnlocked = progress.unlockedModules.includes(module.id);

          return (
            <Card
              key={module.id}
              className={`transition-all duration-300 hover:shadow-lg ${
                isCompleted ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                isUnlocked ? 'cursor-pointer hover:border-blue-500' :
                'opacity-60'
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="text-2xl">{module.icon}</span>
                    {module.title}
                  </span>
                  {isCompleted && <span className="text-green-500 text-xl">✅</span>}
                  {!isUnlocked && module.keysRequired && (
                    <span className="text-amber-500 text-sm">
                      🔑 {module.keysRequired}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {module.description}
                </p>
                <Button
                  onClick={() => {
                    if (isCompleted) return;
                    if (isUnlocked) {
                      handleModuleComplete(module.id);
                    } else {
                      handleModuleClick(module.id);
                    }
                  }}
                  className={`w-full ${module.color} text-white`}
                  disabled={!isUnlocked && !module.keysRequired}
                >
                  {isCompleted ? 'Completed' :
                   isUnlocked ? 'Complete Module' :
                   module.keysRequired ? `Unlock (${module.keysRequired} keys)` : 'Locked'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:bg-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your Progress</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {progress.completedModules.length} of {checklistModules.length} modules completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-primary">
              🔑 {progress.keys} Keys
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleChecklistModule;
