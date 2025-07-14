import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ProfileEditDialog } from '@/components/ProfileEditDialog';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { MapPin, Calendar, User, Edit, BookOpen, Briefcase, Globe } from 'lucide-react';

interface ProfileType {
  id: string;
  name: string;
  email: string;
  about: string;
  memberSince: string;
  photo: string;
  age: string;
  prevEducation: string;
  workExperience: string;
  nationality?: string;
  education_level?: string;
  target_city?: string;
  target_program?: string;
}

const defaultProfilePhoto = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=facearea&w=256&h=256&facepad=3&q=80";

export function ProfilePage() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { profile, loading, updateProfile } = useProfile();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile</h1>
          <p className="text-lg text-gray-600 mb-8">
            Please sign in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  const profileData: ProfileType = {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    about: profile.about || 'Complete your profile to get personalized recommendations.',
    memberSince: new Date(profile.created_at || Date.now()).toLocaleDateString(),
    photo: profile.photo_url || defaultProfilePhoto,
    age: profile.age || '',
    prevEducation: profile.prev_education || '',
    workExperience: profile.work_experience || '',
    nationality: profile.nationality || '',
    education_level: profile.education_level || '',
    target_city: profile.target_city || '',
    target_program: profile.target_program || '',
  };

  const handleSaveProfile = async (updatedProfile: ProfileType) => {
    console.log("📌 ProfilePage handleSaveProfile called with:", updatedProfile);
    
    const profileUpdates = {
      name: updatedProfile.name,
      about: updatedProfile.about,
      age: updatedProfile.age,
      prev_education: updatedProfile.prevEducation,
      work_experience: updatedProfile.workExperience,
      photo_url: updatedProfile.photo,
      nationality: updatedProfile.nationality,
      education_level: updatedProfile.education_level,
      target_city: updatedProfile.target_city,
      target_program: updatedProfile.target_program,
    };

    console.log("📌 Sending updates to database:", profileUpdates);
    
    const success = await updateProfile(profileUpdates);
    if (success) {
      console.log("📌 Profile updated successfully");
      setIsEditOpen(false);
    } else {
      console.log("📌 Profile update failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <User className="mr-2 h-5 w-5" />
            Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profileData.photo} alt={profileData.name} />
              <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{profileData.name}</h2>
              <p className="text-sm text-gray-500">{profileData.email}</p>
              <Badge variant="secondary">
                <Calendar className="mr-1 h-3 w-3" />
                Member since {profileData.memberSince}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Location: Not specified</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Education: {profileData.prevEducation || 'Not specified'}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Work: {profileData.workExperience || 'Not specified'}</span>
            </div>
            <div className="flex items-center">
              <Globe className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Nationality: {profileData.nationality || 'Not specified'}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-md font-semibold">About</h3>
            <p className="text-sm text-gray-800">{profileData.about}</p>
          </div>

          <Button onClick={() => setIsEditOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      <ProfileEditDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        profile={profileData}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
