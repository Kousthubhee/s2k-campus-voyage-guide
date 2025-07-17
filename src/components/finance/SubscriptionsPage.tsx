import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus, 
  Edit, 
  Trash2,
  Calendar,
  AlertCircle,
  Euro,
  Bell,
  BellOff,
  X,
  Play,
  Pause
} from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { format } from 'date-fns';

interface Subscription {
  id: string;
  name: string;
  amount: number;
  currency: string;
  billing_cycle: string;
  start_date: string;
  next_due_date: string;
  active: boolean;
  reminder_enabled: boolean;
  is_paused: boolean;
  is_automatic: boolean;
}

interface SubscriptionsPageProps {
  selectedMonth: string;
  selectedYear: string;
  onDataChange: () => void;
}

export const SubscriptionsPage = ({ selectedMonth, selectedYear, onDataChange }: SubscriptionsPageProps) => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean, subscriptionId: string }>({
    open: false,
    subscriptionId: ''
  });
  const [paymentDialog, setPaymentDialog] = useState<{ 
    open: boolean, 
    subscription: Subscription | null,
    addToTransactions: boolean 
  }>({
    open: false,
    subscription: null,
    addToTransactions: true
  });
  
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    billing_cycle: 'monthly',
    start_date: '',
    next_due_date: '',
    is_automatic: true
  });

  const fetchSubscriptions = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Get current month's subscriptions
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('name');

      if (error) throw error;
      
      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast({
        title: "Error",
        description: "Failed to load subscriptions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [user, selectedMonth, selectedYear]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          name: formData.name,
          amount: parseFloat(formData.amount),
          billing_cycle: formData.billing_cycle,
          start_date: formData.start_date,
          next_due_date: formData.next_due_date,
          is_automatic: formData.is_automatic
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Subscription added successfully",
      });

      setFormData({ 
        name: '', 
        amount: '', 
        billing_cycle: 'monthly', 
        start_date: '', 
        next_due_date: '',
        is_automatic: true
      });
      setShowForm(false);
      fetchSubscriptions();
      onDataChange();
    } catch (error) {
      console.error('Error adding subscription:', error);
      toast({
        title: "Error",
        description: "Failed to add subscription",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteDialog({ open: true, subscriptionId: id });
  };

  const confirmDelete = async () => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', deleteDialog.subscriptionId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Subscription deleted successfully",
      });

      fetchSubscriptions();
      onDataChange();
    } catch (error) {
      console.error('Error deleting subscription:', error);
      toast({
        title: "Error",
        description: "Failed to delete subscription",
        variant: "destructive",
      });
    } finally {
      setDeleteDialog({ open: false, subscriptionId: '' });
    }
  };

  const handlePause = async (subscriptionId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ is_paused: !currentStatus })
        .eq('id', subscriptionId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Subscription ${currentStatus ? 'paused' : 'resumed'} successfully`,
      });

      fetchSubscriptions();
      onDataChange();
    } catch (error) {
      console.error('Error updating subscription status:', error);
      toast({
        title: "Error",
        description: "Failed to update subscription status",
        variant: "destructive",
      });
    }
  };
  
  const handlePayment = (subscription: Subscription) => {
    setPaymentDialog({
      open: true,
      subscription,
      addToTransactions: true
    });
  };
  
  const confirmPayment = async () => {
    try {
      if (!paymentDialog.subscription || !user) return;
      
      if (paymentDialog.addToTransactions) {
        // Add to transactions
        const { error } = await supabase
          .from('transactions')
          .insert({
            user_id: user.id,
            type: 'expense',
            category: 'Subscription',
            description: paymentDialog.subscription.name,
            amount: paymentDialog.subscription.amount,
            currency: paymentDialog.subscription.currency,
            date: new Date().toISOString().split('T')[0]
          });
  
        if (error) throw error;
      }
      
      // Update next due date
      let nextDueDate = new Date(paymentDialog.subscription.next_due_date);
      if (paymentDialog.subscription.billing_cycle === 'monthly') {
        nextDueDate.setMonth(nextDueDate.getMonth() + 1);
      } else if (paymentDialog.subscription.billing_cycle === 'yearly') {
        nextDueDate.setFullYear(nextDueDate.getFullYear() + 1);
      } else {
        // Weekly
        nextDueDate.setDate(nextDueDate.getDate() + 7);
      }
      
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({
          next_due_date: nextDueDate.toISOString().split('T')[0]
        })
        .eq('id', paymentDialog.subscription.id);
        
      if (updateError) throw updateError;
  
      toast({
        title: "Success",
        description: `Payment recorded${paymentDialog.addToTransactions ? ' and added to transactions' : ''}`,
      });
  
      fetchSubscriptions();
      onDataChange();
    } catch (error) {
      console.error('Error processing payment:', error);
      toast({
        title: "Error",
        description: "Failed to process payment",
        variant: "destructive",
      });
    } finally {
      setPaymentDialog({ open: false, subscription: null, addToTransactions: true });
    }
  };

  // Process automatic subscriptions for current month
  const processAutomaticSubscriptions = async () => {
    if (!user) return;
    
    try {
      // Get start and end dates for current month
      const currentYear = parseInt(selectedYear);
      const currentMonth = parseInt(selectedMonth);
      const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
      
      const startDate = `${selectedYear}-${selectedMonth}-01`;
      const endDate = `${selectedYear}-${selectedMonth}-${daysInMonth}`;
      
      // Find active, automatic, non-paused subscriptions
      const activeSubscriptions = subscriptions.filter(sub => 
        sub.active && 
        !sub.is_paused && 
        sub.is_automatic && 
        new Date(sub.next_due_date) >= new Date(startDate) && 
        new Date(sub.next_due_date) <= new Date(endDate)
      );
      
      if (activeSubscriptions.length === 0) {
        toast({
          title: "Information",
          description: "No automatic subscriptions due for this month",
        });
        return;
      }
      
      // Add each subscription to transactions
      for (const sub of activeSubscriptions) {
        const { error } = await supabase
          .from('transactions')
          .insert({
            user_id: user.id,
            type: 'expense',
            category: 'Subscription',
            description: sub.name,
            amount: sub.amount,
            currency: sub.currency,
            date: sub.next_due_date
          });
          
        if (error) throw error;
        
        // Update next due date
        let nextDueDate = new Date(sub.next_due_date);
        if (sub.billing_cycle === 'monthly') {
          nextDueDate.setMonth(nextDueDate.getMonth() + 1);
        } else if (sub.billing_cycle === 'yearly') {
          nextDueDate.setFullYear(nextDueDate.getFullYear() + 1);
        } else {
          // Weekly
          nextDueDate.setDate(nextDueDate.getDate() + 7);
        }
        
        const { error: updateError } = await supabase
          .from('subscriptions')
          .update({
            next_due_date: nextDueDate.toISOString().split('T')[0]
          })
          .eq('id', sub.id);
          
        if (updateError) throw updateError;
      }
      
      toast({
        title: "Success",
        description: `Processed ${activeSubscriptions.length} automatic subscription(s) for ${format(new Date(currentYear, currentMonth - 1), 'MMMM yyyy')}`,
      });
      
      fetchSubscriptions();
      onDataChange();
    } catch (error) {
      console.error('Error processing automatic subscriptions:', error);
      toast({
        title: "Error",
        description: "Failed to process automatic subscriptions",
        variant: "destructive",
      });
    }
  };

  const totalMonthly = subscriptions
    .filter(s => s.active && !s.is_paused)
    .reduce((sum, s) => {
      const monthlyAmount = s.billing_cycle === 'yearly' ? s.amount / 12 : s.amount;
      return sum + monthlyAmount;
    }, 0);

  const upcomingDue = subscriptions.filter(s => {
    const dueDate = new Date(s.next_due_date);
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    return dueDate >= today && dueDate <= nextWeek && s.active && !s.is_paused;
  });

  if (!user) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Please log in to manage your subscriptions</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Total</p>
                <p className="text-2xl font-bold text-red-600">€{totalMonthly.toFixed(2)}</p>
              </div>
              <Euro className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Subscriptions</p>
                <p className="text-2xl font-bold">{subscriptions.filter(s => s.active && !s.is_paused).length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Due This Week</p>
                <p className="text-2xl font-bold text-amber-600">{upcomingDue.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips Card */}
      {showTips && (
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <AlertCircle className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 Tips for Subscriptions & Bills</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Add recurring expenses like rent, utilities, insurance premiums</li>
                <li>• Include streaming services like Netflix, Spotify, gym memberships</li>
                <li>• Track phone bills, internet, and other monthly services</li>
                <li>• Set start dates to calculate total cost over time</li>
                <li>• Mark subscriptions as automatic to add them to transactions</li>
              </ul>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900"
              onClick={() => setShowTips(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Subscriptions List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <CardTitle>Subscriptions & Bills</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" onClick={processAutomaticSubscriptions}>
                Process Automatic
              </Button>
              <Button onClick={() => setShowForm(!showForm)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Subscription
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Netflix, Spotify, etc."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Amount (€)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="9.99"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Billing Cycle</label>
                  <Select value={formData.billing_cycle} onValueChange={(value) => setFormData({ ...formData, billing_cycle: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                  <Input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Next Due Date</label>
                  <Input
                    type="date"
                    value={formData.next_due_date}
                    onChange={(e) => setFormData({ ...formData, next_due_date: e.target.value })}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="automatic" 
                    checked={formData.is_automatic}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, is_automatic: checked === true })
                    }
                  />
                  <label 
                    htmlFor="automatic"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Automatic (add to transactions when due)
                  </label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Add Subscription</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          )}

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No subscriptions found</p>
              <p>Add your first subscription to start tracking recurring expenses</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Billing Cycle</TableHead>
                  <TableHead>Next Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell className="font-medium">{subscription.name}</TableCell>
                    <TableCell>€{subscription.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{subscription.billing_cycle}</Badge>
                    </TableCell>
                    <TableCell>{new Date(subscription.next_due_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={subscription.active && !subscription.is_paused ? 'default' : 'destructive'}>
                        {subscription.active && !subscription.is_paused ? 'Active' : subscription.is_paused ? 'Paused' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={subscription.is_automatic ? 'outline' : 'secondary'}>
                        {subscription.is_automatic ? 'Automatic' : 'Manual'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePayment(subscription)}
                          title="Mark as paid"
                        >
                          €
                        </Button>
                        <Button
                          size="sm"
                          variant={subscription.is_paused ? "default" : "secondary"}
                          onClick={() => handlePause(subscription.id, subscription.is_paused)}
                          title={subscription.is_paused ? "Resume" : "Pause"}
                        >
                          {subscription.is_paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(subscription.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => !open && setDeleteDialog({ open: false, subscriptionId: '' })}
      >
        <AlertDialogContent className="max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this subscription? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Payment Dialog */}
      <Dialog 
        open={paymentDialog.open}
        onOpenChange={(open) => !open && setPaymentDialog({ open: false, subscription: null, addToTransactions: true })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>
              Record payment for {paymentDialog.subscription?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="addToTransactions" 
                checked={paymentDialog.addToTransactions}
                onCheckedChange={(checked) => 
                  setPaymentDialog({ ...paymentDialog, addToTransactions: checked === true })
                }
              />
              <label 
                htmlFor="addToTransactions"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Add this payment to transactions
              </label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => 
              setPaymentDialog({ open: false, subscription: null, addToTransactions: true })
            }>
              Cancel
            </Button>
            <Button onClick={confirmPayment}>
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
