import { ClientType } from "@/types/ClientType";
import { useCrud } from "./useCrud";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "@/lib/api/clientsReq";

export const useClients = () =>
  useCrud<ClientType, ClientType, { id: string; data: Partial<ClientType> }, string>({
    key: "clients",
    queryFn: getClients,
    createFn: createClient,
    updateFn: updateClient,
    deleteFn: deleteClient,
  });
