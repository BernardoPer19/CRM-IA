import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ClientType } from "@/types/ClientType";

interface ClientDetailProps {
  client: ClientType;
}

export function ClientDetail({ client }: ClientDetailProps) {
  if (!client) {
    return (
      <div className="text-center py-20 text-gray-500">
        Cliente no encontrado
      </div>
    );
  }

  // Badge según si tiene asignado alguien
  const getAssignmentBadgeColor = (assigned: boolean) =>
    assigned
      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil del Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-6">
          <Avatar className="h-24 w-24">
            <AvatarFallback>{client.name?.charAt(0) ?? "C"}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{client.name}</h2>
            <Badge className={getAssignmentBadgeColor(!!client.assignedTo)}>
              {client.assignedTo ? `Asignado a ${client.assignedTo.name}` : "Sin asignar"}
            </Badge>
            <p className="text-sm text-muted-foreground mt-1">
              ID: #{client.id.toString().padStart(4, "0")}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {client.email && (
            <div className="flex items-center text-sm">
              <Mail className="mr-2 h-4 w-4" /> {client.email}
            </div>
          )}
          <div className="flex items-center text-sm text-muted-foreground">
            <Phone className="mr-2 h-4 w-4" /> {client.phone}
          </div>
          <div className="col-span-full">
            <p className="text-sm text-muted-foreground">Fecha de registro</p>
            <p className="text-lg font-semibold">
              {new Date(client.createdAt).toLocaleDateString("es-ES")}
            </p>
          </div>
          <div className="col-span-full">
            <p className="text-sm text-muted-foreground">Última actualización</p>
            <p className="text-lg font-semibold">
              {new Date(client.updatedAt).toLocaleDateString("es-ES")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
