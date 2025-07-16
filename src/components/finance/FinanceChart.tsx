import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FinanceChartProps {
  selectedMonth: string;
  selectedYear: string;
}

interface CategoryData {
  name: string;
  amount: number;
  color: string;
}

interface DailyData {
  day: string;
  income: number;
  expenses: number;
}

const COLORS = [
  '#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6',
  '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
];

export const FinanceChart = ({ selectedMonth, selectedYear }: FinanceChartProps) => {
  const { user } = useAuth();
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChartData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const startDate = `${selectedYear}-${selectedMonth}-01`;
      const endDate = `${selectedYear}-${selectedMonth}-31`;
      
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', startDate)
        .lte('date', endDate);

      if (error) throw error;

      // Process category data for pie chart (expenses only)
      const expensesByCategory = transactions
        ?.filter(t => t.type === 'expense')
        .reduce((acc, transaction) => {
          const category = transaction.category;
          acc[category] = (acc[category] || 0) + Number(transaction.amount);
          return acc;
        }, {} as Record<string, number>) || {};

      const categoryChartData: CategoryData[] = Object.entries(expensesByCategory)
        .map(([name, amount], index) => ({
          name,
          amount,
          color: COLORS[index % COLORS.length]
        }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 8); // Top 8 categories

      setCategoryData(categoryChartData);

      // Process daily data for bar chart
      const dailyTransactions = transactions?.reduce((acc, transaction) => {
        const day = new Date(transaction.date).getDate().toString();
        if (!acc[day]) {
          acc[day] = { income: 0, expenses: 0 };
        }
        
        if (transaction.type === 'income') {
          acc[day].income += Number(transaction.amount);
        } else {
          acc[day].expenses += Number(transaction.amount);
        }
        
        return acc;
      }, {} as Record<string, { income: number; expenses: number }>) || {};

      // Fill in missing days with 0 values
      const daysInMonth = new Date(Number(selectedYear), Number(selectedMonth), 0).getDate();
      const dailyChartData: DailyData[] = [];
      
      for (let i = 1; i <= daysInMonth; i++) {
        const day = i.toString();
        dailyChartData.push({
          day: day.padStart(2, '0'),
          income: dailyTransactions[day]?.income || 0,
          expenses: dailyTransactions[day]?.expenses || 0
        });
      }

      setDailyData(dailyChartData);

    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [user, selectedMonth, selectedYear]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-medium">{`Day ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: €${entry.value.toFixed(2)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-medium">{data.name}</p>
          <p style={{ color: data.payload.color }}>
            €{data.value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="animate-pulse">
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalExpenses = categoryData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
        <CardDescription>Visual breakdown of your finances</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="daily">Daily Flow</TabsTrigger>
            <TabsTrigger value="categories">Expense Categories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="day" 
                    fontSize={12}
                    interval="preserveStartEnd"
                  />
                  <YAxis fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="income" fill="#22c55e" name="Income" />
                  <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-4">
            {categoryData.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <p>No expense data available</p>
                  <p className="text-sm">Add some expenses to see the breakdown</p>
                </div>
              </div>
            ) : (
              <>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="amount"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<PieTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {categoryData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="flex-1 truncate">{item.name}</span>
                      <span className="font-medium">
                        €{item.amount.toFixed(0)}
                      </span>
                    </div>
                  ))}
                </div>
                
                {totalExpenses > 0 && (
                  <div className="text-center text-sm text-muted-foreground pt-2 border-t">
                    Total Expenses: €{totalExpenses.toFixed(2)}
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};