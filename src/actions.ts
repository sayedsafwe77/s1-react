import type { middleWareTypes } from "./types/basic";

export const submitTodo = async ({ request }: { request: Request }) => {
  const data = await request.formData();

  const res = await fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo: data.get("todo"),
      completed: data.get("completed") === "true",
      userId: 5,
    }),
  });
  const result = await res.json();

  return {
    todo: result,
  };
};

export const EditTodo = async ({ request, params }: middleWareTypes) => {
  const data = await request.formData();
  const res = await fetch(`https://dummyjson.com/todos/${params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo: data.get("todo"),
      completed: !!data.get("completed"),
    }),
  });

  const result = await res.json();
  console.log(result);

  return result;
};
