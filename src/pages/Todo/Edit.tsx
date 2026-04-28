import { useFetcher, useLoaderData } from "react-router";

export default function Edit() {
  const todo = useLoaderData();
  const fetcher = useFetcher();
  const todoText = fetcher?.formData?.get("todo") ?? todo.todo;
  return (
    <>
      <p>{todoText}</p>

      <fetcher.Form method="post">
        <textarea
          rows={10}
          cols={30}
          name="todo"
          // value={todo.todo}
          defaultValue={todo.todo}
          placeholder="Enter Todo"
        />
        <input
          type="checkbox"
          defaultChecked={todo.completed}
          name="completed"
        />
        <input
          type="submit"
          value={fetcher.state !== "idle" ? "Saving..." : "Edit"}
        />
      </fetcher.Form>
    </>
  );
}
