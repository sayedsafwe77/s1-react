import axios from "axios";

// Vite dev-server proxies /api -> http://localhost:5000.
// In production, deploy the API behind the same origin or set baseURL via env.
export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export type ApiError = { message: string };

export function getApiErrorMessage(
  err: unknown,
  fallback = "Request failed"
): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || err.message || fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}
