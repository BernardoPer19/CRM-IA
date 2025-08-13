export interface ProductCategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductType {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  img?: string | null;
  categoryId: string;
  category?: ProductCategory; // 🔹 Incluimos la categoría completa
  createdAt: Date;
  updatedAt: Date;
}
