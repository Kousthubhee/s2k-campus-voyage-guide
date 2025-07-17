
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TransactionsPage } from './TransactionsPage';
import { SubscriptionsPage } from './SubscriptionsPage';
import { EmergencyFundPage } from './EmergencyFundPage';
import { SharedExpensesPage } from './SharedExpensesPage';
import { IncomePage } from './IncomePage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ExpensesPageProps {
  onDataChange: () => void;
}

export const ExpensesPage = ({ onDataChange }: ExpensesPageProps) => {
  const [activeTab, setActiveTab] = useState('transactions');
  
  // Add state for month and year selection
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    (currentDate.getMonth() + 1).toString().padStart(2, '0')
  );
  const [selectedYear, setSelectedYear] = useState(
    currentDate.getFullYear().toString()
  );

  // Generate month and year options
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const years = Array.from({ length: 5 }, (_, i) => {
    const year = currentDate.getFullYear() - 2 + i;
    return { value: year.toString(), label: year.toString() };
  });

  return (
    <div className="space-y-6">
      {/* Month and Year Filter */}
      <div className="flex flex-wrap gap-4">
        <div className="w-40">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map(month => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-32">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year.value} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
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
      </Tabs>
    </div>
  );
};
