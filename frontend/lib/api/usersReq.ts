import { UserType } from "@/types/AuthType";
import { apiRequest } from "./genericRequest";


export async function getUsers() {
  return apiRequest({ url: "https://crm-ia-kk9d.onrender.com/users" });
}

export async function getUser(id: string) {
  return apiRequest({ url: `https://crm-ia-kk9d.onrender.com/users/${id}` });
}

export async function updateUser({ id, data }: { id: string; data: Partial<UserType> }) {
  return apiRequest({
    method: "PUT",
    url: `https://crm-ia-kk9d.onrender.com/users/${id}`,
    data,
  });
}

export async function deleteUser(id: string) {
  return apiRequest({
    method: "DELETE",
    url: `https://crm-ia-kk9d.onrender.com/users/${id}`,
  });
}
