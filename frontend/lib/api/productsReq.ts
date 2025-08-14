// productRequests.ts
import { apiRequest } from "./axios/genericRequest";
import { ProductDatum, ProductType } from "@/types/ProductType";



export async function getProducts(accessToken: string): Promise<ProductDatum[]> {
  try {
    const res = await fetch("http://localhost:4000/products/admin", {
      headers: {
        Cookie: `access_token=${accessToken}`, 
      },
      cache: "no-cache",
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ SSR Fetch failed:", errorText);
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }

    const data: ProductType = await res.json();

    if (!data.success || !data.data) {
      console.error("❌ SSR Fetch returned invalid data:", data);
      throw new Error("Invalid products data received from server");
    }

    return data.data; // Devuelve solo el array de productos
  } catch (error) {
    console.error("❌ Error in getProducts:", error);
    throw error;
  }
}


export async function getProductById(id: string, accessToken: string): Promise<ProductDatum> {
  try {
    const res = await fetch(
      `http://localhost:4000/products/admin/${id}`,
      {
        headers: {
          Cookie: `access_token=${accessToken}`, // Pasa el token
        },
        cache: "no-cache",
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Fetch product by ID failed:", errorText);
      throw new Error(`Failed to fetch product with id ${id}: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (!data.success || !data.data) {
      console.error("❌ Fetch returned invalid data:", data);
      throw new Error("Invalid product data received from server");
    }

    return data.data; // data.data es un array de productos, devolvemos el primero
  } catch (error) {
    console.error("❌ Error in getProductById:", error);
    throw error;
  }
}
export async function createProduct(data: ProductType) {
  return apiRequest({
    method: "POST",
    url: "/products/admin",
    data,
  });
}

export async function updateProduct({ id, data }: { id: string; data: Partial<ProductType> }) {
  return apiRequest({
    method: "PUT",
    url: `/products/admin/${id}`,
    data,
  });
}

export async function deleteProduct(id: string) {
  return apiRequest({
    method: "DELETE",
    url: `/products/admin/${id}`, withAuth: true
  });
}
