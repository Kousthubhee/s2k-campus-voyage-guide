
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
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
  Pause,
  Search,
  TrendingUp,
  PiggyBank,
  Briefcase,
  Heart
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface IncomeSource {
  id: string;
  amount: number;
  source_name: string;
  frequency: string;
  date: string;
  currency: string;
  is_active: boolean;
}

interface IncomePageProps {
  selectedMonth: string;
  selectedYear: string;
  onDataChange: () => void;
}

export const IncomePage = ({ selectedMonth, selectedYear, onDataChange }: IncomePageProps) => {
  const { user } = useAuth();
  const [incomes, setIncomes] = useState<IncomeSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingIncome, setEditingIncome] = useState<IncomeSource | undefined>();
  const [showTips, setShowTips] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    source_name: '',
    amount: '',
    frequency: 'monthly',
    date: new Date().toISOString().split('T')[0]
  });

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');

  const incomeCategories = [
    { value: 'job', label: 'Job/Salary', icon: Briefcase },
    { value: 'loan', label: 'Student Loan', icon: PiggyBank },
    { value: 'parents', label: 'Family Support', icon: Heart },
    { value: 'scholarship', label: 'Scholarship', icon: TrendingUp },
    { value: 'other', label: 'Other', icon: Euro }
  ];

  const fetchIncomes = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const startDate = `${selectedYear}-${selectedMonth}-01`;
      const endDate = `${selectedYear}-${selectedMonth}-31`;
      
      const { data, error } = await supabase
        .from('income_sources')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: false });

      if (error) throw error;

      setIncomes(data || []);
    } catch (error) {
      console.error('Error fetching incomes:', error);
      toast({
        title: "Error",
        description: "Failed to load income sources",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, [user, selectedMonth, selectedYear]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const incomeData = {
        user_id: user.id,
        source_name: formData.source_name,
        amount: parseFloat(formData.amount),
        frequency: formData.frequency,
        date: formData.date,
        currency: 'EUR'
      };

      if (editingIncome) {
        const { error } = await supabase
          .from('income_sources')
          .update(incomeData)
          .eq('id', editingIncome.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Income source updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('income_sources')
          .insert(incomeData);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Income source added successfully",
        });
      }

      setFormData({
        source_name: '',
        amount: '',
        frequency: 'monthly',
        date: new Date().toISOString().split('T')[0]
      });
      setShowForm(false);
      setEditingIncome(undefined);
      fetchIncomes();
      onDataChange();
    } catch (error) {
      console.error('Error saving income:', error);
      toast({
        title: "Error",
        description: "Failed to save income source",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (incomeId: string) => {
    if (!confirm('Are you sure you want to delete this income source?')) return;

    try {
      const { error } = await supabase
        .from('income_sources')
        .delete()
        .eq('id', incomeId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Income source deleted successfully",
      });

      fetchIncomes();
      onDataChange();
    } catch (error) {
      console.error('Error deleting income:', error);
      toast({
        title: "Error",
        description: "Failed to delete income source",
        variant: "destructive",
      });
    }
  };

  const handlePause = async (incomeId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('income_sources')
        .update({ is_active: !currentStatus })
        .eq('id', incomeId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Income source ${!currentStatus ? 'resumed' : 'paused'} successfully`,
      });

      fetchIncomes();
      onDataChange();
    } catch (error) {
      console.error('Error updating income status:', error);
      toast({
        title: "Error",
        description: "Failed to update income status",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (income: IncomeSource) => {
    setEditingIncome(income);
    setFormData({
      source_name: income.source_name,
      amount: income.amount.toString(),
      frequency: income.frequency,
      date: income.date
    });
    setShowForm(true);
  };

  // Filter incomes
  const filteredIncomes = incomes.filter(income => {
    const matchesSearch = income.source_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = sourceFilter === 'all' || income.source_name.toLowerCase().includes(sourceFilter);
    return matchesSearch && matchesSource;
  });

  const totalIncome = filteredIncomes.reduce((sum, income) => sum + income.amount, 0);
  const averageIncome = filteredIncomes.length > 0 ? totalIncome / filteredIncomes.length : 0;

  if (!user) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Please log in to manage your income sources</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tips Card */}
      {showTips && (
      <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">💡 Income Ideas</h3>
              <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                <li>• <strong>Job/Salary:</strong> Full-time or part-time employment income</li>
                <li>• <strong>Student Loan:</strong> Education loan disbursements</li>
                <li>• <strong>Family Support:</strong> Money from parents or relatives</li>
                <li>• <strong>Scholarships:</strong> Academic or merit-based funding</li>
                <li>• <strong>Freelancing:</strong> Gig work, tutoring, or side projects</li>
              </ul>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-green-600 hover:bg-green-100 dark:hover:bg-green-900"
              onClick={() => setShowTips(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-green-600">€{totalIncome.toFixed(2)}</p>
              </div>
              <Euro className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Income Sources</p>
                <p className="text-2xl font-bold text-blue-600">{filteredIncomes.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Amount</p>
                <p className="text-2xl font-bold text-purple-600">€{averageIncome.toFixed(2)}</p>
              </div>
              <PiggyBank className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Income Sources Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Income Sources</CardTitle>
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Income
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingIncome ? 'Edit Income Source' : 'Add Income Source'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="source_name">Income Source</Label>
                    <Select 
                      value={formData.source_name} 
                      onValueChange={(value) => setFormData({...formData, source_name: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select income source" />
                      </SelectTrigger>
                      <SelectContent>
                        {incomeCategories.map(category => (
                          <SelectItem key={category.value} value={category.label}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="amount">Amount (€)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select 
                      value={formData.frequency} 
                      onValueChange={(value) => setFormData({...formData, frequency: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                        <SelectItem value="one-time">One-time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingIncome ? 'Update' : 'Add'} Income
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search income sources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {incomeCategories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Income Table */}
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredIncomes.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No income sources found</p>
              <p>Add your first income source to get started</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncomes.map((income) => (
                  <TableRow key={income.id}>
                    <TableCell className="font-medium">
                      {new Date(income.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{income.source_name}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{income.frequency}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      +€{income.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={income.is_active ? 'default' : 'secondary'}>
                        {income.is_active ? 'Active' : 'Paused'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant={income.is_active ? "secondary" : "default"}
                          onClick={() => handlePause(income.id, income.is_active)}
                        >
                          {income.is_active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(income)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(income.id)}
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
    </div>
  );
};
