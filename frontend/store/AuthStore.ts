// store/AuthStore.ts
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  // agrega más campos si tu user los tiene
}

interface AuthState {
  user?: User;
  isAuthLoading: boolean;
  isAuthenticated: boolean;

  setUser: (user?: User) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  isAuthLoading: true, // al principio asumimos que estamos cargando
  isAuthenticated: false,

  setUser: (user) =>
    set(() => ({
      user,
      isAuthenticated: !!user, // true si hay user, false si undefined
    })),

  setLoading: (loading) =>
    set(() => ({
      isAuthLoading: loading,
    })),
}));
