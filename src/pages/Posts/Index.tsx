import { useEffect, useMemo, useRef, useState } from "react";
import {
  useFetcher,
  useLoaderData,
  useSearchParams,
  type Fetcher,
} from "react-router";
import "../../styles/Posts.css";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../../components/AuthModal";
import PostCard from "./PostCard";
import type { Post } from "../../types/basic";
import type { PostsLoaderData } from "../../Loaders/posts";
import type { PostsActionResult } from "../../actions/posts";

const PAGE_SIZE_OPTIONS = [5, 10, 20];

export default function PostsIndex() {
  const data = useLoaderData() as PostsLoaderData;
  const { user, loading: authLoading, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [authOpen, setAuthOpen] = useState(false);

  const createFetcher = useFetcher<PostsActionResult>();
  const createFormRef = useRef<HTMLFormElement>(null);

  // Open the auth modal automatically when an unauthenticated user lands here.
  useEffect(() => {
    if (!authLoading && !user) setAuthOpen(true);
    if (user) setAuthOpen(false);
  }, [authLoading, user]);

  // Reset the create form once the action succeeds.
  useEffect(() => {
    if (
      createFetcher.state === "idle" &&
      createFetcher.data?.ok &&
      createFetcher.data.intent === "create"
    ) {
      createFormRef.current?.reset();
    }
  }, [createFetcher.state, createFetcher.data]);

  const totalPages = Math.max(1, Math.ceil(data.total / data.limit));
  const currentPage = data.page;

  const goToPage = (page: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(page));
    setSearchParams(next);
  };

  const setMine = (mine: boolean) => {
    const next = new URLSearchParams(searchParams);
    if (mine) next.set("mine", "true");
    else next.delete("mine");
    next.set("page", "1");
    setSearchParams(next);
  };

  const setLimit = (limit: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("limit", String(limit));
    next.set("page", "1");
    setSearchParams(next);
  };

  // Optimistically inject a ghost card while a create is in flight.
  const optimisticCreate = useOptimisticCreatePost(createFetcher, user);
  const visiblePosts = useMemo<Post[]>(
    () => (optimisticCreate ? [optimisticCreate, ...data.posts] : data.posts),
    [optimisticCreate, data.posts]
  );

  const requireAuth = () => setAuthOpen(true);

  return (
    <main className="posts-page">
      <header className="posts-hero">
        <div>
          <h1>Posts</h1>
          <p>Share, edit and discover stories.</p>
        </div>
        <div className="posts-hero-user">
          {user ? (
            <>
              <span className="user-pill">@{user.username}</span>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => logout()}
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setAuthOpen(true)}
            >
              Sign in
            </button>
          )}
        </div>
      </header>

      <section className="create-panel">
        <h2>Create a post</h2>
        {user ? (
          <createFetcher.Form
            method="post"
            ref={createFormRef}
            className="create-form"
          >
            <input type="hidden" name="_intent" value="create" />
            <label>
              <span>Title</span>
              <input
                type="text"
                name="title"
                placeholder="A captivating title"
                required
                maxLength={200}
              />
            </label>
            <label>
              <span>Body</span>
              <textarea
                name="body"
                rows={4}
                placeholder="What's on your mind?"
                required
              />
            </label>
            <label>
              <span>Tags (comma separated)</span>
              <input type="text" name="tags" placeholder="react, mongo" />
            </label>
            <div className="create-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={createFetcher.state !== "idle"}
              >
                {createFetcher.state !== "idle" ? "Publishing…" : "Publish"}
              </button>
              {createFetcher.data?.ok === false &&
                createFetcher.data.intent === "create" && (
                  <span className="post-error">{createFetcher.data.message}</span>
                )}
            </div>
          </createFetcher.Form>
        ) : (
          <div className="create-locked">
            <p>You need an account to publish.</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setAuthOpen(true)}
            >
              Sign in to write
            </button>
          </div>
        )}
      </section>

      <section className="posts-toolbar">
        <div className="filters">
          <label className={`chip ${!data.mine ? "active" : ""}`}>
            <input
              type="radio"
              name="filter"
              checked={!data.mine}
              onChange={() => setMine(false)}
            />
            All posts
          </label>
          <label
            className={`chip ${data.mine ? "active" : ""}${
              !user ? " disabled" : ""
            }`}
            title={!user ? "Sign in to filter your posts" : undefined}
          >
            <input
              type="radio"
              name="filter"
              checked={data.mine}
              disabled={!user}
              onChange={() => {
                if (!user) {
                  setAuthOpen(true);
                  return;
                }
                setMine(true);
              }}
            />
            Written by me
          </label>
        </div>
        <div className="page-size">
          <label>
            Per page
            <select
              value={data.limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <span className="total">
            {data.total} {data.total === 1 ? "post" : "posts"}
          </span>
        </div>
      </section>

      <section className="posts-grid">
        {visiblePosts.length === 0 ? (
          <div className="empty">
            <p>No posts yet.</p>
            {data.mine && user && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setMine(false)}
              >
                Show all posts
              </button>
            )}
          </div>
        ) : (
          visiblePosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              canEdit={!!user && post.author?._id === user.id}
              onAuthRequired={requireAuth}
            />
          ))
        )}
      </section>

      {totalPages > 1 && (
        <nav className="posts-pagination" aria-label="Pagination">
          <button
            type="button"
            className="btn btn-ghost"
            disabled={currentPage <= 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            ‹ Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              className={`page-btn${p === currentPage ? " active" : ""}`}
              onClick={() => goToPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            className="btn btn-ghost"
            disabled={currentPage >= totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next ›
          </button>
        </nav>
      )}

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        dismissible
      />
    </main>
  );
}

// Builds an in-flight ghost post derived from the create form data so it
// renders immediately at the top of the list. Returns null when not creating.
function useOptimisticCreatePost(
  fetcher: Fetcher<PostsActionResult>,
  user: { id: string; username: string } | null
): Post | null {
  if (!user) return null;
  if (fetcher.state === "idle") return null;
  const fd = fetcher.formData;
  if (!fd || fd.get("_intent") !== "create") return null;

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
