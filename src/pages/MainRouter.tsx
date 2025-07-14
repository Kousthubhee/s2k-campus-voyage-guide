
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { HomePage } from '@/components/HomePage';
import { ChecklistPage } from '@/pages/ChecklistPage';
import { DocumentsPage } from '@/components/DocumentsPage';
import { HubPage } from '@/pages/HubPage';
import { SchoolInsightsPage } from '@/pages/SchoolInsightsPage';
import { PreArrival1Page } from '@/pages/PreArrival1Page';
import { PreArrival2Page } from '@/pages/PreArrival2Page';
import { PostArrivalPage } from '@/pages/PostArrivalPage';
import { FrenchIntegrationPage } from '@/components/FrenchIntegrationPage';
import { FinanceTrackingPage } from '@/pages/FinanceTrackingPage';
import { SuggestionsPage } from '@/pages/SuggestionsPage';
import { QAPage } from '@/pages/QAPage';
import { TranslatePage } from '@/pages/TranslatePage';
import { ContactPage } from '@/pages/ContactPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { AuthPage } from '@/components/AuthPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { useLocalStorageProgress } from '@/hooks/useLocalStorageProgress';

interface MainRouterProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

interface UserProfile {
  name: string;
  email: string;
  about: string;
  memberSince: string;
  photo: string;
  age: string;
  prevEducation: string;
  workExperience: string;
  nationality?: string;
  education_level?: string;
  target_city?: string;
  target_program?: string;
}

export const MainRouter = ({ currentPage, setCurrentPage }: MainRouterProps) => {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useLocalStorageProgress();
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: user?.user_metadata?.name || user?.email?.split('@')[0] || 'User',
    email: user?.email || '',
    about: 'Complete your profile to get personalized recommendations.',
    memberSince: new Date().toLocaleDateString(),
    photo: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=facearea&w=256&h=256&facepad=3&q=80',
    age: '',
    prevEducation: '',
    workExperience: '',
    nationality: '',
    education_level: '',
    target_city: '',
    target_program: '',
  });

  useEffect(() => {
    if (user) {
      setUserProfile(prev => ({
        ...prev,
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
        email: user.email || '',
      }));
    }
  }, [user]);

  const renderPage = () => {
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
      case 'school-insights':
        return <SchoolInsightsPage onBack={() => setCurrentPage('checklist')} />;
      case 'pre-arrival-1':
        return <PreArrival1Page 
          onBack={() => setCurrentPage('checklist')}
          onComplete={() => console.log('Pre-arrival 1 completed')}
          isCompleted={false}
          profile={userProfile}
        />;
      case 'pre-arrival-2':
        return <PreArrival2Page />;
      case 'post-arrival':
        return <PostArrivalPage 
          onBack={() => setCurrentPage('checklist')}
          onComplete={() => console.log('Post-arrival completed')}
          isCompleted={false}
        />;
      case 'integration':
        return <FrenchIntegrationPage />;
      case 'finance-tracking':
        return <FinanceTrackingPage onBack={() => setCurrentPage('checklist')} />;
      case 'suggestions':
        return <SuggestionsPage onBack={() => setCurrentPage('checklist')} />;
      case 'qa':
        return <QAPage />;
      case 'translate':
        return <TranslatePage />;
      case 'contact':
        return <ContactPage />;
      case 'profile':
        return <ProfilePage userProfile={userProfile} setUserProfile={setUserProfile} setCurrentPage={setCurrentPage} />;
      case 'auth':
        return <AuthPage onBack={() => setCurrentPage('home')} />;
      case 'school':
        return <SchoolInsightsPage onBack={() => setCurrentPage('checklist')} />;
      case 'notifications':
        return <NotificationsPage />;
      default:
        return <HomePage onGetStarted={() => setCurrentPage('checklist')} onPageNavigation={setCurrentPage} />;
    }
  };

  return renderPage();
};
