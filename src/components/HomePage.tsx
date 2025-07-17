
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Clock, Globe, GraduationCap, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  onGetStarted: () => void;
  onPageNavigation: (page: string) => void;
}

export const HomePage = ({ onGetStarted, onPageNavigation }: HomePageProps) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/checklist');
  };

  const handleNavigation = (page: string) => {
    navigate(`/${page}`);
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Welcome to pas<span className="text-cyan-600">S</span>2<span className="text-blue-600">K</span>ampus
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Your complete guide to studying in France. Track your progress, get expert advice, 
          and connect with fellow students on your journey to French education.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => handleNavigation('school-insights')}
            className="px-8"
          >
            Explore Schools
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigation('checklist')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Interactive Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Step-by-step guidance through your study abroad journey with progress tracking
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigation('qa')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-blue-500" />
              AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Get instant answers to your questions about studying in France
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigation('hub')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-purple-500" />
              Community Hub
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Connect with fellow students and share experiences
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigation('documents')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-orange-500" />
              Document Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Keep track of important documents and renewal dates
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigation('language')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-cyan-500" />
              Language Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Resources and tools to improve your French language skills
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigation('finance-tracking')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-6 w-6 text-green-600">💰</div>
              Finance Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Manage your finances and track expenses as a student in France
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Section */}
      <Card className="mb-16">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Join Thousands of Students</CardTitle>
          <CardDescription>
            Students from around the world are using pasS2Kampus to achieve their French education dreams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-muted-foreground">Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-muted-foreground">Partner Schools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="text-center bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardContent className="pt-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of students who have successfully navigated their path to French education
          </p>
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
          >
            Start Your Checklist
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
