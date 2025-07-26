
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  profileVisibility: 'public' | 'private';
  analyticsEnabled: boolean;
  marketingEnabled: boolean;
  thirdPartyEnabled: boolean;
}

export function useSecuritySettings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    profileVisibility: 'private',
    analyticsEnabled: true,
    marketingEnabled: false,
    thirdPartyEnabled: false,
  });
  const [loading, setLoading] = useState(true);
  const [activeSessions, setActiveSessions] = useState([
    {
      id: 'current',
      device: 'Current Device',
      browser: 'Chrome on Windows',
      lastActive: 'Now',
      isCurrent: true
    }
  ]);

  useEffect(() => {
    if (user) {
      loadSecuritySettings();
    }
  }, [user]);

  const loadSecuritySettings = async () => {
    if (!user) return;

    try {
      // Load user preferences from profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        setSettings({
          twoFactorEnabled: false, // MFA status would come from auth
          profileVisibility: 'private', // Default for now
          analyticsEnabled: true,
          marketingEnabled: false,
          thirdPartyEnabled: false,
        });
      }
    } catch (error) {
      console.error('Error loading security settings:', error);
      toast({
        title: "Error loading settings",
        description: "Could not load your security preferences",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    if (!user) return { error: 'Not authenticated' };

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: "Password updated",
        description: "Your password has been changed successfully"
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Password update failed",
        description: error.message,
        variant: "destructive"
      });
      return { error: error.message };
    }
  };

  const toggleTwoFactor = async (enabled: boolean) => {
    // In a real implementation, this would configure MFA through Supabase
    setSettings(prev => ({ ...prev, twoFactorEnabled: enabled }));
    
    toast({
      title: enabled ? "2FA Enabled" : "2FA Disabled",
      description: enabled 
        ? "Two-factor authentication has been enabled for your account"
        : "Two-factor authentication has been disabled"
    });
  };

  const updatePrivacySettings = async (newSettings: Partial<SecuritySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    
    toast({
      title: "Privacy settings updated",
      description: "Your privacy preferences have been saved"
    });
  };

  const exportUserData = async () => {
    if (!user) return;

    try {
      // Export user data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      const { data: documents } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id);

      const exportData = {
        profile,
        documents,
        exportDate: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `user-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Data exported",
        description: "Your data has been downloaded successfully"
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Could not export your data",
        variant: "destructive"
      });
    }
  };

  const revokeSession = async (sessionId: string) => {
    if (sessionId === 'current') return;

    setActiveSessions(sessions => 
      sessions.filter(session => session.id !== sessionId)
    );

    toast({
      title: "Session revoked",
      description: "The selected session has been terminated"
    });
  };

  return {
    settings,
    loading,
    activeSessions,
    updatePassword,
    toggleTwoFactor,
    updatePrivacySettings,
    exportUserData,
    revokeSession
  };
}
