import { Bell, User, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useState } from 'react';
import { LoginPage } from './LoginPage';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  userProgress: {
    keys: number;
    completedModules: string[];
    unlockedModules: string[];
  };
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
}

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

export const Header = ({ currentPage, setCurrentPage, userProgress, userProfile, setUserProfile }: HeaderProps) => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (profile: UserProfile) => {
    // Add the missing properties with default values
    const completeProfile = {
      ...profile,
      about: profile.about || '',
      memberSince: profile.memberSince || new Date().toISOString().split('T')[0],
      photo: profile.photo || '',
      prevEducation: profile.prevEducation || profile.educationLevel || '',
      workExperience: profile.workExperience || (profile.hasWorkExperience ? 'Yes' : 'No')
    };
    setUserProfile(completeProfile);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUserProfile(null);
  };

  const isLoggedIn = userProfile !== null;

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />

            <div 
              className="flex items-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setCurrentPage('checklist')}
            >
              <div className="text-2xl font-bold font-calibri">
                pas<span className="text-cyan-600">S</span>2<span className="text-blue-600">K</span>ampus
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              🗝️ Keys: {userProgress.keys}
            </div>

            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentPage('notifications')}
              className="relative p-2"
            >
              <Bell className="h-5 w-5" />
              {userProgress.keys > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  !
                </span>
              )}
            </Button>

            {isLoggedIn ? (
              <>
                <div className="text-sm text-gray-600">
                  Welcome, {userProfile?.name}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setCurrentPage('profile')}
                  className="p-2"
                >
                  <User className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <Button 
                variant="default" 
                size="sm"
                onClick={() => setShowLogin(true)}
                className="flex items-center space-x-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 z-10"
            >
              ✕
            </Button>
            <LoginPage onLogin={handleLogin} />
          </div>
        </div>
      )}
    </>
  );
};
