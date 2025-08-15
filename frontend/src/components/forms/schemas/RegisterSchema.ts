import z from "zod";

export const RegisterSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  phone: z.preprocess((val) => Number(val), z.number().min(10000000)),
  img: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'EMPLOYEE']).optional(),
});

export type RegisterTypeSchema = z.infer<typeof RegisterSchema>;
