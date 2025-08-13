import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getEmployeeById } from "@/lib/api/usersReq";
import { UserType } from "@/types/AuthType";

interface UserDetailProps {
  id: string;
}

/**
 * Muestra el perfil detallado de un empleado.
 * @param id - ID del empleado a mostrar
 */
export async function UserDetail({ id }: UserDetailProps) {
  // 🔹 Aseguramos que el tipo de respuesta coincide con UserType
  const employee: UserType = await getEmployeeById(id);

  // 🔹 Retorna clases de Tailwind dependiendo del rol
  const getRoleColor = (role: UserType["role"]): string => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "EMPLOYEE":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil del Empleado</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-6">
          <Avatar className="h-24 w-24">
            {employee.img ? (
              <AvatarImage
                src={employee.img}
                alt={`${employee.name ?? ""} ${employee.lastName ?? ""}`}
              />
            ) : (
              <AvatarFallback>
                {employee.name?.charAt(0) ?? ""}
                {employee.lastName?.charAt(0) ?? ""}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">
              {employee.name} {employee.lastName}
            </h2>
            <Badge className={getRoleColor(employee.role)}>
              {employee.role === "ADMIN" ? "Administrador" : "Empleado"}
            </Badge>
            <p className="text-sm text-muted-foreground mt-1">
              ID: #{employee.id.toString().padStart(4, "0")}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center text-sm">
            <Mail className="mr-2 h-4 w-4" /> {employee.email}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Phone className="mr-2 h-4 w-4" /> {employee.phone}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Clientes asignados</p>
            <p className="text-lg font-semibold">
              {employee.clients?.length ?? 0}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Fecha de ingreso</p>
            <p className="text-lg font-semibold">
              {new Date(employee.createdAt).toLocaleDateString("es-ES")}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Última actualización
            </p>
            <p className="text-lg font-semibold">
              {new Date(employee.updatedAt).toLocaleDateString("es-ES")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
