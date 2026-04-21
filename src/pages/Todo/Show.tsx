import { useEffect, useState } from "react";
import type { Todo } from "../../types/basic";
import { useParams } from "react-router";

export default function Show() {
  const { id } = useParams();
  const [todo, setTodo] = useState<Todo | null>(null);
  useEffect(() => {
    fetch(`https://dummyjson.com/todos/${id}`)
      .then((res) => res.json())
      .then((data) => setTodo(data));
  }, [id]);
  return (
    <>
      <h1>{todo?.todo}</h1>
    </>
  );
}
