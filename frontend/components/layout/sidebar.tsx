"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Package,
  ChevronLeft,
  Settings,
  BarChart3,
  Bot,
} from "lucide-react";
import LogoutButton from "../ui/01-button-logout";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Clientes",
    href: "/clients",
    icon: Users,
    badge: "124",
  },
  {
    name: "Empleados",
    href: "/employees",
    icon: UserCheck,
    badge: "12",
  },
  {
    name: "Productos",
    href: "/products",
    icon: Package,
    badge: "89",
  },
  {
    name: "Análisis",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "IA Asistente",
    href: "/ai-assistant",
    icon: Bot,
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "relative flex flex-col bg-card border-r border-border sidebar-transition",
        isCollapsed ? "w-16" : "w-72"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold">ModernCRM</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("h-8 w-8 p-0", isCollapsed && "mx-auto")}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              isCollapsed && "rotate-180"
            )}
          />
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
              prefetch={true} 
              key={item.name} 
              href={item.href}
              
              >
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-11",
                    isCollapsed && "justify-center px-0",
                    isActive &&
                      "bg-secondary text-secondary-foreground font-medium"
                  )}
                >
                  <item.icon
                    className={cn("h-5 w-5", !isCollapsed && "mr-3")}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.name}</span>
                      {item.badge && (
                        <span className="ml-auto bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Settings */}
      <div className="p-3 border-t border-border">
        <Link href="/settings">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-11",
              isCollapsed && "justify-center px-0"
            )}
          >
            <Settings className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
            {!isCollapsed && <span>Configuración</span>}
          </Button>
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}
