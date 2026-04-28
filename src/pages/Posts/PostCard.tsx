import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";
import type { Post } from "../../types/basic";

interface Props {
  post: Post;
  canEdit: boolean;
  onAuthRequired: () => void;
}

export default function PostCard({ post, canEdit, onAuthRequired }: Props) {
  const fetcher = useFetcher();
  const [editing, setEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Derive an optimistic post from the in-flight form data so the user sees
  // their edit instantly. While submitting we also keep the card in a "saving"
  // visual state.
  const inFlightIntent = fetcher.formData?.get("_intent");
  const isUpdating = fetcher.state !== "idle" && inFlightIntent === "update";
  const isDeleting = fetcher.state !== "idle" && inFlightIntent === "delete";

  const optimistic: Post = isUpdating
    ? {
        ...post,
        title: String(fetcher.formData!.get("title") ?? post.title),
        body: String(fetcher.formData!.get("body") ?? post.body),
        tags: String(fetcher.formData!.get("tags") ?? post.tags.join(", "))
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }
    : post;

  // Close the editor when the update completes successfully.
  useEffect(() => {
    if (
      fetcher.state === "idle" &&
      fetcher.data?.ok &&
      fetcher.data.intent === "update"
    ) {
      setEditing(false);
    }
  }, [fetcher.state, fetcher.data]);

  if (isDeleting) {
    // Hide the card optimistically; the loader revalidation will remove it for real.
    return null;
  }

  return (
    <article className={`post-card${isUpdating ? " is-saving" : ""}`}>
      <header className="post-card-header">
        {editing ? (
          <input
            className="post-edit-title"
            name="__title_preview"
            value={optimistic.title}
            onChange={() => {}}
            readOnly
            hidden
          />
        ) : (
          <h3 className="post-card-title">{optimistic.title}</h3>
        )}

        {canEdit && !editing && (
          <div className="post-actions">
            <button
              type="button"
              className="icon-btn"
              aria-label="Edit post"
              title="Edit"
              onClick={() => {
                if (!canEdit) return onAuthRequired();
                setEditing(true);
              }}
            >
              {/* pencil icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 20h4l10-10-4-4L4 16v4z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <fetcher.Form method="post" className="inline">
              <input type="hidden" name="_intent" value="delete" />
              <input type="hidden" name="id" value={post._id} />
              <button
                type="submit"
                className="icon-btn danger"
                aria-label="Delete post"
                title="Delete"
                onClick={(e) => {
                  if (!confirm("Delete this post?")) e.preventDefault();
                }}
              >
                {/* trash icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-7 0v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </fetcher.Form>
          </div>
        )}
      </header>

      {editing ? (
        <fetcher.Form method="post" ref={formRef} className="post-edit-form">
          <input type="hidden" name="_intent" value="update" />
          <input type="hidden" name="id" value={post._id} />
          <label>
            <span>Title</span>
            <input
              type="text"
              name="title"
              defaultValue={post.title}
              required
              maxLength={200}
            />
          </label>
          <label>
            <span>Body</span>
            <textarea name="body" defaultValue={post.body} required rows={4} />
          </label>
          <label>
            <span>Tags (comma separated)</span>
            <input
              type="text"
              name="tags"
              defaultValue={post.tags.join(", ")}
            />
          </label>
          <div className="post-edit-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setEditing(false)}
              disabled={fetcher.state !== "idle"}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={fetcher.state !== "idle"}
            >
              {fetcher.state !== "idle" ? "Saving…" : "Save"}
            </button>
          </div>
          {fetcher.data?.ok === false && fetcher.data.intent === "update" && (
            <div className="post-error">{fetcher.data.message}</div>
          )}
        </fetcher.Form>
      ) : (
        <>
          <p className="post-card-body">{optimistic.body}</p>
          {optimistic.tags.length > 0 && (
            <ul className="post-tags">
              {optimistic.tags.map((tag) => (
                <li key={tag}>#{tag}</li>
              ))}
            </ul>
          )}
          <footer className="post-card-footer">
            <span className="post-author">
              {post.author?.username ? `@${post.author.username}` : "anonymous"}
            </span>
            <span className="post-views">{post.views} views</span>
          </footer>
        </>
      )}
    </article>
  );
}
