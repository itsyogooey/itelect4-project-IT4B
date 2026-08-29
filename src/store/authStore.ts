import { create } from "zustand";

interface AuthState {
  token: string | null;
  userName: string | null;
  userRole: "student" | null;
  userId: string | null;
  login: (name: string, role?: "student", userId?: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
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
}));

export default useAuthStore;
