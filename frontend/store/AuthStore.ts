// stores/useAuthStore.ts
import { UserType } from "@/types/AuthType";
import { create } from "zustand";

import { logoutRequest } from "@/lib/api/authReq"
import { toast } from "sonner";
import { useRouter } from "next/router";



interface AuthState {
    currentUser: UserType | undefined;
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    setUser: (user: UserType | undefined) => void;
    setLoading: (loading: boolean) => void;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    currentUser: undefined,
    isAuthenticated: false,
    isAuthLoading: true,
    setUser: (user) =>
        set({
            currentUser: user,
            isAuthenticated: !!user,
        }),
    setLoading: (loading) => set({ isAuthLoading: loading }),
    logout: async () => {

        try {
            await logoutRequest();
            set({
                currentUser: undefined,
                isAuthenticated: false,
            });
            toast.success("¡Sesión cerrada exitosamente!");
            // useRouter().push("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            toast.error("Error al cerrar sesión.");
        }
    },
}));
