
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
      const { data, error } = await supabase
        .from('hub_user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      setProfiles(prev => ({ ...prev, [userId]: data }));
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  const ensureCurrentUserProfile = async () => {
    if (!user) return;

    try {
      const { data: existingProfile } = await supabase
        .from('hub_user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!existingProfile) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name, email')
          .eq('id', user.id)
          .single();

        await supabase
          .from('hub_user_profiles')
          .insert({
            user_id: user.id,
            display_name: profile?.name || profile?.email || 'Anonymous User'
          });
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
