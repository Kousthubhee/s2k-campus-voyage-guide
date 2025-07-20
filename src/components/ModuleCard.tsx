
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, CheckCircle, ArrowRight, Key } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  type: string;
  keysRequired?: number;
}

interface ModuleCardProps {
  module: Module;
  isCompleted: boolean;
  isUnlocked: boolean;
  onModuleClick: (module: Module) => void;
  userKeys: number;
}

export const ModuleCard = ({ 
  module, 
  isCompleted, 
  isUnlocked, 
  onModuleClick,
  userKeys 
}: ModuleCardProps) => {
  const canUnlock = module.keysRequired ? userKeys >= module.keysRequired : true;
  const canClick = isUnlocked || (module.keysRequired && canUnlock);

  return (
    <Card
      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
        canClick
          ? 'hover:shadow-lg border-2 border-transparent hover:border-blue-200 dark:hover:border-primary/50'
          : 'opacity-60 cursor-not-allowed'
      } ${isCompleted ? 'ring-2 ring-green-500 dark:ring-emerald-green' : ''}`}
      onClick={() => canClick && onModuleClick(module)}
    >
      <CardContent className="p-6">
        <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-cyan-50 dark:bg-card rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
          <div className="text-4xl text-blue-500 dark:text-primary">{module.icon}</div>

          {!isUnlocked && module.keysRequired && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
              <Lock className="h-6 w-6 text-white mb-2" />
              <div className="flex items-center text-white text-sm">
                <Key className="h-4 w-4 mr-1" />
                <span>{module.keysRequired}</span>
              </div>
            </div>
          )}

          {!isUnlocked && !module.keysRequired && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
            </div>
          )}

          {isCompleted && (
            <div className="absolute top-2 right-2">
              <CheckCircle className="h-6 w-6 text-green-500 dark:text-emerald-green bg-white dark:bg-card rounded-full" />
            </div>
          )}

          {isUnlocked && !isCompleted && (
            <div className="absolute bottom-2 right-2">
              <ArrowRight className="h-5 w-5 text-cyan-700 dark:text-primary" />
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {module.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-white/80 mb-4">
          {module.description}
        </p>

        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full ${
            isCompleted
              ? 'bg-green-100 text-green-800 dark:bg-emerald-green/20 dark:text-emerald-green'
              : isUnlocked
                ? 'bg-blue-100 text-blue-800 dark:bg-primary/20 dark:text-primary'
                : module.keysRequired
                  ? canUnlock
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300'
                    : 'bg-red-100 text-red-800 dark:bg-coral-red/20 dark:text-coral-red'
                  : 'bg-gray-100 text-gray-800 dark:bg-card dark:text-white'
          }`}>
            {isCompleted 
              ? 'Completed' 
              : isUnlocked 
                ? 'Available' 
                : module.keysRequired
                  ? canUnlock
                    ? `Unlock (${module.keysRequired} 🗝️)`
                    : `Need ${module.keysRequired} 🗝️`
                  : 'Locked'
            }
          </span>

          {canClick && (
            <Button
              size="sm"
              variant={isCompleted ? "secondary" : "default"}
              className="h-8"
            >
              {isCompleted 
                ? 'Review' 
                : isUnlocked 
                  ? 'Start' 
                  : `Unlock`
              }
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
