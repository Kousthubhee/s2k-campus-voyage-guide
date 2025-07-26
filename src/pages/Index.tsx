import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IndexProps {
  onNavigate: (page: string) => void;
}

const Index = ({ onNavigate }: IndexProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const modules = [
    {
      id: 'checklist',
      title: 'Study Abroad Checklist',
      description: 'Step-by-step guide to prepare for your journey',
      icon: '✅',
      color: 'from-green-500 to-blue-500',
      onClick: () => onNavigate('checklist')
    },
    {
      id: 'finance',
      title: 'Finance Tracking',
      description: 'Manage your budget, track expenses, and get insights',
      icon: '💰',
      color: 'from-yellow-500 to-orange-500',
      onClick: () => onNavigate('finance')
    },
    {
      id: 'language',
      title: 'Language Learning',
      description: 'Learn essential phrases and improve your skills',
      icon: '🗣️',
      color: 'from-red-500 to-purple-500',
      onClick: () => onNavigate('language')
    },
    {
      id: 'housing',
      title: 'Find Housing',
      description: 'Find housing for students',
      icon: '🏠',
      color: 'from-blue-500 to-purple-500',
      onClick: () => onNavigate('housing')
    },
    {
      id: 'insights',
      title: 'Personal Insights',
      description: 'AI-powered analytics and personalized recommendations',
      icon: '📊',
      color: 'from-purple-500 to-pink-500',
      onClick: () => onNavigate('insights')
    }
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome, {user?.email}!
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Explore the modules below to get started.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user?.email}`} />
            <AvatarFallback>
              {user?.email?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" onClick={() => signOut()}>
            Logout
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {modules.map((module) => (
          <Card
            key={module.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                {module.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {module.description}
              </p>
              <Button
                className={`w-full ${module.color}`}
                onClick={module.onClick}
              >
                {module.icon} Go to {module.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
