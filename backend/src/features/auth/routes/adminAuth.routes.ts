// src/modules/auth/routes/auth.routes.ts
import { Router } from "express";
import { AuthServices } from "../services/authServices.js";
import type { PrismaClient } from "@prisma/client/extension";
import { AuthController } from "../controllers/authController.js";
import { permissionRoles } from "../../../middlewares/permissionRoles.js";
import { verifyUser } from "../../../middlewares/verifyUser.js";

export const iniciarAuthAdminRouter = ({
    prisma,
}: {
    prisma: PrismaClient;
}): Router => {
    const authService = new AuthServices(prisma);
    const authController = new AuthController(authService);

    const router = Router();


    router.get("/welcome",
        verifyUser,
        permissionRoles("ADMIN"),
        (_req, res) => { res.send("hola admin") },
    );

    router.post(
        "/register",
        verifyUser,
        permissionRoles("ADMIN"),
        authController.register
    );
    router.post(
        "/logout",
        verifyUser,
        permissionRoles("ADMIN"),
        authController.logout
    );

    router.post(
        "/profile",
        verifyUser,
        permissionRoles("ADMIN"),
        authController.getProfile
    );

    return router;
};
