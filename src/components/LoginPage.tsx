
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Mail, Calendar, MapPin, GraduationCap, Briefcase } from 'lucide-react';

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

interface LoginPageProps {
  onLogin: (profile: UserProfile) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    age: '18',
    nationality: '',
    educationLevel: '',
    hasWorkExperience: false,
    hasGapYear: false,
    gapYearDuration: 0,
    targetCity: '',
    targetProgram: '',
    hasHealthIssues: false,
    isMarried: false,
    hasChildren: false,
    about: '',
    memberSince: '',
    photo: '',
    prevEducation: '',
    workExperience: ''
  });

  const handleLogin = () => {
    // Simple login without registration
    const defaultProfile: UserProfile = {
      name: 'Student User',
      email: 'student@example.com',
      age: '22',
      nationality: 'Indian',
      educationLevel: 'Bachelor',
      hasWorkExperience: false,
      hasGapYear: false,
      gapYearDuration: 0,
      targetCity: 'Paris',
      targetProgram: 'Masters',
      hasHealthIssues: false,
      isMarried: false,
      hasChildren: false,
      about: '',
      memberSince: new Date().toISOString().split('T')[0],
      photo: '',
      prevEducation: 'Bachelor',
      workExperience: 'No'
    };
    onLogin(defaultProfile);
  };

  const handleRegister = () => {
    if (!profile.name || !profile.email || !profile.nationality || !profile.educationLevel) {
      alert('Please fill in all required fields');
      return;
    }
    
    const completeProfile: UserProfile = {
      ...profile,
      about: profile.about || '',
      memberSince: new Date().toISOString().split('T')[0],
      photo: profile.photo || '',
      prevEducation: profile.prevEducation || profile.educationLevel,
      workExperience: profile.hasWorkExperience ? 'Yes' : 'No'
    };
    
    onLogin(completeProfile);
  };

  const updateProfile = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="text-3xl font-bold mb-2">
            pas<span className="text-cyan-600">S</span>2<span className="text-blue-600">K</span>ampus
          </div>
          <CardTitle className="text-xl">
            {isRegistering ? 'Create Your Profile' : 'Welcome Back'}
          </CardTitle>
          <p className="text-gray-600">
            {isRegistering 
              ? 'Tell us about yourself to get personalized guidance' 
              : 'Your guide to French education'
            }
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!isRegistering ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  className="mt-1"
                />
              </div>
              <Button onClick={handleLogin} className="w-full">
                Sign In
              </Button>
              <div className="text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <Button 
                  variant="link" 
                  onClick={() => setIsRegistering(true)}
                  className="p-0"
                >
                  Create Profile
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input 
                      id="name"
                      value={profile.name}
                      onChange={(e) => updateProfile('name', e.target.value)}
                      placeholder="Your full name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => updateProfile('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input 
                      id="age"
                      type="number"
                      value={profile.age}
                      onChange={(e) => updateProfile('age', e.target.value)}
                      min="16"
                      max="50"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Select value={profile.nationality} onValueChange={(value) => updateProfile('nationality', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Indian">Indian</SelectItem>
                        <SelectItem value="American">American</SelectItem>
                        <SelectItem value="British">British</SelectItem>
                        <SelectItem value="Canadian">Canadian</SelectItem>
                        <SelectItem value="Australian">Australian</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Education & Career */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-green-600" />
                  Education & Career
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="education">Current Education Level *</Label>
                    <Select value={profile.educationLevel} onValueChange={(value) => updateProfile('educationLevel', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High School">High School</SelectItem>
                        <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                        <SelectItem value="Master">Master's Degree</SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="targetProgram">Target Program</Label>
                    <Select value={profile.targetProgram} onValueChange={(value) => updateProfile('targetProgram', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select target program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bachelor">Bachelor's</SelectItem>
                        <SelectItem value="Masters">Master's</SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                        <SelectItem value="Exchange">Exchange Program</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="workExperience"
                      checked={profile.hasWorkExperience}
                      onCheckedChange={(checked) => updateProfile('hasWorkExperience', checked)}
                    />
                    <Label htmlFor="workExperience">I have work experience</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="gapYear"
                      checked={profile.hasGapYear}
                      onCheckedChange={(checked) => updateProfile('hasGapYear', checked)}
                    />
                    <Label htmlFor="gapYear">I have a gap year in my education</Label>
                  </div>
                  
                  {profile.hasGapYear && (
                    <div className="ml-6">
                      <Label htmlFor="gapDuration">Gap duration (months)</Label>
                      <Input 
                        id="gapDuration"
                        type="number"
                        value={profile.gapYearDuration}
                        onChange={(e) => updateProfile('gapYearDuration', parseInt(e.target.value))}
                        min="1"
                        max="60"
                        className="mt-1 w-32"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Study Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-purple-600" />
                  Study Preferences
                </h3>
                
                <div>
                  <Label htmlFor="targetCity">Preferred City</Label>
                  <Select value={profile.targetCity} onValueChange={(value) => updateProfile('targetCity', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select preferred city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paris">Paris</SelectItem>
                      <SelectItem value="Lyon">Lyon</SelectItem>
                      <SelectItem value="Toulouse">Toulouse</SelectItem>
                      <SelectItem value="Marseille">Marseille</SelectItem>
                      <SelectItem value="Nice">Nice</SelectItem>
                      <SelectItem value="Bordeaux">Bordeaux</SelectItem>
                      <SelectItem value="Strasbourg">Strasbourg</SelectItem>
                      <SelectItem value="Lille">Lille</SelectItem>
                      <SelectItem value="Nantes">Nantes</SelectItem>
                      <SelectItem value="Rouen">Rouen</SelectItem>
                      <SelectItem value="Reims">Reims</SelectItem>
                      <SelectItem value="Grenoble">Grenoble</SelectItem>
                      <SelectItem value="Montpellier">Montpellier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="healthIssues"
                      checked={profile.hasHealthIssues}
                      onCheckedChange={(checked) => updateProfile('hasHealthIssues', checked)}
                    />
                    <Label htmlFor="healthIssues">I have health conditions requiring medical documentation</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="married"
                      checked={profile.isMarried}
                      onCheckedChange={(checked) => updateProfile('isMarried', checked)}
                    />
                    <Label htmlFor="married">I am married</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="children"
                      checked={profile.hasChildren}
                      onCheckedChange={(checked) => updateProfile('hasChildren', checked)}
                    />
                    <Label htmlFor="children">I have children</Label>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsRegistering(false)}
                  className="flex-1"
                >
                  Back to Login
                </Button>
                <Button onClick={handleRegister} className="flex-1">
                  Create Profile & Continue
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
