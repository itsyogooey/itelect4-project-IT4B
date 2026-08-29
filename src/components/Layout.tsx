import { NavLink, Outlet } from "react-router";
import useAuthStore from "../store/authStore";
import useUiStore from "../store/uiStore"; // ✅ NEW

function Layout() {
  const isDarkMode = useUiStore((state) => state.isDarkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);
  const resetClaimedItems = useUiStore((state) => state.resetClaimedItems);

  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = userName !== null;
  const handleLogout = () => {
    resetClaimedItems();
    logout();
  };

  const activeLink = "nav-link nav-link-active";
  const idleLink = "nav-link";

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? activeLink : idleLink;

  return (
    <div className={`app-shell ${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen">
        <nav className="app-nav">
          <span className="brand">
            <span className="brand-mark">LF</span>
            {" "}
            CAMPUS LOST & FOUND
          </span>

          <div className="nav-links">
            {isLoggedIn && <NavLink to="/" end className={linkClass}>Dashboard</NavLink>}
            {isLoggedIn && <NavLink to="/projects" className={linkClass}>Items</NavLink>}
            {isLoggedIn && <NavLink to="/profile" className={linkClass}>Profile</NavLink>}

            {!isLoggedIn ? (
              <NavLink to="/login" className={linkClass}>Login</NavLink>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="logout-button"
              >
                Logout ({userName})
              </button>
            )}
          </div>

          <div className="nav-actions">
            <button type="button" onClick={toggleDarkMode} className="theme-toggle">
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
