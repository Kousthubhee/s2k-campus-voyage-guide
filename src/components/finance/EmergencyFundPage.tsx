
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  PiggyBank, 
  Target, 
  Plus,
  Minus,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface EmergencyFund {
  id: string;
  current_amount: number;
  target_amount: number;
  currency: string;
}

interface EmergencyFundPageProps {
  onDataChange: () => void;
}

export const EmergencyFundPage = ({ onDataChange }: EmergencyFundPageProps) => {
  const { user } = useAuth();
  const [fund, setFund] = useState<EmergencyFund | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTargetForm, setShowTargetForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const fetchEmergencyFund = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('emergency_fund')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setFund(data);
      } else {
        // Create initial emergency fund
        const { data: newFund, error: createError } = await supabase
          .from('emergency_fund')
          .insert({
            user_id: user.id,
            current_amount: 0,
            target_amount: 1000
          })
          .select()
          .single();

        if (createError) throw createError;
        setFund(newFund);
      }
    } catch (error) {
      console.error('Error fetching emergency fund:', error);
      toast({
        title: "Error",
        description: "Failed to load emergency fund data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergencyFund();
  }, [user]);

  const handleAddMoney = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !fund) return;

    const addAmount = parseFloat(amount);
    if (isNaN(addAmount) || addAmount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    try {
      const newAmount = fund.current_amount + addAmount;
      const { error } = await supabase
        .from('emergency_fund')
        .update({ current_amount: newAmount })
        .eq('id', fund.id);

      if (error) throw error;

      setFund({ ...fund, current_amount: newAmount });
      setAmount('');
      setShowAddForm(false);
      onDataChange();

      toast({
        title: "Success",
        description: `Added €${addAmount.toFixed(2)} to emergency fund`,
      });
    } catch (error) {
      console.error('Error updating emergency fund:', error);
      toast({
        title: "Error",
        description: "Failed to update emergency fund",
        variant: "destructive",
      });
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !fund) return;

    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    if (withdrawAmount > fund.current_amount) {
      toast({
        title: "Error",
        description: "Cannot withdraw more than current balance",
        variant: "destructive",
      });
      return;
    }

    try {
      const newAmount = fund.current_amount - withdrawAmount;
      const { error } = await supabase
        .from('emergency_fund')
        .update({ current_amount: newAmount })
        .eq('id', fund.id);

      if (error) throw error;

      setFund({ ...fund, current_amount: newAmount });
      setAmount('');
      setShowAddForm(false);
      onDataChange();

      toast({
        title: "Success",
        description: `Withdrew €${withdrawAmount.toFixed(2)} from emergency fund`,
      });
    } catch (error) {
      console.error('Error updating emergency fund:', error);
      toast({
        title: "Error",
        description: "Failed to update emergency fund",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTarget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !fund) return;

    const newTarget = parseFloat(targetAmount);
    if (isNaN(newTarget) || newTarget <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid target amount",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('emergency_fund')
        .update({ target_amount: newTarget })
        .eq('id', fund.id);

      if (error) throw error;

      setFund({ ...fund, target_amount: newTarget });
      setTargetAmount('');
      setShowTargetForm(false);
      onDataChange();

      toast({
        title: "Success",
        description: `Updated target to €${newTarget.toFixed(2)}`,
      });
    } catch (error) {
      console.error('Error updating target:', error);
      toast({
        title: "Error",
        description: "Failed to update target",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Please log in to manage your emergency fund</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!fund) return null;

  const progressPercentage = Math.min((fund.current_amount / fund.target_amount) * 100, 100);
  const isFullyFunded = fund.current_amount >= fund.target_amount;
  const remainingAmount = Math.max(fund.target_amount - fund.current_amount, 0);

  return (
    <div className="space-y-6">
      {/* Main Emergency Fund Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PiggyBank className="h-5 w-5 mr-2" />
            Emergency Fund
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              €{fund.current_amount.toFixed(2)}
            </div>
            <Progress value={progressPercentage} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {progressPercentage.toFixed(1)}% of €{fund.target_amount.toFixed(2)} goal
            </p>
          </div>

          {isFullyFunded ? (
            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Target className="h-4 w-4 mr-2 text-green-600" />
                <span className="font-medium text-green-900 dark:text-green-100">Goal Achieved!</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Congratulations! You've reached your emergency fund goal. Consider increasing your target or maintaining this level.
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Target className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium text-blue-900 dark:text-blue-100">Keep Going!</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                You need €{remainingAmount.toFixed(2)} more to reach your goal. 
                Aim to save 2-3 months' worth of expenses for financial security.
              </p>
            </div>
          )}

          <div className="flex gap-2 justify-center">
            <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Money
            </Button>
            <Button onClick={() => setShowAddForm(true)} variant="outline">
              <Minus className="h-4 w-4 mr-2" />
              Withdraw
            </Button>
            <Button onClick={() => setShowTargetForm(true)} variant="outline">
              <Target className="h-4 w-4 mr-2" />
              Set Target
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
                <p className="text-2xl font-bold text-blue-600">€{fund.current_amount.toFixed(2)}</p>
              </div>
              <PiggyBank className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Target Amount</p>
                <p className="text-2xl font-bold text-green-600">€{fund.target_amount.toFixed(2)}</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Remaining</p>
                <p className="text-2xl font-bold text-amber-600">€{remainingAmount.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Withdraw Money Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Update Emergency Fund</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Amount (€)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100.00"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="button" onClick={handleAddMoney} className="bg-green-600 hover:bg-green-700">
                  Add Money
                </Button>
                <Button type="button" onClick={handleWithdraw} variant="destructive">
                  Withdraw
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Set Target Form */}
      {showTargetForm && (
        <Card>
          <CardHeader>
            <CardTitle>Set Target Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateTarget} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Target Amount (€)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  placeholder="1000.00"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Update Target</Button>
                <Button type="button" variant="outline" onClick={() => setShowTargetForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
