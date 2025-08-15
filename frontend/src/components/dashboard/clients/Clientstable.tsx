import { type ClientType } from "@/types/ClientType";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ClientsTableComponent from "./TableBody";

export default function ClientsTable({ clients }: { clients: ClientType[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Clientes ({clients.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <ClientsTableComponent clients={clients} />
      </CardContent>
    </Card>
  );
}
