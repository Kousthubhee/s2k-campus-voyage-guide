import React, { useState } from 'react';
import { ChecklistPage } from './ChecklistPage';
import { FinanceTrackingPage } from './FinanceTrackingPage';
import { LanguagePage } from './LanguagePage';
import { HousingPage } from './HousingPage';
import { PersonalizedDashboard } from '@/components/insights/PersonalizedDashboard';
import { ProfilePage } from './ProfilePage';
import { HomePage } from '@/components/HomePage';

interface MainRouterProps {
  userProgress: any;
  setUserProgress: (progress: any) => void;
  onSchoolSelect: (school: any) => void;
}

const MainRouter = ({ userProgress, setUserProgress, onSchoolSelect }: MainRouterProps) => {
  const [currentPage, setCurrentPage] = useState<
    "home" | "checklist" | "finance" | "language" | "insights" | "profile" | "housing"
  >("home");

  const handleSetCurrentPage = (page: string) => {
    const validPages = ["home", "checklist", "finance", "language", "insights", "profile", "housing"] as const;
    if (validPages.includes(page as any)) {
      setCurrentPage(page as any);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleSetCurrentPage} />;
      case 'checklist':
        return (
          <ChecklistPage
            userProgress={userProgress}
            setUserProgress={setUserProgress}
            onSchoolSelect={onSchoolSelect}
            currentPage={currentPage}
            setCurrentPage={handleSetCurrentPage}
          />
        );
      case 'finance':
        return (
          <FinanceTrackingPage
            onBack={() => setCurrentPage('checklist')}
            onComplete={() => {
              setUserProgress({
                ...userProgress,
                completedModules: [...userProgress.completedModules, 'finance']
              });
            }}
            isCompleted={userProgress.completedModules.includes('finance')}
          />
        );
      case 'language':
        return (
          <LanguagePage
            onBack={() => setCurrentPage('checklist')}
            onComplete={() => {
              setUserProgress({
                ...userProgress,
                completedModules: [...userProgress.completedModules, 'language']
              });
            }}
            isCompleted={userProgress.completedModules.includes('language')}
          />
        );
      case 'insights':
        return (
          <PersonalizedDashboard
            onBack={() => setCurrentPage('checklist')}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            onBack={() => setCurrentPage('checklist')}
          />
        );
      case 'housing':
        return (
          <HousingPage 
            onBack={() => setCurrentPage('checklist')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
      {renderPage()}
    </div>
  );
};

export default MainRouter;
