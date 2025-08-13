// src/modules/client/routes/client.routes.ts
import { Router } from "express";
import type { PrismaClient } from "@prisma/client";

import { Role } from "@prisma/client";
import { EmplooyService } from "../services/clientService.js";
import { EmployeeController } from "../controllers/employeService.js";
import { verifyUser } from "../../../middlewares/verifyUser.js";
import { permissionRoles } from "../../../middlewares/permissionRoles.js";

export function iniciarEmployeeRouter({ prisma }: { prisma: PrismaClient }): Router {
    const router = Router();

    const employeeService = new EmplooyService(prisma);
    const employeeController = new EmployeeController(employeeService);


    router.get(
        "/", employeeController.getAllEmployees
    );
    router.get(
        "/:id", 
        employeeController.getEmployeesById
    );

    router.delete(
        "/:id", verifyUser,
        permissionRoles(Role.ADMIN, Role.EMPLOYEE),
        employeeController.deleteEmployees
    );

    router.put(
        "/:id", verifyUser,
        permissionRoles(Role.ADMIN, Role.EMPLOYEE),
        employeeController.updateEmployees
    );
    return router;
}
