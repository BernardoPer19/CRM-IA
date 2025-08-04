// src/features/Product/services/ProductService.ts
import { PrismaClient, type Product } from "@prisma/client";

export class ProductService {
  constructor(private prisma: PrismaClient) { }

  // 🟢 Crear producto
  async createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">) {
    return this.prisma.product.create({
      data,
    });
  }

  // 🔵 Obtener todos los productos
  async getAllProducts() {
    return this.prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // 🔵 Obtener producto por ID
  async getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  // 🟡 Actualizar producto
  async updateProduct(
    id: string,
    data: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>
  ) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  // 🔴 Eliminar producto
  async deleteProduct(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
