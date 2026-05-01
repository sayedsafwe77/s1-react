import axios from "axios";
import { userContext } from "../Middlewares/base";
export const TodoLoader = async ({ context }) => {
    const res = await instance.get("/todos");
    return res.data;
};
export const testLoader = async ({ context }) => {
    console.log(context.get(userContext));
    //   const res = await instance.get("/todos");
    return {
        message: "Hello from test loader",
    };
};
let baseURL;
const lang = navigator.language.slice(0, 2);
if (import.meta.env.VITE_APP_ENV === "production") {
    baseURL = "https://dummyjson.com";
}
else {
    baseURL = "https://dummyjson.com";
}
const instance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar", "Accept-Language": lang },
});
