import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";

const HeaderProducts = () => (
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold flex items-center">
        <Package className="mr-3 h-8 w-8" />
        Productos
      </h1>
      <p className="text-muted-foreground">
        Gestiona tu inventario de productos y categorías
      </p>
    </div>
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Nuevo Producto
    </Button>
  </div>
);

export default HeaderProducts;
