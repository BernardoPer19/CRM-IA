import { ClientType } from "@/types/ClientType";
import { useCrud } from "./useCrud";
import {
  createClient,
  updateClient,
  deleteClient,
} from "@/lib/api/clientsReq";

export const useClients = () =>
  useCrud<ClientType, ClientType, { id: string; data: Partial<ClientType> }, string>({
    key: "clients",
    createFn: createClient,
    updateFn: updateClient,
    deleteFn: deleteClient,
  });
