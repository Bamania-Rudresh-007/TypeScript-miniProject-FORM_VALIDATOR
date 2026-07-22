import { Product, MasterInventory, Category } from './types.js';

export class InventoryManager {
  private inventory: MasterInventory;

  constructor(initialProducts: Product[]) {
    this.inventory = initialProducts;
  }

  getInventory(): MasterInventory {
    return this.inventory;
  }

  findProductById(id: string): Product | undefined {
    return this.inventory.find(p => p.id.toLowerCase() === id.toLowerCase());
  }

  restock(id: string, quantity: number): MasterInventory {
    this.inventory = this.inventory.map(product => {
      if (product.id.toLowerCase() === id.toLowerCase()) {
        return { ...product, stock: product.stock + quantity };
      }
      return product;
    });
    return this.inventory;
  }

  sell(id: string, quantity: number): MasterInventory {
    const product = this.findProductById(id);
    if (!product) throw new Error("Product not found!");
    if (product.stock < quantity) throw new Error(`Insufficient stock! Available: ${product.stock}`);

    this.inventory = this.inventory.map(p => {
      if (p.id.toLowerCase() === id.toLowerCase()) {
        return { ...p, stock: p.stock - quantity };
      }
      return p;
    });
    return this.inventory;
  }

  getSummaryReport() {
    const totalItems = this.inventory.reduce((sum, p) => sum + p.stock, 0);
    const totalValue = this.inventory.reduce((sum, p) => sum + (p.price * p.stock), 0);
    
    // Breaking down value by category safely
    const breakdown = this.inventory.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + (p.price * p.stock);
      return acc;
    }, {} as Record<Category, number>);

    return { totalItems, totalValue, breakdown };
  }
}
