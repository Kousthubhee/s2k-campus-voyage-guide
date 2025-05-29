
import { ChecklistModule } from '@/components/ChecklistModule';
import { checklistModules } from '@/types/AppState';

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
          <ChecklistModule
            key={module.id}
            id={module.id}
            title={module.title}
            description={module.description}
            icon={module.icon}
            isLocked={!unlockedModules.includes(module.id)}
            onUnlock={onModuleUnlock}
            onClick={() => onModuleClick(module.id)}
            keysRequired={module.keysRequired}
          />
        ))}
      </div>
    </div>
  );
}
