import { apiRequest } from "./genericRequest";
import { RegisterTypeSchema } from '@/components/forms/schemas/RegisterSchema';

export async function loginRequest(data: { email: string; password: string }) {
  return apiRequest({
    method: "POST",
    url: "http://localhost:4000/auth/login",
    data,
    withAuth: true,
  });
}

export async function registerRequest(data: RegisterTypeSchema) {
  return apiRequest({
    method: "POST",
    url: "http://localhost:4000/auth/register",
    data,
    withAuth: false,
  });
}

export async function logoutRequest() {
  return apiRequest({
    method: "POST",
    url: "http://localhost:4000/auth/logout",
  });
}

export async function getCurrentUser() {
  return apiRequest({
    method: "POST",
    url: "http://localhost:4000/auth/profile",
    withAuth: true,
  });
}
