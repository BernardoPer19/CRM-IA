import { Role } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import type { RegisterUser } from "../features/auth/types/interfaces/userInterface.js";

export const permissionRoles = (...rolesPermitidos: Role[]) => {
    return (
        req: Request & { user?: RegisterUser },
        res: Response,
        next: NextFunction
    ) => {
        const userRol = req.user?.role;
        console.log(userRol);

        if (!userRol || !rolesPermitidos.includes(userRol)) {
            return res
                .status(403)
                .json({ message: "No tienes permisos para acceder a esta ruta" });
        }

        return next(); 
    };
};
