
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Shield, Key, Eye, EyeOff, Smartphone, Download, AlertTriangle } from 'lucide-react';

interface SecuritySetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  type: 'toggle' | 'action' | 'info';
}

export const SecurityPrivacySettings = () => {
  const [securitySettings, setSecuritySettings] = useState<SecuritySetting[]>([
    {
      id: 'two-factor',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      enabled: false,
      type: 'toggle'
    },
    {
      id: 'login-alerts',
      title: 'Login Notifications',
      description: 'Get notified of new device logins',
      enabled: true,
      type: 'toggle'
    },
    {
      id: 'data-encryption',
      title: 'Document Encryption',
      description: 'Encrypt sensitive documents with advanced security',
      enabled: true,
      type: 'toggle'
    },
    {
      id: 'profile-visibility',
      title: 'Profile Visibility',
      description: 'Control who can see your profile information',
      enabled: false,
      type: 'toggle'
    }
  ]);

  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const toggleSetting = (id: string) => {
    setSecuritySettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const generateBackupCodes = () => {
    // Generate backup codes logic
    console.log('Generating backup codes...');
  };

  const exportData = () => {
    // Export user data logic
    console.log('Exporting user data...');
  };

  return (
    <div className="space-y-6">
      {/* Security Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-semibold text-green-900">Secure Account</div>
                <div className="text-sm text-green-700">Strong password</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-semibold text-yellow-900">2FA Recommended</div>
                <div className="text-sm text-yellow-700">Enable for better security</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <Eye className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-semibold text-blue-900">Data Protected</div>
                <div className="text-sm text-blue-700">Encryption enabled</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {securitySettings.map(setting => (
              <div key={setting.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-1">
                  <div className="font-semibold">{setting.title}</div>
                  <div className="text-sm text-muted-foreground">{setting.description}</div>
                  {setting.enabled && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                      Active
                    </Badge>
                  )}
                </div>
                <Switch
                  checked={setting.enabled}
                  onCheckedChange={() => toggleSetting(setting.id)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <Button className="w-full">Update Password</Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Secure your account with two-factor authentication using an authenticator app.
          </p>
          <div className="space-y-3">
            <Button variant="outline" onClick={generateBackupCodes} className="w-full">
              <Key className="h-4 w-4 mr-2" />
              Generate Backup Codes
            </Button>
            <Button className="w-full">
              <Smartphone className="h-4 w-4 mr-2" />
              Set Up Authenticator App
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <div className="font-medium">Export Personal Data</div>
                <div className="text-sm text-muted-foreground">
                  Download a copy of all your data
                </div>
              </div>
              <Button variant="outline" onClick={exportData}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-red-200">
              <div>
                <div className="font-medium text-red-900">Delete Account</div>
                <div className="text-sm text-red-700">
                  Permanently remove your account and all data
                </div>
              </div>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Privacy Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-blue-800 text-sm">
            <div className="flex items-start gap-2">
              <span className="font-semibold">•</span>
              <span>Use a unique, strong password that you don't use elsewhere</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">•</span>
              <span>Enable two-factor authentication for maximum security</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">•</span>
              <span>Review your privacy settings regularly</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">•</span>
              <span>Only share personal information when necessary</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">•</span>
              <span>Log out from shared devices and public computers</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
