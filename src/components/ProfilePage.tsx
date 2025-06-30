
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Save, X } from 'lucide-react';
import { AchievementsSection } from './AchievementsSection';
import { PageTitle } from './PageTitle';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const defaultProfilePhoto = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=facearea&w=256&h=256&facepad=3&q=80";

interface UserProfile {
  name: string;
  email: string;
  age: string;
  nationality: string;
  educationLevel: string;
  hasWorkExperience: boolean;
  hasGapYear: boolean;
  gapYearDuration: number;
  targetCity: string;
  targetProgram: string;
  hasHealthIssues: boolean;
  isMarried: boolean;
  hasChildren: boolean;
  about: string;
  memberSince: string;
  photo: string;
  prevEducation: string;
  workExperience: string;
}

interface ProfilePageProps {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
}

export const ProfilePage = ({ userProfile, setUserProfile }: ProfilePageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<UserProfile>>({});
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user && !userProfile) {
      // Load profile from database
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        const profile: UserProfile = {
          name: data.name || user.email || '',
          email: data.email || user.email || '',
          age: data.age || '',
          nationality: data.nationality || '',
          educationLevel: data.education_level || '',
          hasWorkExperience: data.has_work_experience || false,
          hasGapYear: data.has_gap_year || false,
          gapYearDuration: data.gap_year_duration || 0,
          targetCity: data.target_city || '',
          targetProgram: data.target_program || '',
          hasHealthIssues: data.has_health_issues || false,
          isMarried: data.is_married || false,
          hasChildren: data.has_children || false,
          about: data.about || '',
          memberSince: new Date(data.created_at).toLocaleDateString(),
          photo: data.photo_url || defaultProfilePhoto,
          prevEducation: '',
          workExperience: ''
        };
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleSaveProfile = async () => {
    if (!user || !editData) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: editData.name,
          age: editData.age,
          nationality: editData.nationality,
          education_level: editData.educationLevel,
          target_city: editData.targetCity,
          target_program: editData.targetProgram,
          about: editData.about,
          has_work_experience: editData.hasWorkExperience,
          has_gap_year: editData.hasGapYear,
          gap_year_duration: editData.gapYearDuration,
          has_health_issues: editData.hasHealthIssues,
          is_married: editData.isMarried,
          has_children: editData.hasChildren
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update local state
      if (userProfile) {
        setUserProfile({ ...userProfile, ...editData });
      }
      
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const startEditing = () => {
    if (userProfile) {
      setEditData(userProfile);
    }
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditData({});
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-10 mb-10">
        <Card className="w-full shadow-lg rounded-xl animate-fade-in">
          <CardContent className="p-8 flex flex-col items-center">
            <PageTitle className="mb-4">Profile</PageTitle>
            <p className="text-gray-600 text-center mb-6">
              Please log in to view and edit your profile.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="max-w-xl mx-auto mt-10 mb-10">
        <Card className="w-full shadow-lg rounded-xl animate-fade-in">
          <CardContent className="p-8 flex flex-col items-center">
            <PageTitle className="mb-4">Loading Profile...</PageTitle>
          </CardContent>
        </Card>
      </div>
    );
  }

  const achievements = [
    { title: 'First Steps', description: 'Completed your first module', icon: '🎯', earned: true },
    { title: 'Key Collector', description: 'Earned 5 keys', icon: '🗝️', earned: false },
    { title: 'French Speaker', description: 'Completed 10 language lessons', icon: '🇫🇷', earned: false },
    { title: 'Community Helper', description: 'Helped 5 fellow students', icon: '🤝', earned: false }
  ];

  return (
    <div className="max-w-xl mx-auto mt-10 mb-10">
      <Card className="w-full shadow-lg rounded-xl animate-fade-in">
        <CardContent className="p-8 flex flex-col items-center">
          <img
            src={userProfile.photo || defaultProfilePhoto}
            className="w-28 h-28 rounded-full object-cover border-2 border-blue-400 mb-6 shadow-md"
            alt="Profile"
          />
          
          <div className="flex items-center justify-between w-full mb-4">
            <PageTitle className="mb-1">Hello, {userProfile.name}!</PageTitle>
            {!isEditing ? (
              <Button onClick={startEditing} variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSaveProfile} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={cancelEditing} variant="outline" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-500 font-calibri mb-6">{userProfile.email}</div>
          
          {isEditing ? (
            <div className="w-full space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editData.name || ''}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  value={editData.age || ''}
                  onChange={(e) => setEditData({...editData, age: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={editData.nationality || ''}
                  onChange={(e) => setEditData({...editData, nationality: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="targetCity">Target City</Label>
                <Input
                  id="targetCity"
                  value={editData.targetCity || ''}
                  onChange={(e) => setEditData({...editData, targetCity: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="targetProgram">Target Program</Label>
                <Input
                  id="targetProgram"
                  value={editData.targetProgram || ''}
                  onChange={(e) => setEditData({...editData, targetProgram: e.target.value})}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 mt-6 w-full justify-center">
              {userProfile.age && (
                <div className="text-sm bg-blue-50 px-3 py-1 rounded-full text-blue-800 border border-blue-200">
                  Age: {userProfile.age}
                </div>
              )}
              {userProfile.nationality && (
                <div className="text-sm bg-green-50 px-3 py-1 rounded-full text-green-800 border border-green-200">
                  Nationality: {userProfile.nationality}
                </div>
              )}
              {userProfile.educationLevel && (
                <div className="text-sm bg-purple-50 px-3 py-1 rounded-full text-purple-700 border border-purple-200">
                  Education: {userProfile.educationLevel}
                </div>
              )}
              {userProfile.targetCity && (
                <div className="text-sm bg-cyan-50 px-3 py-1 rounded-full text-cyan-800 border border-cyan-200">
                  Target City: {userProfile.targetCity}
                </div>
              )}
              {userProfile.targetProgram && (
                <div className="text-sm bg-orange-50 px-3 py-1 rounded-full text-orange-800 border border-orange-200">
                  Target Program: {userProfile.targetProgram}
                </div>
              )}
              {userProfile.hasWorkExperience && (
                <div className="text-sm bg-yellow-50 px-3 py-1 rounded-full text-yellow-800 border border-yellow-200">
                  Has Work Experience
                </div>
              )}
              {userProfile.hasGapYear && (
                <div className="text-sm bg-red-50 px-3 py-1 rounded-full text-red-800 border border-red-200">
                  Gap Year: {userProfile.gapYearDuration} months
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-9 animate-fade-in">
        <div className="mb-4 text-xl font-bold text-gray-900 font-calibri">Achievements</div>
        <AchievementsSection achievements={achievements} />
      </div>
    </div>
  );
};
