import { redirect } from "react-router";

export const submitTodo = async ({ request }) => {
  const data = await request.formData();

  fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo: data.get("todo"),
      completed: data.get("completed") === "true",
      userId: 5,
    }),
  })
    .then((res) => res.json())
    .then(console.log);
  throw redirect("/todo");
  //   navigate("/todo");
  // }
};
