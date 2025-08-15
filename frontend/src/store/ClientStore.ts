import { ClientType } from "@/types/ClientType";
import { create } from "zustand";

interface ClientStore {
  clients: ClientType[];
  filteredClients: ClientType[];
  searchTerm: string;

  setClients: (data: ClientType[]) => void;
  setSearchTerm: (term: string) => void;
}

export const useClientStore = create<ClientStore>((set, get) => ({
  clients: [],
  filteredClients: [],
  searchTerm: "",

  setClients: (data) => {
    const term = get().searchTerm;
    const filtered = filterClients(data, term);
    set({ clients: data, filteredClients: filtered });
  },

  setSearchTerm: (term) => {
    const data = get().clients;
    const filtered = filterClients(data, term);
    set({ searchTerm: term, filteredClients: filtered });
  },
}));

function filterClients(clients: ClientType[], term: string): ClientType[] {
  return clients.filter(
    (client) =>
      client.name?.toLowerCase().includes(term.toLowerCase()) ||
      client.email?.toLowerCase().includes(term.toLowerCase()) ||
      client.phone?.includes(term) ||
      client.assignedToId?.toLowerCase().includes(term.toLowerCase())
  );
}
