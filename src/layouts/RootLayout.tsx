import { NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../providers/auth-provider";

export default function RootLayout() {
  const { user } = useAuthContext();
  return (
    <div className="root-layout">
      <header className="nav-bar">
        <nav>
          <h1 id="site-header">Jet Quiz</h1>
          <div className="nav-links">
            <NavLink className="single-nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="single-nav-link" to="/profile">
              Profile
            </NavLink>
            {!user ? (
              <NavLink className="single-nav-link" to="/signup">
                Login
              </NavLink>
            ) : (
              <NavLink className="single-nav-link" to="/logout">
                Logout
              </NavLink>
            )}
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
