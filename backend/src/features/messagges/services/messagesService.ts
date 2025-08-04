// services/messagesService.ts
import { PrismaClient, type Message, Prisma } from "@prisma/client";
import type { MessageInput } from "../schemas/messageSchema.js";
import { CustomError } from "../../../error/customError.js";

export class MessageService {
  constructor(private readonly prisma: PrismaClient) { }

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

      return await this.prisma.message.create({
        data: messageData,
      });
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
