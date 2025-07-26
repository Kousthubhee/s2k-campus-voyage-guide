
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, User, Shield } from 'lucide-react';
import { SecurityPrivacySettings } from '@/components/security/SecurityPrivacySettings';
import { useAuth } from '@/hooks/useAuth';

interface ProfilePageProps {
  onBack: () => void;
}

export const ProfilePage = ({ onBack }: ProfilePageProps) => {
  const [selectedTab, setSelectedTab] = useState('profile');
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            👤 Profile & Settings
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your account, preferences, and security settings
          </p>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security & Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <div className="p-2 bg-muted rounded-md">
                      {user?.email || 'Not available'}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Member Since</label>
                    <div className="p-2 bg-muted rounded-md">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Not available'}
                    </div>
                  </div>
                </div>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Profile editing features coming soon!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-6">
          <SecurityPrivacySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
