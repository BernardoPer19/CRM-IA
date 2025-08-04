// src/schemas/user.schema.ts
import z from "zod";
import { Role } from "@prisma/client";

export const registerUserSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),
  phone: z.number().min(60000000, "El teléfono debe ser válido"),
  img: z.string().url("La imagen debe ser una URL válida"),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.nativeEnum(Role).optional(), // Default lo puedes aplicar en backend
});

export type RegisterUserDto = z.infer<typeof registerUserSchema>;


export const validateUpdates = (input: unknown): RegisterUserDto => {
  const result = registerUserSchema.safeParse(input);
  if (!result.success) {
    throw result.error;
  }
  return result.data;
};
