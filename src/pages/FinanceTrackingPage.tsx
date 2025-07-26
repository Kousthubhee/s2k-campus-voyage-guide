
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { FinanceDashboard } from '@/components/finance/FinanceDashboard';
import { ExpensesPage } from '@/components/finance/ExpensesPage';
import { ReportsPage } from '@/components/finance/ReportsPage';
import { SmartFinanceTools } from '@/components/finance/SmartFinanceTools';
import { FinancialInsights } from '@/components/finance/FinancialInsights';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';

interface FinanceTrackingPageProps {
  onBack: () => void;
  onComplete?: () => void;
  isCompleted?: boolean;
}

export const FinanceTrackingPage = ({ onBack, onComplete, isCompleted = false }: FinanceTrackingPageProps) => {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const {
    hasUnsavedChanges,
    isSaving,
    markAsChanged,
    markAsSaved,
    saveChanges,
    promptBeforeLeaving
  } = useUnsavedChanges({
    onSave: async () => {
      markAsSaved();
    },
    onDiscard: () => {
      // For finance tracking, we don't need to discard anything
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="smart-tools">Smart Tools</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6 mt-6">
          <FinanceDashboard onDataChange={markAsChanged} />
        </TabsContent>

        <TabsContent value="smart-tools" className="space-y-6 mt-6">
          <SmartFinanceTools />
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6 mt-6">
          <ExpensesPage onDataChange={markAsChanged} />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6 mt-6">
          <FinancialInsights />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6 mt-6">
          <ReportsPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};
