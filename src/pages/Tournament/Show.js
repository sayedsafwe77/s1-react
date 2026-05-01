import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useParams } from "react-router";
export default function Show() {
    const params = useParams();
    console.log(params);
    return (_jsx(_Fragment, { children: _jsx("h1", { children: "Tournament Show Page" }) }));
}
