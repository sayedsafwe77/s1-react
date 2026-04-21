import { useEffect, useState } from "react";
import type { Todo } from "../../types/basic";
import { Link } from "react-router";

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data.todos));
  }, []);
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
