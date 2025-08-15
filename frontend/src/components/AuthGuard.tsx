"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { getUserProfile, isAuthenticated, isAuthLoading } = useAuth();

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  if (isAuthLoading) {
     <div>Cargando...</div>;
     router.push("/auth/login")
  }
  if (!isAuthenticated) return null;

  // 🔹 Usuario válido, renderiza children
  return <>{children}</>;
}
