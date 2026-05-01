import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, } from "react";
import * as authApi from "../api/auth";
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const refresh = useCallback(async () => {
        try {
            const me = await authApi.me();
            setUser(me);
        }
        catch {
            setUser(null);
        }
    }, []);
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const me = await authApi.me();
                if (!cancelled)
                    setUser(me);
            }
            catch {
                if (!cancelled)
                    setUser(null);
            }
            finally {
                if (!cancelled)
                    setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);
    const login = useCallback(async (email, password) => {
        const u = await authApi.login(email, password);
        setUser(u);
        return u;
    }, []);
    const register = useCallback(async (username, email, password) => {
        const u = await authApi.register(username, email, password);
        setUser(u);
        return u;
    }, []);
    const logout = useCallback(async () => {
        await authApi.logout();
        setUser(null);
    }, []);
    const value = useMemo(() => ({ user, loading, login, register, logout, refresh }), [user, loading, login, register, logout, refresh]);
    return _jsx(AuthContext.Provider, { value: value, children: children });
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}
