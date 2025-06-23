
import { useState, useEffect } from "react";

// Types
export interface ExpenseEntry {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string; // ISO
}
export interface BudgetCategory {
  name: string;
  budgeted: number;
}
const STORAGE_KEY = "myFinanceData_v1";
const defaultCategories: BudgetCategory[] = [
  { name: "Rent", budgeted: 600 },
  { name: "Food", budgeted: 300 },
  { name: "Transport", budgeted: 75 },
  { name: "Entertainment", budgeted: 100 },
];
const defaultExpenses: ExpenseEntry[] = [];

export function useFinanceData() {
  const [categories, setCategories] = useState<BudgetCategory[]>(defaultCategories);
  const [expenses, setExpenses] = useState<ExpenseEntry[]>(defaultExpenses);

  // Load from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.categories) setCategories(parsed.categories);
        if (parsed.expenses) setExpenses(parsed.expenses);
      } catch {}
    }
  }, []);

  // Save whenever anything changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ categories, expenses }));
  }, [categories, expenses]);

  // CRUD helpers for categories
  const addCategory = (name: string, budgeted: number) => {
    if (!name.trim() || categories.some(c => c.name === name)) return;
    setCategories([...categories, { name, budgeted }]);
  };
  const removeCategory = (name: string) => {
    setCategories(categories.filter(c => c.name !== name));
    setExpenses(expenses.filter(e => e.category !== name)); // Remove related expenses
  };

  // CRUD helpers for expenses
  const addExpense = (expense: Omit<ExpenseEntry, "id" | "date">) => {
    const entry: ExpenseEntry = {
      ...expense,
      id: String(Date.now()) + Math.random(),
      date: new Date().toISOString(),
    };
    setExpenses([entry, ...expenses]);
  };
  const editExpense = (id: string, changes: Partial<Omit<ExpenseEntry, "id" | "date">>) => {
    setExpenses(
      expenses.map(e =>
        e.id === id ? { ...e, ...changes } : e
      )
    );
  };
  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  // Sums
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return {
    categories,
    addCategory,
    removeCategory,
    expenses,
    addExpense,
    editExpense,
    deleteExpense,
    totalExpenses,
  };
}
