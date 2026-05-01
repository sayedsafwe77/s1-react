import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router";
import "./App.css";
function App() {
    return (_jsx("main", { className: "home", children: _jsxs("section", { className: "hero", children: [_jsx("h1", { children: "Welcome" }), _jsx("p", { children: "A small CRUD demo with authentication, MongoDB and React Router data APIs." }), _jsx(Link, { className: "cta", to: "/posts", children: "Browse posts" })] }) }));
}
export default App;
