import { ClientType } from "@/types/ClientType";
import { apiRequest } from "./axios/genericRequest";




export async function getClients(accessToken: string): Promise<ClientType[]> {

  const res = await fetch("https://crm-ia-production.up.railway.app/clients", {
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

  return res.json();
}

export async function getClientById(id: string, accessToken: string): Promise<ClientType> {
  const res = await fetch(`http://localhost:4000/clients/${id}`, {
    headers: {
      Cookie: `access_token=${accessToken}`,
    },
    cache: "no-cache", // siempre traer datos frescos
    next: { revalidate: 3600 }, // opcional: revalidación
  });

  if (!res.ok) {
    console.error("❌ SSR Fetch failed:", await res.text());
    throw new Error(`Failed to fetch client with id ${id}`);
  }

  return res.json();
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
