// routes/message.routes.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { MessageService } from "../services/messagesService.js";
import { MessageController } from "../controllers/messageController.js";
import { verifyUser } from "../../../middlewares/verifyUser.js";
import { permissionRoles } from "../../../middlewares/permissionRoles.js";

export function iniciarMessagerRouter(prisma: PrismaClient): Router {
    const messageService = new MessageService(prisma);
    const messageController = new MessageController(messageService);

    const router = Router();

    router.post(
        "/",
        verifyUser,
        permissionRoles("ADMIN", "EMPLOYEE", "IA"),
        messageController.sendMessage
    );

    router.get(
        "/",
        verifyUser,
        permissionRoles("ADMIN", "EMPLOYEE", "IA"),
        messageController.getMessages
    );

    // 🔹 Nueva ruta SSE para escuchar mensajes en tiempo real
    router.get(
        "/stream",
        verifyUser,
        permissionRoles("ADMIN", "EMPLOYEE", "IA"),
        messageController.streamMessages
    );

    return router;
}
