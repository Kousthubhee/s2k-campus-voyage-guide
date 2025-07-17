
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Download, 
  Edit, 
  Trash2,
  Calendar,
  Euro
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { TransactionForm } from './TransactionForm';

interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
  currency: string;
}

interface TransactionsPageProps {
  selectedMonth: string;
  selectedYear: string;
  onDataChange: () => void;
}

export const TransactionsPage = ({ selectedMonth, selectedYear, onDataChange }: TransactionsPageProps) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();
  const [additionalIncome, setAdditionalIncome] = useState(0);
  const [partTimeIncome, setPartTimeIncome] = useState(0);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const fetchTransactions = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const startDate = `${selectedYear}-${selectedMonth}-01`;
      const endDate = `${selectedYear}-${selectedMonth}-31`;
      
      // Fetch transactions
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: false });

      if (error) throw error;

      // Fetch additional income from income sources
      const { data: incomeData, error: incomeError } = await supabase
        .from('income_sources')
        .select('amount')
        .eq('user_id', user.id)
        .gte('date', startDate)
        .lte('date', endDate);

      if (incomeError) throw incomeError;

      const formattedTransactions = data?.map(t => ({
        id: t.id,
        amount: Number(t.amount),
        description: t.description,
        category: t.category,
        type: t.type as 'income' | 'expense',
        date: t.date,
        currency: t.currency
      })) || [];

      const additionalIncomeTotal = incomeData?.reduce((sum, i) => sum + Number(i.amount), 0) || 0;
      
      // Get part-time income separately (if it exists in income_sources)
      const { data: partTimeData, error: partTimeError } = await supabase
        .from('income_sources')
        .select('amount')
        .eq('user_id', user.id)
        .eq('source_name', 'Part-time Job')
        .gte('date', startDate)
        .lte('date', endDate);

      if (partTimeError) throw partTimeError;
      
      const partTimeTotal = partTimeData?.reduce((sum, i) => sum + Number(i.amount), 0) || 0;

      setTransactions(formattedTransactions);
      setAdditionalIncome(additionalIncomeTotal);
      setPartTimeIncome(partTimeTotal);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({
        title: "Error",
        description: "Failed to load transactions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user, selectedMonth, selectedYear]);

  // Apply filters
  useEffect(() => {
    let filtered = transactions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(t => t.category === categoryFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(t => t.type === typeFilter);
    }

    // Date range filter
    if (dateRange.start) {
      filtered = filtered.filter(t => t.date >= dateRange.start);
    }
    if (dateRange.end) {
      filtered = filtered.filter(t => t.date <= dateRange.end);
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, categoryFilter, typeFilter, dateRange]);

  const handleDelete = async (transactionId: string) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;

    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', transactionId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Transaction deleted successfully",
      });

      fetchTransactions();
      onDataChange();
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast({
        title: "Error",
        description: "Failed to delete transaction",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleSuccess = () => {
    fetchTransactions();
    setShowForm(false);
    setEditingTransaction(undefined);
    onDataChange();
  };

  const exportTransactions = () => {
    const csvContent = [
      ['Date', 'Description', 'Category', 'Type', 'Amount', 'Currency'],
      ...filteredTransactions.map(t => [
        t.date,
        t.description,
        t.category,
        t.type,
        t.amount.toString(),
        t.currency
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${selectedYear}_${selectedMonth}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const categories = [...new Set(transactions.map(t => t.category))];
  const transactionIncome = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  
  // Total income includes transactions + additional income sources + part-time income
  const totalIncome = transactionIncome + additionalIncome + partTimeIncome;
  const netBalance = totalIncome - totalExpenses;

  if (!user) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Please log in to view your transactions</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tips Card */}
      <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
              <Euro className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">💡 Transaction Tips</h3>
              <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                <li>• <strong>Expenses:</strong> Groceries, dining out, transport, shopping, utilities</li>
                <li>• <strong>Income:</strong> Salary, freelance work, gifts, refunds, cashbacks</li>
                <li>• Use clear descriptions to track spending patterns</li>
                <li>• Categorize consistently for better reports</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-green-600">€{totalIncome.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Transactions: €{transactionIncome.toFixed(2)} + Other: €{(additionalIncome + partTimeIncome).toFixed(2)}
                </p>
              </div>
              <Euro className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">€{totalExpenses.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  From transactions only
                </p>
              </div>
              <Euro className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Net Balance</p>
                <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  €{netBalance.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Including all income sources
                </p>
              </div>
              <Euro className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>All Transactions</CardTitle>
            <div className="flex gap-2">
              <Button onClick={exportTransactions} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Input
              type="date"
              placeholder="Start date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
            
            <Input
              type="date"
              placeholder="End date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </div>

          {/* Transactions Table */}
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No transactions found</p>
              <p>Try adjusting your filters or add your first transaction</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{transaction.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={transaction.type === 'income' ? 'default' : 'destructive'}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}€{transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(transaction)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(transaction.id)}
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

      {/* Transaction Form */}
      {showForm && (
        <TransactionForm
          isOpen={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingTransaction(undefined);
          }}
          onSuccess={handleSuccess}
          transaction={editingTransaction}
        />
      )}
    </div>
  );
};
