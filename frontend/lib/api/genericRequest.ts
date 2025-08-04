import axios, { AxiosRequestConfig, Method } from "axios";

interface RequestOptions {
    method?: Method;
    url: string;
    data?: any;
    params?: Record<string, any>;
    headers?: Record<string, string>;
    withAuth?: boolean; // Para agregar auth token si usás uno
}

export async function apiRequest<T = any>({
    method = "GET",
    url,
    data,
    params,
    headers = {},
    withAuth = true,
}: RequestOptions): Promise<T> {
    try {
        const token = withAuth ? getAuthToken() : null;

        const config: AxiosRequestConfig = {
            method,
            url,
            data,
            params,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...headers,
            },
            withCredentials: true, // si usás cookies de sesión
        };

        const response = await axios(config);
        return response.data;
    } catch (error: any) {
        console.error("API Request Error:", error);
        throw error?.response?.data || error;
    }
}

// Esto puede venir de Zustand, cookies, localStorage, etc.
function getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
}
