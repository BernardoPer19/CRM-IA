import { apiRequest } from "./genericRequest";

export async function getProducts() {
  return apiRequest({ url: "/api/products" });
}

export async function getProduct(id: string) {
  return apiRequest({ url: `/api/products/${id}` });
}

export async function createProduct(data: any) {
  return apiRequest({
    method: "POST",
    url: "/api/products",
    data,
  });
}

export async function updateProduct(id: string, data: any) {
  return apiRequest({
    method: "PUT",
    url: `/api/products/${id}`,
    data,
  });
}

export async function deleteProduct(id: string) {
  return apiRequest({
    method: "DELETE",
    url: `/api/products/${id}`,
  });
}
