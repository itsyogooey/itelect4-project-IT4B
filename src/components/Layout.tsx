import { NavLink, Outlet } from "react-router";
import useAuthStore from "../store/authStore";
import useUiStore from "../store/uiStore"; // ✅ NEW

function Layout() {
  const isDarkMode = useUiStore((state) => state.isDarkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);

  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = userName !== null;

  const activeLink = "nav-link nav-link-active";
  const idleLink = "nav-link";

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? activeLink : idleLink;

  return (
    <div className={`app-shell ${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen">
        <nav className="app-nav">
          <span className="brand">
            <span className="brand-mark">ST</span>
            SUBMISSION TRACKER
          </span>

          <div className="nav-links">
            {isLoggedIn && <NavLink to="/" end className={linkClass}>Dashboard</NavLink>}
            {isLoggedIn && <NavLink to="/projects" className={linkClass}>Projects</NavLink>}
            {isLoggedIn && <NavLink to="/submissions" className={linkClass}>Submissions</NavLink>}

            {!isLoggedIn ? (
              <NavLink to="/login" className={linkClass}>Login</NavLink>
            ) : (
              <button
                onClick={logout}
                className="logout-button"
              >
                Logout ({userName})
              </button>
            )}
          </div>

          <div className="nav-actions">
            <button onClick={toggleDarkMode} className="theme-toggle">
              {isDarkMode ? "Light" : "Dark"} mode
            </button>
          </div>
        </nav>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
