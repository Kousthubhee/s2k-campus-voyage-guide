
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
      console.log('Fetching profile for user:', userId);
      
      // Try to get from hub_user_profiles table first
      const { data: hubProfileData, error: hubError } = await supabase
        .from('hub_user_profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (hubProfileData && !hubError) {
        console.log('Found hub profile:', hubProfileData);
        setProfiles(prev => ({ ...prev, [userId]: hubProfileData }));
        return hubProfileData;
      }

      // Fallback: try to get from profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('name, email')
        .eq('id', userId)
        .maybeSingle();

      if (profileData && !profileError) {
        console.log('Found profile data:', profileData);
        
        // Create a hub profile entry
        const hubProfile = {
          user_id: userId,
          display_name: profileData.name || profileData.email || 'User'
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('hub_user_profiles')
          .insert(hubProfile)
          .select()
          .maybeSingle();

        if (createdProfile && !createError) {
          console.log('Created new hub profile:', createdProfile);
          setProfiles(prev => ({ ...prev, [userId]: createdProfile }));
          return createdProfile;
        }
      }

      // Last resort fallback
      const fallbackProfile: HubUserProfile = {
        id: userId,
        user_id: userId,
        display_name: 'User',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      console.log('Using fallback profile for user:', userId);
      setProfiles(prev => ({ ...prev, [userId]: fallbackProfile }));
      return fallbackProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      
      const fallbackProfile: HubUserProfile = {
        id: userId,
        user_id: userId,
        display_name: 'User',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setProfiles(prev => ({ ...prev, [userId]: fallbackProfile }));
      return fallbackProfile;
    }
  };

  const ensureCurrentUserProfile = async () => {
    if (!user) return;

    try {
      console.log('Ensuring profile for current user:', user.id);
      
      // Check if hub profile exists
      const { data: existingProfile } = await supabase
        .from('hub_user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!existingProfile) {
        console.log('No hub profile found, creating one...');
        
        // Get profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('name, email')
          .eq('id', user.id)
          .maybeSingle();

        // Create hub profile
        const { data: newProfile, error } = await supabase
          .from('hub_user_profiles')
          .insert({
            user_id: user.id,
            display_name: profile?.name || profile?.email || user.email || 'User'
          })
          .select()
          .maybeSingle();

        if (newProfile && !error) {
          console.log('Created hub profile for current user:', newProfile);
          setProfiles(prev => ({ ...prev, [user.id]: newProfile }));
        }
      } else {
        console.log('Hub profile already exists:', existingProfile);
        setProfiles(prev => ({ ...prev, [user.id]: existingProfile }));
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
