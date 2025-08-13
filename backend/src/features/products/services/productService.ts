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

  async getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  async updateProduct(
    id: string,
    data: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>
  ) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id: string) {
    try {
      const deletedProduct = await this.prisma.product.delete({
        where: { id },
        include: { category: true }, // si querés el nombre de la categoría también
      });

      return {
        success: true,
        data: deletedProduct,
        message: "Producto eliminado correctamente",
      };
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      return {
        success: false,
        data: null,
        message: "No se pudo eliminar el producto",
      };
    }
  }
}
