
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CheckCircle, Save } from 'lucide-react';
import { FinanceDashboard } from '@/components/finance/FinanceDashboard';
import { ExpensesPage } from '@/components/finance/ExpensesPage';
import { ReportsPage } from '@/components/finance/ReportsPage';
import { SmartFinanceTools } from '@/components/finance/SmartFinanceTools';
import { FinancialInsights } from '@/components/finance/FinancialInsights';
import { TooltipWrapper } from '@/components/common/TooltipWrapper';
import { useAutoSave } from '@/hooks/useAutoSave';

interface EnhancedFinanceTrackingPageProps {
  onBack: () => void;
  onComplete?: () => void;
  isCompleted?: boolean;
}

export const EnhancedFinanceTrackingPage = ({ onBack, onComplete, isCompleted = false }: EnhancedFinanceTrackingPageProps) => {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const { triggerAutoSave, saveNow, isSaving, hasUnsavedChanges } = useAutoSave({
    onSave: async () => {
      // Save finance data logic here
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    },
    delay: 2000
  });

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const handleDataChange = () => {
    triggerAutoSave();
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Checklist
          </Button>
          
          <div className="flex items-center gap-2">
            {hasUnsavedChanges && (
              <span className="text-sm text-muted-foreground">Unsaved changes</span>
            )}
            <TooltipWrapper content="Save all changes immediately">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={saveNow}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Now'}
              </Button>
            </TooltipWrapper>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            💰 Smart Finance Tracking
          </h1>
          <p className="text-lg text-muted-foreground">
            Advanced financial management with AI insights and live currency rates
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
          <TabsTrigger value="dashboard">
            <TooltipWrapper content="Overview of your financial status">
              Dashboard
            </TooltipWrapper>
          </TabsTrigger>
          <TabsTrigger value="smart-tools">
            <TooltipWrapper content="Currency converter and budget alerts">
              Smart Tools
            </TooltipWrapper>
          </TabsTrigger>
          <TabsTrigger value="expenses">
            <TooltipWrapper content="Track and manage your expenses">
              Expenses
            </TooltipWrapper>
          </TabsTrigger>
          <TabsTrigger value="insights">
            <TooltipWrapper content="AI-powered spending analysis">
              Insights
            </TooltipWrapper>
          </TabsTrigger>
          <TabsTrigger value="reports">
            <TooltipWrapper content="Detailed financial reports">
              Reports
            </TooltipWrapper>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6 mt-6">
          <FinanceDashboard onDataChange={handleDataChange} />
        </TabsContent>

        <TabsContent value="smart-tools" className="space-y-6 mt-6">
          <SmartFinanceTools />
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6 mt-6">
          <ExpensesPage onDataChange={handleDataChange} />
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
