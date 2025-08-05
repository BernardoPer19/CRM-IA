// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Plus,
//   Search,
//   Filter,
//   MoreHorizontal,
//   Edit,
//   Trash2,
//   Eye,
//   Users,
// } from "lucide-react";
// import HeaderClient from "@/components/dashboard/clients/HeaderClient";
// import FilterClient from "@/components/dashboard/clients/FilterClient";
// import { useClients } from "@/hooks/useClients";

// const mockClients = [
//   {
//     id: 1,
//     name: "María González",
//     email: "maria@email.com",
//     phone: "+34 666 777 888",
//     employee: "Juan Pérez",
//     createdAt: "2024-01-15",
//     status: "Activo",
//   },
//   {
//     id: 2,
//     name: "Carlos Rodríguez",
//     email: "carlos@email.com",
//     phone: "+34 666 123 456",
//     employee: "Ana López",
//     createdAt: "2024-01-10",
//     status: "Activo",
//   },
//   {
//     id: 3,
//     name: "Elena Martínez",
//     email: "elena@email.com",
//     phone: "+34 666 987 654",
//     employee: "Juan Pérez",
//     createdAt: "2024-01-08",
//     status: "Inactivo",
//   },
//   {
//     id: 4,
//     name: "Roberto Silva",
//     email: "",
//     phone: "+34 666 456 789",
//     employee: "Ana López",
//     createdAt: "2024-01-05",
//     status: "Activo",
//   },
// ];

// export default function ClientsPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const { list } = useClients();

//   const filteredClients = list?.data?.filter(
//     (client) =>
//       client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       client.phone?.includes(searchTerm) ||
//       client.assignedToId?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <HeaderClient />
//       {/* Filters */}
//       <FilterClient />
//       {/* Clients Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Lista de Clientes ({filteredClients?.length})</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Cliente</TableHead>
//                   <TableHead>Contacto</TableHead>
//                   <TableHead>Empleado Asignado</TableHead>
//                   <TableHead>Fecha de Registro</TableHead>
//                   <TableHead>Estado</TableHead>
//                   <TableHead className="w-[50px]"></TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredClients?.map((client) => (
//                   <TableRow key={client.id}>
//                     <TableCell>
//                       <div className="flex items-center space-x-3">
//                         <Avatar className="h-10 w-10">
//                           <AvatarImage src={`/avatars/${client.id}.jpg`} />
//                           <AvatarFallback>
//                             {client.name
//                               .split(" ")
//                               .map((n) => n[0])
//                               .join("")}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <div className="font-medium">{client.name}</div>
//                           <div className="text-sm text-muted-foreground">
//                             ID: #{client.id.toString().padStart(4, "0")}
//                           </div>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div>
//                         {client.email && (
//                           <div className="text-sm">{client.email}</div>
//                         )}
//                         <div className="text-sm text-muted-foreground">
//                           {client.phone}
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="font-medium">{client.assignedToId}</div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="text-sm">
//                         {new Date(client.createdAt).toLocaleDateString("es-ES")}
//                       </div>
//                     </TableCell>

//                     <TableCell>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="sm">
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem>
//                             <Eye className="mr-2 h-4 w-4" />
//                             Ver Detalles
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             <Edit className="mr-2 h-4 w-4" />
//                             Editar
//                           </DropdownMenuItem>
//                           <DropdownMenuItem className="text-destructive">
//                             <Trash2 className="mr-2 h-4 w-4" />
//                             Eliminar
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
