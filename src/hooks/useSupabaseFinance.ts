
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface ExpenseCategory {
  id: string;
  name: string;
  budgeted: number;
  color?: string;
}

interface Expense {
  id: string;
  amount: number;
  description: string;
  date: string;
  category_id?: string;
}

export function useSupabaseFinance() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCategories([]);
      setExpenses([]);
      setLoading(false);
      return;
    }

    loadFinanceData();
  }, [user]);

  const loadFinanceData = async () => {
    if (!user) return;

    try {
      const [categoriesResult, expensesResult] = await Promise.all([
        supabase.from('expense_categories').select('*').eq('user_id', user.id),
        supabase.from('expenses').select('*').eq('user_id', user.id).order('date', { ascending: false })
      ]);

      if (categoriesResult.data) setCategories(categoriesResult.data);
      if (expensesResult.data) setExpenses(expensesResult.data);
    } catch (error) {
      console.error('Error loading finance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (name: string, budgeted: number) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('expense_categories')
        .insert({ user_id: user.id, name, budgeted })
        .select()
        .single();

      if (error) throw error;
      if (data) setCategories(prev => [...prev, data]);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert({ ...expense, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      if (data) setExpenses(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setExpenses(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return {
    categories,
    expenses,
    loading,
    addCategory,
    addExpense,
    deleteExpense,
    totalExpenses
  };
}
