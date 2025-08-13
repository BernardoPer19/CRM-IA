// src/features/Product/routes/initProductRoutes.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { ProductService } from "../services/productService.js";
import { ProductController } from "../controllers/productController.js";
import { verifyUser } from "../../../middlewares/verifyUser.js";
import { permissionRoles } from "../../../middlewares/permissionRoles.js";

export const iniciarProductRouter = ({ prisma }: { prisma: PrismaClient }): Router => {
  const router = Router();
  const service = new ProductService(prisma);
  const controller = new ProductController(service);

  router.get("/", controller.getAll);
  router.get("/:id", controller.getById);
  router.post("/", verifyUser, permissionRoles("ADMIN","EMPLOYEE"), controller.create);
  router.put("/:id", verifyUser, permissionRoles("ADMIN","EMPLOYEE"), controller.update);
  router.delete("/:id", verifyUser, permissionRoles("ADMIN","EMPLOYEE"), controller.delete);

  return router;
};
