
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Euro, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  Plus,
  Receipt,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { TransactionForm } from './TransactionForm';
import { FinanceChart } from './FinanceChart';

interface DashboardStats {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  emergencyFund: number;
  emergencyTarget: number;
  savingsRate: number;
}

interface RecentTransaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

interface FinanceDashboardProps {
  selectedMonth: string;
  selectedYear: string;
  onMonthChange: (month: string) => void;
  onYearChange: (year: string) => void;
  onDataChange: () => void;
}

export const FinanceDashboard = ({ 
  selectedMonth, 
  selectedYear, 
  onMonthChange, 
  onYearChange,
  onDataChange
}: FinanceDashboardProps) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
    emergencyFund: 0,
    emergencyTarget: 1000,
    savingsRate: 0
  });
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([]);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [loading, setLoading] = useState(true);

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
    { value: '12', label: 'December' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  const fetchData = async () => {
    console.log('Fetching finance data for user:', user?.id);
    
    if (!user) {
      console.log('No user found, showing demo data');
      // Show demo data for non-authenticated users
      setStats({
        totalIncome: 1200,
        totalExpenses: 850,
        netBalance: 350,
        emergencyFund: 500,
        emergencyTarget: 1000,
        savingsRate: 29.2
      });
      setRecentTransactions([
        {
          id: '1',
          description: 'Rent Payment',
          amount: 600,
          category: 'Rent',
          type: 'expense',
          date: '2024-01-15'
        },
        {
          id: '2',
          description: 'Part-time Job',
          amount: 800,
          category: 'Part-time Job',
          type: 'income',
          date: '2024-01-14'
        }
      ]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      const startDate = `${selectedYear}-${selectedMonth}-01`;
      const endDate = `${selectedYear}-${selectedMonth}-31`;
      
      console.log('Fetching data for date range:', startDate, 'to', endDate);
      
      // Fetch transactions
      const { data: transactions, error: transError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: false });

      if (transError) throw transError;

      // Fetch income sources
      const { data: incomeData, error: incomeError } = await supabase
        .from('income_sources')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', startDate)
        .lte('date', endDate);

      if (incomeError) throw incomeError;

      // Fetch part-time income
      const { data: partTimeData, error: partTimeError } = await supabase
        .from('income_sources')
        .select('*')
        .eq('user_id', user.id)
        .eq('source_name', 'Part-time Job')
        .gte('date', startDate)
        .lte('date', endDate);

      if (partTimeError) throw partTimeError;

      // Fetch subscriptions
      const { data: subscriptions, error: subsError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('active', true);

      if (subsError) throw subsError;

      // Fetch shared expenses
      const { data: sharedExpenses, error: sharedError } = await supabase
        .from('shared_expenses')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', startDate)
        .lte('date', endDate);

      if (sharedError) throw sharedError;

      // Fetch emergency fund changes
      const { data: emergencyData, error: emergencyError } = await supabase
        .from('emergency_fund')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (emergencyError && emergencyError.code !== 'PGRST116') {
        console.error('Emergency fund error:', emergencyError);
      }

      console.log('Fetched data:', { 
        transactions: transactions?.length, 
        incomeData: incomeData?.length,
        partTimeData: partTimeData?.length,
        subscriptions: subscriptions?.length,
        sharedExpenses: sharedExpenses?.length,
        emergencyData 
      });

      // Calculate income from multiple sources
      const transactionIncome = transactions?.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0) || 0;
      const mainIncomeFromSources = incomeData?.reduce((sum, i) => sum + Number(i.amount), 0) || 0;
      const partTimeIncome = partTimeData?.reduce((sum, i) => sum + Number(i.amount), 0) || 0;
      
      const totalIncome = transactionIncome + mainIncomeFromSources + partTimeIncome;

      // Calculate expenses from multiple sources
      const transactionExpenses = transactions?.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0) || 0;
      const subscriptionExpenses = subscriptions?.reduce((sum, s) => sum + Number(s.amount), 0) || 0;
      const sharedExpensesTotal = sharedExpenses?.reduce((sum, e) => sum + Number(e.your_share), 0) || 0;
      
      const totalExpenses = transactionExpenses + subscriptionExpenses + sharedExpensesTotal;

      // Get previous month balance (this would need to be implemented based on your needs)
      // For now, we'll just calculate current month
      const netBalance = totalIncome - totalExpenses;
      const savingsRate = totalIncome > 0 ? (netBalance / totalIncome) * 100 : 0;

      console.log('Calculated stats:', { 
        totalIncome, 
        totalExpenses, 
        netBalance, 
        savingsRate,
        breakdown: {
          transactionIncome,
          mainIncomeFromSources,
          partTimeIncome,
          transactionExpenses,
          subscriptionExpenses,
          sharedExpensesTotal
        }
      });

      setStats({
        totalIncome,
        totalExpenses,
        netBalance,
        emergencyFund: emergencyData?.current_amount || 0,
        emergencyTarget: emergencyData?.target_amount || 1000,
        savingsRate
      });

      // Set recent transactions (combine from different sources for display)
      const allTransactions = [
        ...(transactions || []).map(t => ({
          id: t.id,
          description: t.description,
          amount: Number(t.amount),
          category: t.category,
          type: t.type as 'income' | 'expense',
          date: t.date
        })),
        ...(incomeData || []).map(i => ({
          id: i.id,
          description: i.source_name,
          amount: Number(i.amount),
          category: i.source_name,
          type: 'income' as const,
          date: i.date
        }))
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setRecentTransactions(allTransactions.slice(0, 5));

    } catch (error) {
      console.error('Error fetching finance data:', error);
      toast({
        title: "Error",
        description: "Failed to load finance data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, selectedMonth, selectedYear]);

  const emergencyFundPercentage = Math.min((stats.emergencyFund / stats.emergencyTarget) * 100, 100);

  const handleTransactionSuccess = () => {
    fetchData();
    setShowTransactionForm(false);
    onDataChange();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4">
          <Select value={selectedMonth} onValueChange={onMonthChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map(month => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedYear} onValueChange={onYearChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => setShowTransactionForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-2" />
              Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€{stats.totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-red-600">
              <TrendingDown className="h-4 w-4 mr-2" />
              Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">€{stats.totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Euro className="h-4 w-4 mr-2" />
              Net Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              €{stats.netBalance.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Savings Rate: {stats.savingsRate.toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-blue-600">
              <PiggyBank className="h-4 w-4 mr-2" />
              Emergency Fund
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">€{stats.emergencyFund.toFixed(2)}</div>
            <Progress value={emergencyFundPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {emergencyFundPercentage.toFixed(0)}% of €{stats.emergencyTarget} goal
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinanceChart 
          selectedMonth={selectedMonth} 
          selectedYear={selectedYear}
        />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Receipt className="h-5 w-5 mr-2" />
              Recent Transactions
            </CardTitle>
            <CardDescription>Your latest 5 transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentTransactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Receipt className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No transactions found</p>
                <p className="text-sm">Add your first transaction to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {transaction.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(transaction.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className={`font-bold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}€{transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Alerts */}
      {stats.netBalance < 0 && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <AlertCircle className="h-5 w-5" />
              <p className="font-medium">Budget Alert</p>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              You've spent €{Math.abs(stats.netBalance).toFixed(2)} more than your income this month. Consider reviewing your expenses.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Transaction Form Modal */}
      {showTransactionForm && (
        <TransactionForm
          isOpen={showTransactionForm}
          onClose={() => setShowTransactionForm(false)}
          onSuccess={handleTransactionSuccess}
        />
      )}
    </div>
  );
};
