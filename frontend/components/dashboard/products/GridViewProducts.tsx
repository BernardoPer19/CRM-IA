"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, Eye, AlertTriangle } from "lucide-react";

const getStockStatus = (stock: number) => {
  if (stock === 0) return { label: 'Sin Stock', color: 'destructive' };
  if (stock <= 5) return { label: 'Stock Bajo', color: 'secondary' };
  return { label: 'En Stock', color: 'default' };
};

export default function GridViewProducts({ products }: { products: any[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        const stockStatus = getStockStatus(product.stock);
        return (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square relative bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.stock <= 5 && (
                <div className="absolute top-2 right-2">
                  <Badge variant="destructive" className="text-xs">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Bajo Stock
                  </Badge>
                </div>
              )}
            </div>
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold line-clamp-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description || "Sin descripción"}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">${product.price}</span>
                <Badge variant={stockStatus.color as any}>
                  {product.stock} unidades
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{product.category}</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" /> Ver Detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" /> Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
