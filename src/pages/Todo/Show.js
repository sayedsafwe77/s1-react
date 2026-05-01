import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
export default function Show() {
    const { id } = useParams();
    const [todo, setTodo] = useState(null);
    useEffect(() => {
        fetch(`https://dummyjson.com/todos/${id}`)
            .then((res) => res.json())
            .then((data) => setTodo(data));
    }, [id]);
    return (_jsx(_Fragment, { children: _jsx("h1", { children: todo?.todo }) }));
}
