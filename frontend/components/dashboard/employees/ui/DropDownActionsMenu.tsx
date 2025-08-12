"use client";

import { useRouter } from "next/navigation";  // ojo, no next/router
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUsers } from "@/hooks/useUsers";

import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";

interface Props {
  see: string;
  edit: string;
  removeEmployee: string;
  datID: string;
}

const DropDownActionsMenu = ({ see, edit, removeEmployee, datID }: Props) => {
  const { remove } = useUsers();
  const router = useRouter();

  const handleDelete = () => {
    remove?.mutate(datID, {
      onSuccess: () => {
        // recarga la ruta para refrescar la UI
        router.refresh();
      },
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" />
            {see}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            {edit}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className="text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {removeEmployee}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDownActionsMenu;
