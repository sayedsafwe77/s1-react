import { createContext } from "react";
import { redirect, useSearchParams } from "react-router";
export const userContext = createContext(null);
export async function getUserMiddleware({ request, context }, next) {
    const is_logging = new URL(request.url).searchParams.get("is_logging");
    if (is_logging == "true") {
        await next();
    }
    else {
        throw redirect("/login");
    }
}
export async function testMiddleware({ context }, next) {
    context.set("token", "newToken");
    await next();
}
