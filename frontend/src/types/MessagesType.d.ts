export interface MessageType {
  id: string;
  contenido: string;
  emisor: "ADMIN" | "USER" | string; // puedes ajustar si hay más emisores
  creadoPorId: string | null;
  createdAt: string; // ISO date
}

export interface SendMessageResponse {
  status: "success" | "error";
  data: Message;
}

export interface GetMessagesResponse {
  status: "success" | "error";
  data: Message[];
}
