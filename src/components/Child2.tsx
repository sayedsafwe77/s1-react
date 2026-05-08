import { useCallback, useEffect, useMemo, useState } from "react";
import { apiInstance } from "../Loaders/todo";

export default function Child2() {
  const [todos, setTodos] = useState([]);
  const getTodos = useCallback(async () => {
    const res = await apiInstance.get("/todos?limit=254");
    setTodos(res.data.todos);
  }, []);
  const todoText = useMemo(
    () => todos.map((todo) => todo.todo).join(", "),
    [todos]
  );

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <>
      <h1>{todoText}</h1>
    </>
  );
}
