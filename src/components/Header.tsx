
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProfileEditDialog } from './ProfileEditDialog';
import { Key, Bell, User, LogIn, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  userProgress: any;
  userProfile: any;
  setUserProfile: (profile: any) => void;
  showAuth: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  userProgress,
  userProfile,
  setUserProfile,
  showAuth
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleNotificationClick = () => {
    setCurrentPage('notifications');
  };

  const handleAuthClick = () => {
    setCurrentPage('login');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Dark Mode Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        className="relative"
      >
        {theme === 'light' ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>

      {/* Notification Icon */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleNotificationClick}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs p-0">
          3
        </Badge>
      </Button>

      {/* Keys Counter */}
      <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg border border-primary/20">
        <Key className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-primary">
          {userProgress?.keys || 0} Keys
        </span>
      </div>

      {/* Auth/Profile Section */}
      {showAuth ? (
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleAuthClick}
          className="flex items-center gap-2"
        >
          <LogIn className="h-4 w-4" />
          Sign In
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditingProfile(true)}
            className="flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Edit Profile
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="flex items-center gap-2 text-destructive hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      )}

      {/* Profile Edit Dialog */}
      <ProfileEditDialog
        open={isEditingProfile}
        onOpenChange={setIsEditingProfile}
        profile={userProfile}
        onSave={setUserProfile}
      />
    </div>
  );
};
