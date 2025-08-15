import { UserType } from "./AuthType";

export interface ClientType {
  id: string;
  name: string;
  email?: string | null;
  phone: string;
  assignedToId?: string | null;
  assignedTo?: UserType | null; // relación opcional
  createdAt: Date;
  updatedAt: Date;
}
