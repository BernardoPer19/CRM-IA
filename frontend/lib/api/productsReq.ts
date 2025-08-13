// productRequests.ts
import { apiRequest } from "./axios/genericRequest";
import { ProductType } from "@/types/ProductType";



export async function getProducts(): Promise<ProductType[]> {

  const res = await fetch("http://localhost:4000/products/admin", {
    cache: "no-cache",
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error("❌ SSR Fetch failed:", await res.text());
    throw new Error("Failed to fetch clients");
  }

  const data = await res.json();
  return data.data;
}


export async function getProductById(id: string): Promise<ProductType> {
  const res = await fetch(`http://localhost:4000/products/admin/${id}`, {
    cache: "no-cache",
    next: { revalidate: 3600 }, // opcional, para ISR
  });

  if (!res.ok) {
    console.error("❌ Fetch product by ID failed:", await res.text());
    throw new Error(`Failed to fetch product with id ${id}`);
  }

  const data = await res.json();
  return data.data; // asumimos que tu API responde con { data: ProductType }
}

export async function createProduct(data: ProductType) {
  return apiRequest({
    method: "POST",
    url: "https://crm-ia-kk9d.onrender.com/products/admin",
    data,
  });
}

export async function updateProduct({ id, data }: { id: string; data: Partial<ProductType> }) {
  return apiRequest({
    method: "PUT",
    url: `https://crm-ia-kk9d.onrender.com/products/admin/${id}`,
    data,
  });
}

export async function deleteProduct(id: string) {
  return apiRequest({
    method: "DELETE",
    url: `https://crm-ia-kk9d.onrender.com/products/admin/${id}`, withAuth: true
  });
}
