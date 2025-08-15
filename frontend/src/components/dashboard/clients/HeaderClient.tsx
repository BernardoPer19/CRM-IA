import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import React from "react";

const HeaderClient = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Users className="mr-3 h-8 w-8" />
            Clientes
          </h1>
          <p className="text-muted-foreground">
            Gestiona tu base de clientes y sus relaciones comerciales
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>
    </div>
  );
};

export default HeaderClient;
