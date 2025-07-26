
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { HousingSitesDirectory } from '@/components/housing/HousingSitesDirectory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HousingPageProps {
  onBack: () => void;
  onComplete?: () => void;
  isCompleted?: boolean;
}

interface TaskStatus {
  [key: string]: boolean;
}

export const HousingPage = ({ onBack, onComplete, isCompleted = false }: HousingPageProps) => {
  const [selectedTab, setSelectedTab] = useState('directory');
  const [taskStatus, setTaskStatus] = useState<TaskStatus>({
    budgetPlanning: false,
    crousApplication: false,
    documentPreparation: false,
    locationResearch: false,
    virtualViewing: false
  });

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const handleTaskToggle = (taskKey: string) => {
    setTaskStatus(prev => ({
      ...prev,
      [taskKey]: !prev[taskKey]
    }));
  };

  const completedTasks = Object.values(taskStatus).filter(Boolean).length;
  const totalTasks = Object.keys(taskStatus).length;

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
            🏠 Housing Assistant
          </h1>
          <p className="text-lg text-muted-foreground">
            Find and secure the perfect accommodation in France
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
          <TabsTrigger value="directory">Housing Sites</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="tips">Pro Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="space-y-6 mt-6">
          <HousingSitesDirectory />
        </TabsContent>

        <TabsContent value="checklist" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                📋 Housing Search Checklist
                <span className="text-sm bg-blue-100 px-2 py-1 rounded">
                  {completedTasks}/{totalTasks} completed
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { key: 'budgetPlanning', title: 'Budget Planning', desc: 'Determine your monthly housing budget (typically 30-40% of income)' },
                  { key: 'crousApplication', title: 'CROUS Application', desc: 'Apply for university housing through CROUS (most affordable option)' },
                  { key: 'documentPreparation', title: 'Document Preparation', desc: 'Gather ID, proof of income, guarantor documents, bank statements' },
                  { key: 'locationResearch', title: 'Location Research', desc: 'Check proximity to university, public transport, and amenities' },
                  { key: 'virtualViewing', title: 'Virtual Viewing', desc: 'Schedule online tours or request detailed photos and videos' }
                ].map((task) => (
                  <div key={task.key} className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      className="mt-1" 
                      checked={taskStatus[task.key]}
                      onChange={() => handleTaskToggle(task.key)}
                    />
                    <div>
                      <h4 className={`font-semibold ${taskStatus[task.key] ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{task.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button 
                  onClick={onComplete}
                  className="w-full"
                  disabled={completedTasks < totalTasks}
                >
                  {completedTasks < totalTasks ? 
                    `Complete ${totalTasks - completedTasks} more tasks to finish` : 
                    'Mark Module as Complete'
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>💡 Expert Housing Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Start Early</h4>
                  <p className="text-sm text-blue-700">
                    Begin your housing search 2-3 months before arrival. Popular areas fill up quickly, especially for September intake.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900">Understand French Housing Terms</h4>
                  <p className="text-sm text-green-700">
                    Learn key terms: Studio (one room), T1 (one bedroom), T2 (two bedrooms), Charges comprises (utilities included).
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-900">Have a Backup Plan</h4>
                  <p className="text-sm text-orange-700">
                    Consider temporary accommodation (Airbnb, hostels) for your first few weeks while you search in person.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900">Insurance & CAF</h4>
                  <p className="text-sm text-purple-700">
                    Get housing insurance (mandatory) and apply for CAF housing allowance to reduce your monthly costs.
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
