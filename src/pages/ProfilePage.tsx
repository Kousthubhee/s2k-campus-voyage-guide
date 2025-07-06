import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar, MapPin, Edit, Award, Trophy, Target, CheckCircle2, LogIn } from 'lucide-react';
import { ProfileEditDialog } from '@/components/ProfileEditDialog';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface ProfilePageProps {
  userProfile: {
    id: string;
    name: string;
    email: string;
    about: string;
    memberSince: string;
    photo: string;
    age: string;
    prevEducation: string;
    workExperience: string;
  } | null;
  setUserProfile: (profile: any) => void;
}

export const ProfilePage = ({ userProfile, setUserProfile }: ProfilePageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    const loadProfileData = async () => {
      if (!user?.email) return;
      
      try {
        const { data: fetchedProfile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', user.email)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        if (fetchedProfile) {
          const profileData = {
            id: fetchedProfile.id,
            name: fetchedProfile.name || user.email,
            email: fetchedProfile.email,
            about: fetchedProfile.about || 'Complete your profile to personalize your experience and get better recommendations.',
            memberSince: fetchedProfile.created_at ? new Date(fetchedProfile.created_at).toLocaleDateString() : 'Recently joined',
            photo: fetchedProfile.photo_url || '',
            age: fetchedProfile.age || 'Not specified',
            prevEducation: fetchedProfile.prev_education || 'Add your education background',
            workExperience: fetchedProfile.work_experience || 'Add your work experience'
          };
          
          setUserProfile(profileData);
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
      }
    };

    loadProfileData();
  }, [user, setUserProfile]);
  
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="text-center py-12">
          <CardContent>
            <LogIn className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Hello, Stranger! 👋
            </h2>
            <p className="text-gray-600 mb-6">
              Please sign in to view and manage your profile, track your progress, and unlock all features.
            </p>
            <Button onClick={() => window.location.href = '/auth'}>
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const profile = userProfile || {
    id: user.id || '',
    name: user.email || 'New User',
    email: user.email || 'user@example.com',
    about: 'Complete your profile to personalize your experience and get better recommendations.',
    memberSince: 'Recently joined',
    photo: '',
    age: 'Not specified',
    prevEducation: 'Add your education background',
    workExperience: 'Add your work experience'
  };

  const achievements = [
    {
      id: '1',
      title: 'Getting Started',
      description: 'Welcome to pasS2Kampus! Complete your profile to unlock more features.',
      icon: '🎯',
      earnedAt: new Date().toISOString().split('T')[0],
      points: 25,
      category: 'milestone'
    }
  ];

  const stats = [
    { label: 'Modules Completed', value: '0/12', color: 'bg-blue-500' },
    { label: 'Documents Organized', value: '0', color: 'bg-green-500' },
    { label: 'Hub Contributions', value: '0', color: 'bg-purple-500' },
    { label: 'French Lessons', value: '0', color: 'bg-orange-500' }
  ];

  const recentActivity = [
    { action: 'Joined pasS2Kampus', time: 'Recently', icon: CheckCircle2 },
    { action: 'Complete your profile next!', time: 'Pending', icon: User }
  ];

  const handleSave = async (updatedProfile: typeof profile) => {
    console.log('📌 handleSave in ProfilePage.tsx triggered');
    console.log('📌 updatedProfile:', updatedProfile);
    console.log('📌 updatedProfile.id:', updatedProfile.id);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          name: updatedProfile.name,
          about: updatedProfile.about,
          age: updatedProfile.age,
          photo_url: updatedProfile.photo,
          prev_education: updatedProfile.prevEducation,
          work_experience: updatedProfile.workExperience
        })
        .eq('id', updatedProfile.id)
        .select();

      console.log('📌 Supabase update response:', { data, error });

      if (error) {
        console.error('❌ Error updating profile:', error);
      } else {
        console.log('✅ Profile updated successfully');
        setUserProfile(updatedProfile);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('❌ Error saving profile:', error);
    }
  };

  const totalPoints = achievements.reduce((sum, achievement) => sum + achievement.points, 0);
  const completedModules = 0;
  const totalModules = 12;
  const progressPercentage = (completedModules / totalModules) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <User className="h-12 w-12 text-gray-500" />
                </div>
              )}
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                  className="self-start sm:self-auto"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{profile.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Member since {profile.memberSince}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">France</span>
                </div>
              </div>
              
              <p className="text-gray-700 mt-3">{profile.about}</p>
              
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <Trophy className="h-3 w-3 mr-1" />
                  {totalPoints} Points
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Target className="h-3 w-3 mr-1" />
                  Level {Math.floor(totalPoints / 200) + 1}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <activity.icon className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements ({achievements.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-gradient-to-r from-white to-gray-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl flex-shrink-0">{achievement.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {achievement.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            +{achievement.points} points
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(achievement.earnedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-4">Welcome to pasS2Kampus! 🎓</h3>
                <p className="text-gray-600 mb-4">
                  Complete modules, organize documents, and engage with the community to earn more achievements and unlock features.
                </p>
                <Button onClick={() => window.location.href = '/checklist'}>
                  Start Your Journey
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ProfileEditDialog
        open={isEditing}
        onOpenChange={setIsEditing}
        profile={profile}
        onSave={handleSave}
      />
    </div>
  );
};
