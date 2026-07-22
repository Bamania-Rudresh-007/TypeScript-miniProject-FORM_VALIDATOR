import fs from 'node:fs';
import path from 'node:path';
import { Product, Category } from './types.js';

const FILE_PATH = path.resolve('products.json');

const mockData: Product[] = [
  { id: "E01", name: "Gaming Laptop", price: 1200, stock: 10, category: Category.ELECTRONICS, voltage: 230, warrantyMonths: 24 },
  { id: "C01", name: "Hoodie", price: 45, stock: 50, category: Category.CLOTHING, size: 'L', material: 'Cotton' },
  { id: "F01", name: "Organic Honey", price: 12, stock: 100, category: Category.FOOD, expiryDate: "2027-12-31" }
];

export function readDatabase(): Product[] {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(mockData, null, 2));
    return mockData;
  }
  const data = fs.readFileSync(FILE_PATH, 'utf-8');
  return JSON.parse(data);
}

export function writeDatabase(products: ReadonlyArray<Product>): void {
  fs.writeFileSync(FILE_PATH, JSON.stringify(products, null, 2));
}
