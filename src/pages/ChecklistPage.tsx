
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLocalStorageProgress } from "@/hooks/useLocalStorageProgress";
import { ChecklistModule } from '@/components/ChecklistModule';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Key, Lock, CheckCircle, ArrowRight, Timer, BookOpen, Users } from 'lucide-react';
import { checklistModules } from '@/constants/checklistModules';

interface ChecklistPageProps {
  userProgress?: any;
  setUserProgress?: (progress: any) => void;
  onSchoolSelect?: (school: any) => void;
  currentPage?: string;
  setCurrentPage?: (page: string) => void;
}

export const ChecklistPage = ({ 
  userProgress: propUserProgress, 
  setUserProgress: propSetUserProgress, 
  onSchoolSelect,
  currentPage,
  setCurrentPage 
}: ChecklistPageProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [localUserProgress, setLocalUserProgress, resetProgress] = useLocalStorageProgress();
  
  // Use props if available, otherwise use local state
  const userProgress = propUserProgress || localUserProgress;
  const setUserProgress = propSetUserProgress || setLocalUserProgress;

  const handleModuleClick = (moduleId: string) => {
    console.log('Module clicked:', moduleId);
    
    // Navigate to the appropriate route
    if (moduleId === 'finance') {
      navigate('/finance-tracking');
    } else if (moduleId === 'school') {
      navigate('/school-insights');
    } else {
      navigate(`/${moduleId}`);
    }
  };

  const handleProgressUpdate = (newProgress: any) => {
    setUserProgress(newProgress);
  };

  const isModuleCompleted = (moduleId: string) => {
    return userProgress?.completedModules?.includes(moduleId) || false;
  };

  const isModuleUnlocked = (moduleId: string) => {
    return userProgress?.unlockedModules?.includes(moduleId) || true;
  };

  const completedCount = userProgress?.completedModules?.length || 0;
  const totalModules = checklistModules.length;
  const progressPercentage = (completedCount / totalModules) * 100;

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          📝 Your Study Abroad Checklist
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Complete these modules to earn keys and unlock advanced features
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-yellow-500" />
            <span className="text-lg font-semibold">
              {userProgress?.keys || 0} Keys Earned
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-lg">
              {completedCount}/{totalModules} Modules Completed
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {checklistModules.map((module) => (
          <ChecklistModule
            key={module.id}
            module={module}
            isCompleted={isModuleCompleted(module.id)}
            isUnlocked={isModuleUnlocked(module.id)}
            onModuleClick={handleModuleClick}
            userProgress={userProgress}
            onProgressUpdate={handleProgressUpdate}
          />
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Premium Features
          </CardTitle>
          <CardDescription>
            Unlock these advanced features by completing modules and earning keys
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Timer className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Document Tracking</p>
                <p className="text-sm text-gray-600">Requires 1 key</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <BookOpen className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">AI Q&A Assistant</p>
                <p className="text-sm text-gray-600">Requires 1 key</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="font-medium">Community Hub</p>
                <p className="text-sm text-gray-600">Requires 1 key</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
