"use client";

import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/useUsers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useProducts } from "@/hooks/useProducts";

interface Props {
  productId: string;
}

const DropProductMenu = ({ productId }: Props) => {
  const { remove } = useProducts();
  const router = useRouter();

  const handleDelete = () => {
    remove?.mutate(productId, {
      onSuccess: () => router.refresh(),
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-1">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => router.push(`/products/${productId}`)}
        >
          <Eye className="h-4 w-4 " />
          Ver Detalles
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2">
          <Edit className="h-4 w-4 " />
          Editar
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex items-center gap-2 text-red-600"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropProductMenu;
