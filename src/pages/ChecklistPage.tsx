
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ChecklistModule } from '@/components/ChecklistModule';
import { GamificationBadges } from '@/components/finance/GamificationBadges';
import { AdvancedProgressTracker } from '@/components/progress/AdvancedProgressTracker';
import { HousingSitesDirectory } from '@/components/housing/HousingSitesDirectory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ChecklistPageProps {
  onBack: () => void;
}

// Mock data for progress tracker
const mockProgressItems = [
  {
    id: '1',
    title: 'Complete Visa Application',
    progress: 85,
    deadline: new Date('2024-03-15'),
    priority: 'high' as const,
    category: 'Visa & Legal'
  },
  {
    id: '2', 
    title: 'Find Housing',
    progress: 60,
    deadline: new Date('2024-04-01'),
    priority: 'high' as const,
    category: 'Housing'
  },
  {
    id: '3',
    title: 'Basic French Learning',
    progress: 40,
    deadline: new Date('2024-05-01'),
    priority: 'medium' as const,
    category: 'Language'
  },
  {
    id: '4',
    title: 'Financial Planning',
    progress: 75,
    priority: 'medium' as const,
    category: 'Finance'
  }
];

export const ChecklistPage = ({ onBack }: ChecklistPageProps) => {
  const [selectedTab, setSelectedTab] = useState('checklist');

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            📋 Your Journey Checklist
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your progress and stay organized on your study abroad journey
          </p>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracker</TabsTrigger>
          <TabsTrigger value="housing">Housing Sites</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="checklist" className="space-y-6 mt-6">
          <ChecklistModule />
        </TabsContent>

        <TabsContent value="progress" className="space-y-6 mt-6">
          <AdvancedProgressTracker 
            items={mockProgressItems}
            overallProgress={65}
          />
        </TabsContent>

        <TabsContent value="housing" className="space-y-6 mt-6">
          <HousingSitesDirectory />
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6 mt-6">
          <GamificationBadges />
        </TabsContent>
      </Tabs>
    </div>
  );
};
