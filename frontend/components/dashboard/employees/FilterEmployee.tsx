"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useMemo } from "react";
import TableEmployee from "./TableEmployee";
import { UserType } from "@/types/AuthType";

export default function FilterEmployee({ employees }: { employees: UserType[] }) {
  const [input, setInput] = useState("");

  const filteredEmployees = useMemo(() => {
    const query = input.toLowerCase();
    return employees.filter(
      (e) =>
        e.name.toLowerCase().includes(query) ||
        e.lastName.toLowerCase().includes(query) ||
        e.email.toLowerCase().includes(query)
    );
  }, [input, employees]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros y Búsqueda</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, email o teléfono..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar por Rol
          </Button>
        </div>

        <TableEmployee employees={filteredEmployees} />
      </CardContent>
    </Card>
  );
}
