
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, Trash2, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useSupabaseFinance } from '@/hooks/useSupabaseFinance';
import { toast } from '@/components/ui/sonner';

interface FinanceTrackingPageProps {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export const FinanceTrackingPage = ({ onBack, onComplete, isCompleted }: FinanceTrackingPageProps) => {
  const { categories, expenses, loading, addCategory, addExpense, deleteExpense, totalExpenses } = useSupabaseFinance();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryBudget, setNewCategoryBudget] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseDescription, setNewExpenseDescription] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState('');

  const handleAddCategory = async () => {
    if (!newCategoryName || !newCategoryBudget) {
      toast.error('Please fill in all fields');
      return;
    }

    await addCategory(newCategoryName, parseFloat(newCategoryBudget));
    setNewCategoryName('');
    setNewCategoryBudget('');
    toast.success('Category added successfully!');
  };

  const handleAddExpense = async () => {
    if (!newExpenseAmount || !newExpenseDescription) {
      toast.error('Please fill in all required fields');
      return;
    }

    await addExpense({
      amount: parseFloat(newExpenseAmount),
      description: newExpenseDescription,
      category_id: newExpenseCategory || undefined,
      date: new Date().toISOString().split('T')[0]
    });

    setNewExpenseAmount('');
    setNewExpenseDescription('');
    setNewExpenseCategory('');
    toast.success('Expense added successfully!');
  };

  const totalBudget = categories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const remainingBudget = totalBudget - totalExpenses;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">Loading your finance data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Finance Tracking</h1>
            <p className="text-gray-600">Monitor your expenses and budget for studying in France</p>
          </div>
        </div>
        {!isCompleted && (
          <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700">
            Complete Module
          </Button>
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalBudget.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">€{totalExpenses.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              €{remainingBudget.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Budget Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Budget Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Budget (€)"
                value={newCategoryBudget}
                onChange={(e) => setNewCategoryBudget(e.target.value)}
              />
              <Button onClick={handleAddCategory}>Add</Button>
            </div>

            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-gray-600">Budget: €{category.budgeted}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add Expense */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Add Expense
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount (€)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={newExpenseAmount}
                onChange={(e) => setNewExpenseAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newExpenseDescription}
                onChange={(e) => setNewExpenseDescription(e.target.value)}
                placeholder="What did you spend on?"
              />
            </div>

            <div>
              <Label htmlFor="category">Category (optional)</Label>
              <Select value={newExpenseCategory} onValueChange={setNewExpenseCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleAddExpense} className="w-full">
              Add Expense
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Expenses */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {expenses.slice(0, 10).map((expense) => (
              <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{expense.description}</div>
                  <div className="text-sm text-gray-600">{expense.date}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-red-600">€{expense.amount.toFixed(2)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteExpense(expense.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
