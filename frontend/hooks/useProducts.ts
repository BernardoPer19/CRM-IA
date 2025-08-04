// useProducts.ts
import { useCrud } from "./useCrud";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "@/lib/api/productsReq";
import { ProductType } from "@/types/ProductType";

export const useProducts = () =>
    useCrud<
        ProductType,
        ProductType,
        { id: string; data: Partial<ProductType> },
        string
    >({
        key: "products",
        queryFn: getProducts,
        createFn: createProduct,
        updateFn: updateProduct,
        deleteFn: deleteProduct,
    });
