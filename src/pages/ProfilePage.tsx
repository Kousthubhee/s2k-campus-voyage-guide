
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Settings, Award, BarChart3, Shield, Palette } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ProfileEditDialog } from '@/components/ProfileEditDialog';
import { GamificationBadges } from '@/components/finance/GamificationBadges';
import { AdvancedProgressTracker } from '@/components/progress/AdvancedProgressTracker';
import { SecurityPrivacySettings } from '@/components/security/SecurityPrivacySettings';
import { DeleteConfirmationDialog } from '@/components/ui/delete-confirmation-dialog';
import { useToast } from '@/hooks/use-toast';

interface ProfilePageProps {
  onBack: () => void;
}

interface ProfileType {
  id: string;
  name: string;
  email: string;
  about: string;
  memberSince: string;
  photo: string;
  age: string;
  prevEducation: string;
  workExperience: string;
}

export const ProfilePage = ({ onBack }: ProfilePageProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('profile');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState({
    email: true,
    progress: true,
    deadline: true
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [profile, setProfile] = useState<ProfileType>({
    id: user?.id || '',
    name: user?.email?.split('@')[0] || 'Student',
    email: user?.email || '',
    about: '',
    memberSince: new Date().toLocaleDateString(),
    photo: '',
    age: '',
    prevEducation: '',
    workExperience: ''
  });

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDarkMode(isDark);
  }, []);

  // Load saved preferences
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'English';
    const savedNotifications = localStorage.getItem('notifications');
    const savedProfile = localStorage.getItem('userProfile');
    
    setLanguage(savedLanguage);
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(prev => ({ ...prev, ...parsed }));
    }
  }, []);

  const handleThemeChange = (theme: string) => {
    const newDarkMode = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(newDarkMode);
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', newDarkMode);
    
    toast({
      title: "Theme updated",
      description: `Switched to ${theme} mode`,
    });
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    toast({
      title: "Language updated",
      description: `Changed to ${newLanguage}`,
    });
  };

  const handleNotificationChange = (type: string, value: boolean) => {
    const updatedNotifications = { ...notifications, [type]: value };
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    toast({
      title: "Notification preference updated",
      description: `${type} notifications ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    toast({
      title: "Account deletion initiated",
      description: "Your account deletion request has been processed",
      variant: "destructive"
    });
    setShowDeleteDialog(false);
  };

  const handleProfileSave = (updatedProfile: ProfileType) => {
    setProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully",
    });
  };

  // Mock progress data for the tracker
  const progressItems = [
    {
      id: 'school',
      title: 'School Research',
      progress: 100,
      deadline: new Date('2024-03-15'),
      priority: 'high' as const,
      category: 'Academic'
    },
    {
      id: 'visa',
      title: 'Visa Application',
      progress: 75,
      deadline: new Date('2024-04-01'),
      priority: 'high' as const,
      category: 'Legal'
    },
    {
      id: 'housing',
      title: 'Find Housing',
      progress: 50,
      deadline: new Date('2024-05-01'),
      priority: 'medium' as const,
      category: 'Housing'
    },
    {
      id: 'finance',
      title: 'Finance Setup',
      progress: 25,
      priority: 'medium' as const,
      category: 'Finance'
    }
  ];

  const overallProgress = progressItems.reduce((sum, item) => sum + item.progress, 0) / progressItems.length;

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            👤 Your Profile
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your account, track progress, and customize your experience
          </p>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Profile Information
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditDialogOpen(true)}
                >
                  Edit Profile
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                    {profile.photo ? (
                      <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-8 w-8 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{profile.name}</h3>
                    <p className="text-muted-foreground">{profile.email}</p>
                    <Badge variant="secondary">International Student</Badge>
                  </div>
                </div>
                {profile.about && (
                  <div>
                    <h4 className="font-semibold mb-2">About</h4>
                    <p className="text-muted-foreground">{profile.about}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6 mt-6">
          <AdvancedProgressTracker items={progressItems} overallProgress={overallProgress} />
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6 mt-6">
          <GamificationBadges />
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-6">
          <SecurityPrivacySettings />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Personalization Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Theme Preferences</h4>
                  <div className="space-y-2">
                    {['light', 'dark', 'auto'].map((theme) => (
                      <div key={theme} className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          name="theme" 
                          id={theme}
                          checked={
                            theme === 'light' ? !isDarkMode && localStorage.getItem('theme') !== 'dark' :
                            theme === 'dark' ? isDarkMode && localStorage.getItem('theme') === 'dark' :
                            localStorage.getItem('theme') === 'auto'
                          }
                          onChange={() => handleThemeChange(theme)}
                        />
                        <label htmlFor={theme} className="capitalize">
                          {theme === 'auto' ? 'Auto (System)' : `${theme} Mode`}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Language</h4>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Français">Français</option>
                    <option value="हिंदी">हिंदी</option>
                    <option value="中文">中文</option>
                  </select>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Notifications</h4>
                  <div className="space-y-2">
                    {[
                      { key: 'email', label: 'Email Notifications' },
                      { key: 'progress', label: 'Progress Updates' },
                      { key: 'deadline', label: 'Deadline Reminders' }
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id={`${key}-notif`}
                          checked={notifications[key as keyof typeof notifications]}
                          onChange={(e) => handleNotificationChange(key, e.target.checked)}
                        />
                        <label htmlFor={`${key}-notif`}>{label}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    variant="destructive"
                    onClick={() => setShowDeleteDialog(true)}
                    className="w-full"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ProfileEditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        profile={profile}
        onSave={handleProfileSave}
      />

      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost."
      />
    </div>
  );
};
