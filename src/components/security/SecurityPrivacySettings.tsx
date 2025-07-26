
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, Key, Eye, Download, Trash2, AlertTriangle } from 'lucide-react';
import { useSecuritySettings } from '@/hooks/useSecuritySettings';

export const SecurityPrivacySettings = () => {
  const {
    settings,
    loading,
    activeSessions,
    updatePassword,
    toggleTwoFactor,
    updatePrivacySettings,
    exportUserData,
    revokeSession
  } = useSecuritySettings();

  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.new !== passwordForm.confirm) {
      return;
    }

    await updatePassword(passwordForm.current, passwordForm.new);
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    updatePrivacySettings({ [key]: value });
  };

  const handleVisibilityChange = (visibility: 'public' | 'private') => {
    updatePrivacySettings({ profileVisibility: visibility });
  };

  if (loading) {
    return <div className="text-center py-8">Loading security settings...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handlePasswordUpdate}>
            <h4 className="font-semibold mb-3">Password</h4>
            <div className="space-y-3">
              <Input 
                type="password" 
                placeholder="Current password"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, current: e.target.value }))}
              />
              <Input 
                type="password" 
                placeholder="New password"
                value={passwordForm.new}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, new: e.target.value }))}
              />
              <Input 
                type="password" 
                placeholder="Confirm new password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm: e.target.value }))}
              />
              <Button 
                type="submit" 
                size="sm"
                disabled={!passwordForm.current || !passwordForm.new || passwordForm.new !== passwordForm.confirm}
              >
                Update Password
              </Button>
            </div>
          </form>

          <div>
            <h4 className="font-semibold mb-3">Two-Factor Authentication</h4>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Secure your account with 2FA</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <div className="flex items-center gap-2">
                {settings.twoFactorEnabled ? (
                  <Badge variant="default" className="bg-green-500">Enabled</Badge>
                ) : (
                  <Badge variant="secondary">Disabled</Badge>
                )}
                <Button 
                  size="sm" 
                  variant={settings.twoFactorEnabled ? "destructive" : "default"}
                  onClick={() => toggleTwoFactor(!settings.twoFactorEnabled)}
                >
                  {settings.twoFactorEnabled ? 'Disable' : 'Enable'}
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Active Sessions</h4>
            <div className="space-y-2">
              {activeSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{session.device}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.browser} • Last active: {session.lastActive}
                    </p>
                  </div>
                  {session.isCurrent ? (
                    <Badge variant="default">Current</Badge>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => revokeSession(session.id)}
                    >
                      <Key className="h-4 w-4 mr-2" />
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Data Collection</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="analytics" 
                  checked={settings.analyticsEnabled}
                  onChange={(e) => handlePrivacyChange('analyticsEnabled', e.target.checked)}
                />
                <label htmlFor="analytics">Allow analytics to improve the platform</label>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="marketing"
                  checked={settings.marketingEnabled}
                  onChange={(e) => handlePrivacyChange('marketingEnabled', e.target.checked)}
                />
                <label htmlFor="marketing">Receive marketing communications</label>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="third-party"
                  checked={settings.thirdPartyEnabled}
                  onChange={(e) => handlePrivacyChange('thirdPartyEnabled', e.target.checked)}
                />
                <label htmlFor="third-party">Share data with educational partners</label>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Profile Visibility</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="visibility" 
                  id="public"
                  checked={settings.profileVisibility === 'public'}
                  onChange={() => handleVisibilityChange('public')}
                />
                <label htmlFor="public">Public (visible to other students)</label>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="visibility" 
                  id="private"
                  checked={settings.profileVisibility === 'private'}
                  onChange={() => handleVisibilityChange('private')}
                />
                <label htmlFor="private">Private (only visible to you)</label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Export Your Data</p>
              <p className="text-sm text-muted-foreground">
                Download a copy of all your data
              </p>
            </div>
            <Button variant="outline" onClick={exportUserData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg border-red-200">
            <div>
              <p className="font-medium text-red-600">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Your Privacy Matters</p>
              <p className="text-sm text-blue-700 mt-1">
                We take your privacy seriously. Your data is encrypted and never shared without your consent. 
                Read our Privacy Policy for more details.
              </p>
              <Button variant="link" className="p-0 h-auto text-blue-600">
                View Privacy Policy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
