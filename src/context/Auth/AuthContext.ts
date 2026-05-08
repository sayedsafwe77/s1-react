import { createContext } from "react";
import type { AuthContextValue } from "../../types/basic";

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
