import type { LoaderFunctionArgs } from "react-router";
import { listPosts } from "../api/posts";
import type { PostsListResponse } from "../types/basic";

export interface PostsLoaderData extends PostsListResponse {
  mine: boolean;
}

export const postsLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<PostsLoaderData> => {
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1") || 1);
  const limit = Math.max(
    1,
    Math.min(50, parseInt(url.searchParams.get("limit") || "10") || 10)
  );
  const mine = url.searchParams.get("mine") === "true";

  try {
    const data = await listPosts({ page, limit, mine });
    return { ...data, mine };
  } catch {
    // Soft-fail to an empty list so the page still renders even if the API/DB
    // is unreachable; the UI surfaces the connection state separately.
    return { posts: [], total: 0, page, limit, mine };
  }
};
