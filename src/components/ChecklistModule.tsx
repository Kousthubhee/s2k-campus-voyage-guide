
import { useState } from 'react';
import { ChevronRight, Lock, Key } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChecklistModuleProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  isLocked: boolean;
  onUnlock: (moduleId: string) => void;
  onClick: () => void;
  keysRequired?: number;
}

export function ChecklistModule({ 
  id, 
  title, 
  description, 
  icon, 
  isLocked, 
  onUnlock, 
  onClick,
  keysRequired = 1 
}: ChecklistModuleProps) {
  const handleClick = () => {
    if (isLocked) {
      onUnlock(id);
    } else {
      onClick();
    }
  };

  return (
    <div
      className={cn(
        "relative bg-white rounded-xl border-2 p-6 transition-all duration-200",
        isLocked 
          ? "border-gray-200 opacity-60 cursor-pointer hover:border-yellow-300" 
          : "border-gray-200 hover:border-blue-300 hover:shadow-lg cursor-pointer hover:scale-105"
      )}
      onClick={handleClick}
    >
      {/* Icon */}
      <div className="text-4xl mb-4">{icon}</div>
      
      {/* Content */}
      <div className="flex-1">
        <h3 className={cn(
          "text-lg font-semibold mb-2",
          isLocked ? "text-gray-500" : "text-gray-800"
        )}>
          {title}
        </h3>
        <p className={cn(
          "text-sm",
          isLocked ? "text-gray-400" : "text-gray-600"
        )}>
          {description}
        </p>
      </div>

      {/* Lock/Arrow Indicator */}
      <div className="absolute top-4 right-4">
        {isLocked ? (
          <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
            <Key size={14} className="text-yellow-600" />
            <span className="text-xs font-medium text-yellow-700">{keysRequired}</span>
          </div>
        ) : (
          <ChevronRight size={20} className="text-gray-400" />
        )}
      </div>

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-white bg-opacity-40 rounded-xl flex items-center justify-center">
          <div className="bg-white rounded-full p-3 shadow-lg">
            <Lock size={24} className="text-gray-500" />
          </div>
        </div>
      )}
    </div>
  );
}
