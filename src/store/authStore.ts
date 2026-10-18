// ===== GT3: the store invented its own token =====
// login: (name, role, userId) =>
//   set({ token: "demo-token", userName: name, userRole: role,
//         userId: userId ?? "student-1" }),
//
// NOTE: "demo-token" was a string this file made up, and ProtectedRoute only
//       checked that it was not null. A real token is issued by
//       /api/auth/login and signed with a secret only the API knows.
// ===== GT4 Part 2: the store keeps a token it was GIVEN =====
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  userName: string | null;
  // Two values in, nothing invented. The login page gets them from the API.
  setSession: (token: string, userName: string) => void;
  logout: () => void;
}

// This file deliberately does NOT import ../api/client. client.ts reads the
// token from this store on every request, so importing it back would be an
// import loop. Pages fetch; the store only keeps state.
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userName: null,
      setSession: (token, userName) => set({ token, userName }),
      logout: () => set({ token: null, userName: null }),
    }),
    {
      name: "itelect4-auth", // the localStorage key
      partialize: (state) => ({
        token: state.token,
        userName: state.userName,
      }),
    },
  ),
);

export default useAuthStore;

// The token is good for two hours (expiresIn in the backend's login route).
// persist keeps it across a reload, so after two hours every private request
// answers 401. Log out and log in again is the fix.
