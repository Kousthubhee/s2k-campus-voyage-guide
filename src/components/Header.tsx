
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, FileText, CheckSquare, Calendar, Users, BookOpen, Globe, Phone, Bell, User, LogOut, Settings, Menu, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ProfileEditDialog } from './ProfileEditDialog';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  userProgress: any;
  userProfile: any;
  setUserProfile: (profile: any) => void;
  showAuth?: boolean;
}

export const Header = ({ 
  currentPage, 
  setCurrentPage, 
  userProgress, 
  userProfile, 
  setUserProfile,
  showAuth = false
}: HeaderProps) => {
  const { user, signOut } = useAuth();
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const getPageTitle = () => {
    switch (currentPage) {
      case 'checklist': return 'Study Checklist';
      case 'qa': return 'Ask Me Anything';
      case 'hub': return 'Community Hub';
      case 'news': return 'News & Updates';
      case 'affiliation': return 'School Affiliations';
      case 'language': return 'Language Tools';
      case 'translate': return 'Translate';
      case 'contact': return 'Contact Support';
      case 'profile': return 'My Profile';
      case 'notifications': return 'Notifications';
      case 'integration': return 'French Integration';
      case 'documents': return 'Documents & Renewals';
      default: return 'pasS2Kampus';
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setCurrentPage('checklist');
  };

  const quickNavItems = [
    { icon: CheckSquare, label: 'Checklist', page: 'checklist' },
    { icon: MessageSquare, label: 'Ask AI', page: 'qa' },
    { icon: FileText, label: 'Documents', page: 'documents' },
    { icon: Users, label: 'Hub', page: 'hub' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div 
              className="text-2xl font-bold cursor-pointer"
              onClick={() => setCurrentPage('checklist')}
            >
              pas<span className="text-cyan-600">S</span>2<span className="text-blue-600">K</span>ampus
            </div>
            <div className="hidden md:block text-gray-600 font-medium">
              {getPageTitle()}
            </div>
          </div>

          {/* Quick Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            {quickNavItems.map((item) => (
              <Button
                key={item.page}
                variant={currentPage === item.page ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage(item.page)}
                className="flex items-center space-x-2"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {/* Progress Badge */}
            {userProgress?.keys > 0 && (
              <Badge variant="secondary" className="hidden sm:flex">
                🗝️ {userProgress.keys} keys
              </Badge>
            )}

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage('notifications')}
                  className="relative"
                >
                  <Bell className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProfileEdit(true)}
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {userProfile?.name || user.email?.split('@')[0] || 'User'}
                  </span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Sign Out</span>
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setCurrentPage('login')}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="grid grid-cols-2 gap-2">
              {quickNavItems.map((item) => (
                <Button
                  key={item.page}
                  variant={currentPage === item.page ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setCurrentPage(item.page);
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-2 justify-start"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Profile Edit Dialog */}
      {showProfileEdit && userProfile && (
        <ProfileEditDialog
          open={showProfileEdit}
          onClose={() => setShowProfileEdit(false)}
          userProfile={userProfile}
          onSave={setUserProfile}
        />
      )}
    </header>
  );
};
