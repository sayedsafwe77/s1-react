import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFetcher, useLoaderData, useSearchParams, } from "react-router";
import "../../styles/Posts.css";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../../components/AuthModal";
import PostCard from "./PostCard";
const PAGE_SIZE_OPTIONS = [5, 10, 20];
export default function PostsIndex() {
    const data = useLoaderData();
    const { user, loading: authLoading, logout } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [authOpen, setAuthOpen] = useState(false);
    const createFetcher = useFetcher();
    const createFormRef = useRef(null);
    // Open the auth modal automatically when an unauthenticated user lands here.
    useEffect(() => {
        if (!authLoading && !user)
            setAuthOpen(true);
        if (user)
            setAuthOpen(false);
    }, [authLoading, user]);
    // Reset the create form once the action succeeds.
    console.log(createFetcher.state);
    useEffect(() => {
        if (createFetcher.state === "idle" &&
            createFetcher.data?.ok &&
            createFetcher.data.intent === "create") {
            createFormRef.current?.reset();
        }
    }, [createFetcher.state, createFetcher.data]);
    const totalPages = Math.max(1, Math.ceil(data.total / data.limit));
    const currentPage = data.page;
    const goToPage = (page) => {
        const next = new URLSearchParams(searchParams);
        next.set("page", String(page));
        setSearchParams(next);
    };
    const setMine = (mine) => {
        const next = new URLSearchParams(searchParams);
        if (mine)
            next.set("mine", "true");
        else
            next.delete("mine");
        next.set("page", "1");
        setSearchParams(next);
    };
    const setLimit = (limit) => {
        const next = new URLSearchParams(searchParams);
        next.set("limit", String(limit));
        next.set("page", "1");
        setSearchParams(next);
    };
    // Optimistically inject a ghost card while a create is in flight.
    const optimisticCreate = useOptimisticCreatePost(createFetcher, user);
    const visiblePosts = useMemo(() => (optimisticCreate ? [optimisticCreate, ...data.posts] : data.posts), [optimisticCreate, data.posts]);
    const requireAuth = () => setAuthOpen(true);
    return (_jsxs("main", { className: "posts-page", children: [_jsxs("header", { className: "posts-hero", children: [_jsxs("div", { children: [_jsx("h1", { children: "Posts" }), _jsx("p", { children: "Share, edit and discover stories." })] }), _jsx("div", { className: "posts-hero-user", children: user ? (_jsxs(_Fragment, { children: [_jsxs("span", { className: "user-pill", children: ["@", user.username] }), _jsx("button", { type: "button", className: "btn btn-ghost", onClick: () => logout(), children: "Sign out" })] })) : (_jsx("button", { type: "button", className: "btn btn-primary", onClick: () => setAuthOpen(true), children: "Sign in" })) })] }), _jsxs("section", { className: "create-panel", children: [_jsx("h2", { children: "Create a post" }), user ? (_jsxs(createFetcher.Form, { method: "post", ref: createFormRef, className: "create-form", children: [_jsx("input", { type: "hidden", name: "_intent", value: "create" }), _jsxs("label", { children: [_jsx("span", { children: "Title" }), _jsx("input", { type: "text", name: "title", placeholder: "A captivating title", required: true, maxLength: 200 })] }), _jsxs("label", { children: [_jsx("span", { children: "Body" }), _jsx("textarea", { name: "body", rows: 4, placeholder: "What's on your mind?", required: true })] }), _jsxs("label", { children: [_jsx("span", { children: "Tags (comma separated)" }), _jsx("input", { type: "text", name: "tags", placeholder: "react, mongo" })] }), _jsxs("div", { className: "create-actions", children: [_jsx("button", { type: "submit", className: "btn btn-primary", disabled: createFetcher.state !== "idle", children: createFetcher.state !== "idle" ? "Saving..." : "Publish" }), createFetcher.data?.ok === false &&
                                        createFetcher.data.intent === "create" && (_jsx("span", { className: "post-error", children: createFetcher.data.message }))] })] })) : (_jsxs("div", { className: "create-locked", children: [_jsx("p", { children: "You need an account to publish." }), _jsx("button", { type: "button", className: "btn btn-primary", onClick: () => setAuthOpen(true), children: "Sign in to write" })] }))] }), _jsxs("section", { className: "posts-toolbar", children: [_jsxs("div", { className: "filters", children: [_jsxs("label", { className: `chip ${!data.mine ? "active" : ""}`, children: [_jsx("input", { type: "radio", name: "filter", checked: !data.mine, onChange: () => setMine(false) }), "All posts"] }), _jsxs("label", { className: `chip ${data.mine ? "active" : ""}${!user ? " disabled" : ""}`, title: !user ? "Sign in to filter your posts" : undefined, children: [_jsx("input", { type: "radio", name: "filter", checked: data.mine, disabled: !user, onChange: () => {
                                            if (!user) {
                                                setAuthOpen(true);
                                                return;
                                            }
                                            setMine(true);
                                        } }), "Written by me"] })] }), _jsxs("div", { className: "page-size", children: [_jsxs("label", { children: ["Per page", _jsx("select", { value: data.limit, onChange: (e) => setLimit(Number(e.target.value)), children: PAGE_SIZE_OPTIONS.map((n) => (_jsx("option", { value: n, children: n }, n))) })] }), _jsxs("span", { className: "total", children: [data.total, " ", data.total === 1 ? "post" : "posts"] })] })] }), _jsx("section", { className: "posts-grid", children: visiblePosts.length === 0 ? (_jsxs("div", { className: "empty", children: [_jsx("p", { children: "No posts yet." }), data.mine && user && (_jsx("button", { type: "button", className: "btn btn-ghost", onClick: () => setMine(false), children: "Show all posts" }))] })) : (visiblePosts.map((post) => (_jsx(PostCard, { post: post, canEdit: !!user && post.author?._id === user.id, onAuthRequired: requireAuth }, post._id)))) }), totalPages > 1 && (_jsxs("nav", { className: "posts-pagination", "aria-label": "Pagination", children: [_jsx("button", { type: "button", className: "btn btn-ghost", disabled: currentPage <= 1, onClick: () => goToPage(currentPage - 1), children: "\u2039 Prev" }), Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (_jsx("button", { type: "button", className: `page-btn${p === currentPage ? " active" : ""}`, onClick: () => goToPage(p), children: p }, p))), _jsx("button", { type: "button", className: "btn btn-ghost", disabled: currentPage >= totalPages, onClick: () => goToPage(currentPage + 1), children: "Next \u203A" })] })), _jsx(AuthModal, { open: authOpen, onClose: () => setAuthOpen(false), dismissible: true })] }));
}
// Builds an in-flight ghost post derived from the create form data so it
// renders immediately at the top of the list. Returns null when not creating.
function useOptimisticCreatePost(fetcher, user) {
    if (!user)
        return null;
    if (fetcher.state === "idle")
        return null;
    const fd = fetcher.formData;
    if (!fd || fd.get("_intent") !== "create")
        return null;
    return {
        _id: `optimistic-${user.id}`,
        title: String(fd.get("title") || ""),
        body: String(fd.get("body") || ""),
        tags: String(fd.get("tags") || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        views: 0,
        author: { _id: user.id, username: user.username },
    };
}
