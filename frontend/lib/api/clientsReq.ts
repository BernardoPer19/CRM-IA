import { ClientType } from "@/types/ClientType";
import { apiRequest } from "./axios/genericRequest";




export async function getClients(): Promise<ClientType[]> {

  const res = await fetch("https://crm-ia-production.up.railway.app/clients", {
    cache: "no-cache",
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error("❌ SSR Fetch failed:", await res.text());
    throw new Error("Failed to fetch clients");
  }

  return res.json();
}

export async function getClient(id: string) {
  return apiRequest({
    method: "GET",
    url: `/clients${id}`,
    withAuth: true,
  });
}

export async function createClient(data: any) {
  return apiRequest({
    method: "POST",
    url: "/clients",
    withAuth: true,
    data,
  });
}

export async function updateClient({ id, data }: { id: string; data: Partial<ClientType> }) {
  return apiRequest({
    method: "PUT",
    url: `/clients/${id}`,
    withAuth: true,
    data,
  });
}

export async function deleteClient(id: string) {
  return apiRequest({
    method: "DELETE",
    url: `/clients/${id}`,
    withAuth: true,
  });
}
