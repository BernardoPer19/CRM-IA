import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button"; // Asegurate que sea el botón correcto
import { useAuth } from "@/hooks/useAuth";

interface LogoutButtonProps {
  isCollapsed?: boolean;
  onClick?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  isCollapsed = false,
}) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout.mutate();
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start h-11",
        isCollapsed && "justify-center px-0"
      )}
      onClick={handleLogout}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Cerrar sesión</span>
    </Button>
  );
};

export default LogoutButton;
