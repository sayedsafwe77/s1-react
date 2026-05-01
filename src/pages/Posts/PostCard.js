import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";
export default function PostCard({ post, canEdit, onAuthRequired }) {
    const fetcher = useFetcher();
    const [editing, setEditing] = useState(false);
    const formRef = useRef(null);
    // Derive an optimistic post from the in-flight form data so the user sees
    // their edit instantly. While submitting we also keep the card in a "saving"
    // visual state.
    const inFlightIntent = fetcher.formData?.get("_intent");
    const isUpdating = fetcher.state !== "idle" && inFlightIntent === "update";
    const isDeleting = fetcher.state !== "idle" && inFlightIntent === "delete";
    const optimistic = isUpdating
        ? {
            ...post,
            title: String(fetcher.formData.get("title") ?? post.title),
            body: String(fetcher.formData.get("body") ?? post.body),
            tags: String(fetcher.formData.get("tags") ?? post.tags.join(", "))
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
        }
        : post;
    // Close the editor when the update completes successfully.
    useEffect(() => {
        if (fetcher.state === "idle" &&
            fetcher.data?.ok &&
            fetcher.data.intent === "update") {
            setEditing(false);
        }
    }, [fetcher.state, fetcher.data]);
    if (isDeleting) {
        // Hide the card optimistically; the loader revalidation will remove it for real.
        return null;
    }
    return (_jsxs("article", { className: `post-card${isUpdating ? " is-saving" : ""}`, children: [_jsxs("header", { className: "post-card-header", children: [editing ? (_jsx("input", { className: "post-edit-title", name: "__title_preview", value: optimistic.title, onChange: () => { }, readOnly: true, hidden: true })) : (_jsx("h3", { className: "post-card-title", children: optimistic.title })), canEdit && !editing && (_jsxs("div", { className: "post-actions", children: [_jsx("button", { type: "button", className: "icon-btn", "aria-label": "Edit post", title: "Edit", onClick: () => {
                                    if (!canEdit)
                                        return onAuthRequired();
                                    setEditing(true);
                                }, children: _jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, children: _jsx("path", { d: "M4 20h4l10-10-4-4L4 16v4z", stroke: "currentColor", strokeWidth: "1.6", strokeLinejoin: "round" }) }) }), _jsxs(fetcher.Form, { method: "post", className: "inline", children: [_jsx("input", { type: "hidden", name: "_intent", value: "delete" }), _jsx("input", { type: "hidden", name: "id", value: post._id }), _jsx("button", { type: "submit", className: "icon-btn danger", "aria-label": "Delete post", title: "Delete", onClick: (e) => {
                                            if (!confirm("Delete this post?"))
                                                e.preventDefault();
                                        }, children: _jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, children: _jsx("path", { d: "M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-7 0v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V7", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) }) })] })] }))] }), editing ? (_jsxs(fetcher.Form, { method: "post", ref: formRef, className: "post-edit-form", children: [_jsx("input", { type: "hidden", name: "_intent", value: "update" }), _jsx("input", { type: "hidden", name: "id", value: post._id }), _jsxs("label", { children: [_jsx("span", { children: "Title" }), _jsx("input", { type: "text", name: "title", defaultValue: post.title, required: true, maxLength: 200 })] }), _jsxs("label", { children: [_jsx("span", { children: "Body" }), _jsx("textarea", { name: "body", defaultValue: post.body, required: true, rows: 4 })] }), _jsxs("label", { children: [_jsx("span", { children: "Tags (comma separated)" }), _jsx("input", { type: "text", name: "tags", defaultValue: post.tags.join(", ") })] }), _jsxs("div", { className: "post-edit-actions", children: [_jsx("button", { type: "button", className: "btn btn-ghost", onClick: () => setEditing(false), disabled: fetcher.state !== "idle", children: "Cancel" }), _jsx("button", { type: "submit", className: "btn btn-primary", disabled: fetcher.state !== "idle", children: fetcher.state !== "idle" ? "Saving…" : "Save" })] }), fetcher.data?.ok === false && fetcher.data.intent === "update" && (_jsx("div", { className: "post-error", children: fetcher.data.message }))] })) : (_jsxs(_Fragment, { children: [_jsx("p", { className: "post-card-body", children: optimistic.body }), optimistic.tags.length > 0 && (_jsx("ul", { className: "post-tags", children: optimistic.tags.map((tag) => (_jsxs("li", { children: ["#", tag] }, tag))) })), _jsxs("footer", { className: "post-card-footer", children: [_jsx("span", { className: "post-author", children: post.author?.username ? `@${post.author.username}` : "anonymous" }), _jsxs("span", { className: "post-views", children: [post.views, " views"] })] })] }))] }));
}
