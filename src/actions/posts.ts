import type { ActionFunctionArgs } from "react-router";
import { createPost, deletePost, updatePost } from "../api/posts";
import { getApiErrorMessage } from "../api/client";

export type PostsActionResult =
  | { ok: true; intent: "create" | "update" | "delete"; id?: string }
  | { ok: false; intent: string; message: string };

export const postsAction = async ({
  request,
}: ActionFunctionArgs): Promise<PostsActionResult> => {
  const formData = await request.formData();
  const intent = String(formData.get("_intent") || "");

  try {
    if (intent === "create") {
      const post = await createPost({
        title: String(formData.get("title") || ""),
        body: String(formData.get("body") || ""),
        tags: String(formData.get("tags") || ""),
      });
      return { ok: true, intent: "create", id: post._id };
    }

    if (intent === "update") {
      const id = String(formData.get("id") || "");
      if (!id) return { ok: false, intent, message: "Missing post id" };
      const post = await updatePost(id, {
        title: String(formData.get("title") || ""),
        body: String(formData.get("body") || ""),
        tags: String(formData.get("tags") || ""),
      });
      return { ok: true, intent: "update", id: post._id };
    }

    if (intent === "delete") {
      const id = String(formData.get("id") || "");
      if (!id) return { ok: false, intent, message: "Missing post id" };
      await deletePost(id);
      return { ok: true, intent: "delete", id };
    }

    return { ok: false, intent, message: `Unknown intent: ${intent}` };
  } catch (err) {
    return { ok: false, intent, message: getApiErrorMessage(err) };
  }
};
