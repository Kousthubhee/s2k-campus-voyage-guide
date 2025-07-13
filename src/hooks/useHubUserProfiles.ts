
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
      // Use raw SQL query since types aren't updated yet
      const { data, error } = await supabase
        .rpc('get_hub_user_profile', { user_id_param: userId });

      if (error) {
        console.error('Error fetching user profile:', error);
        
        // Fallback: try to get from profiles table
        const { data: profileData } = await supabase
          .from('profiles')
          .select('name, email')
          .eq('id', userId)
          .single();

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
      }

      if (data && data.length > 0) {
        const profileData = data[0] as HubUserProfile;
        setProfiles(prev => ({ ...prev, [userId]: profileData }));
        return profileData;
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
      // Check if hub profile exists using raw query
      const { data: existingProfile } = await supabase
        .rpc('get_hub_user_profile', { user_id_param: user.id });

      if (!existingProfile || existingProfile.length === 0) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name, email')
          .eq('id', user.id)
          .single();

        // Create hub profile using raw SQL
        await supabase.rpc('create_hub_user_profile', {
          user_id_param: user.id,
          display_name_param: profile?.name || profile?.email || 'Anonymous User'
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
