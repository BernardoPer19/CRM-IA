import { apiRequest } from "./genericRequest";

export async function login(data: { email: string; password: string }) {
  return apiRequest({
    method: "POST",
    url: "/api/auth/login",
    data,
    withAuth: false,
  });
}

export async function register(data: { name: string; email: string; password: string }) {
  return apiRequest({
    method: "POST",
    url: "/api/auth/register",
    data,
    withAuth: false,
  });
}

export async function logout() {
  return apiRequest({
    method: "POST",
    url: "/api/auth/logout",
  });
}

export async function getCurrentUser() {
  return apiRequest({
    method: "GET",
    url: "/api/auth/me",
  });
}
