import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { validateMessage } from "../schemas/messageSchema.js";
import { MessageService } from "../services/messagesService.js";
import { catchAsync } from "../../../middlewares/catchAsync.js";

export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  public sendMessage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = validateMessage(req.body);

    const message = await this.messageService.sendMessageOnDB(data);

    return res.status(201).json({
      status: "success",
      id: message.id,
      createdAt: message.creadoPorId,
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
}
