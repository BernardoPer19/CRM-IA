import { Button } from "@/components/ui/button";
import { UserCheck, Plus } from "lucide-react";

export default function HeaderEmployee() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold flex items-center">
          <UserCheck className="mr-3 h-8 w-8" />
          Empleados
        </h1>
        <p className="text-muted-foreground">
          Gestiona tu equipo de trabajo y sus asignaciones
        </p>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Nuevo Empleado
      </Button>
    </div>
  );
}
