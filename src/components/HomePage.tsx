import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLocalStorageProgress } from '@/hooks/useLocalStorageProgress';
import { ArrowRight, BookOpen, Users, FileText, Calculator, School, MapPin, MessageCircle, Bell, Globe, Sparkles, Target, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const HomePage = () => {
  const navigate = useNavigate();
  const [progress, updateProgress] = useLocalStorageProgress();
  const [isStarting, setIsStarting] = useState(false);

  const hasStartedJourney = progress?.unlocked_modules?.includes('pre-arrival-1') || false;

  const handleGetStarted = async () => {
    setIsStarting(true);
    
    // Unlock the initial modules
    const updatedProgress = {
      ...progress,
      unlocked_modules: ['school', 'pre-arrival-1', 'pre-arrival-2', 'post-arrival', 'documents', 'finance', 'hub', 'qa', 'translate', 'news', 'notifications', 'profile'],
      current_page: 'school-insights'
    };
    
    await updateProgress(updatedProgress);
    
    setTimeout(() => {
      setIsStarting(false);
      navigate('/school-insights');
    }, 1500);
  };

  const features = [
    {
      icon: School,
      title: "School Insights",
      description: "Discover and compare French universities and programs",
      color: "bg-blue-500"
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Track and manage all your important documents",
      color: "bg-green-500"
    },
    {
      icon: Users,
      title: "Community Hub",
      description: "Connect with fellow students and share experiences",
      color: "bg-purple-500"
    },
    {
      icon: Calculator,
      title: "Finance Tracking",
      description: "Monitor your expenses and budget effectively",
      color: "bg-orange-500"
    },
    {
      icon: MessageCircle,
      title: "AI Assistant",
      description: "Get instant answers to your study abroad questions",
      color: "bg-pink-500"
    },
    {
      icon: Globe,
      title: "Language Tools",
      description: "Translation and language learning resources",
      color: "bg-indigo-500"
    }
  ];

  const stats = [
    { label: "Universities", value: "500+", icon: School },
    { label: "Students Helped", value: "10,000+", icon: Users },
    { label: "Success Rate", value: "95%", icon: Target },
    { label: "Countries", value: "50+", icon: Globe }
  ];

  if (hasStartedJourney) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <h1 className="text-4xl font-bold text-gray-900">Welcome Back!</h1>
          </div>
          <p className="text-xl text-gray-600">Continue your journey to studying in France</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-3", feature.color)}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => navigate('/school-insights')} 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Continue Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Sparkles className="h-4 w-4 mr-1" />
            Your Complete Study Abroad Guide
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Gateway to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}French Education
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Navigate your journey to studying in France with our comprehensive platform. 
            From university selection to document management, we've got you covered.
          </p>
          
          <Button 
            onClick={handleGetStarted}
            disabled={isStarting}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 h-auto"
          >
            {isStarting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Starting Your Journey...
              </>
            ) : (
              <>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform", feature.color)}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
