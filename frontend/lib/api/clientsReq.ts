import { apiRequest } from "./genericRequest";


export async function getClients() {
  return apiRequest({ url: "/api/clients" });
}

export async function getClient(id: string) {
  return apiRequest({ url: `/api/clients/${id}` });
}

export async function createClient(data: any) {
  return apiRequest({
    method: "POST",
    url: "/api/clients",
    data,
  });
}

export async function updateClient(id: string, data: any) {
  return apiRequest({
    method: "PUT",
    url: `/api/clients/${id}`,
    data,
  });
}

export async function deleteClient(id: string) {
  return apiRequest({
    method: "DELETE",
    url: `/api/clients/${id}`,
  });
}
