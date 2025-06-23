
import { ChecklistModule } from '@/components/ChecklistModule';
import { checklistModules } from '@/types/AppState';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, CheckCircle, ArrowRight, Key } from 'lucide-react';

interface ChecklistMainViewProps {
  unlockedModules: string[];
  onModuleUnlock: (moduleId: string) => void;
  onModuleClick: (moduleId: string) => void;
}

export function ChecklistMainView({ unlockedModules, onModuleUnlock, onModuleClick }: ChecklistMainViewProps) {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Checklist - Begin Your Journey
        </h1>
        <p className="text-gray-600">
          Complete these modules to ensure a smooth transition to studying in France
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {checklistModules.map((module) => (
          <Card
            key={module.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              unlockedModules.includes(module.id)
                ? 'hover:shadow-lg border-2 border-transparent hover:border-blue-200'
                : 'opacity-60 cursor-not-allowed'
            }`}
            onClick={() => unlockedModules.includes(module.id) && onModuleClick(module.id)}
          >
            <CardContent className="p-6">
              <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="text-4xl text-blue-500">{module.icon}</div>

                {!unlockedModules.includes(module.id) && module.keysRequired && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
                    <Lock className="h-6 w-6 text-white mb-2" />
                    <div className="flex items-center text-white text-sm">
                      <Key className="h-4 w-4 mr-1" />
                      <span>{module.keysRequired}</span>
                    </div>
                  </div>
                )}

                {!unlockedModules.includes(module.id) && !module.keysRequired && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                )}

                {unlockedModules.includes(module.id) && (
                  <div className="absolute bottom-2 right-2">
                    <ArrowRight className="h-5 w-5 text-cyan-700" />
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {module.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {module.description}
              </p>

              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  unlockedModules.includes(module.id)
                    ? 'bg-blue-100 text-blue-800'
                    : module.keysRequired
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                }`}>
                  {unlockedModules.includes(module.id) 
                    ? 'Available' 
                    : module.keysRequired
                      ? `Need ${module.keysRequired} 🗝️`
                      : 'Locked'
                  }
                </span>

                {unlockedModules.includes(module.id) && (
                  <Button
                    size="sm"
                    variant="default"
                    className="h-8"
                  >
                    Start
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
