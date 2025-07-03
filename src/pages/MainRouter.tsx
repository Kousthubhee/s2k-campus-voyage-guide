
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import { HomePage } from '@/components/HomePage';
import { SchoolInsightsPage } from '@/pages/SchoolInsightsPage';
import { PreArrival1Page } from '@/pages/PreArrival1Page';
import { PreArrival2Page } from '@/pages/PreArrival2Page';
import { PostArrivalPage } from '@/pages/PostArrivalPage';
import DocumentsPage from '@/components/DocumentsPage';
import { FinanceTrackingPage } from '@/pages/FinanceTrackingPage';
import { InteractiveHubPage } from '@/components/hub/InteractiveHubPage';

interface MainRouterProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  userProfile: any;
  userProgress: any;
  setUserProgress: any;
  selectedSchool: any;
  setSelectedSchool: any;
  handleProgressUpdate: any;
  profile: any;
}

const MainRouter: React.FC<MainRouterProps> = ({
  currentPage,
  setCurrentPage,
  userProfile,
  userProgress,
  setUserProgress,
  selectedSchool,
  setSelectedSchool,
  handleProgressUpdate,
  profile
}) => {
  const handleBack = () => setCurrentPage('home');
  const handleComplete = () => {
    // Handle completion logic here
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route 
          path="school-insights" 
          element={
            <SchoolInsightsPage 
              onBack={handleBack}
            />
          } 
        />
        <Route 
          path="school-insights/:cityName" 
          element={
            <SchoolInsightsPage 
              onBack={handleBack}
            />
          } 
        />
        <Route 
          path="school-insights/:cityName/:schoolId" 
          element={
            <SchoolInsightsPage 
              onBack={handleBack}
            />
          } 
        />
        <Route 
          path="pre-arrival-1" 
          element={
            <PreArrival1Page 
              onBack={handleBack}
              onComplete={handleComplete}
              isCompleted={false}
              profile={profile}
            />
          } 
        />
        <Route 
          path="pre-arrival-2" 
          element={
            <PreArrival2Page 
              onBack={handleBack}
              onComplete={handleComplete}
              isCompleted={false}
              profile={profile}
            />
          } 
        />
        <Route 
          path="post-arrival" 
          element={
            <PostArrivalPage 
              onBack={handleBack}
              onComplete={handleComplete}
              isCompleted={false}
            />
          } 
        />
        <Route path="documents" element={<DocumentsPage />} />
        <Route 
          path="finance" 
          element={
            <FinanceTrackingPage 
              onBack={handleBack}
            />
          } 
        />
        <Route path="hub" element={<InteractiveHubPage />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;
