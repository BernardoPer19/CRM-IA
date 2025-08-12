import { apiRequest } from "./axios/genericRequest";
import { RegisterTypeSchema } from '@/components/forms/schemas/RegisterSchema';

export async function loginRequest(data: { email: string; password: string }) {
  return apiRequest({
    method: "POST",
    url: "/auth/login",
    data,
    withAuth: true, // Opcional, porque es true por defecto
  });
}

export async function registerRequest(data: RegisterTypeSchema) {
  return apiRequest({
    method: "POST",
    url: "/auth/register",
    data,
    withAuth: false, // Aquí explícito porque es false
  });
}

export async function logoutRequest() {
  return apiRequest({
    method: "POST",
    url: "/auth/logout",
    // withAuth: true, // opcional
  });
}

export async function getCurrentUser() {
  return apiRequest({
    method: "POST",
    url: "/auth/profile",
    withAuth: true, // opcional
  });
}
