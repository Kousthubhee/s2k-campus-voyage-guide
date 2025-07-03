
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar, MapPin, Edit, Award, Trophy, Target, CheckCircle2 } from 'lucide-react';
import { ProfileEditDialog } from '@/components/ProfileEditDialog';

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@email.com',
    about: 'International student from Canada studying Business Administration at HEC Paris. Passionate about sustainable business practices and French culture.',
    memberSince: 'September 2024',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b88f04b1?w=150&h=150&fit=crop&crop=face',
    age: '22',
    prevEducation: 'Bachelor of Commerce, University of Toronto',
    workExperience: 'Marketing Intern at Tech Startup (2023)'
  });

  const achievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Completed your first pre-arrival module',
      icon: '🎯',
      earnedAt: '2024-09-15',
      points: 50,
      category: 'milestone'
    },
    {
      id: '2',
      title: 'Document Master',
      description: 'Successfully organized all required documents',
      icon: '📋',
      earnedAt: '2024-09-20',
      points: 100,
      category: 'organization'
    },
    {
      id: '3',
      title: 'Banking Pro',
      description: 'Opened your first French bank account',
      icon: '🏦',
      earnedAt: '2024-10-01',
      points: 75,
      category: 'financial'
    },
    {
      id: '4',
      title: 'Community Helper',
      description: 'Helped 5 other students in the hub',
      icon: '🤝',
      earnedAt: '2024-10-10',
      points: 125,
      category: 'community'
    },
    {
      id: '5',
      title: 'Language Enthusiast',
      description: 'Completed 10 French lessons',
      icon: '🗣️',
      earnedAt: '2024-10-15',
      points: 150,
      category: 'language'
    }
  ];

  const stats = [
    { label: 'Modules Completed', value: '8/12', color: 'bg-blue-500' },
    { label: 'Documents Organized', value: '15', color: 'bg-green-500' },
    { label: 'Hub Contributions', value: '23', color: 'bg-purple-500' },
    { label: 'French Lessons', value: '45', color: 'bg-orange-500' }
  ];

  const recentActivity = [
    { action: 'Completed Post-Arrival Module', time: '2 hours ago', icon: CheckCircle2 },
    { action: 'Uploaded Residence Permit', time: '1 day ago', icon: User },
    { action: 'Helped student with CAF application', time: '2 days ago', icon: Trophy },
    { action: 'Completed French Lesson: Greetings', time: '3 days ago', icon: Award }
  ];

  const handleSaveProfile = (updatedProfile: typeof profile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  const totalPoints = achievements.reduce((sum, achievement) => sum + achievement.points, 0);
  const completedModules = 8;
  const totalModules = 12;
  const progressPercentage = (completedModules / totalModules) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
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
                  <span className="text-sm">Paris, France</span>
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
        {/* Left Column - Stats and Progress */}
        <div className="space-y-6">
          {/* Progress Overview */}
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

          {/* Recent Activity */}
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

        {/* Right Column - Achievements */}
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

              {/* Achievement Categories */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-center">Achievement Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { name: 'Milestone', icon: '🎯', count: 1 },
                    { name: 'Organization', icon: '📋', count: 1 },
                    { name: 'Financial', icon: '🏦', count: 1 },
                    { name: 'Community', icon: '🤝', count: 1 },
                    { name: 'Language', icon: '🗣️', count: 1 }
                  ].map((category, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl mb-1">{category.icon}</div>
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      <div className="text-xs text-gray-600">{category.count} earned</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Profile Edit Dialog */}
      <ProfileEditDialog
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
};
