import { createContext } from "react";
import { redirect } from "react-router";

export const userContext = createContext(null);

export async function getUserMiddleware(
  { request }: { request: Request },
  next: () => Promise<void>
) {
  const is_logging = new URL(request.url).searchParams.get("is_logging");
  if (is_logging == "true") {
    await next();
  } else {
    throw redirect("/login");
  }
}
