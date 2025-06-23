
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { AchievementsSection } from './AchievementsSection';
import { PageTitle } from './PageTitle';

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
  // If user is not logged in, show a message
  if (!userProfile) {
    return (
      <div className="max-w-xl mx-auto mt-10 mb-10">
        <Card className="w-full shadow-lg rounded-xl animate-fade-in">
          <CardContent className="p-8 flex flex-col items-center">
            <PageTitle className="mb-4">Profile</PageTitle>
            <p className="text-gray-600 text-center mb-6">
              Please log in to view and edit your profile.
            </p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Achievements section
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
          <PageTitle className="mb-1">{userProfile.name}</PageTitle>
          <div className="text-sm text-gray-500 font-calibri">{userProfile.email}</div>
          
          <div className="flex flex-wrap gap-4 mt-6 w-full justify-center">
            <div className="text-sm bg-blue-50 px-3 py-1 rounded-full text-blue-800 border border-blue-200">
              Age: {userProfile.age}
            </div>
            <div className="text-sm bg-green-50 px-3 py-1 rounded-full text-green-800 border border-green-200">
              Nationality: {userProfile.nationality}
            </div>
            <div className="text-sm bg-purple-50 px-3 py-1 rounded-full text-purple-700 border border-purple-200">
              Education: {userProfile.educationLevel}
            </div>
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
        </CardContent>
      </Card>

      <div className="mt-9 animate-fade-in">
        <div className="mb-4 text-xl font-bold text-gray-900 font-calibri">Achievements</div>
        <AchievementsSection achievements={achievements} />
      </div>
    </div>
  );
};
