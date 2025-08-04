// src/features/Product/controllers/ProductController.ts
import type { Request, Response } from "express";
import { ProductService } from "../services/productService.js";
import { catchAsync } from "../../../middlewares/catchAsync.js";
import { validateCreate, validateUpdates } from "../schemas/productSchema.js";
import type { Product } from "@prisma/client";

export class ProductController {
    constructor(private readonly productService: ProductService) { }

    public getAll = catchAsync(async (_req: Request, res: Response) => {
        const products = await this.productService.getAllProducts();
        res.status(200).json({ success: true, data: products });
    });


    public getById = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = await this.productService.getProductById(id!);
        if (!product) {
            return res.status(404).json({ success: false, message: "Producto no encontrado" });
        }
        return res.status(200).json({ success: true, data: product }); // <-- return agregado aquí
    });


    public create = catchAsync(async (req: Request, res: Response) => {
        const parsedData = validateCreate(req.body);

        // Transformar undefined en null
        const data = {
            ...parsedData,
            description: parsedData.description ?? null,
            img: parsedData.img ?? null,
        };

        const product = await this.productService.createProduct(data);
        res.status(201).json({ success: true, data: product });
    });

    public update = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = validateUpdates(req.body);

        // 👇 Este cast soluciona el error TS2379
        const updateData = data as Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>;

        const updated = await this.productService.updateProduct(id!, updateData);

        res.status(200).json({ success: true, data: updated });
    });

    public delete = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const deleted = await this.productService.deleteProduct(id!);
        res.status(200).json({ success: true, data: deleted });
    });
}
