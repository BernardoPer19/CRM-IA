// store/AuthStore.ts
import { User } from '@/types/AuthType';
import { create } from 'zustand';


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
