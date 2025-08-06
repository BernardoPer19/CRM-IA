"use client";

import { useState } from "react";
import { type ClientType } from "@/types/ClientType";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";

export default function ClientsSearchTable({ clients }: { clients: ClientType[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(
    (client) =>
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone?.includes(searchTerm) ||
      client.assignedToId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <input
        placeholder="Buscar..."
        className="w-full border rounded-md p-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
            {filteredClients.map((client) => (
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
                <TableCell>{new Date(client.createdAt).toLocaleDateString("es-ES")}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> Ver
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
