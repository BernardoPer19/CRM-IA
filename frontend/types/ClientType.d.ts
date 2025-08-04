export interface ClientType {
    name?: string;
    email?: string;
    phone?: string;
    //   state?: "POTENCIAL" | "ACTIVO" | "PERDIDO" | "FRIO";
    assignedToId?: string | null;
}
