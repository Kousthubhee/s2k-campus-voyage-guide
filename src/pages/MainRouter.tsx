import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { HomePage } from '@/components/HomePage';
import { ChecklistPage } from './ChecklistPage';
import { DocumentsPage } from '@/components/DocumentsPage';
import { HubPage } from './HubPage';
import { NewsPage } from './NewsPage';
import { AffiliationPage } from '@/components/AffiliationPage';
import { LanguagePage } from './LanguagePage';
import { FrenchIntegrationPage } from '@/components/FrenchIntegrationPage';
import { TranslatePage } from './TranslatePage';
import { ContactPage } from './ContactPage';
import { ProfilePage } from './ProfilePage';
import { SchoolInsightsPage } from './SchoolInsightsPage';
import { PreArrival1Page } from './PreArrival1Page';
import { PreArrival2Page } from './PreArrival2Page';
import { PostArrivalPage } from './PostArrivalPage';
import { FinanceTrackingPage } from './FinanceTrackingPage';
import { NotificationsPage } from './NotificationsPage';
import { QAPage } from './QAPage';
import { SuggestionsPage } from './SuggestionsPage';
import { AskMeAnythingPage } from './AskMeAnythingPage';
import { ChatbotPage } from './ChatbotPage';
import { AuthPage } from '@/components/AuthPage';

interface MainRouterProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  userProfile: any;
  userProgress: any;
  setUserProgress: (progress: any) => void;
  selectedSchool: any;
  setSelectedSchool: (school: any) => void;
  handleProgressUpdate: (progress: any) => void;
  profile: any;
  setUserProfile: (profile: any) => void;
}

const MainRouter = ({
  currentPage,
  setCurrentPage,
  userProfile,
  userProgress,
  setUserProgress,
  selectedSchool,
  setSelectedSchool,
  handleProgressUpdate,
  profile,
  setUserProfile
}: MainRouterProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderCurrentPage = () => {
    console.log('Current page in MainRouter:', currentPage);
    
    switch (currentPage) {
      case 'home':
        return <HomePage onGetStarted={() => setCurrentPage('checklist')} onPageNavigation={setCurrentPage} />;
      case 'checklist':
        return <ChecklistPage />;
      case 'documents':
        return <DocumentsPage />;
      case 'hub':
        return <HubPage />;
      case 'news':
        return <NewsPage />;
      case 'affiliation':
        return <AffiliationPage />;
      case 'language':
        return <LanguagePage />;
      case 'integration':
        return <FrenchIntegrationPage onBack={() => setCurrentPage('checklist')} />;
      case 'translate':
        return <TranslatePage />;
      case 'contact':
        return <ContactPage />;
      case 'profile':
        return <ProfilePage />;
      case 'auth':
        return <AuthPage onBack={() => setCurrentPage('home')} />;
      case 'school':
      case 'school-insights':
        return <SchoolInsightsPage onBack={() => setCurrentPage('checklist')} />;
      case 'pre-arrival-1':
        return (
          <PreArrival1Page 
            onBack={() => setCurrentPage('checklist')} 
            onComplete={() => {}} 
            isCompleted={false} 
            profile={profile} 
          />
        );
      case 'pre-arrival-2':
        return (
          <PreArrival2Page 
            onBack={() => setCurrentPage('checklist')} 
          />
        );
      case 'post-arrival':
        return (
          <PostArrivalPage 
            onBack={() => setCurrentPage('checklist')} 
            onComplete={() => {}} 
            isCompleted={false} 
          />
        );
      case 'finance':
      case 'finance-tracking':
        return <FinanceTrackingPage onBack={() => setCurrentPage('checklist')} />;
      case 'notifications':
        return <NotificationsPage />;
      case 'qa':
        return <QAPage />;
      case 'ask-me-anything':
        return <AskMeAnythingPage />;
      case 'suggestions':
        return <SuggestionsPage onBack={() => setCurrentPage('checklist')} />;
      case 'chatbot':
        return <ChatbotPage />;
      default:
        console.log('Unknown page:', currentPage, '- defaulting to home');
        return <HomePage onGetStarted={() => setCurrentPage('checklist')} onPageNavigation={setCurrentPage} />;
    }
  };

  return (
    <>
      {renderCurrentPage()}
    </>
  );
};

export default MainRouter;
