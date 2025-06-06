import { useState, useEffect } from 'react';
import { Transaction } from '@/types/finance';

const STORAGE_KEY = 'transactions';

// Sample data for demonstration
const sampleTransactions: Transaction[] = [
  {
    id: '1',
    amount: 3200,
    description: 'Monthly Salary',
    category: 'Salary',
    date: new Date('2024-01-15'),
    type: 'income'
  },
  {
    id: '2',
    amount: -85.50,
    description: 'Grocery Shopping',
    category: 'Food & Dining',
    date: new Date('2024-01-14'),
    type: 'expense'
  },
  {
    id: '3',
    amount: -25.00,
    description: 'Coffee Shop',
    category: 'Food & Dining',
    date: new Date('2024-01-13'),
    type: 'expense'
  },
  {
    id: '4',
    amount: -45.00,
    description: 'Gas Station',
    category: 'Transportation',
    date: new Date('2024-01-12'),
    type: 'expense'
  },
  {
    id: '5',
    amount: 500,
    description: 'Freelance Project',
    category: 'Other Income',
    date: new Date('2024-01-10'),
    type: 'income'
  }
];

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from storage
    setTimeout(() => {
      setTransactions(sampleTransactions);
      setLoading(false);
    }, 500);
  }, []);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const getTotalBalance = () => {
    return transactions.reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);
  };

  const getMonthlyIncome = () => {
    const currentMonth = new Date().getMonth();
    return transactions
      .filter(t => t.type === 'income' && t.date.getMonth() === currentMonth)
      .reduce((total, t) => total + t.amount, 0);
  };

  const getMonthlyExpenses = () => {
    const currentMonth = new Date().getMonth();
    return transactions
      .filter(t => t.type === 'expense' && t.date.getMonth() === currentMonth)
      .reduce((total, t) => total + Math.abs(t.amount), 0);
  };

  return {
    transactions,
    loading,
    addTransaction,
    deleteTransaction,
    getTotalBalance,
    getMonthlyIncome,
    getMonthlyExpenses,
  };
}