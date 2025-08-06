// src/modules/client/routes/client.routes.ts
import { Router } from "express";
import type { PrismaClient } from "@prisma/client";

import { Role } from "@prisma/client";
import { permissionRoles } from "../../../middlewares/permissionRoles.js";
import { verifyUser } from "../../../middlewares/verifyUser.js";
import { ClientService } from "../services/clientService.js";
import { ClientController } from "../controllers/clientControllers.js";

export function iniciarClientRouter({ prisma }: { prisma: PrismaClient }): Router {
    const router = Router();

    const clientService = new ClientService(prisma);
    const clientController = new ClientController(clientService);

    router.use(verifyUser);

    router.get(
        "/",
        verifyUser,
        permissionRoles(Role.ADMIN, Role.EMPLOYEE),
        clientController.getAllClients
    );
    router.get(
        "/:id",
        verifyUser,
        permissionRoles(Role.ADMIN, Role.EMPLOYEE),
        clientController.getClientById
    );
    router.post(
        "/",
        verifyUser,
        permissionRoles(Role.ADMIN, Role.EMPLOYEE),
        clientController.createClient
    );
    router.delete(
        "/:id",
        permissionRoles(Role.ADMIN),
        clientController.deleteClient
    );

    router.put(
        "/:id",
        permissionRoles(Role.ADMIN, Role.EMPLOYEE),
        clientController.updateClient
    );
    return router;
}
