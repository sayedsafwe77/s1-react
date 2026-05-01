import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { NavLink } from "react-router";
import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext";
export default function Navbar() {
    const { user, logout, loading } = useAuth();
    return (_jsxs("nav", { className: "navbar", children: [_jsxs("ul", { className: "nav", children: [_jsx("li", { children: _jsx(NavLink, { className: "nav-link", to: "/", children: "Home" }) }), _jsx("li", { children: _jsx(NavLink, { className: ({ isActive }) => isActive ? "nav-link custom-active" : "nav-link", to: "/posts", children: "Posts" }) }), _jsx("li", { children: _jsx(NavLink, { className: ({ isActive }) => isActive ? "nav-link custom-active" : "nav-link", to: "/profile", children: "Profile" }) }), _jsx("li", { children: _jsx(NavLink, { className: "nav-link", to: "/about", children: "About" }) }), _jsx("li", { children: _jsx(NavLink, { className: "nav-link", to: "/contact", children: "Contact" }) }), _jsx("li", { children: _jsx(NavLink, { className: "nav-link", to: "/todo", children: "Todos" }) })] }), _jsx("div", { className: "nav-auth", children: loading ? null : user ? (_jsxs(_Fragment, { children: [_jsxs("span", { className: "nav-user", children: ["@", user.username] }), _jsx("button", { type: "button", className: "nav-logout", onClick: () => logout(), children: "Sign out" })] })) : (_jsx(NavLink, { className: "nav-link", to: "/posts", children: "Sign in" })) })] }));
}
