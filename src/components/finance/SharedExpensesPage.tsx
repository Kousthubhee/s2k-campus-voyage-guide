
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus, 
  Users, 
  Trash2,
  Calendar,
  Euro,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface SharedExpense {
  id: string;
  description: string;
  total_amount: number;
  your_share: number;
  currency: string;
  date: string;
  settled: boolean;
  participants: any;
}

interface SharedExpensesPageProps {
  selectedMonth: string;
  selectedYear: string;
  onDataChange: () => void;
}

export const SharedExpensesPage = ({ selectedMonth, selectedYear, onDataChange }: SharedExpensesPageProps) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<SharedExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    total_amount: '',
    your_share: '',
    participants: '',
    date: new Date().toISOString().split('T')[0]
  });

  const fetchSharedExpenses = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      const startDate = `${selectedYear}-${selectedMonth}-01`;
      const endDate = `${selectedYear}-${selectedMonth}-31`;
      
      const { data, error } = await supabase
        .from('shared_expenses')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: false });

      if (error) throw error;
      setExpenses(data || []);
    } catch (error) {
      console.error('Error fetching shared expenses:', error);
      toast({
        title: "Error",
        description: "Failed to load shared expenses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSharedExpenses();
  }, [user, selectedMonth, selectedYear]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const participants = formData.participants.split(',').map(p => p.trim()).filter(p => p);
      
      const { error } = await supabase
        .from('shared_expenses')
        .insert({
          user_id: user.id,
          description: formData.description,
          total_amount: parseFloat(formData.total_amount),
          your_share: parseFloat(formData.your_share),
          participants: participants,
          date: formData.date
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Shared expense added successfully",
      });

      setFormData({ 
        description: '', 
        total_amount: '', 
        your_share: '', 
        participants: '', 
        date: new Date().toISOString().split('T')[0] 
      });
      setShowForm(false);
      fetchSharedExpenses();
      onDataChange();
    } catch (error) {
      console.error('Error adding shared expense:', error);
      toast({
        title: "Error",
        description: "Failed to add shared expense",
        variant: "destructive",
      });
    }
  };

  const handleToggleSettled = async (id: string, currentSettled: boolean) => {
    try {
      const { error } = await supabase
        .from('shared_expenses')
        .update({ settled: !currentSettled })
        .eq('id', id);

      if (error) throw error;

      setExpenses(expenses.map(exp => 
        exp.id === id ? { ...exp, settled: !currentSettled } : exp
      ));
      onDataChange();

      toast({
        title: "Success",
        description: `Expense marked as ${!currentSettled ? 'settled' : 'unsettled'}`,
      });
    } catch (error) {
      console.error('Error updating expense:', error);
      toast({
        title: "Error",
        description: "Failed to update expense",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this shared expense?')) return;

    try {
      const { error } = await supabase
        .from('shared_expenses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Shared expense deleted successfully",
      });

      fetchSharedExpenses();
      onDataChange();
    } catch (error) {
      console.error('Error deleting shared expense:', error);
      toast({
        title: "Error",
        description: "Failed to delete shared expense",
        variant: "destructive",
      });
    }
  };

  const totalOwed = expenses.filter(e => !e.settled).reduce((sum, e) => sum + e.your_share, 0);
  const totalSettled = expenses.filter(e => e.settled).reduce((sum, e) => sum + e.your_share, 0);

  if (!user) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Please log in to manage shared expenses</p>
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
                <p className="text-sm font-medium text-muted-foreground">Amount Owed</p>
                <p className="text-2xl font-bold text-red-600">€{totalOwed.toFixed(2)}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Settled</p>
                <p className="text-2xl font-bold text-green-600">€{totalSettled.toFixed(2)}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-blue-600">{expenses.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shared Expenses List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Shared Expenses for {selectedMonth}/{selectedYear}
            </CardTitle>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Shared Expense
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Input
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Dinner, rent, utilities, etc."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Total Amount (€)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.total_amount}
                    onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })}
                    placeholder="100.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Share (€)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.your_share}
                    onChange={(e) => setFormData({ ...formData, your_share: e.target.value })}
                    placeholder="25.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Participants (comma-separated)</label>
                <Input
                  value={formData.participants}
                  onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                  placeholder="John, Sarah, Mike"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Add Expense</Button>
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
          ) : expenses.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No shared expenses found</p>
              <p>Add your first shared expense to start splitting bills with friends</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Your Share</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.description}</TableCell>
                    <TableCell>€{expense.total_amount.toFixed(2)}</TableCell>
                    <TableCell className="font-medium text-blue-600">€{expense.your_share.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(expense.participants) ? expense.participants.slice(0, 2).map((participant: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {participant}
                          </Badge>
                        )) : null}
                        {Array.isArray(expense.participants) && expense.participants.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{expense.participants.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant={expense.settled ? "default" : "outline"}
                        onClick={() => handleToggleSettled(expense.id, expense.settled)}
                        className="w-20"
                      >
                        {expense.settled ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Settled
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Pending
                          </>
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(expense.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
