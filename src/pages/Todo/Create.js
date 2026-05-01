import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef } from "react";
import { Form, useNavigate } from "react-router";
export default function Create() {
    return (_jsx(_Fragment, { children: _jsxs(Form, { method: "post", children: [_jsx("input", { type: "text", name: "todo", placeholder: "Enter Todo" }), _jsx("input", { type: "checkbox", value: "true", name: "completed" }), _jsx("input", { type: "submit" })] }) }));
}
