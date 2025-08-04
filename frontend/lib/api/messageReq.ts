import { apiRequest } from "./genericRequest";

export async function getMessages() {
    return apiRequest({ url: "https://crm-ia-kk9d.onrender.com/messages" });
}

export async function sendMessage(data: any) {
    return apiRequest({
        method: "POST",
        url: "https://crm-ia-kk9d.onrender.com/messages",
        data,
    });
}
