
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Target, Users, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'Jan', spending: 980, budget: 1200 },
  { month: 'Feb', spending: 1050, budget: 1200 },
  { month: 'Mar', spending: 890, budget: 1200 },
  { month: 'Apr', spending: 1180, budget: 1200 },
  { month: 'May', spending: 1020, budget: 1200 },
  { month: 'Jun', spending: 950, budget: 1200 }
];

const categoryData = [
  { name: 'Rent', value: 600, color: '#8B5CF6' },
  { name: 'Food', value: 280, color: '#06B6D4' },
  { name: 'Transport', value: 75, color: '#10B981' },
  { name: 'Entertainment', value: 95, color: '#F59E0B' }
];

interface ComparisonData {
  category: string;
  yourSpending: number;
  avgSpending: number;
  percentile: number;
}

export const FinancialInsights = () => {
  const totalSpending = categoryData.reduce((sum, item) => sum + item.value, 0);
  const budgetUtilization = (totalSpending / 1200) * 100;

  const comparisonData: ComparisonData[] = [
    { category: 'Food', yourSpending: 280, avgSpending: 320, percentile: 75 },
    { category: 'Transport', yourSpending: 75, avgSpending: 85, percentile: 68 },
    { category: 'Entertainment', yourSpending: 95, avgSpending: 110, percentile: 72 }
  ];

  return (
    <div className="space-y-6">
      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Spending Trends (Last 6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Line 
                  type="monotone" 
                  dataKey="spending" 
                  stroke="#8B5CF6" 
                  strokeWidth={2} 
                  name="Spending"
                />
                <Line 
                  type="monotone" 
                  dataKey="budget" 
                  stroke="#10B981" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  name="Budget"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">€156</div>
              <div className="text-sm text-muted-foreground">Avg. monthly savings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">86%</div>
              <div className="text-sm text-muted-foreground">Budget utilization</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Spending by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">€{item.value}</div>
                    <div className="text-sm text-muted-foreground">
                      {((item.value / totalSpending) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Peer Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            How You Compare to Other Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {comparisonData.map((item, index) => {
              const isLower = item.yourSpending < item.avgSpending;
              const difference = Math.abs(item.yourSpending - item.avgSpending);
              const percentDiff = ((difference / item.avgSpending) * 100).toFixed(1);
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.category}</span>
                    <div className="flex items-center gap-2">
                      {isLower ? (
                        <TrendingDown className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm ${isLower ? 'text-green-600' : 'text-red-600'}`}>
                        {percentDiff}% {isLower ? 'below' : 'above'} average
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>You: €{item.yourSpending}</span>
                        <span>Avg: €{item.avgSpending}</span>
                      </div>
                      <Progress 
                        value={(item.yourSpending / Math.max(item.yourSpending, item.avgSpending)) * 100} 
                      />
                    </div>
                    <Badge variant={item.percentile > 70 ? 'default' : 'secondary'}>
                      {item.percentile}th percentile
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Financial Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Financial Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="text-4xl font-bold text-green-600">82</div>
              <div className="text-sm text-muted-foreground">out of 100</div>
            </div>
            <Progress value={82} className="w-full" />
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">A-</div>
                <div className="text-xs text-muted-foreground">Budget Control</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600">B+</div>
                <div className="text-xs text-muted-foreground">Saving Rate</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-600">A</div>
                <div className="text-xs text-muted-foreground">Consistency</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
