export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  type: 'income' | 'expense';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface FormErrors {
  amount?: string;
  description?: string;
  category?: string;
}