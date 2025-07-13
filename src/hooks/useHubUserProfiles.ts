
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface HubUserProfile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export const useHubUserProfiles = () => {
  const [profiles, setProfiles] = useState<Record<string, HubUserProfile>>({});
  const { user } = useAuth();

  const getProfile = async (userId: string): Promise<HubUserProfile | null> => {
    if (profiles[userId]) {
      return profiles[userId];
    }

    try {
      // Try to get from hub_user_profiles table first
      const { data: hubProfileData, error: hubError } = await supabase
        .from('hub_user_profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (hubProfileData && !hubError) {
        setProfiles(prev => ({ ...prev, [userId]: hubProfileData }));
        return hubProfileData;
      }

      // Fallback: try to get from profiles table
      const { data: profileData } = await supabase
        .from('profiles')
        .select('name, email')
        .eq('id', userId)
        .maybeSingle();

      if (profileData) {
        const fallbackProfile: HubUserProfile = {
          id: userId,
          user_id: userId,
          display_name: profileData.name || profileData.email || 'Anonymous User',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        setProfiles(prev => ({ ...prev, [userId]: fallbackProfile }));
        return fallbackProfile;
      }

      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  const ensureCurrentUserProfile = async () => {
    if (!user) return;

    try {
      // Check if hub profile exists
      const { data: existingProfile } = await supabase
        .from('hub_user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!existingProfile) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name, email')
          .eq('id', user.id)
          .maybeSingle();

        // Create hub profile
        const { data: newProfile } = await supabase
          .from('hub_user_profiles')
          .insert({
            user_id: user.id,
            display_name: profile?.name || profile?.email || 'Anonymous User'
          })
          .select()
          .single();

        if (newProfile) {
          setProfiles(prev => ({ ...prev, [user.id]: newProfile }));
        }
      }
    } catch (error) {
      console.error('Error ensuring user profile:', error);
    }
  };

  useEffect(() => {
    if (user) {
      ensureCurrentUserProfile();
    }
  }, [user]);

  return {
    profiles,
    getProfile,
    ensureCurrentUserProfile
  };
};
