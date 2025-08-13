import { UserType } from "@/types/AuthType";
import { apiRequest } from "./axios/genericRequest";


export async function getEmployees(accessToken: string): Promise<UserType[]> {
  try {
    const res = await fetch("https://crm-ia-production.up.railway.app/employee", {
      headers: {
        Cookie: `access_token=${accessToken}`,
      },
      cache: "no-cache",
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ SSR Fetch failed:", errorText);
      throw new Error(`Failed to fetch employees: ${res.status} ${res.statusText}`);
    }

    const data: { clients: UserType[] } = await res.json();
    return data.clients;
  } catch (error) {
    console.error("❌ Error in getEmployees:", error);
    throw error;
  }
}

export async function getEmployeeById(id: string): Promise<UserType> {
  const res = await fetch(`https://crm-ia-production.up.railway.app/employee/${id}`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Empleado no encontrado");
  return res.json();
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
