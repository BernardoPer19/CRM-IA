// services/messagesService.ts
import { PrismaClient, type Message, Prisma } from "@prisma/client";
import type { MessageInput } from "../schemas/messageSchema.js";
import { CustomError } from "../../../error/customError.js";
import { sendMessageToN8n } from "../infrastructure/adapters/n8nWebhookAdapter.js";

export class MessageService {
  constructor(private readonly prisma: PrismaClient) { }

  public async sendMessageOnDB(data: MessageInput): Promise<Message> {
    try {
      const messageData: Prisma.MessageCreateInput = {
        contenido: data.contenido,
        emisor: data.emisor, // ✅ aquí ya es dinámico
        ...(data.creadoPorId && {
          creadoPor: {
            connect: { id: data.creadoPorId },
          },
        }),
      };


      const savedMessage = await this.prisma.message.create({
        data: messageData,
      });

      try {

        if (savedMessage.emisor === "ADMIN" || savedMessage.emisor === "EMPLEADO") {
          try {
            await sendMessageToN8n(savedMessage);
          } catch (n8nError) {
            console.warn("n8n falló, pero no se detiene la creación del mensaje");
          }
        }

      } catch (n8nError) {
        console.warn("n8n falló, pero no se detiene la creación del mensaje");
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
