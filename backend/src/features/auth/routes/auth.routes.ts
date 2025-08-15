import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { AuthServices } from "../services/authServices.js";
import type { PrismaClient } from "@prisma/client";
import { verifyUser } from "../../../middlewares/verifyUser.js";

export const iniciarAuthRouter = ({
    prisma,
}: {
    prisma: PrismaClient;
}): Router => {
    const authService = new AuthServices(prisma);
    const authController = new AuthController(authService);

    const router = Router();

    router.post("/login", authController.login);
    router.post("/logout", authController.logout);
    router.get("/profile", verifyUser, authController.getProfileData);
    router.post("/register", authController.register);
    router.post("/profileData", verifyUser, authController.getProfile);
    return router;
};
