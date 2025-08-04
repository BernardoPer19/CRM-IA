// src/features/Product/schemas/product.schema.ts
import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, { message: "El nombre del producto es obligatorio" }),
  description: z.string().optional(),
  price: z.number().positive({ message: "El precio debe ser un número positivo" }),
  stock: z.number().int().nonnegative({ message: "El stock debe ser mayor o igual a 0" }),
  img: z.string().url({ message: "La imagen debe ser una URL válida" }).optional(),
  categoryId: z.string().min(1, { message: "La categoría es obligatoria" }),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, { message: "El nombre del producto es obligatorio" }).optional(),
  description: z.string().optional(),
  price: z.number().positive({ message: "El precio debe ser un número positivo" }).optional(),
  stock: z.number().int().nonnegative({ message: "El stock debe ser mayor o igual a 0" }).optional(),
  img: z.string().url({ message: "La imagen debe ser una URL válida" }).optional(),
  categoryId: z.string().min(1, { message: "La categoría es obligatoria" }).optional(),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;



export const validateCreate = (input: unknown): CreateProductDto => {
  const result = createProductSchema.safeParse(input);
  if (!result.success) {
    throw result.error;
  }
  return result.data;
};

export const validateUpdates = (input: unknown): UpdateProductDto => {
  const result = updateProductSchema.safeParse(input);
  if (!result.success) {
    throw result.error;
  }
  return result.data;
};
