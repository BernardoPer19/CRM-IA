// controllers/messageController.ts
import type { Request, Response, NextFunction } from "express";
import { MessageService } from "../services/messagesService.js";
import { ZodError } from "zod";
import { validateMessage } from "../schemas/messageSchema.js";

export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  public sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = validateMessage(req.body);

      const message = await this.messageService.sendMessageOnDB(data);

      return res.status(201).json({
        status: "success",
        data: message,
      });
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          status: "fail",
          message: "Error de validación",
          errors: err.issues,
        });
      }
      return next(err);
    }
  };

  public getMessages = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const messages = await this.messageService.getAllMessages();

      return res.status(200).json({
        status: "success",
        results: messages.length,
        data: messages,
      });
    } catch (err) {
      return next(err);
    }
  };
}
