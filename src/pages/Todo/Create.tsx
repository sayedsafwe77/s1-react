import { useActionData, useFetcher } from "react-router";

export default function Create() {
  const actionData = useActionData();
  const fetcher = useFetcher();
  if (actionData?.todo) {
    alert("Todo created successfully with id: " + actionData.todo.id);
  }
  console.log("state: ", fetcher.state);

  return (
    <>
      <fetcher.Form method="post">
        <input type="text" name="todo" placeholder="Enter Todo" />
        <input type="checkbox" value={"true"} name="completed" />
        <input
          type="submit"
          value={fetcher.state !== "idle" ? "Saving..." : "Create Todo"}
        />
      </fetcher.Form>
    </>
  );
}
