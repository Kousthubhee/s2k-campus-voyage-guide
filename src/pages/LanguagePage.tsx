
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { FrenchLearningModule } from '@/components/learning/FrenchLearningModule';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LanguagePageProps {
  onBack: () => void;
  onComplete?: () => void;
  isCompleted?: boolean;
}

export const LanguagePage = ({ onBack, onComplete, isCompleted = false }: LanguagePageProps) => {
  const [selectedTab, setSelectedTab] = useState('french');

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            🇫🇷 Learn French
          </h1>
          <p className="text-lg text-muted-foreground">
            Master essential French phrases for your life in France
          </p>
          {isCompleted && (
            <div className="mt-4 bg-green-50 dark:bg-green-950 p-3 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                <span className="text-green-800 dark:text-green-200 font-medium">
                  Module Completed! You earned a key 🗝️
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="french">French Lessons</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="french" className="space-y-6 mt-6">
          <FrenchLearningModule />
        </TabsContent>

        <TabsContent value="practice" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>🎯 Practice Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Interactive practice exercises coming soon! For now, focus on the core lessons in the French Lessons tab.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>📚 Additional Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">🎧 Language Learning Apps</h4>
                  <p className="text-sm text-muted-foreground">
                    Complement your studies with Duolingo, Babbel, or Busuu for additional practice.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-2">🗣️ Language Exchange</h4>
                  <p className="text-sm text-muted-foreground">
                    Find conversation partners through HelloTalk, Tandem, or local university language exchange programs.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-2">📺 French Media</h4>
                  <p className="text-sm text-muted-foreground">
                    Watch French Netflix shows with subtitles, listen to French podcasts, or read French news websites.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
