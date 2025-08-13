import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// 🔹 Genera rutas estáticas en build-time
import { getEmployees } from "@/lib/api/usersReq";
import { UserType } from "@/types/AuthType";
import { UserDetail } from "./UserDetail";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const employees: UserType[] = await getEmployees();

  return employees.map((emp) => ({
    id: emp.id.toString(),
  }));
}

// 🔹 Nuevo tipado para Next.js 15 (params es Promise)
interface EmployeePageProps {
  params: Promise<{ id: string }>;
}

export default async function EmployeeDetailPage({ params }: EmployeePageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto py-8 space-y-4">
      {/* Botón de regreso */}
      <Link
        href="/employees"
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a empleados
      </Link>

      {/* Componente hijo que hace fetch */}
      <UserDetail id={id} />
    </div>
  );
}
