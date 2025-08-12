// productRequests.ts
import { apiRequest } from "./genericRequest";
import { ProductType } from "@/types/ProductType";

// export async function getProducts() {
//   return apiRequest({    
//     method: "GET", 
//     url: "https://crm-ia-kk9d.onrender.com/products" });
// }


export async function getProducts(accessToken:string): Promise<ProductType[]> {
 
  const res = await fetch("http://localhost:4000/products/admin", {
     headers: {
      Cookie: `access_token=${accessToken}`,
    },
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
