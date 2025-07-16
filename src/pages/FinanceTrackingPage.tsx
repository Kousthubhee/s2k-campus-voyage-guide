import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { FinanceDashboard } from '@/components/finance/FinanceDashboard';
import { TransactionsPage } from '@/components/finance/TransactionsPage';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import { SaveChangesPrompt } from '@/components/SaveChangesPrompt';

interface FinanceTrackingPageProps {
  onBack: () => void;
  onComplete?: () => void;
  isCompleted?: boolean;
}

export const FinanceTrackingPage = ({ onBack, onComplete, isCompleted = false }: FinanceTrackingPageProps) => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  
  // Global month/year state that applies across all tabs
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    (currentDate.getMonth() + 1).toString().padStart(2, '0')
  );
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear().toString());

  const {
    hasUnsavedChanges,
    isSaving,
    markAsChanged,
    markAsSaved,
    saveChanges,
    promptBeforeLeaving
  } = useUnsavedChanges({
    onSave: async () => {
      // Finance data is saved automatically to the database,
      // so this is just for marking the module as having changes
      markAsSaved();
    },
    onDiscard: () => {
      // For finance tracking, we don't need to discard anything
      // since data is saved to the database immediately
    }
  });

  const handleBack = async () => {
    if (hasUnsavedChanges) {
      await promptBeforeLeaving();
    }
    onBack();
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const handleComplete = () => {
    if (onComplete) {
      markAsSaved();
      onComplete();
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={handleBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            💰 Finance Tracking
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your finances as an international student in France
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
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="income">Part-time Income</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Fund</TabsTrigger>
          <TabsTrigger value="shared">Shared Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6 mt-6">
          <FinanceDashboard
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
          />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6 mt-6">
          <TransactionsPage
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6 mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Subscriptions & Bills tracker coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="income" className="space-y-6 mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Part-time Income tracker coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-6 mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Emergency Fund tracker coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="shared" className="space-y-6 mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Shared Expenses tracker coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Completion CTA */}
      {!isCompleted && (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Ready to complete your finance setup?
            </h3>
            <p className="text-blue-700 dark:text-blue-300 mb-4">
              You've explored the finance tracking tools. Mark this module as complete to earn your key!
            </p>
            <Button onClick={handleComplete} size="lg" className="bg-blue-600 hover:bg-blue-700">
              Complete Finance Module
            </Button>
          </div>
        </div>
      )}

      {/* Save Changes Prompt */}
      <SaveChangesPrompt
        hasUnsavedChanges={hasUnsavedChanges}
        isSaving={isSaving}
        onSave={saveChanges}
        onDiscard={() => markAsSaved()}
      />
    </div>
  );
};