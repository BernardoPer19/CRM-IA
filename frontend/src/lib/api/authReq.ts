import { apiRequest } from "./axios/genericRequest";
import { RegisterTypeSchema } from '@/components/forms/schemas/RegisterSchema';

function normalizeAuthResponse(res: any) {
  return {
    success: res?.success ?? true, 
    message: res?.message ?? "",
    user: res?.user ?? null
  };
}

export async function loginRequest(data: { email: string; password: string }) {
  const res = await apiRequest({
    method: "POST",
    url: "/auth/login",
    data,
    withAuth: true,
  });
  return normalizeAuthResponse(res);
}

export async function registerRequest(data: RegisterTypeSchema) {
  const res = await apiRequest({
    method: "POST",
    url: "/auth/register",
    data,
    withAuth: false,
  });
  return normalizeAuthResponse(res);
}

export async function logoutRequest() {
  return apiRequest({
    method: "POST",
    url: "/auth/logout",
  });
}

export async function getCurrentUser() {
  const res = await apiRequest({
    method: "POST",
    url: "/auth/profile",
    withAuth: true,
  });
  return normalizeAuthResponse(res);
}


export async function getCurrentUserData() {
  const res = await apiRequest({
    method: "get",
    url: "/auth/profile",
    withAuth: true,
  });
  return normalizeAuthResponse(res);
}

