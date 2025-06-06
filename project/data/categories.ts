import { Category } from '@/types/finance';

export const categories: Category[] = [
  { id: '1', name: 'Food & Dining', icon: '🍽️', color: '#EF4444' },
  { id: '2', name: 'Transportation', icon: '🚗', color: '#3B82F6' },
  { id: '3', name: 'Shopping', icon: '🛍️', color: '#8B5CF6' },
  { id: '4', name: 'Entertainment', icon: '🎬', color: '#F59E0B' },
  { id: '5', name: 'Bills & Utilities', icon: '⚡', color: '#EF4444' },
  { id: '6', name: 'Healthcare', icon: '🏥', color: '#10B981' },
  { id: '7', name: 'Education', icon: '📚', color: '#6366F1' },
  { id: '8', name: 'Travel', icon: '✈️', color: '#06B6D4' },
  { id: '9', name: 'Salary', icon: '💼', color: '#10B981' },
  { id: '10', name: 'Investment', icon: '📈', color: '#059669' },
  { id: '11', name: 'Other Income', icon: '💰', color: '#10B981' },
  { id: '12', name: 'Other Expense', icon: '💸', color: '#EF4444' },
];

export const getIncomeCategories = () => categories.filter(cat => 
  ['Salary', 'Investment', 'Other Income'].includes(cat.name)
);

export const getExpenseCategories = () => categories.filter(cat => 
  !['Salary', 'Investment', 'Other Income'].includes(cat.name)
);