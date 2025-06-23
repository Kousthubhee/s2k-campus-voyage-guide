
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, TrendingUp, DollarSign, PieChart, BarChart3 } from "lucide-react";
import { FinanceCards } from "@/components/finance/FinanceCards";

interface FinanceTrackingPageProps {
  onBack: () => void;
}

interface ExpenseEntry {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
}

export function FinanceTrackingPage({ onBack }: FinanceTrackingPageProps) {
  const [expenses, setExpenses] = useState<ExpenseEntry[]>([
    { id: "1", date: "2024-01-15", category: "Food", description: "Groceries", amount: 45.50 },
    { id: "2", date: "2024-01-14", category: "Transport", description: "Bus pass", amount: 30.00 },
    { id: "3", date: "2024-01-13", category: "Housing", description: "Rent", amount: 800.00 },
  ]);

  const [activeTab, setActiveTab] = useState("overview");

  const handleAddExpense = (newExpense: Omit<ExpenseEntry, 'id'>) => {
    const expense: ExpenseEntry = {
      ...newExpense,
      id: Date.now().toString()
    };
    setExpenses(prev => [expense, ...prev]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Hub
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Finance Tracking</h1>
      </div>

      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            onClick={() => setActiveTab("overview")}
            className="flex-1"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeTab === "expenses" ? "default" : "ghost"}
            onClick={() => setActiveTab("expenses")}
            className="flex-1"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Expenses
          </Button>
          <Button
            variant={activeTab === "analytics" ? "default" : "ghost"}
            onClick={() => setActiveTab("analytics")}
            className="flex-1"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {activeTab === "overview" && (
        <FinanceCards expenses={expenses} />
      )}

      {activeTab === "expenses" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Expenses
                <Button onClick={() => handleAddExpense({
                  date: new Date().toISOString().split('T')[0],
                  category: "Other",
                  description: "New expense",
                  amount: 0
                })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {expenses.map((expense) => (
                  <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{expense.description}</div>
                      <div className="text-sm text-gray-500">{expense.category} • {expense.date}</div>
                    </div>
                    <div className="font-semibold">€{expense.amount.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "analytics" && (
        <FinanceCards expenses={expenses} />
      )}
    </div>
  );
}
