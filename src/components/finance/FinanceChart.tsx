
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FinanceChartProps {
  data: Array<{
    date: string;
    income: number;
    expenses: number;
    balance: number;
  }>;
}

export function FinanceChart({ data }: FinanceChartProps) {
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
