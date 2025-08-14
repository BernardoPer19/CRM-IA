import {
  loginRequest,
  registerRequest,
  getCurrentUser,
  logoutRequest,
} from "@/lib/api/authReq";
import { useAuthStore } from "@/store/AuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  const handleSuccess = (message: string) => toast.success(message);
  const handleError = (context: string, error: any) => {
    console.error(`❌ Error en ${context}:`, error);
    toast.error(`Error en ${context}`);
  };

  // Registro
  const register = useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      if (data?.success) {
        handleSuccess(data.message);
        setUser(data.user);
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      } else {
        handleError("registro", new Error("Respuesta inesperada"));
      }
      setLoading(false);
    },
    onError: (error) => {
      handleError("registro", error);
      setUser(undefined);
      setLoading(false);
    },
  });

  // Login
  const login = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      handleSuccess(data.message);
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      setLoading(false);
    },
    onError: (error) => {
      handleError("login", error);
      setUser(undefined);
      setLoading(false);
    },
  });

  // Logout
  const logout = useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      setUser(undefined);
      queryClient.clear();
      setLoading(false);
      router.replace("/auth/login");
    },
  });

  // Obtener perfil
  const getUserProfile = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Manejar expiración de sesión (401)
  useEffect(() => {
    if (getUserProfile.isError) {
      const status = (getUserProfile.error as any)?.status;
      if (status === 401) {
        setUser(undefined);
        queryClient.clear();
        setLoading(false);
        router.replace("/auth/login");
      }
    } else if (getUserProfile.data?.user) {
      setUser(getUserProfile.data.user);
      setLoading(false);
    }
  }, [getUserProfile.isError, getUserProfile.data, getUserProfile.error, queryClient, router, setUser, setLoading]);

  return {
    register,
    login,
    logout,
    getUserProfile,
    isAuthenticated,
    isAuthLoading,
  };
};
