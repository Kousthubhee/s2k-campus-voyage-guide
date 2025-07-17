
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TransactionsPage } from './TransactionsPage';
import { SubscriptionsPage } from './SubscriptionsPage';
import { PartTimeIncomePage } from './PartTimeIncomePage';
import { EmergencyFundPage } from './EmergencyFundPage';
import { SharedExpensesPage } from './SharedExpensesPage';
import { IncomePage } from './IncomePage';
import { ReportsPage } from './ReportsPage';

interface ExpensesPageProps {
  selectedMonth: string;
  selectedYear: string;
  onDataChange: () => void;
}

export const ExpensesPage = ({ selectedMonth, selectedYear, onDataChange }: ExpensesPageProps) => {
  const [activeTab, setActiveTab] = useState('transactions');

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="part-time">Part-time</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-6 mt-6">
          <TransactionsPage
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onDataChange={onDataChange}
          />
        </TabsContent>

        <TabsContent value="income" className="space-y-6 mt-6">
          <IncomePage
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onDataChange={onDataChange}
          />
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6 mt-6">
          <SubscriptionsPage 
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onDataChange={onDataChange} 
          />
        </TabsContent>

        <TabsContent value="part-time" className="space-y-6 mt-6">
          <PartTimeIncomePage
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onDataChange={onDataChange}
          />
        </TabsContent>

        <TabsContent value="emergency" className="space-y-6 mt-6">
          <EmergencyFundPage onDataChange={onDataChange} />
        </TabsContent>

        <TabsContent value="shared" className="space-y-6 mt-6">
          <SharedExpensesPage 
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onDataChange={onDataChange} 
          />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6 mt-6">
          <ReportsPage
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
