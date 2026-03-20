import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'host' | 'admin';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: User['role']) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, role = 'user') => {
        const name = email.split('@')[0];
        set({
          user: {
            id: 'u-' + Math.random().toString(36).substr(2, 9),
            name: name.charAt(0).toUpperCase() + name.slice(1),
            email,
            role,
            avatar: `https://ui-avatars.com/api/?name=${name}&background=6366f1&color=fff`
          },
          isAuthenticated: true
        });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
