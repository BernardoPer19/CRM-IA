import { ClientType } from "@/types/ClientType";
import { apiRequest } from "./genericRequest";


export async function getClients() {
  return apiRequest({ url: "https://crm-ia-kk9d.onrender.com/clients" });
}

export async function getClient(id: string) {
  return apiRequest({ url: `https://crm-ia-kk9d.onrender.com/clients/${id}` });
}

export async function createClient(data: any) {
  return apiRequest({
    method: "POST",
    url: "https://crm-ia-kk9d.onrender.com/clients",
    data,
  });
}

export async function updateClient({ id, data }: { id: string; data: Partial<ClientType> }) {
  return apiRequest({
    method: "PUT",
    url: `https://crm-ia-kk9d.onrender.com/clients/${id}`,
    data,
  });
}

export async function deleteClient(id: string) {
  return apiRequest({
    method: "DELETE",
    url: `https://crm-ia-kk9d.onrender.com/clients/${id}`,
  });
}
