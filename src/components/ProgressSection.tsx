
import React from 'react';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  type: string;
}

interface ProgressSectionProps {
  modules: Module[];
  completedModulesCount: number;
  keys: number;
}

export const ProgressSection = ({ 
  modules, 
  completedModulesCount, 
  keys 
}: ProgressSectionProps) => {
  const progressPercentage = Math.round((completedModulesCount / modules.length) * 100);

  return (
    <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Progress</h3>
          <p className="text-gray-600">
            {completedModulesCount} of {modules.length} modules completed
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {progressPercentage}%
          </div>
          <div className="text-sm text-gray-500">Complete</div>
        </div>
      </div>

      <div className="mt-4 bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="mt-4 text-sm text-blue-700 font-medium">
        🔑 Keys Earned: {keys}
      </div>
    </div>
  );
};
