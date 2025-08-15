// types/MessagesType.ts



export interface MessageType {
  id: string;
  contenido: string;
  emisor: Emisor; // o como lo tengas en backend
  creadoPorId?: string | null;
  createdAt: string; // ISO date
}

export interface SendMessageResponse {
  status: "success" | "error";
  data: MessageType;
}

export interface GetMessagesResponse {
  status: "success" | "error";
  data: MessageType[];
}


