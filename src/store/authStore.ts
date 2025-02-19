// src/store/authStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  user: { id: number; name: string; email: string } | null;
  isAuthenticated: boolean;
  // Optionally, if your server returns an expiry time you want to track:
  tkExpiresAt: number;
  isAuthChecking: boolean;
  intervalId: ReturnType<typeof setInterval> | null;
}

interface AuthActions {
  loginUser: (user: AuthState['user'], tkExpiresAt: number) => void;
  logout: () => void;
  checkAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      tkExpiresAt: 0,
      isAuthChecking: false,
      intervalId: null,

      // Save user data and token expiry (if provided by your API response)
      loginUser: (user, tkExpiresAt) => {
        set({
          user,
          tkExpiresAt,
          isAuthenticated: Date.now() < tkExpiresAt,
        });
        // (Optionally) start an interval to periodically check auth state.
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          tkExpiresAt: 0,
        });
        localStorage.removeItem('auth-storage');
      },

      checkAuth: () => {
        set({ isAuthChecking: true });
        const { user, tkExpiresAt } = get();
        const isValid = user !== null && tkExpiresAt > Date.now();
        set({ isAuthenticated: isValid, isAuthChecking: false });
        if (!isValid) {
          localStorage.removeItem('auth-storage');
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: AuthStore) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        tkExpiresAt: state.tkExpiresAt,
      }),
    }
  )
);

export default useAuthStore;
