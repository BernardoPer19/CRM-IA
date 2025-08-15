// app/employees/[id]/UserDetail.tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { UserType } from "@/types/AuthType";

interface UserDetailProps {
  user: UserType; // ⚡ Ahora recibe el objeto completo
}

export function UserDetail({ user }: UserDetailProps) {
  // Color del badge según rol
  const getRoleColor = (role: UserType["role"]) => {
    const map = {
      ADMIN: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      EMPLEADO: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    };
    return (
      map[role] ??
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil del Empleado</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-6">
          <Avatar className="h-24 w-24">
            {user.img ? (
              <AvatarImage
                src={user.img}
                alt={`${user.name ?? ""} ${user.lastName ?? ""}`}
              />
            ) : (
              <AvatarFallback>
                {user.name?.charAt(0) ?? ""}
                {user.lastName?.charAt(0) ?? ""}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">
              {user.name} {user.lastName}
            </h2>
            <Badge className={getRoleColor(user.role)}>
              {user.role === "ADMIN" ? "Administrador" : "Empleado"}
            </Badge>
            <p className="text-sm text-muted-foreground mt-1">
              ID: #{user.id.toString().padStart(4, "0")}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center text-sm">
            <Mail className="mr-2 h-4 w-4" /> {user.email}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Phone className="mr-2 h-4 w-4" /> {user.phone}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Clientes asignados</p>
            <p className="text-lg font-semibold">{user.clients?.length ?? 0}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Fecha de ingreso</p>
            <p className="text-lg font-semibold">
              {new Date(user.createdAt).toLocaleDateString("es-ES")}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Última actualización
            </p>
            <p className="text-lg font-semibold">
              {new Date(user.updatedAt).toLocaleDateString("es-ES")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
