import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  userName: string | null;
  userRole: "student" | null;
  userId: string | null;
  login: (name: string, role?: "student", userId?: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userName: null,
      userRole: null,
      userId: null,
      login: (name: string, role: "student" = "student", userId?: string) =>
        set({
          token: "demo-token",
          userName: name,
          userRole: role,
          userId: userId ?? "student-1",
        }),
      logout: () => set({ token: null, userName: null, userRole: null, userId: null }),
    }),
    {
      name: "itelect4-auth",
      partialize: (state) => ({
        token: state.token,
        userName: state.userName,
        userRole: state.userRole,
        userId: state.userId,
      }),
    }
  )
);

export default useAuthStore;
