import axios, { AxiosRequestConfig, Method } from "axios";

export interface ApiRequestOptions<T = any> {
  method: Method;
  url: string;
  data?: T;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  withAuth?: boolean;
}

export async function apiRequest<Response = any, Body = any>({
  method,
  url,
  data,
  params,
  headers = {},
  withAuth = true,
}: ApiRequestOptions<Body>): Promise<Response> {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      params,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      withCredentials: withAuth,
    };

    const response = await axios(config);
    console.log("✅ API response:", response);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      console.error("❌ API Request Error:", {
        message: error.message,
        status,
        url,
      });

      // Si es 401, devolvemos un valor seguro en vez de lanzar error
      if (status === 401) {
        console.warn("🔒 Usuario no autenticado.");
        // Puedes retornar un objeto controlado o lanzar si quieres
        throw { message: "Unauthorized", status: 401 }; // O retorna algo si prefieres
      }

      // Para otros errores, lanzar el mensaje del backend si existe
      throw error.response?.data || error;
    }

    // Si no es Axios error
    throw error;
  }
}
