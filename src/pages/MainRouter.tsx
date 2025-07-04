
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { HomePage } from '@/components/HomePage';
import { ChecklistPage } from './ChecklistPage';
import { DocumentsPage } from '@/components/DocumentsPage';
import { HubPage } from './HubPage';
import { NewsPage } from './NewsPage';
import { AffiliationPage } from '@/components/AffiliationPage';
import { LanguagePage } from './LanguagePage';
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
import { AdminDashboard } from "@/components/AdminDashboard";
import { AskMeAnythingPage } from './AskMeAnythingPage';

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

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      setCurrentPage(storedPage);
    }
  }, [setCurrentPage]);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onGetStarted={() => setCurrentPage('checklist')} onPageNavigation={setCurrentPage} />;
      case 'checklist':
        return (
          <ChecklistPage 
            userProgress={userProgress}
            setUserProgress={setUserProgress}
            onSchoolSelect={setSelectedSchool}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        );
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
      case 'translate':
        return <TranslatePage />;
      case 'contact':
        return <ContactPage />;
      case 'profile':
        return <ProfilePage userProfile={userProfile} setUserProfile={setUserProfile} />;
      case 'school':
      case 'school-insights':
        return <SchoolInsightsPage onBack={() => setCurrentPage('checklist')} />;
      case 'admin':
        return <AdminDashboard />;
      case 'pre-arrival-1':
        return <PreArrival1Page onBack={() => setCurrentPage('checklist')} onComplete={() => {}} isCompleted={false} profile={profile} />;
      case 'pre-arrival-2':
        return <PreArrival2Page onBack={() => setCurrentPage('checklist')} onComplete={() => {}} isCompleted={false} profile={profile} />;
      case 'post-arrival':
        return <PostArrivalPage onBack={() => setCurrentPage('checklist')} onComplete={() => {}} isCompleted={false} />;
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
      default:
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
