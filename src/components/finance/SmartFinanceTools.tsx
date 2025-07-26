
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TrendingDown, TrendingUp, AlertTriangle, DollarSign, Calculator, Bell } from 'lucide-react';

interface CurrencyRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: Date;
}

interface BudgetAlert {
  category: string;
  spent: number;
  budget: number;
  percentage: number;
  severity: 'warning' | 'danger';
}

export const SmartFinanceTools = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('INR');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [budgetAlerts, setBudgetAlerts] = useState<BudgetAlert[]>([]);
  const [spendingPrediction, setSpendingPrediction] = useState(0);

  // Mock currency rates (in real app, fetch from API)
  const currencyRates: CurrencyRate[] = [
    { from: 'INR', to: 'EUR', rate: 0.011, lastUpdated: new Date() },
    { from: 'EUR', to: 'INR', rate: 89.5, lastUpdated: new Date() },
    { from: 'USD', to: 'EUR', rate: 0.92, lastUpdated: new Date() },
  ];

  const handleConvert = () => {
    const rate = currencyRates.find(r => r.from === fromCurrency && r.to === toCurrency)?.rate || 1;
    setConvertedAmount(parseFloat(amount) * rate);
  };

  useEffect(() => {
    // Mock budget alerts
    setBudgetAlerts([
      {
        category: 'Food',
        spent: 280,
        budget: 300,
        percentage: 93,
        severity: 'warning'
      },
      {
        category: 'Entertainment',
        spent: 95,
        budget: 100,
        percentage: 95,
        severity: 'danger'
      }
    ]);

    // Mock spending prediction
    setSpendingPrediction(1150);
  }, []);

  return (
    <div className="space-y-6">
      {/* Currency Converter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Live Currency Converter
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="secondary" className="ml-2">Live</Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Rates updated every 15 minutes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                <option value="EUR">EUR (€)</option>
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Converted Amount</label>
              <div className="p-2 bg-muted rounded-md font-mono">
                {convertedAmount.toFixed(2)}
              </div>
            </div>
          </div>
          <Button onClick={handleConvert} className="w-full">
            <Calculator className="h-4 w-4 mr-2" />
            Convert
          </Button>
        </CardContent>
      </Card>

      {/* Budget Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Smart Budget Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {budgetAlerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'danger' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      <AlertTriangle className={`h-4 w-4 ${
                        alert.severity === 'danger' ? 'text-red-500' : 'text-yellow-500'
                      }`} />
                      {alert.category} Budget Alert
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      €{alert.spent} of €{alert.budget} used ({alert.percentage}%)
                    </p>
                  </div>
                  <Badge variant={alert.severity === 'danger' ? 'destructive' : 'default'}>
                    {alert.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Spending Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Monthly Spending Prediction
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className="ml-2">AI</Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Based on your spending patterns</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold text-primary">€{spendingPrediction}</div>
            <p className="text-muted-foreground">
              Predicted spending for this month
            </p>
            <div className="flex items-center justify-center gap-2">
              <TrendingDown className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">12% lower than last month</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
