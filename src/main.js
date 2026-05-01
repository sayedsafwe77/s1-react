import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router.ts";
import { AuthProvider } from "./context/AuthContext.tsx";
createRoot(document.getElementById("root")).render(_jsx(AuthProvider, { children: _jsx(RouterProvider, { router: router }) }));
