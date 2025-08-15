import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone } from "lucide-react";
import DropDownActionsMenu from "./ui/DropDownActionsMenu";
import { UserType } from "@/types/AuthType";
import Image from "next/image";

interface TableEmployeeProps {
  employees: UserType[];
}

export default function TableEmployee({ employees }: TableEmployeeProps) {
  const getRoleColor = (role: string) => {
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
        <CardTitle>Lista de Empleados ({employees.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Empleado</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Clientes Asignados</TableHead>
                <TableHead>Fecha de Ingreso</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        {employee.img ? (
                          <Image
                            src={employee?.img ?? ""}
                            alt={employee.name}
                            loading="lazy"
                            width={1000}
                            height={1000}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <AvatarFallback>
                            {employee.name?.charAt(0) || ""}
                            {employee.lastName?.charAt(0) || ""}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {employee.name} {employee.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ID: #{employee.id.toString().padStart(4, "0")}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-3 w-3" />
                        {employee.email}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="mr-2 h-3 w-3" />
                        {employee.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(employee.role)}>
                      {employee.role === "ADMIN" ? "Administrador" : "Empleado"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="text-lg font-semibold">
                        {employee.clients?.length ?? 0}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        clientes
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(employee.createdAt).toLocaleDateString("es-ES")}
                    </div>
                  </TableCell>

                  <TableCell>
                    <DropDownActionsMenu
                      datID={employee.id}
                      see="Ver Perfil"
                      edit="Editar"
                      removeEmployee="Eliminar Empleado"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
