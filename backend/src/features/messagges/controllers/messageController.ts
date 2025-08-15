import type { Request, Response, NextFunction } from "express";
import { validateMessage } from "../schemas/messageSchema.js";
import { MessageService } from "../services/messagesService.js";
import { catchAsync } from "../../../middlewares/catchAsync.js";
import { EventEmitter } from "node:events";

const messageEmitter = new EventEmitter();

export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  public sendMessage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = validateMessage(req.body);

    const message = await this.messageService.sendMessageOnDB(data);

    // 🔹 Notificar a todos los clientes conectados vía SSE
    messageEmitter.emit("new-message", message);

    return res.status(201).json({
      status: "success",
      data: message,
    });
  });

  public getMessages = catchAsync(async (_req: Request, res: Response, next: NextFunction) => {
    const messages = await this.messageService.getAllMessages();

    return res.status(200).json({
      status: "success",
      results: messages.length,
      data: messages,
    });
  });

  // 🔹 NUEVO: enviar eventos cuando haya mensajes nuevos
  public streamMessages = (req: Request, res: Response) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Enviar ping inicial
    res.write(`data: ${JSON.stringify({ type: "ping" })}\n\n`);

    const onNewMessage = (message: unknown) => {
      res.write(`data: ${JSON.stringify({ type: "new", message })}\n\n`);
    };

    messageEmitter.on("new-message", onNewMessage);

    req.on("close", () => {
      messageEmitter.off("new-message", onNewMessage);
    });
  };
}
