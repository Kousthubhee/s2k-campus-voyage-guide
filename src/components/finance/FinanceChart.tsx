
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface FinanceChartProps {
  selectedMonth: string;
  selectedYear: string;
}

interface ChartData {
  category: string;
  amount: number;
}

export const FinanceChart = ({ selectedMonth, selectedYear }: FinanceChartProps) => {
  const { user } = useAuth();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      if (!user) {
        // Demo data for non-authenticated users
        setChartData([
          { category: 'Rent', amount: 600 },
          { category: 'Food', amount: 250 },
          { category: 'Transport', amount: 75 },
          { category: 'Entertainment', amount: 100 }
        ]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        const startDate = `${selectedYear}-${selectedMonth}-01`;
        const endDate = `${selectedYear}-${selectedMonth}-31`;
        
        const { data: transactions, error } = await supabase
          .from('transactions')
          .select('category, amount')
          .eq('user_id', user.id)
          .eq('type', 'expense')
          .gte('date', startDate)
          .lte('date', endDate);

        if (error) throw error;

        // Group expenses by category
        const categoryTotals: { [key: string]: number } = {};
        transactions?.forEach(transaction => {
          const category = transaction.category;
          const amount = Number(transaction.amount);
          categoryTotals[category] = (categoryTotals[category] || 0) + amount;
        });

        const formattedData = Object.entries(categoryTotals).map(([category, amount]) => ({
          category,
          amount
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [user, selectedMonth, selectedYear]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse">Loading chart...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
        <CardDescription>Monthly breakdown of your spending</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p>No expense data available</p>
              <p className="text-sm">Add some transactions to see the chart</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => [`€${Number(value).toFixed(2)}`, 'Amount']} />
              <Bar dataKey="amount" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
