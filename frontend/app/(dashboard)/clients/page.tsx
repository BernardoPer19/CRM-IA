import { getClients } from "@/lib/api/clientsReq";
import HeaderClient from "@/components/dashboard/clients/HeaderClient";
import FilterClient from "@/components/dashboard/clients/FilterClient";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {

  const clients = await getClients();

  return (
    <div className="p-6 space-y-6">
      <HeaderClient />
      <FilterClient clients={clients}  />
    </div>
  );
}
