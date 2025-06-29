
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface UserProfile {
  id?: string;
  name: string;
  email: string;
  age?: string;
  nationality?: string;
  education_level?: string;
  target_city?: string;
  target_program?: string;
  has_work_experience?: boolean;
  has_gap_year?: boolean;
  gap_year_duration?: number;
  has_health_issues?: boolean;
  is_married?: boolean;
  has_children?: boolean;
  about?: string;
  photo_url?: string;
}

export function useSupabaseProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    const updatedProfile = { ...profile, ...updates };
    setProfile(updatedProfile);

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return { profile, updateProfile, loading };
}
