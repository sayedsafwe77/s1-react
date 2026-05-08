import { useContext } from "react";
import type { AuthContextValue } from "../types/basic";
import { AuthContext } from "../context/Auth/AuthContext";

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
