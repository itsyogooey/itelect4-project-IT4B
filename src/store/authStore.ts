import { create } from "zustand";
import { persist } from "zustand/middleware"; // ✅ add this

interface AuthState {
  token: string | null;
  userName: string | null;
  login: (name: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set: (partial: Partial<AuthState> | ((state: AuthState) => Partial<AuthState>)) => void) => ({
      token: null,
      userName: null,
      login: (name: string) => set({ token: "demo-token", userName: name }),
      logout: () => set({ token: null, userName: null }),
    }),
    {
      name: "auth-store", // ✅ localStorage key
      partialize: (state: AuthState) => ({ token: state.token, userName: state.userName }), // ✅ saves only data
    }
  )
);

export default useAuthStore;
