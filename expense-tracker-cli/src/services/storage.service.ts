import { promises as fs } from 'fs';
import path from 'path'; // FIX: Removed the * as syntax to let path resolve correctly
import type { Expense } from '../types/expense.interface.js';

export class StorageService {
  private filePath: string;

  constructor() {
    this.filePath = path.resolve(process.cwd(), 'data', 'expenses.json');
  }

  private async ensureFileExists(): Promise<void> {
    try {
      await fs.mkdir(path.dirname(this.filePath), { recursive: true });
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, JSON.stringify([], null, 2), 'utf-8');
    }
  }

  async readExpenses(): Promise<Expense[]> {
    await this.ensureFileExists();
    try {
      const rawData = await fs.readFile(this.filePath, 'utf-8');
      // FIX: Cast the parsed JSON directly instead of casting rawData string
      return JSON.parse(rawData) as Expense[];
    } catch (error) {
      console.error("\n❌ Storage Error: Corrupted or unreadable database file.");
      return [];
    }
  }

  async writeExpenses(expenses: Expense[]): Promise<void> {
    await this.ensureFileExists();
    await fs.writeFile(this.filePath, JSON.stringify(expenses, null, 2), 'utf-8');
  }
}
