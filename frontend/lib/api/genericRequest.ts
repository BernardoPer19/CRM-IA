import axios, { AxiosRequestConfig, Method } from "axios";

export interface ApiRequestOptions<T = any> {
  method: Method;
  url: string;
  data?: T;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  withAuth?: boolean; // activa cookies de sesión
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
    return response.data;
  } catch (error: any) {
    console.error("API Request Error:", error);
    throw error?.response?.data || error;
  }
}
