// productRequests.ts
import { apiRequest } from "./genericRequest";
import { ProductType } from "@/types/ProductType";

export async function getProducts() {
  return apiRequest({ url: "https://crm-ia-kk9d.onrender.com/products" });
}

export async function createProduct(data: ProductType) {
  return apiRequest({
    method: "POST",
    url: "https://crm-ia-kk9d.onrender.com/products",
    data,
  });
}

export async function updateProduct({ id, data }: { id: string; data: Partial<ProductType> }) {
  return apiRequest({
    method: "PUT",
    url: `https://crm-ia-kk9d.onrender.com/products/${id}`,
    data,
  });
}

export async function deleteProduct(id: string) {
  return apiRequest({
    method: "DELETE",
    url: `https://crm-ia-kk9d.onrender.com/products/${id}`,
  });
}
