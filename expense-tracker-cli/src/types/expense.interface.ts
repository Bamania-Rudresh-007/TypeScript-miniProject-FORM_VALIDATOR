import { Category, PaymentMethod } from '../constants/enums.js';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string; // ISO String format YYYY-MM-DD
  paymentMethod: PaymentMethod;
  notes?: string;
}

// Using TypeScript Utility Types for updating
export type UpdateExpenseInput = Partial<Omit<Expense, 'id'>>;
