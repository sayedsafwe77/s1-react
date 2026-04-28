import { NavLink } from "react-router";
import "../styles/Navbar.css";
export default function Navbar() {
  return (
    <>
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
          <li>
            <NavLink className="nav-link" to="/todo/create">
              Create Todo
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
