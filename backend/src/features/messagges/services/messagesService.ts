// services/messagesService.ts
import { PrismaClient, type Message, Prisma } from "@prisma/client";
import type { MessageInput } from "../schemas/messageSchema.js";
import { CustomError } from "../../../error/customError.js";
import { sendMessageToN8n } from "../infrastructure/adapters/n8nWebhookAdapter.js";

export class MessageService {
  constructor(private readonly prisma: PrismaClient) {}

  public async sendMessageOnDB(data: MessageInput): Promise<Message> {
    try {
      const messageData: Prisma.MessageCreateInput = {
        contenido: data.contenido,
        emisor: data.emisor,
        ...(data.creadoPorId && {
          creadoPor: {
            connect: { id: data.creadoPorId },
          },
        }),
      };

      const savedMessage = await this.prisma.message.create({
        data: messageData,
      });

      // Lógica de notificación a n8n (no debe bloquear tu app si falla)
      try {
        await sendMessageToN8n({
          contenido: savedMessage.contenido,
          emisor: savedMessage.emisor,
          creadoPorId: data.creadoPorId ?? "",
        });
      } catch (n8nError) {
        console.warn("n8n falló, pero no se detiene la creación del mensaje");
        // Puedes loguearlo o enviarlo a Sentry si usas
      }

      return savedMessage;
    } catch (error) {
      throw new CustomError("Error al guardar el mensaje", 500);
    }
  }

  public async getAllMessages(): Promise<Message[]> {
    return this.prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
  }
}
