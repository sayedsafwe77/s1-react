import { Link } from "react-router";
import type { Todo } from "../types/basic";
import { memo, useCallback, useEffect } from "react";
import { apiInstance } from "../Loaders/todo";

function TodoDetails({ todo }: { todo: Todo }) {
  const getTodos = useCallback(async () => {
    await apiInstance.get("/todos");
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);
  return (
    <>
      <li key={todo.id} className="todo">
        <Link to={`/todo/show/${todo.id}`}>{todo.todo}</Link>
        <button>
          <Link to={`/todo/edit/${todo.id}`}>Edit</Link>
        </button>
      </li>
    </>
  );
}
export default memo(TodoDetails);
