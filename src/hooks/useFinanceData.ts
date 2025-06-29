import { useState, useEffect } from "react";

// This file is now replaced by useSupabaseFinance.ts
// Keeping minimal export for backward compatibility
export function useFinanceData() {
  console.warn('useFinanceData is deprecated. Use useSupabaseFinance instead.');
  return {
    categories: [],
    expenses: [],
    addCategory: () => {},
    addExpense: () => {},
    deleteExpense: () => {},
    totalExpenses: 0
  };
}
