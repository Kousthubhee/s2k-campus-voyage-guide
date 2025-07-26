
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

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

  // This component is now a legacy router used to support old code
  // The actual routing happens in Index.tsx with React Router
  // This function serves as a compatibility layer
  console.log('MainRouter is now just a compatibility layer - routing happens in Index.tsx');
  
  return null;
};

export default MainRouter;
