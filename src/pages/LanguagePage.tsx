
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FrenchLearningModule } from '@/components/learning/FrenchLearningModule';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LanguagePageProps {
  onBack: () => void;
}

export const LanguagePage = ({ onBack }: LanguagePageProps) => {
  const [selectedTab, setSelectedTab] = useState('french');

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            🗣️ Language Learning Center
          </h1>
          <p className="text-lg text-muted-foreground">
            Master essential language skills for your study abroad journey
          </p>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="french">French Learning</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="french" className="space-y-6 mt-6">
          <FrenchLearningModule />
        </TabsContent>

        <TabsContent value="practice" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon: Interactive Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Interactive language practice exercises will be available here soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon: Language Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Additional language learning resources and materials will be available here soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
