import { type ClientType } from "@/types/ClientType";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ActionsDropdown from "./ActionDropDown";

export default function ClientsTableComponent({ clients }: { clients: ClientType[] }) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Empleado</TableHead>
            <TableHead>Registro</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`/avatars/${client.id}.jpg`} />
                    <AvatarFallback>
                      {client.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-muted-foreground">
                      ID: #{client.id.toString().padStart(4, "0")}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>{client.email}</div>
                <div className="text-sm text-muted-foreground">{client.phone}</div>
              </TableCell>
              <TableCell>{client.assignedToId}</TableCell>
              <TableCell>
                {new Date(client.createdAt).toLocaleDateString("es-ES")}
              </TableCell>
              <TableCell>
                <ActionsDropdown clientId={client.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
