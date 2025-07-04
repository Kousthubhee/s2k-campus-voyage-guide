import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { HomePage } from './HomePage';
import { ChecklistPage } from './ChecklistPage';
import { DocumentsPage } from '@/components/DocumentsPage';
import { HubPage } from './HubPage';
import { NewsPage } from './NewsPage';
import { AffiliationPage } from './AffiliationPage';
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

const MainRouter = () => {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      setCurrentPage(storedPage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
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
      case 'translate':
        return <TranslatePage />;
      case 'contact':
        return <ContactPage />;
      case 'profile':
        return <ProfilePage />;
      case 'school':
        return <SchoolInsightsPage onBack={() => setCurrentPage('checklist')} />;
      case 'admin':
        return <AdminDashboard />;
      case 'pre-arrival-1':
        return <PreArrival1Page />;
      case 'pre-arrival-2':
        return <PreArrival2Page />;
      case 'post-arrival':
        return <PostArrivalPage />;
      case 'finance':
        return <FinanceTrackingPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'qa':
        return <QAPage />;
      case 'suggestions':
        return <SuggestionsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    
      {renderCurrentPage()}
    
  );
};

export default MainRouter;
