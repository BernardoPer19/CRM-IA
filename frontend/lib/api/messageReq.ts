import { apiRequest } from "./genericRequest";

export async function getMessages() {
    return apiRequest({ url: "/api/products" });
}

export async function sendMessage(data: any) {
    return apiRequest({
        method: "POST",
        url: "/api/products",
        data,
    });
}
