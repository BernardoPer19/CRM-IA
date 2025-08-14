"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { getUserProfile } = useAuth();
  console.log(getUserProfile);
  
  useEffect(() => {
    if (
      !getUserProfile.isLoading &&
      (!getUserProfile.data || getUserProfile.isError)
    ) {
      router.push("/auth/login");
    }
  }, [
    getUserProfile.data,
    getUserProfile.isLoading,
    getUserProfile.isError,
    router,
  ]);

  if (getUserProfile.isLoading) return <div>Cargando...</div>;
  if (!getUserProfile.data) return null; 

  return <>{children}</>;
}
