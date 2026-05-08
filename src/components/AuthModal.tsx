import { useActionState, useEffect, useState } from "react";
import { getApiErrorMessage } from "../api/client";
import { useAuth } from "../hooks/useAuth";

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
  const [data, action, isPending] = useActionState(
    async (prevState, formData) => {
      try {
        if (tab === "login") {
          await login(
            formData.get("email") as string,
            formData.get("password") as string
          );
          console.log("Logged in successfully");
        } else {
          await register(
            formData.get("username") as string,
            formData.get("email") as string,
            formData.get("password") as string
          );
        }
        onClose();
      } catch (error) {
        return {
          error: getApiErrorMessage(error) || "Request failed",
          email: formData.get("email") as string,
        };
      }
    },
    null
  );

  useEffect(() => {
    if (open) {
      setTab(initialTab);
      // setError(null);
    }
  }, [open, initialTab]);

  if (!open) return null;

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

        <form className="auth-form" action={action}>
          {tab === "register" && (
            <label className="auth-field">
              <span>Username</span>
              <input
                type="text"
                name="username"
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
              defaultValue={data?.email}
              required
              name="email"
              autoComplete="email"
            />
          </label>
          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              required
              name="password"
              minLength={6}
              autoComplete={
                tab === "login" ? "current-password" : "new-password"
              }
            />
          </label>

          {data?.error && <div className="auth-error">{data?.error}</div>}

          <button type="submit" className="auth-submit" disabled={isPending}>
            {isPending
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
