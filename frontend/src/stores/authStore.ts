// src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/api';

// Define types for user and state
interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  _hasHydrated: boolean; // Flag to check if the store has been rehydrated from localStorage
  setUser: (user: User | null) => void;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateBio: (bio: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      _hasHydrated: false,

      setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          // The response from your login should contain the token and user data
          const response = await api.post('/api/auth/login', credentials);
          const { token, user } = response.data;
          set({ user, token, isAuthenticated: true, isLoading: false });
          return true;
        } catch (err) {
          set({ isLoading: false, error: 'Invalid email or password' });
          return false;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          // Assuming registration also logs the user in
          const response = await api.post('/api/auth/register', userData);
          const { token, user } = response.data;
          set({ user, token, isAuthenticated: true, isLoading: false });
          return true;
        } catch (err) {
          set({ isLoading: false, error: 'Registration failed. Please try again.' });
          return false;
        }
      },
      
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateBio: async (bio) => {
        try {
          // Note: You need a backend endpoint for this
          await api.put(`/api/user/${get().user?.id}/bio`, { bio });
          set((state) => ({ user: state.user ? { ...state.user, bio } : null }));
        } catch (error) {
          console.error("Failed to update bio", error);
        }
      },
    }),
    {
      name: 'auth-storage', // key in localStorage
    //   partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }), // only persist these fields
    onRehydrateStorage: () => (state) => {
         if (state) {
            state._hasHydrated = true;
        }
      },
    }
  )
);