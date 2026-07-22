export enum Category {
  ELECTRONICS = "Electronics",
  CLOTHING = "Clothing",
  FOOD = "Food"
}

export interface BaseProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface Electronics extends BaseProduct {
  category: Category.ELECTRONICS; // Discriminant
  voltage: number;
  warrantyMonths: number;
}

export interface Clothing extends BaseProduct {
  category: Category.CLOTHING;    // Discriminant
  size: 'S' | 'M' | 'L' | 'XL';
  material: string;
}

export interface Food extends BaseProduct {
  category: Category.FOOD;        // Discriminant
  expiryDate: string; 
}

// Discriminated Union
export type Product = Electronics | Clothing | Food;

// Immutability Safety Layer
export type MasterInventory = ReadonlyArray<Product>;
