import axios from "axios";
import type { middleWareTypes } from "../types/basic";

export const TodoLoader = async () => {
  const res = await instance.get("/todos");
  return res.data;
};
export const testLoader = async () => {
  //   const res = await instance.get("/todos");
  return {
    message: "Hello from test loader",
  };
};
export const singleTodoLoader = async ({ params }: middleWareTypes) => {
  const res = await instance.get(`/todos/${params.id}`);
  return res.data;
};

let baseURL;
const lang = navigator.language.slice(0, 2);
if (import.meta.env.VITE_APP_ENV === "production") {
  baseURL = "https://dummyjson.com";
} else {
  baseURL = "https://dummyjson.com";
}
const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar", "Accept-Language": lang },
});
