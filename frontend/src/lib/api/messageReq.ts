// lib/api/messages.ts
import { GetMessagesResponse, MessageType, SendMessageResponse } from "@/types/MessagesType";
import { apiRequest } from "./axios/genericRequest";

export async function getMessages(): Promise<GetMessagesResponse> {
  return apiRequest({
    method: "GET",
    url: "/messages",
    withAuth: true, // si necesitas enviar cookies/token
  });
}

export async function sendMessage(
  data: Pick<MessageType, "contenido" | "emisor">
): Promise<SendMessageResponse> {
  return apiRequest({
    method: "POST",
    url: "/messages",
    data,
    withAuth: true,
  });
}
