// app/employees/[id]/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import { getEmployeeById } from "@/lib/api/usersReq";
import { UserType } from "@/types/AuthType";
import { UserDetail } from "./UserDetail";

// Forzar SSR dinámico
export const dynamic = "force-dynamic";

// ⚠ params como Promise para cumplir PageProps de Next 15
interface EmployeePageProps {
  params: Promise<{ id: string }>;
}

export default async function EmployeeDetailPage({ params }: EmployeePageProps) {
  try {
    const { id } = await params;

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return (
        <div className="text-center py-20 text-red-500">
          No autorizado: Token no encontrado
        </div>
      );
    }

    const employee: UserType | null = await getEmployeeById(id, accessToken);

    if (!employee) {
      return (
        <div className="text-center py-20 text-gray-500">
          Empleado no encontrado
        </div>
      );
    }

    return (
      <div className="container mx-auto py-8 space-y-4">
        <Link
          href="/employees"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a empleados
        </Link>
        <UserDetail user={employee} />
      </div>
    );
  } catch (error) {
    console.error("❌ Error en EmployeeDetailPage:", error);
    return (
      <div className="text-center py-20 text-red-500">
        Ocurrió un error al cargar el empleado
      </div>
    );
  }
}
