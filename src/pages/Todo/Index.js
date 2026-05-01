import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useLoaderData } from "react-router";
export default function Index() {
    const { todos } = useLoaderData();
    return (_jsx(_Fragment, { children: _jsx("ul", { className: "todo-list", children: todos.map((todo) => (_jsx("li", { className: "todo", children: _jsx(Link, { to: `/todo/show/${todo.id}`, children: todo.todo }) }, todo.id))) }) }));
}
