import { api } from "./client";
export async function me() {
    const res = await api.get("/auth/me");
    return res.data.user;
}
export async function login(email, password) {
    const res = await api.post("/auth/login", {
        email,
        password,
    });
    return res.data.user;
}
export async function register(username, email, password) {
    const res = await api.post("/auth/register", {
        username,
        email,
        password,
    });
    return res.data.user;
}
export async function logout() {
    await api.post("/auth/logout");
}
