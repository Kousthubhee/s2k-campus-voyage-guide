
import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Header } from '@/components/Header';
import { MainRouter } from './MainRouter';
import { useSupabaseProgress } from "@/hooks/useSupabaseProgress";
import { useSupabaseProfile } from "@/hooks/useSupabaseProfile";
import { useAuth } from "@/hooks/useAuth";
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { ProfilePage } from "@/components/ProfilePage";
import { AuthPage } from "@/components/AuthPage";

console.log("[Index.tsx] Rendering Index Page");

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile } = useSupabaseProfile();
  const [currentPage, setCurrentPage] = useState('checklist');
  const [userProgress, setUserProgress, resetProgress, progressLoading] = useSupabaseProgress();
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const { toast } = useToast();

  const handleProgressUpdate = (newProgress: any) => {
    setUserProgress(newProgress);
    if (newProgress.currentPage && newProgress.currentPage !== currentPage) {
      setCurrentPage(newProgress.currentPage);
    }
  };

  const sidebarPages = ['qa', 'hub', 'news', 'affiliation', 'language', 'translate', 'contact', 'profile', 'notifications', 'integration', 'documents'];
  
  const checkIfPageRequiresKey = (page: string) => {
    return sidebarPages.includes(page) && userProgress.keys < 1;
  };

  const handlePageNavigation = (page: string) => {
    if (checkIfPageRequiresKey(page)) {
      alert('You need at least 1 key to access this page. Complete modules to earn keys!');
      return;
    }
    setCurrentPage(page);
  };

  const handleResetProgress = () => {
    resetProgress();
    setShowConfirm(false);
    setCurrentPage('checklist');
    toast({
      title: "Progress Reset",
      description: "Your checklist progress has been reset.",
      variant: "destructive",
    });
  };

  // Show loading state
  if (authLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold mb-4">
            pas<span className="text-cyan-600">S</span>2<span className="text-blue-600">K</span>ampus
          </div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  // Show auth page if not authenticated
  if (!user) {
    return <AuthPage />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex w-full">
        <AppSidebar
          currentPage={currentPage}
          setCurrentPage={handlePageNavigation}
          userName={profile?.name || 'User'}
          userAvatarUrl=""
        />
        <div className="flex-1 flex flex-col">
          <Header 
            currentPage={currentPage} 
            setCurrentPage={handlePageNavigation}
            userProgress={userProgress}
            userProfile={profile}
            setUserProfile={() => {}} // We'll handle this through the profile hook
          />
          <main className="flex-1 p-4 md:p-8 main-area overflow-auto">
            <div className="max-w-5xl mx-auto animate-fade-in section-padding">
              {currentPage === "profile" ? (
                <ProfilePage userProfile={profile} setUserProfile={() => {}} />
              ) : (
                <MainRouter
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  userProfile={profile}
                  userProgress={userProgress}
                  setUserProgress={setUserProgress}
                  selectedSchool={selectedSchool}
                  setSelectedSchool={setSelectedSchool}
                  handleProgressUpdate={handleProgressUpdate}
                  profile={profile}
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
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
