import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
function PaginationButtons({ noOfPags, onClick, skip, limit }) {
    return (_jsx(_Fragment, { children: _jsx("div", { className: "pagination", children: Array.from({ length: noOfPags }, (_, i) => (_jsx("button", { onClick: onClick, className: i === skip / limit ? 'active' : '', children: i + 1 }, i))) }) }));
}
export default PaginationButtons;
