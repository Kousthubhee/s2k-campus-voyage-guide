
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProfileEditDialog } from './ProfileEditDialog';
import { Key, Bell, User, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

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
      <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 rounded-lg border border-yellow-200">
        <Key className="h-4 w-4 text-yellow-600" />
        <span className="text-sm font-semibold text-yellow-800">
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
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
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
