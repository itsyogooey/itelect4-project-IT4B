// src/pages/LoginPage.tsx
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    login("Gwyneth");
    navigate("/");
  };

  return (
    <main className="page-frame page-panel login-panel">
      <p className="page-eyebrow">Welcome back</p>
      <h2 className="page-title">Login</h2>
      <p className="page-intro">
        Use the demo login to access Gwyneth’s dashboard and project tracker.
      </p>
      <button
        onClick={handleLogin}
        className="mt-7 w-full px-4 py-3 text-sm"
      >
        Login as Gwyneth
      </button>
    </main>
  );
}

export default LoginPage;
