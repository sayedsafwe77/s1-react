import type { Todo } from "../../types/basic";
import { Link, useLoaderData } from "react-router";

export default function Index() {
  const { todos } = useLoaderData<{ todos: Todo[] }>();
  return (
    <>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo">
            <Link to={`/todo/show/${todo.id}`}>{todo.todo}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
