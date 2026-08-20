import { NavLink, Outlet } from "react-router";
import useToggle from "../hooks/useToggle";
import useAuthStore from "../store/authStore";

function Layout() {
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  const base = "px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200";
  const activeLink = `${base} bg-blue-600 text-white`;
  const idleLink = `${base} text-gray-600 hover:text-blue-600 dark:text-gray-300`;

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? activeLink : idleLink;

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm dark:bg-gray-800">
          <span className="font-semibold text-lg text-gray-900 dark:text-white">
            Gwyneth’s Submission Tracker
          </span>

          <div className="flex gap-3">
            <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
            <NavLink to="/courses" className={linkClass}>Courses</NavLink>
            <NavLink to="/submissions" className={linkClass}>Submissions</NavLink>

            {userName === null ? (
              <NavLink to="/login" className={linkClass}>Login</NavLink>
            ) : (
              <button
                onClick={logout}
                className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-600 hover:text-blue-600 dark:text-gray-300"
              >
                Logout ({userName})
              </button>
            )}
          </div>

          <button
            onClick={toggleDarkMode}
            className="ml-4 rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </nav>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
