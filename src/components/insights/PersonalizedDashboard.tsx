
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Target, Clock, Award, BookOpen, DollarSign, Users, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface UserPreference {
  studyField: string;
  targetCity: string;
  budgetRange: string;
  timelinePreference: 'urgent' | 'standard' | 'flexible';
}

interface PersonalizedInsight {
  type: 'recommendation' | 'alert' | 'achievement' | 'trend';
  title: string;
  description: string;
  actionable: boolean;
  priority: 'high' | 'medium' | 'low';
}

const activityData = [
  { date: '2024-01-01', modules: 2, expenses: 45, study: 30 },
  { date: '2024-01-02', modules: 1, expenses: 23, study: 45 },
  { date: '2024-01-03', modules: 3, expenses: 67, study: 60 },
  { date: '2024-01-04', modules: 2, expenses: 34, study: 25 },
  { date: '2024-01-05', modules: 4, expenses: 89, study: 90 },
  { date: '2024-01-06', modules: 1, expenses: 12, study: 15 },
  { date: '2024-01-07', modules: 2, expenses: 56, study: 75 }
];

const goalData = [
  { name: 'Modules Completed', current: 6, target: 10, color: '#8B5CF6' },
  { name: 'Budget Goals Met', current: 8, target: 10, color: '#06B6D4' },
  { name: 'French Lessons', current: 15, target: 20, color: '#10B981' },
  { name: 'Documents Ready', current: 7, target: 8, color: '#F59E0B' }
];

export const PersonalizedDashboard = () => {
  const [userPreferences, setUserPreferences] = useState<UserPreference>({
    studyField: 'Computer Science',
    targetCity: 'Paris',
    budgetRange: '800-1200',
    timelinePreference: 'standard'
  });
  
  const [insights, setInsights] = useState<PersonalizedInsight[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Generate personalized insights based on user data
    const generateInsights = () => {
      const generatedInsights: PersonalizedInsight[] = [
        {
          type: 'recommendation',
          title: 'Complete French Basics',
          description: 'Based on your target city (Paris), completing basic French lessons will help you significantly',
          actionable: true,
          priority: 'high'
        },
        {
          type: 'alert',
          title: 'Budget Alert',
          description: 'You\'re 15% over your food budget this month. Consider meal planning.',
          actionable: true,
          priority: 'medium'
        },
        {
          type: 'achievement',
          title: 'Consistency Champion',
          description: 'You\'ve logged expenses for 7 days straight! Keep up the great work.',
          actionable: false,
          priority: 'low'
        },
        {
          type: 'trend',
          title: 'Study Pattern Insight',
          description: 'You\'re most productive on weekends. Consider scheduling important tasks then.',
          actionable: true,
          priority: 'medium'
        }
      ];
      
      setInsights(generatedInsights);
    };

    generateInsights();
  }, [userPreferences]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'recommendation': return <Target className="h-4 w-4" />;
      case 'alert': return <Clock className="h-4 w-4" />;
      case 'achievement': return <Award className="h-4 w-4" />;
      case 'trend': return <TrendingUp className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'recommendation': return 'bg-blue-50 border-blue-200 text-blue-900';
      case 'alert': return 'bg-red-50 border-red-200 text-red-900';
      case 'achievement': return 'bg-green-50 border-green-200 text-green-900';
      case 'trend': return 'bg-purple-50 border-purple-200 text-purple-900';
      default: return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive">High Priority</Badge>;
      case 'medium': return <Badge variant="default">Medium</Badge>;
      case 'low': return <Badge variant="secondary">Low</Badge>;
      default: return <Badge variant="secondary">Low</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">👋</span>
            Welcome back, {user?.email?.split('@')[0] || 'Student'}!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">85%</div>
              <div className="text-sm text-muted-foreground">Journey Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">6/10</div>
              <div className="text-sm text-muted-foreground">Modules Done</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">€1,050</div>
              <div className="text-sm text-muted-foreground">This Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">15</div>
              <div className="text-sm text-muted-foreground">Study Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Personalized Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold">{insight.title}</h4>
                      <p className="text-sm opacity-80">{insight.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(insight.priority)}
                    {insight.actionable && (
                      <Button size="sm" variant="outline">
                        Take Action
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Tabs */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">Activity Trends</TabsTrigger>
          <TabsTrigger value="goals">Goal Progress</TabsTrigger>
          <TabsTrigger value="recommendations">Smart Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Your Activity This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('en', { weekday: 'short' })} />
                    <YAxis />
                    <Line type="monotone" dataKey="modules" stroke="#8B5CF6" strokeWidth={2} name="Modules" />
                    <Line type="monotone" dataKey="study" stroke="#10B981" strokeWidth={2} name="Study Time" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-purple-600">15</div>
                  <div className="text-sm text-muted-foreground">Modules This Week</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-green-600">340 min</div>
                  <div className="text-sm text-muted-foreground">Study Time</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-blue-600">€326</div>
                  <div className="text-sm text-muted-foreground">Expenses Logged</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Goal Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {goalData.map((goal, index) => {
                  const progress = (goal.current / goal.target) * 100;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{goal.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {goal.current} / {goal.target}
                        </span>
                      </div>
                      <Progress value={progress} className="w-full" />
                      <div className="flex justify-between items-center text-sm">
                        <span className={progress >= 100 ? 'text-green-600' : 'text-muted-foreground'}>
                          {Math.round(progress)}% complete
                        </span>
                        {progress >= 100 && (
                          <Badge className="bg-green-100 text-green-800">
                            <Award className="h-3 w-3 mr-1" />
                            Completed!
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Study Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Focus on French Conversation</h4>
                    <p className="text-sm text-blue-700">Since you're targeting Paris, prioritize conversational French over grammar.</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900">CS-Specific Vocabulary</h4>
                    <p className="text-sm text-green-700">Learn French technical terms for Computer Science to excel in your program.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-900">Optimize Food Spending</h4>
                    <p className="text-sm text-yellow-700">You could save €50/month by cooking at home 3 more times per week.</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900">Student Discounts</h4>
                    <p className="text-sm text-purple-700">You're missing out on 25% transport discounts. Apply for student cards!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
