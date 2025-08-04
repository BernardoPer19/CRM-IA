// schemas/messageSchema.ts
import { z } from "zod";
import { Emisor } from "@prisma/client";

export const messageSchema = z.object({
  contenido: z.string().min(1),
  emisor: z.nativeEnum(Emisor),
  creadoPorId: z.string().uuid().optional(),
});

export type MessageInput = z.infer<typeof messageSchema>;

export function validateMessage(input: unknown): MessageInput {
  return messageSchema.parse(input);
}
