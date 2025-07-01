
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, LogOut } from 'lucide-react';
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

  const handleSignOut = async () => {
    await signOut();
    setCurrentPage('checklist');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div 
            className="text-2xl font-bold cursor-pointer"
            onClick={() => setCurrentPage('checklist')}
          >
            pas<span className="text-cyan-600">S</span>2<span className="text-blue-600">K</span>ampus
          </div>

          {/* Right Section - Keys, Login/Profile */}
          <div className="flex items-center space-x-4">
            {/* Keys Badge */}
            {userProgress?.keys > 0 && (
              <Badge variant="secondary" className="flex items-center">
                🗝️ {userProgress.keys} keys
              </Badge>
            )}

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-2">
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
          </div>
        </div>
      </div>

      {/* Profile Edit Dialog */}
      {showProfileEdit && userProfile && (
        <ProfileEditDialog
          open={showProfileEdit}
          onOpenChange={setShowProfileEdit}
          profile={userProfile}
          onSave={setUserProfile}
        />
      )}
    </header>
  );
};
