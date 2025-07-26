
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Index from './Index';
import { ChecklistPage } from './ChecklistPage';
import { FinanceTrackingPage } from './FinanceTrackingPage';
import { LanguagePage } from './LanguagePage';
import { ProfilePage } from './ProfilePage';
import { InsightsPage } from './InsightsPage';

const MainRouter = () => {
  const [currentPage, setCurrentPage] = useState<
    'home' | 'checklist' | 'finance' | 'language' | 'insights' | 'profile'
  >('home');
  const { user, loading } = useAuth();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user && !loading) {
      window.location.href = '/login';
    }
  }, [user, loading]);

  const handleNavigation = (page: 'home' | 'checklist' | 'finance' | 'language' | 'insights' | 'profile') => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Index onNavigate={handleNavigation} />;
      case 'checklist':
        return (
          <ChecklistPage 
            onBack={() => setCurrentPage('home')} 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'finance':
        return <FinanceTrackingPage onBack={() => setCurrentPage('home')} />;
      case 'language':
        return <LanguagePage onBack={() => setCurrentPage('home')} />;
      case 'insights':
        return <InsightsPage onBack={() => setCurrentPage('home')} />;
      case 'profile':
        return <ProfilePage onBack={() => setCurrentPage('home')} />;
      default:
        return <Index onNavigate={handleNavigation} />;
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        user && renderCurrentPage()
      )}
    </div>
  );
};

export default MainRouter;
