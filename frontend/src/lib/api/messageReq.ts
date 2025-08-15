import { GetMessagesResponse, MessageType, SendMessageResponse } from "@/types/MessagesType";
import { apiRequest } from "./axios/genericRequest";

export async function getMessages(): Promise<GetMessagesResponse> {
    return apiRequest({
        method: "GET",
        url: "https://crm-ia-kk9d.onrender.com/messages",
    });
}

export async function sendMessage(
    data: Pick<MessageType, "contenido" | "emisor">
): Promise<SendMessageResponse> {
    return apiRequest({
        method: "POST",
        url: "https://crm-ia-kk9d.onrender.com/messages",
        data,
    });
}
