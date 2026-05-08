import { useLoaderData } from "react-router";
import type { Todo } from "../types/basic";
import { useMemo, useState } from "react";

export default function MemoPosts() {
  const todosLoader = useLoaderData<{ todos: Todo[] }>().todos;
  const [todos, setTodos] = useState(todosLoader);
  const [theme, setTheme] = useState("light");
  const todosText = useMemo(() => {
    console.log("Calculating todos text...");
    return todos.map((todo) => todo.todo).join(", ");
  }, [todos]);
  const addTodo = ({
    target: { value: newTodo },
  }: React.FocusEvent<HTMLInputElement>) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), todo: newTodo, completed: true, userId: 1 },
    ]);
  };
  return (
    <>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme}
      </button>
      <h1>{todosText}</h1>
      <input type="text" placeholder="Enter Todo" onBlur={addTodo} />
    </>
  );
}
