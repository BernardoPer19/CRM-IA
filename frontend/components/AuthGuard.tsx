// components/auth/AuthGuard.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { getUserProfile } = useAuth();
  const router = useRouter();

  const { data, isLoading } = getUserProfile;

  useEffect(() => {
    if (!isLoading && !data?.user) {
      router.push("/login"); // redirige si no hay sesión
    }
  }, [data, isLoading, router]);

  if (isLoading) return <div>Cargando...</div>;
  if (!data?.user) return null; // aún redireccionando

  return <>{children}</>;
}
