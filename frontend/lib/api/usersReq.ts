import { UserType } from "@/types/AuthType";
import { apiRequest } from "./axios/genericRequest";


export async function getEmployees(accessToken: string): Promise<UserType[]> {
  try {
    const res = await fetch("https://crm-ia-production.up.railway.app/employee", {
      headers: {
        Cookie: `access_token=${accessToken}`, // Pasa el token
      },
      cache: "no-cache",
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ SSR Fetch failed:", errorText);
      throw new Error(`Failed to fetch employees: ${res.status} ${res.statusText}`);
    }

    const data: { employees: UserType[] } = await res.json();
    return data.employees;
  } catch (error) {
    console.error("❌ Error in getEmployees:", error);
    throw error;
  }
}

export async function getEmployeeById(id: string, accessToken: string): Promise<UserType> {
  const res = await fetch(`/employee/${id}`, {
    headers: {
      Cookie: `access_token=${accessToken}`, // Pasa el token
    },
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Empleado no encontrado");
  return res.json();
}

export async function updateUser({ id, data }: { id: string; data: Partial<UserType> }) {
  return apiRequest({
    method: "PUT",
    url: `/employee/${id}`,
    data,
  });
}

export async function deleteUser(id: string) {
  return apiRequest({
    method: "DELETE",
    url: `/employee/${id}`,
    withAuth: true
  });
}
