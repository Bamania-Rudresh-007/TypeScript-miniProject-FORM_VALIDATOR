import { StorageService } from './storage.service.js';
import type { Expense, UpdateExpenseInput } from '../types/expense.interface.js';
import { Category } from '../constants/enums.js';

export class ExpenseManager {
  private storage = new StorageService();

  async addExpense(expenseData: Omit<Expense, 'id'>): Promise<Expense> {
    const expenses = await this.storage.readExpenses();
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      ...expenseData
    };
    expenses.push(newExpense);
    await this.storage.writeExpenses(expenses);
    return newExpense;
  }

  async getAllExpenses(): Promise<Expense[]> {
    return await this.storage.readExpenses();
  }

  async deleteExpense(id: string): Promise<boolean> {
    const expenses = await this.storage.readExpenses();
    const filtered = expenses.filter(e => e.id !== id);
    if (expenses.length === filtered.length) return false;
    await this.storage.writeExpenses(filtered);
    return true;
  }

  async updateExpense(id: string, updates: UpdateExpenseInput): Promise<Expense | null> {
    const expenses = await this.storage.readExpenses();
    const index = expenses.findIndex(e => e.id === id);
    if (index === -1) return null;

    expenses[index] = { ...expenses[index], ...updates };
    await this.storage.writeExpenses(expenses);
    return expenses[index];
  }

  async getSummary() {
    const expenses = await this.storage.readExpenses();
    if (expenses.length === 0) return null;

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const amounts = expenses.map(e => e.amount);
    
    // Category Breakdown Calculation
    const categoryTotals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<Category, number>);

    return {
      totalExpenses: total,
      count: expenses.length,
      highest: Math.max(...amounts),
      lowest: Math.min(...amounts),
      average: total / expenses.length,
      categoryTotals
    };
  }
}
