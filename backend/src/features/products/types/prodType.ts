// src/features/Product/types/product.types.ts
export interface ProductType {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  img?: string | null;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}
