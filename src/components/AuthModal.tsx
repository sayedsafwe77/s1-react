import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getApiErrorMessage } from "../api/client";

type Tab = "login" | "register";

interface Props {
  open: boolean;
  onClose: () => void;
  initialTab?: Tab;
  dismissible?: boolean;
}

export default function AuthModal({
  open,
  onClose,
  initialTab = "login",
  dismissible = true,
}: Props) {
  const { login, register } = useAuth();
  const [tab, setTab] = useState<Tab>(initialTab);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setTab(initialTab);
      setError(null);
    }
  }, [open, initialTab]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (tab === "login") {
        await login(email, password);
      } else {
        await register(username, email, password);
      }
      setUsername("");
      setEmail("");
      setPassword("");
      onClose();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="auth-backdrop"
      onClick={dismissible ? onClose : undefined}
      role="dialog"
      aria-modal="true"
    >
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-tabs">
          <button
            type="button"
            className={tab === "login" ? "auth-tab active" : "auth-tab"}
            onClick={() => setTab("login")}
          >
            Sign in
          </button>
          <button
            type="button"
            className={tab === "register" ? "auth-tab active" : "auth-tab"}
            onClick={() => setTab("register")}
          >
            Create account
          </button>
          {dismissible && (
            <button
              type="button"
              className="auth-close"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          )}
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {tab === "register" && (
            <label className="auth-field">
              <span>Username</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                minLength={2}
              />
            </label>
          )}
          <label className="auth-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={tab === "login" ? "current-password" : "new-password"}
            />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting
              ? "Please wait…"
              : tab === "login"
              ? "Sign in"
              : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
