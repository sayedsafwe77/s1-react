import { api } from "./client";
import type { User } from "../types/basic";

export async function me(): Promise<User | null> {
  const res = await api.get<{ user: User | null }>("/auth/me");
  return res.data.user;
}

export async function login(email: string, password: string): Promise<User> {
  const res = await api.post<{ user: User }>("/auth/login", {
    email,
    password,
  });
  return res.data.user;
}

export async function register(
  username: string,
  email: string,
  password: string
): Promise<User> {
  const res = await api.post<{ user: User }>("/auth/register", {
    username,
    email,
    password,
  });
  return res.data.user;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}
