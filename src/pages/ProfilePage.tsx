
import { useState } from 'react';
import { User, Mail, MapPin, Calendar, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ProfileData {
  name: string;
  email: string;
  location: string;
  university: string;
  program: string;
  yearOfStudy: string;
}

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Kousthubhee Krishna',
    email: 'kousthubheekrishna@gmail.com',
    location: 'Rouen, France',
    university: 'NEOMA Business School',
    program: 'Master in Management',
    yearOfStudy: '2024-2025'
  });

  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your personal information and preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="s2k-gradient p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{profileData.name}</h2>
                <p className="opacity-90">{profileData.program}</p>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="secondary"
              size="sm"
            >
              <Edit size={16} className="mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              {isEditing ? (
                <Input
                  value={profileData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              ) : (
                <p className="text-gray-800 font-medium">{profileData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              {isEditing ? (
                <Input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              ) : (
                <p className="text-gray-800 font-medium">{profileData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Location
              </label>
              {isEditing ? (
                <Input
                  value={profileData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                />
              ) : (
                <p className="text-gray-800 font-medium">{profileData.location}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                University
              </label>
              {isEditing ? (
                <Input
                  value={profileData.university}
                  onChange={(e) => handleChange('university', e.target.value)}
                />
              ) : (
                <p className="text-gray-800 font-medium">{profileData.university}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Program
              </label>
              {isEditing ? (
                <Input
                  value={profileData.program}
                  onChange={(e) => handleChange('program', e.target.value)}
                />
              ) : (
                <p className="text-gray-800 font-medium">{profileData.program}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Year
              </label>
              {isEditing ? (
                <Input
                  value={profileData.yearOfStudy}
                  onChange={(e) => handleChange('yearOfStudy', e.target.value)}
                />
              ) : (
                <p className="text-gray-800 font-medium">{profileData.yearOfStudy}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex gap-3">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save size={16} className="mr-2" />
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X size={16} className="mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Additional Profile Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
          <p className="text-gray-600">Modules Completed</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">7</div>
          <p className="text-gray-600">Keys Available</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
          <p className="text-gray-600">Days Active</p>
        </div>
      </div>
    </div>
  );
}
