// store/AuthStore.ts
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
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
  isAuthLoading: true, 
  isAuthenticated: false,

  setUser: (user) =>
    set(() => ({
      user,
      isAuthenticated: !!user,
    })),

  setLoading: (loading) =>
    set(() => ({
      isAuthLoading: loading,
    })),
}));
