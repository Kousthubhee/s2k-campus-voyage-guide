import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Equal,
  AlertTriangle,
  CheckCircle,
  Target,
  Plane,
  PiggyBank,
  Calculator,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface MonthlyComparison {
  currentMonth: {
    income: number;
    expenses: number;
    balance: number;
  };
  previousMonth: {
    income: number;
    expenses: number;
    balance: number;
  };
  trend: 'up' | 'down' | 'same';
  expenseChange: number;
  incomeChange: number;
}

interface ReportsPageProps {
  selectedMonth: string;
  selectedYear: string;
}

export const ReportsPage = ({ selectedMonth, selectedYear }: ReportsPageProps) => {
  const { user } = useAuth();
  const [comparison, setComparison] = useState<MonthlyComparison | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchComparisonData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Calculate previous month
      const currentDate = new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1, 1);
      const previousDate = new Date(currentDate);
      previousDate.setMonth(previousDate.getMonth() - 1);
      
      const currentStartDate = `${selectedYear}-${selectedMonth}-01`;
      const currentEndDate = `${selectedYear}-${selectedMonth}-31`;
      
      const prevYear = previousDate.getFullYear().toString();
      const prevMonth = (previousDate.getMonth() + 1).toString().padStart(2, '0');
      const previousStartDate = `${prevYear}-${prevMonth}-01`;
      const previousEndDate = `${prevYear}-${prevMonth}-31`;

      // Fetch current month data
      const [currentTransactions, currentIncome, currentSubscriptions, currentSharedExpenses] = await Promise.all([
        supabase.from('transactions').select('*').eq('user_id', user.id).gte('date', currentStartDate).lte('date', currentEndDate),
        supabase.from('income_sources').select('*').eq('user_id', user.id).gte('date', currentStartDate).lte('date', currentEndDate),
        supabase.from('subscriptions').select('*').eq('user_id', user.id).eq('active', true),
        supabase.from('shared_expenses').select('*').eq('user_id', user.id).gte('date', currentStartDate).lte('date', currentEndDate)
      ]);

      // Fetch previous month data
      const [prevTransactions, prevIncome, prevSharedExpenses] = await Promise.all([
        supabase.from('transactions').select('*').eq('user_id', user.id).gte('date', previousStartDate).lte('date', previousEndDate),
        supabase.from('income_sources').select('*').eq('user_id', user.id).gte('date', previousStartDate).lte('date', previousEndDate),
        supabase.from('shared_expenses').select('*').eq('user_id', user.id).gte('date', previousStartDate).lte('date', previousEndDate)
      ]);

      // Calculate current month totals
      const currentTransIncome = currentTransactions.data?.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0) || 0;
      const currentSourceIncome = currentIncome.data?.reduce((sum, i) => sum + Number(i.amount), 0) || 0;
      const currentTotalIncome = currentTransIncome + currentSourceIncome;

      const currentTransExpenses = currentTransactions.data?.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0) || 0;
      const currentSubsExpenses = currentSubscriptions.data?.reduce((sum, s) => sum + Number(s.amount), 0) || 0;
      const currentSharedExpensesTotal = currentSharedExpenses.data?.reduce((sum, e) => sum + Number(e.your_share), 0) || 0;
      const currentTotalExpenses = currentTransExpenses + currentSubsExpenses + currentSharedExpensesTotal;

      // Calculate previous month totals
      const prevTransIncome = prevTransactions.data?.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0) || 0;
      const prevSourceIncome = prevIncome.data?.reduce((sum, i) => sum + Number(i.amount), 0) || 0;
      const prevTotalIncome = prevTransIncome + prevSourceIncome;

      const prevTransExpenses = prevTransactions.data?.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0) || 0;
      const prevSharedExpensesTotal = prevSharedExpenses.data?.reduce((sum, e) => sum + Number(e.your_share), 0) || 0;
      const prevTotalExpenses = prevTransExpenses + currentSubsExpenses + prevSharedExpensesTotal; // Include subscriptions for prev month too

      const currentBalance = currentTotalIncome - currentTotalExpenses;
      const prevBalance = prevTotalIncome - prevTotalExpenses;

      const expenseChange = prevTotalExpenses > 0 ? ((currentTotalExpenses - prevTotalExpenses) / prevTotalExpenses) * 100 : 0;
      const incomeChange = prevTotalIncome > 0 ? ((currentTotalIncome - prevTotalIncome) / prevTotalIncome) * 100 : 0;

      let trend: 'up' | 'down' | 'same' = 'same';
      if (Math.abs(expenseChange) > 5) {
        trend = expenseChange > 0 ? 'up' : 'down';
      }

      setComparison({
        currentMonth: {
          income: currentTotalIncome,
          expenses: currentTotalExpenses,
          balance: currentBalance
        },
        previousMonth: {
          income: prevTotalIncome,
          expenses: prevTotalExpenses,
          balance: prevBalance
        },
        trend,
        expenseChange,
        incomeChange
      });

    } catch (error) {
      console.error('Error fetching comparison data:', error);
      toast({
        title: "Error",
        description: "Failed to load reports data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComparisonData();
  }, [user, selectedMonth, selectedYear]);

  const getSpendingSuggestion = () => {
    if (!comparison) return null;

    const { expenseChange, currentMonth, previousMonth } = comparison;

    if (expenseChange > 20) {
      return {
        type: 'warning',
        icon: AlertTriangle,
        title: 'High Spending Alert',
        message: `You spent ${expenseChange.toFixed(1)}% more than last month. Consider reviewing your expenses and cutting unnecessary costs.`,
        tips: ['Review subscription services', 'Look for cheaper alternatives', 'Set spending limits', 'Track daily expenses']
      };
    } else if (expenseChange > 10) {
      return {
        type: 'caution',
        icon: TrendingUp,
        title: 'Spending Increased',
        message: `Your spending increased by ${expenseChange.toFixed(1)}%. Keep an eye on your budget.`,
        tips: ['Monitor spending closely', 'Identify expense categories that increased', 'Set monthly budgets']
      };
    } else if (expenseChange < -10) {
      return {
        type: 'success',
        icon: CheckCircle,
        title: 'Great Job Saving!',
        message: `You reduced spending by ${Math.abs(expenseChange).toFixed(1)}%! Consider putting savings towards goals.`,
        tips: ['Transfer savings to emergency fund', 'Consider investing surplus', 'Plan a small reward for yourself', 'Set aside money for future goals']
      };
    } else if (currentMonth.balance > 300) {
      return {
        type: 'opportunity',
        icon: Plane,
        title: 'Surplus Available',
        message: `You have €${currentMonth.balance.toFixed(2)} surplus this month. Time to plan something special!`,
        tips: ['Plan a weekend trip', 'Build emergency fund', 'Invest in skills/courses', 'Save for future goals']
      };
    } else if (currentMonth.balance > 0) {
      return {
        type: 'neutral',
        icon: PiggyBank,
        title: 'Balanced Budget',
        message: `You're maintaining a positive balance of €${currentMonth.balance.toFixed(2)}. Keep it up!`,
        tips: ['Maintain current spending habits', 'Look for small optimization opportunities', 'Build emergency fund gradually']
      };
    } else {
      return {
        type: 'warning',
        icon: Target,
        title: 'Budget Deficit',
        message: `You overspent by €${Math.abs(currentMonth.balance).toFixed(2)} this month. Time to adjust.`,
        tips: ['Review all expenses', 'Cut non-essential spending', 'Look for additional income sources', 'Create a stricter budget']
      };
    }
  };

  const suggestion = getSpendingSuggestion();

  if (!user) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Please log in to view your financial reports</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
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

  if (!comparison) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium">No data available</p>
        <p>Add some transactions to see your spending analysis</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Month-over-Month Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
              Income Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="font-bold text-green-600">€{comparison.currentMonth.income.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Month</span>
                <span className="font-medium">€{comparison.previousMonth.income.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm font-medium">Change</span>
                <Badge variant={comparison.incomeChange >= 0 ? "default" : "destructive"}>
                  {comparison.incomeChange >= 0 ? '+' : ''}{comparison.incomeChange.toFixed(1)}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingDown className="h-4 w-4 mr-2 text-red-600" />
              Expense Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="font-bold text-red-600">€{comparison.currentMonth.expenses.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Month</span>
                <span className="font-medium">€{comparison.previousMonth.expenses.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm font-medium">Change</span>
                <Badge variant={comparison.expenseChange <= 0 ? "default" : "destructive"}>
                  {comparison.expenseChange >= 0 ? '+' : ''}{comparison.expenseChange.toFixed(1)}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Equal className="h-4 w-4 mr-2" />
              Balance Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className={`font-bold ${comparison.currentMonth.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  €{comparison.currentMonth.balance.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Month</span>
                <span className={`font-medium ${comparison.previousMonth.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  €{comparison.previousMonth.balance.toFixed(2)}
                </span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center gap-2">
                  {comparison.trend === 'up' && <TrendingUp className="h-4 w-4 text-red-500" />}
                  {comparison.trend === 'down' && <TrendingDown className="h-4 w-4 text-green-500" />}
                  {comparison.trend === 'same' && <Equal className="h-4 w-4 text-blue-500" />}
                  <span className="text-sm font-medium">
                    {comparison.trend === 'up' ? 'Spending Increased' : 
                     comparison.trend === 'down' ? 'Spending Decreased' : 'Similar Spending'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Suggestions */}
      {suggestion && (
        <Card className={`border-2 ${
          suggestion.type === 'warning' ? 'border-red-200 bg-red-50 dark:bg-red-950/20' :
          suggestion.type === 'caution' ? 'border-amber-200 bg-amber-50 dark:bg-amber-950/20' :
          suggestion.type === 'success' ? 'border-green-200 bg-green-50 dark:bg-green-950/20' :
          suggestion.type === 'opportunity' ? 'border-blue-200 bg-blue-50 dark:bg-blue-950/20' :
          'border-gray-200 bg-gray-50 dark:bg-gray-950/20'
        }`}>
          <CardHeader>
            <CardTitle className={`flex items-center text-lg ${
              suggestion.type === 'warning' ? 'text-red-800 dark:text-red-200' :
              suggestion.type === 'caution' ? 'text-amber-800 dark:text-amber-200' :
              suggestion.type === 'success' ? 'text-green-800 dark:text-green-200' :
              suggestion.type === 'opportunity' ? 'text-blue-800 dark:text-blue-200' :
              'text-gray-800 dark:text-gray-200'
            }`}>
              <suggestion.icon className="h-5 w-5 mr-2" />
              {suggestion.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`mb-4 ${
              suggestion.type === 'warning' ? 'text-red-700 dark:text-red-300' :
              suggestion.type === 'caution' ? 'text-amber-700 dark:text-amber-300' :
              suggestion.type === 'success' ? 'text-green-700 dark:text-green-300' :
              suggestion.type === 'opportunity' ? 'text-blue-700 dark:text-blue-300' :
              'text-gray-700 dark:text-gray-300'
            }`}>
              {suggestion.message}
            </p>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Recommendations:</h4>
              <ul className="text-sm space-y-1">
                {suggestion.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 mt-0.5 text-green-500 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Monthly Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Spending Health</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Expense Ratio</span>
                    <span>{comparison.currentMonth.income > 0 ? ((comparison.currentMonth.expenses / comparison.currentMonth.income) * 100).toFixed(1) : 0}%</span>
                  </div>
                  <Progress 
                    value={comparison.currentMonth.income > 0 ? Math.min((comparison.currentMonth.expenses / comparison.currentMonth.income) * 100, 100) : 0} 
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Savings Rate</span>
                    <span>{comparison.currentMonth.income > 0 ? Math.max(((comparison.currentMonth.income - comparison.currentMonth.expenses) / comparison.currentMonth.income) * 100, 0).toFixed(1) : 0}%</span>
                  </div>
                  <Progress 
                    value={comparison.currentMonth.income > 0 ? Math.max(((comparison.currentMonth.income - comparison.currentMonth.expenses) / comparison.currentMonth.income) * 100, 0) : 0} 
                    className="h-2"
                  />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Financial Goals</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Ideal Savings Rate:</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Savings Rate:</span>
                  <span className={`font-medium ${
                    comparison.currentMonth.income > 0 && ((comparison.currentMonth.income - comparison.currentMonth.expenses) / comparison.currentMonth.income) * 100 >= 20 
                      ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {comparison.currentMonth.income > 0 ? Math.max(((comparison.currentMonth.income - comparison.currentMonth.expenses) / comparison.currentMonth.income) * 100, 0).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Surplus/Deficit:</span>
                  <span className={`font-medium ${comparison.currentMonth.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    €{comparison.currentMonth.balance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};