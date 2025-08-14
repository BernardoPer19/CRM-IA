// app/clients/[id]/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import { getClientById } from "@/lib/api/clientsReq";
import { ClientType } from "@/types/ClientType";
import { ClientDetail } from "./ClientDetail";

// ⚠ params como Promise para cumplir PageProps de Next 15
interface ClientPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function ClientDetailPage({ params }: ClientPageProps) {
  try {
    const { id } = await params;

    // 🔑 Obtener token desde cookies si es necesario
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return (
        <div className="text-center py-20 text-red-500">
          No autorizado: Token no encontrado
        </div>
      );
    }

    // 🔄 Fetch del cliente directamente en SSR
    const client: ClientType | null = await getClientById(id, accessToken);

    if (!client) {
      return (
        <div className="text-center py-20 text-gray-500">
          Cliente no encontrado
        </div>
      );
    }

    return (
      <div className="container mx-auto py-8 space-y-4">
        {/* Botón de regreso */}
        <Link
          href="/clients"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a clientes
        </Link>

        {/* Componente hijo que muestra detalle */}
        <ClientDetail client={client} />
      </div>
    );
  } catch (error) {
    console.error("❌ Error en ClientDetailPage:", error);
    return (
      <div className="text-center py-20 text-red-500">
        Ocurrió un error al cargar el cliente
      </div>
    );
  }
}
