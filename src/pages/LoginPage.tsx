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
    <main className="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg shadow-sm dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Login
      </h2>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        Log in to access Gwyneth’s dashboard and course tracker.
      </p>
      <button
        onClick={handleLogin}
        className="mt-6 w-full rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
      >
        Login as Gwyneth
      </button>
    </main>
  );
}

export default LoginPage;
