
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface FinanceChartProps {
  selectedMonth: string;
  selectedYear: string;
}

interface ChartDataPoint {
  date: string;
  income: number;
  expenses: number;
  balance: number;
}

export function FinanceChart({ selectedMonth, selectedYear }: FinanceChartProps) {
  const { user } = useAuth();
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChartData = async () => {
    if (!user) {
      // Demo data for non-authenticated users
      const demoData = [
        { date: '2024-01-01', income: 1200, expenses: 850, balance: 350 },
        { date: '2024-01-15', income: 1200, expenses: 900, balance: 300 },
        { date: '2024-01-31', income: 1400, expenses: 950, balance: 450 }
      ];
      setData(demoData);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      const lastDay = new Date(parseInt(selectedYear), parseInt(selectedMonth), 0).getDate();
      const startDate = `${selectedYear}-${selectedMonth}-01`;
      const endDate = `${selectedYear}-${selectedMonth}-${lastDay.toString().padStart(2, '0')}`;

      // Fetch transactions for the month
      const { data: transactions, error: transError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true });

      if (transError) throw transError;

      // Create chart data points
      const chartData: ChartDataPoint[] = [];
      let cumulativeBalance = 0;

      // Group transactions by day
      const transactionsByDay = transactions?.reduce((acc, transaction) => {
        const date = transaction.date;
        if (!acc[date]) {
          acc[date] = { income: 0, expenses: 0 };
        }
        
        if (transaction.type === 'income') {
          acc[date].income += Number(transaction.amount);
        } else {
          acc[date].expenses += Number(transaction.amount);
        }
        
        return acc;
      }, {} as Record<string, { income: number; expenses: number }>) || {};

      // Generate data points for key dates in the month
      const keyDates = [1, 7, 14, 21, lastDay];
      
      keyDates.forEach(day => {
        const date = `${selectedYear}-${selectedMonth}-${day.toString().padStart(2, '0')}`;
        const dayData = transactionsByDay[date] || { income: 0, expenses: 0 };
        
        cumulativeBalance += dayData.income - dayData.expenses;
        
        chartData.push({
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          income: dayData.income,
          expenses: dayData.expenses,
          balance: cumulativeBalance
        });
      });

      setData(chartData);
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [user, selectedMonth, selectedYear]);

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="date" 
            className="text-sm fill-muted-foreground"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            className="text-sm fill-muted-foreground"
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              color: 'hsl(var(--foreground))'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="income" 
            stroke="hsl(var(--chart-1))" 
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Income"
          />
          <Line 
            type="monotone" 
            dataKey="expenses" 
            stroke="hsl(var(--chart-2))" 
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Expenses"
          />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke="hsl(var(--chart-3))" 
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Balance"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
