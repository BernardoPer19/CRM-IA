import { apiRequest } from "@/lib/api";

export async function getUsers() {
  return apiRequest({ url: "/api/users" });
}

export async function getUser(id: string) {
  return apiRequest({ url: `/api/users/${id}` });
}

export async function updateUser(id: string, data: any) {
  return apiRequest({
    method: "PUT",
    url: `/api/users/${id}`,
    data,
  });
}

export async function deleteUser(id: string) {
  return apiRequest({
    method: "DELETE",
    url: `/api/users/${id}`,
  });
}
