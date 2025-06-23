import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, Download, Upload, Target, Bell, Shield } from 'lucide-react';
import { ExpenseTable } from '@/components/finance/ExpenseTable';
import { AnalyticsCharts } from '@/components/finance/AnalyticsCharts';
import { QuickAddMobile } from '@/components/finance/QuickAddMobile';
import { RecurringSetup } from '@/components/finance/RecurringSetup';
import { CustomCategories } from '@/components/finance/CustomCategories';
import { AlertsSettings } from '@/components/finance/AlertsSettings';
import { CurrencyLiveRates } from '@/components/finance/CurrencyLiveRates';
import { PartTimeJobLog } from '@/components/finance/PartTimeJobLog';
import { DiscountIntegration } from '@/components/finance/DiscountIntegration';
import { GamificationBadges } from '@/components/finance/GamificationBadges';
import { CSVImportExport } from '@/components/finance/CSVImportExport';
import { SnapshotReport } from '@/components/finance/SnapshotReport';
import { SavingsGoals, BillReminders, PrivacyControls } from '@/components/finance/FinanceCards';

interface FinanceTrackingPageProps {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export function FinanceTrackingPage({ onBack, onComplete, isCompleted }: FinanceTrackingPageProps) {
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2024-01-05', category: 'Food', description: 'Lunch with colleagues', amount: 25 },
    { id: 2, date: '2024-01-04', category: 'Transport', description: 'Train ticket', amount: 15 },
    { id: 3, date: '2024-01-03', category: 'Rent', description: 'Apartment rent', amount: 1200 },
  ]);

  const addExpense = (newExpense: any) => {
    setExpenses([...expenses, { ...newExpense, id: expenses.length + 1 }]);
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Checklist
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Finance Tracking</h1>
        </div>
        {!isCompleted && (
          <Button variant="primary" onClick={onComplete}>
            Mark as Complete
          </Button>
        )}
        {isCompleted && (
          <Button variant="secondary" disabled>
            Completed
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SavingsGoals />
        <BillReminders />
        <PrivacyControls />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Expenses Overview</h2>
        <ExpenseTable expenses={expenses} onDelete={deleteExpense} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Analytics & Insights</h2>
        <AnalyticsCharts expenses={expenses} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <QuickAddMobile onAdd={addExpense} />
        <RecurringSetup />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <CustomCategories />
        <AlertsSettings />
        <CurrencyLiveRates />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <PartTimeJobLog />
        <DiscountIntegration />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <GamificationBadges />
        <CSVImportExport expenses={expenses} onAdd={addExpense} />
      </div>

      <div className="mb-8">
        <SnapshotReport expenses={expenses} />
      </div>
    </div>
  );
}
