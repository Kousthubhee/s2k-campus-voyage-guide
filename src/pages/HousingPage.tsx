
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

export const HousingPage = ({ onBack, onComplete, isCompleted = false }: HousingPageProps) => {
  const [selectedTab, setSelectedTab] = useState('directory');

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
          <TabsTrigger value="checklist">Housing Checklist</TabsTrigger>
          <TabsTrigger value="tips">Pro Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="space-y-6 mt-6">
          <HousingSitesDirectory />
        </TabsContent>

        <TabsContent value="checklist" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>📋 Housing Search Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <h4 className="font-semibold">Budget Planning</h4>
                    <p className="text-sm text-muted-foreground">Determine your monthly housing budget (typically 30-40% of income)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <h4 className="font-semibold">CROUS Application</h4>
                    <p className="text-sm text-muted-foreground">Apply for university housing through CROUS (most affordable option)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <h4 className="font-semibold">Document Preparation</h4>
                    <p className="text-sm text-muted-foreground">Gather ID, proof of income, guarantor documents, bank statements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <h4 className="font-semibold">Location Research</h4>
                    <p className="text-sm text-muted-foreground">Check proximity to university, public transport, and amenities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <h4 className="font-semibold">Virtual Viewing</h4>
                    <p className="text-sm text-muted-foreground">Schedule online tours or request detailed photos and videos</p>
                  </div>
                </div>
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
