import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from '@/hooks/useAuth';
import { useLocalStorageProgress } from "@/hooks/useLocalStorageProgress";
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { ProfilePage } from "./ProfilePage";
import { useAuth } from '@/hooks/useAuth';
import { AuthPage } from '@/components/AuthPage';
import { ChatInterface } from '@/components/ChatInterface';
import { FileUpload } from '@/components/FileUpload';
import { supabase } from '@/integrations/supabase/client';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Header } from '@/components/Header';
import MainRouter from './MainRouter';
import { ResetPasswordPage } from '@/components/ResetPasswordPage';
import NotFound from "./NotFound";
import { ChecklistPage } from "./ChecklistPage";
import { DocumentsPage } from '@/components/DocumentsPage';
import { HubPage } from './HubPage';
import { NewsPage } from './NewsPage';
import { AffiliationPage } from '@/components/AffiliationPage';
import { LanguagePage } from './LanguagePage';
import { FrenchIntegrationPage } from '@/components/FrenchIntegrationPage';
import { TranslatePage } from './TranslatePage';
import { ContactPage } from './ContactPage';
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
import { HomePage } from '@/components/HomePage';
import { ErrorBoundary } from "react-error-boundary";
import { Moon, Sun } from "lucide-react";

console.log("[Index.tsx] TOP OF FILE");

interface UserProfile {
  id: string;
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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Apply dark mode class to document
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (user && !userProfile) {
      loadUserProfile();
    }
  }, [user]);

  useEffect(() => {
    const path = location.pathname.substring(1) || 'home';
    setCurrentPage(path);
  }, [location.pathname]);

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const type = hashParams.get('type');
    const resetParam = hashParams.get('reset-password');
    
    const urlParams = new URLSearchParams(window.location.search);
    const queryAccessToken = urlParams.get('access_token');
    const queryType = urlParams.get('type');
    
    console.log('Checking for reset password params:', { 
      hashToken: !!accessToken, 
      hashType: type, 
      queryToken: !!queryAccessToken, 
      queryType: queryType,
      resetParam: resetParam
    });
    
    if ((accessToken && type === 'recovery') || (queryAccessToken && queryType === 'recovery') || resetParam === 'true') {
      console.log('Password recovery detected, showing reset password page');
      setCurrentPage('reset-password');
      navigate('/reset-password');
    }
  }, []);

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
          id: data.id,
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
          prevEducation: data.prev_education || '',
          workExperience: data.work_experience || ''
        };
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleProgressUpdate = (newProgress: UserProgress) => {
    setUserProgress(newProgress);
  };

  const sidebarPages = ['qa', 'hub', 'news', 'affiliation', 'language', 'translate', 'contact', 'profile', 'notifications', 'integration', 'documents'];
  
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

    console.log('Navigating to page:', page);
    setCurrentPage(page);
    navigate(`/${page === 'home' ? '' : page}`);
  };

  const handleResetProgress = () => {
    resetProgress();
    setShowConfirm(false);
    setCurrentPage('home');
    navigate('/');
    toast({
      title: "Progress Reset",
      description: "Your checklist progress has been reset.",
      variant: "destructive",
    });
  };

  if (!window["IndexDebugOnce"]) {
    window["IndexDebugOnce"] = true;
    console.log("[Index.tsx] Index component did mount");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2 text-foreground">
            pas<span className="text-primary">S</span>2<span className="text-primary">K</span>ampus
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (showAuth) {
    return <AuthPage onBack={() => {
      setShowAuth(false);
      navigate('/');
    }} />;
  }

  if (currentPage === 'reset-password') {
    return <ResetPasswordPage onBack={() => {
      setCurrentPage('home');
      navigate('/');
    }} />;
  }

  return (
    <ErrorBoundary fallback={<div className="text-foreground bg-background">Something went wrong</div>}>
      <SidebarProvider>
        <div className="min-h-screen bg-background flex w-full app-container">
          <AppSidebar
            currentPage={currentPage}
            setCurrentPage={handlePageNavigation}
            userName={userProfile?.name || user?.email || 'Guest'}
            userAvatarUrl=""
          />
          <SidebarInset>
            <header className="bg-card border-b border-border sticky top-0 z-40 w-full shadow-sm">
              <div className="flex h-16 shrink-0 items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <div className="flex flex-1 justify-between items-center">
                  <div 
                    className="text-2xl font-bold cursor-pointer text-foreground hover:text-primary transition-colors"
                    onClick={() => handlePageNavigation('home')}
                  >
                    pas<span className="text-primary">S</span>2<span className="text-primary">K</span>ampus
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleDarkMode}
                      className="rounded-xl hover:bg-accent"
                    >
                      {isDarkMode ? (
                        <Sun className="h-4 w-4" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )}
                    </Button>
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
              </div>
            </header>
            <main className="flex-1 main-area overflow-auto">
              <div className="max-w-5xl mx-auto animate-fade-in section-padding">
                <Routes>
                  <Route path="/" element={
                    <HomePage 
                      onGetStarted={() => handlePageNavigation('checklist')} 
                      onPageNavigation={handlePageNavigation} 
                    />
                  } />
                  <Route path="/checklist" element={
                    <ChecklistPage 
                      userProgress={userProgress}
                      setUserProgress={setUserProgress}
                      onSchoolSelect={setSelectedSchool}
                      currentPage={currentPage}
                      setCurrentPage={handlePageNavigation}
                    />
                  } />
                  <Route path="/documents" element={<DocumentsPage />} />
                  <Route path="/hub" element={<HubPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/affiliation" element={<AffiliationPage />} />
                  <Route path="/language" element={<LanguagePage />} />
                  <Route path="/integration" element={
                    <FrenchIntegrationPage onBack={() => handlePageNavigation('checklist')} />
                  } />
                  <Route path="/translate" element={<TranslatePage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/profile" element={
                    <ProfilePage 
                      userProfile={userProfile} 
                      setUserProfile={setUserProfile} 
                      setCurrentPage={handlePageNavigation}
                    />
                  } />
                  <Route path="/qa" element={
                    <div className="space-y-6">
                      <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
                      <ChatInterface />
                    </div>
                  } />
                  <Route path="/school-insights" element={
                    <SchoolInsightsPage onBack={() => handlePageNavigation('checklist')} />
                  } />
                  <Route path="/pre-arrival-1" element={
                    <PreArrival1Page 
                      onBack={() => handlePageNavigation('checklist')} 
                      onComplete={() => {}} 
                      isCompleted={false} 
                      profile={userProfile} 
                    />
                  } />
                  <Route path="/pre-arrival-2" element={
                    <PreArrival2Page 
                      onBack={() => handlePageNavigation('checklist')} 
                    />
                  } />
                  <Route path="/post-arrival" element={
                    <PostArrivalPage 
                      onBack={() => handlePageNavigation('checklist')} 
                      onComplete={() => {}} 
                      isCompleted={false} 
                    />
                  } />
                  <Route path="/finance-tracking" element={
                    <FinanceTrackingPage onBack={() => handlePageNavigation('checklist')} />
                  } />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/suggestions" element={
                    <SuggestionsPage onBack={() => handlePageNavigation('checklist')} />
                  } />
                  <Route path="/ask-me-anything" element={<AskMeAnythingPage />} />
                  <Route path="/chatbot" element={<ChatbotPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
            <footer className="bg-card border-t border-border py-6 px-6 flex flex-col items-center gap-3 animate-fade-in shadow-lg">
              <div className="text-center text-muted-foreground">
                🎓 © {new Date().getFullYear()} <span className="text-primary font-semibold">Kousthubhee Krishna K</span>, <span className="text-primary font-semibold">Srivatsava CK</span>, <span className="text-primary font-semibold">Manibalan</span>
              </div>
              <Button 
                variant="destructive"
                size="sm"
                className="mt-1 rounded-xl"
                onClick={() => setShowConfirm(true)}
              >
                Reset Progress
              </Button>
              {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
                  <div className="bg-card rounded-2xl shadow-2xl p-6 max-w-xs w-full border border-border flex flex-col items-center animate-fade-in">
                    <div className="font-semibold text-lg mb-2 text-foreground">Reset Progress?</div>
                    <div className="text-muted-foreground text-sm mb-4 text-center">
                      This will erase your checklist progress. Are you sure?
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button 
                        variant="destructive"
                        size="sm"
                        className="rounded-xl"
                        onClick={handleResetProgress}
                      >
                        Yes, Reset
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
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
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  );
};

export default Index;
