import { UserType } from "@/types/AuthType";
import { apiRequest } from "./axios/genericRequest";


export async function getEmployees(accessToken: string): Promise<UserType[]> {
  const res = await fetch("http://localhost:4000/employee", {
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
  return data.clients;
}

export async function getUser(id: string) {
  return apiRequest({
    method: "GET",
    url: `https://crm-ia-kk9d.onrender.com/users/${id}`
  });
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
    url: `http://localhost:4000/employee/${id}`,
    withAuth: true
  });
}
