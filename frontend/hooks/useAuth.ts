import {
  loginRequest,
  registerRequest,
  getCurrentUser,
  logoutRequest,
} from "@/lib/api/authReq";
import { useAuthStore } from "@/store/AuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  const handleSuccess = (message: string) => {
    toast.success(message);
  };

  const handleError = (context: string, error: any) => {
    console.error(`❌ Error en ${context}:`, error);
    toast.error(`Error en ${context}`);
  };

  // 🔐 Registro
  const register = useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      if (data?.success) {
        handleSuccess(data.message);
        setUser(data.user);
        setLoading(false);
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      } else {
        handleError("registro", new Error("Respuesta inesperada"));
      }
    },
    onError: (error) => {
      handleError("registro", error);
      setLoading(false);
      setUser(undefined);
    },
  });

  // 🔑 Login
  const login = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      handleSuccess(data.message);
      setUser(data.user);
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      handleError("login", error);
      setLoading(false);
      setUser(undefined);
    },
  });

  // 🚪 Logout
  const logout = useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      setUser(undefined);
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    }
  });

  // 👤 Obtener perfil al iniciar la app
  const getUserProfile = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (getUserProfile.isError) {
      // chequea que sea 401 para manejar logout forzado
      const errorStatus = (getUserProfile.error as any)?.status;
      if (errorStatus === 401) {
        setUser(undefined);
        setLoading(false);
        // opcional: redirige al login si quieres
      }
    } else if (getUserProfile.data?.user) {
      setUser(getUserProfile.data.user);
      setLoading(false);
    }
  }, [getUserProfile.isError, getUserProfile.data]);






  return {
    register,
    login,
    logout,
    getUserProfile,
    isAuthenticated,
    isAuthLoading,
  };

}
