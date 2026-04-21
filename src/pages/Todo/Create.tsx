import { useRef } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const todo = useRef<HTMLInputElement>(null);
  const completed = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const submitTodo = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (todo.current && completed.current) {
      fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: todo.current.value,
          completed: completed.current.checked,
          userId: 5,
        }),
      })
        .then((res) => res.json())
        .then(console.log);
      navigate("/todo");
    }
  };
  return (
    <>
      <form onSubmit={submitTodo}>
        <input type="text" ref={todo} placeholder="Enter Todo" />
        <input type="checkbox" ref={completed} />
        <input type="submit" />
      </form>
    </>
  );
}
