// src/modules/auth/routes/auth.routes.ts
import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { AuthServices } from "../services/authServices.js";
import type { PrismaClient } from "@prisma/client";

export const iniciarAuthRouter = ({
    prisma,
}: {
    prisma: PrismaClient;
}): Router => {
    const authService = new AuthServices(prisma);
    const authController = new AuthController(authService);

    const router = Router();

    router.post("/register", authController.register);
    router.post("/login", authController.login);
    router.post("/logout", authController.logout);
    router.post("/profile", authController.getProfile);

    return router;
};
