
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AppSidebar } from '@/components/AppSidebar';
import { Header } from '@/components/Header';
import { MainRouter } from '@/pages/MainRouter';
import { ProfilePage } from '@/pages/ProfilePage';
import { QAPage } from '@/pages/QAPage';
import { FloatingChatbot } from '@/components/FloatingChatbot';
import { Toaster } from 'sonner';
import { SidebarProvider } from '@/components/ui/sidebar';

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

export default function Index() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, signOut } = useAuth();
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

  const handleLogout = async () => {
    await signOut();
    setCurrentPage('home');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="flex h-screen w-full">
          <AppSidebar 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            userName={user?.user_metadata?.name || user?.email?.split('@')[0]}
            userAvatarUrl={user?.user_metadata?.avatar_url}
          />
          
          <div className="flex-1 flex flex-col">
            <Header 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              userProgress={{}}
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              showAuth={!user}
            />
            
            <main className="flex-1 p-4 md:p-8 main-area overflow-auto">
              <div className="max-w-5xl mx-auto animate-fade-in section-padding">
                {currentPage === "profile" ? (
                  <ProfilePage 
                    userProfile={userProfile} 
                    setUserProfile={setUserProfile} 
                    setCurrentPage={setCurrentPage}
                  />
                ) : currentPage === "qa" ? (
                  <div className="space-y-6">
                    <h1 className="text-3xl font-bold">AI Assistant</h1>
                    <QAPage />
                  </div>
                ) : (
                  <MainRouter 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                )}
              </div>
            </main>
          </div>
        </div>

        <FloatingChatbot />
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
