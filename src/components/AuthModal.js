import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getApiErrorMessage } from "../api/client";
export default function AuthModal({ open, onClose, initialTab = "login", dismissible = true, }) {
    const { login, register } = useAuth();
    const [tab, setTab] = useState(initialTab);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    useEffect(() => {
        if (open) {
            setTab(initialTab);
            setError(null);
        }
    }, [open, initialTab]);
    if (!open)
        return null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            if (tab === "login") {
                await login(email, password);
            }
            else {
                await register(username, email, password);
            }
            setUsername("");
            setEmail("");
            setPassword("");
            onClose();
        }
        catch (err) {
            setError(getApiErrorMessage(err));
        }
        finally {
            setSubmitting(false);
        }
    };
    return (_jsx("div", { className: "auth-backdrop", onClick: dismissible ? onClose : undefined, role: "dialog", "aria-modal": "true", children: _jsxs("div", { className: "auth-modal", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "auth-tabs", children: [_jsx("button", { type: "button", className: tab === "login" ? "auth-tab active" : "auth-tab", onClick: () => setTab("login"), children: "Sign in" }), _jsx("button", { type: "button", className: tab === "register" ? "auth-tab active" : "auth-tab", onClick: () => setTab("register"), children: "Create account" }), dismissible && (_jsx("button", { type: "button", className: "auth-close", onClick: onClose, "aria-label": "Close", children: "\u00D7" }))] }), _jsxs("form", { className: "auth-form", onSubmit: handleSubmit, children: [tab === "register" && (_jsxs("label", { className: "auth-field", children: [_jsx("span", { children: "Username" }), _jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), required: true, autoComplete: "username", minLength: 2 })] })), _jsxs("label", { className: "auth-field", children: [_jsx("span", { children: "Email" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, autoComplete: "email" })] }), _jsxs("label", { className: "auth-field", children: [_jsx("span", { children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6, autoComplete: tab === "login" ? "current-password" : "new-password" })] }), error && _jsx("div", { className: "auth-error", children: error }), _jsx("button", { type: "submit", className: "auth-submit", disabled: submitting, children: submitting
                                ? "Please wait…"
                                : tab === "login"
                                    ? "Sign in"
                                    : "Create account" })] })] }) }));
}
