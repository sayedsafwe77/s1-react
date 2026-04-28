import { NavLink } from "react-router";
import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  return (
    <nav className="navbar">
      <ul className="nav">
        <li>
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link custom-active" : "nav-link"
            }
            to="/posts"
          >
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link custom-active" : "nav-link"
            }
            to="/profile"
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/contact">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/todo">
            Todos
          </NavLink>
        </li>
      </ul>
      <div className="nav-auth">
        {loading ? null : user ? (
          <>
            <span className="nav-user">@{user.username}</span>
            <button
              type="button"
              className="nav-logout"
              onClick={() => logout()}
            >
              Sign out
            </button>
          </>
        ) : (
          <NavLink className="nav-link" to="/posts">
            Sign in
          </NavLink>
        )}
      </div>
    </nav>
  );
}
