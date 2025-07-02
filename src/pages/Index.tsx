
// ADDED: Top of file log
console.log("[App.tsx] TOP OF FILE");

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import { NotificationProvider } from "@/hooks/useNotifications";
import React, { useState, useEffect } from "react";

// Simple error boundary for root app
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error?: Error}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: any) {
    console.error("Uncaught error in App:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return <div style={{color: "red", padding: 32, fontSize: 20}}>
        <b>Critical Error:</b> {this.state.error?.message}
        <br />
        <small>See console for details.</small>
      </div>
    }
    return this.props.children;
  }
}

import { AuthProvider } from '@/hooks/useAuth';
import { useLocalStorageProgress } from "@/hooks/useLocalStorageProgress";
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { ProfilePage } from "@/components/ProfilePage";
import { useAuth } from '@/hooks/useAuth';
import { AuthPage } from '@/components/AuthPage';
import { supabase } from '@/integrations/supabase/client';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Header } from '@/components/Header';
import { MainRouter } from './MainRouter';
import { FloatingChatbot } from '@/components/FloatingChatbot';

console.log("App.tsx is rendering");

interface UserProfile {
  name: string;
  email: string;
  age: string;
  nationality: string;
  educationLevel: string;
  hasWorkExperience: boolean;
  hasGapYear: boolean;
  gapYearDuration: number;
  targetCity: string;
  targetProgram: string;
  hasHealthIssues: boolean;
  isMarried: boolean;
  hasChildren: boolean;
  about: string;
  memberSince: string;
  photo: string;
  prevEducation: string;
  workExperience: string;
}

interface UserProgress {
  keys: number;
  completedModules: string[];
  unlockedModules: string[];
  currentPage?: string;
}

const queryClient = new QueryClient();

const Index = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [userProgress, setUserProgress, resetProgress] = useLocalStorageProgress();
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { toast } = useToast();
  const { user, loading } = useAuth();

  // Load user profile when user is available
  useEffect(() => {
    if (user && !userProfile) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;
    
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        const profile: UserProfile = {
          name: data.name || user.email || '',
          email: data.email || user.email || '',
          age: data.age || '',
          nationality: data.nationality || '',
          educationLevel: data.education_level || '',
          hasWorkExperience: data.has_work_experience || false,
          hasGapYear: data.has_gap_year || false,
          gapYearDuration: data.gap_year_duration || 0,
          targetCity: data.target_city || '',
          targetProgram: data.target_program || '',
          hasHealthIssues: data.has_health_issues || false,
          isMarried: data.is_married || false,
          hasChildren: data.has_children || false,
          about: data.about || '',
          memberSince: new Date(data.created_at).toLocaleDateString(),
          photo: data.photo_url || '',
          prevEducation: '',
          workExperience: ''
        };
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleProgressUpdate = (newProgress: UserProgress) => {
    setUserProgress(newProgress);
    if (newProgress.currentPage && newProgress.currentPage !== currentPage) {
      setCurrentPage(newProgress.currentPage);
    }
  };

  const sidebarPages = ['hub', 'news', 'affiliation', 'language', 'contact', 'notifications', 'integration'];
  
  const checkIfPageRequiresKey = (page: string) => {
    return sidebarPages.includes(page) && userProgress.keys < 1;
  };

  const handlePageNavigation = (page: string) => {
    if (page === 'login') {
      setShowAuth(true);
      return;
    }
    
    if (checkIfPageRequiresKey(page)) {
      alert('You need at least 1 key to access this page. Complete modules to earn keys!');
      return;
    }
    setCurrentPage(page);
  };

  const handleResetProgress = () => {
    resetProgress();
    setShowConfirm(false);
    setCurrentPage('home');
    toast({
      title: "Progress Reset",
      description: "Your checklist progress has been reset.",
      variant: "destructive",
    });
  };

  // DEBUG: Confirm at least Index renders before returning full JSX
  if (!window["IndexDebugOnce"]) {
    window["IndexDebugOnce"] = true;
    console.log("[Index.tsx] Index component did mount");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">
            pas<span className="text-cyan-600">S</span>2<span className="text-blue-600">K</span>ampus
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (showAuth) {
    return <AuthPage onBack={() => setShowAuth(false)} />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex w-full">
        <AppSidebar
          currentPage={currentPage}
          setCurrentPage={handlePageNavigation}
          userName={userProfile?.name || user?.email || 'Guest'}
          userAvatarUrl=""
        />
        <SidebarInset>
          <header className="bg-white border-b border-gray-200 sticky top-0 z-40 w-full">
            <div className="flex h-16 shrink-0 items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <div className="flex flex-1 justify-between items-center">
                <div 
                  className="text-2xl font-bold cursor-pointer"
                  onClick={() => setCurrentPage('home')}
                >
                  pas<span className="text-cyan-600">S</span>2<span className="text-blue-600">K</span>ampus
                </div>
                <Header 
                  currentPage={currentPage} 
                  setCurrentPage={handlePageNavigation}
                  userProgress={userProgress}
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                  showAuth={!user}
                />
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-8 main-area overflow-auto">
            <div className="max-w-5xl mx-auto animate-fade-in section-padding">
              {currentPage === "profile" ? (
                <ProfilePage userProfile={userProfile} setUserProfile={setUserProfile} />
              ) : (
                <MainRouter
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  userProfile={userProfile}
                  userProgress={userProgress}
                  setUserProgress={setUserProgress}
                  selectedSchool={selectedSchool}
                  setSelectedSchool={setSelectedSchool}
                  handleProgressUpdate={handleProgressUpdate}
                  profile={userProfile}
                />
              )}
            </div>
          </main>
          <footer className="bg-white border-t border-gray-200 py-6 px-6 flex flex-col items-center gap-3 animate-fade-in">
            <div className="text-center text-gray-600">
              🎓 © {new Date().getFullYear()} <span className="text-blue-600 font-semibold">  Kousthubhee Krishna K</span> & <span className="text-cyan-600 font-semibold">Srivatsava CK</span>
            </div>
            <Button 
              variant="destructive"
              size="sm"
              className="mt-1"
              onClick={() => setShowConfirm(true)}
            >
              Reset Progress
            </Button>
            {showConfirm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full border flex flex-col items-center animate-fade-in">
                  <div className="font-semibold text-lg mb-2">Reset Progress?</div>
                  <div className="text-gray-700 text-sm mb-4 text-center">
                    This will erase your checklist progress. Are you sure?
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button 
                      variant="destructive"
                      size="sm"
                      onClick={handleResetProgress}
                    >
                      Yes, Reset
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => setShowConfirm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </footer>
        </SidebarInset>
        <FloatingChatbot />
      </div>
    </SidebarProvider>
  );
};

export default Index;
