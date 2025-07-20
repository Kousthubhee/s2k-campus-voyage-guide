
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
        className="relative rounded-xl hover:bg-accent"
      >
        <Bell className="h-5 w-5" />
        <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs p-0 rounded-full">
          3
        </Badge>
      </Button>

      {/* Keys Counter - Emerald Green for success */}
      <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-xl border border-border shadow-md">
        <Key className="h-4 w-4 text-success" />
        <span className="text-sm font-semibold text-foreground">
          {userProgress?.keys || 0} Keys
        </span>
      </div>

      {/* Auth/Profile Section */}
      {showAuth ? (
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleAuthClick}
          className="flex items-center gap-2 rounded-xl border-border hover:bg-accent"
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
            className="flex items-center gap-2 rounded-xl border-border hover:bg-accent"
          >
            <User className="h-4 w-4" />
            Edit Profile
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="flex items-center gap-2 text-destructive hover:text-destructive/90 rounded-xl hover:bg-destructive/10"
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
