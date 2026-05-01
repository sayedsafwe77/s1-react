import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
export default function MainLayout() {
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx(Outlet, {})] }));
}
