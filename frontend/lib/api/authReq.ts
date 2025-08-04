import { apiRequest } from "./genericRequest";

export async function loginRequest(data: { email: string; password: string }) {
  return apiRequest({
    method: "POST",
    url: "https://crm-ia-kk9d.onrender.com/auth/login",
    data,
    withAuth: false,
  });
}

export async function registerRequest(data: { name: string; email: string; password: string }) {
  return apiRequest({
    method: "POST",
    url: "https://crm-ia-kk9d.onrender.com/auth/register",
    data,
    withAuth: false,
  });
}

export async function logoutRequest() {
  return apiRequest({
    method: "POST",
    url: "https://crm-ia-kk9d.onrender.com/auth/logout",
  });
}

export async function getCurrentUser() {
  return apiRequest({
    method: "GET",
    url: "https://crm-ia-kk9d.onrender.com/auth/me",
  });
}
