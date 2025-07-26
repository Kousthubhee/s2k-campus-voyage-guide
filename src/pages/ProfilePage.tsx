
import React, { useState } from 'react';
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

interface ProfilePageProps {
  onBack: () => void;
}

export const ProfilePage = ({ onBack }: ProfilePageProps) => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('profile');

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

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

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

      <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
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
                <ProfileEditDialog>
                  <Button variant="outline" size="sm">
                    Edit Profile
                  </Button>
                </ProfileEditDialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{user?.email?.split('@')[0] || 'Student'}</h3>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <Badge variant="secondary">International Student</Badge>
                  </div>
                </div>
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
                    <div className="flex items-center gap-2">
                      <input type="radio" name="theme" id="light" defaultChecked />
                      <label htmlFor="light">Light Mode</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="theme" id="dark" />
                      <label htmlFor="dark">Dark Mode</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="theme" id="auto" />
                      <label htmlFor="auto">Auto (System)</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Language</h4>
                  <select className="w-full p-2 border rounded-md">
                    <option>English</option>
                    <option>Français</option>
                    <option>हिंदी</option>
                    <option>中文</option>
                  </select>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Notifications</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="email-notif" defaultChecked />
                      <label htmlFor="email-notif">Email Notifications</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="progress-notif" defaultChecked />
                      <label htmlFor="progress-notif">Progress Updates</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="deadline-notif" defaultChecked />
                      <label htmlFor="deadline-notif">Deadline Reminders</label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
