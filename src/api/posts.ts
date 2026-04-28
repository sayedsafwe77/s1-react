import { api } from "./client";
import type { Post, PostsListResponse } from "../types/basic";

export interface ListPostsParams {
  page?: number;
  limit?: number;
  mine?: boolean;
}

export async function listPosts(params: ListPostsParams = {}): Promise<PostsListResponse> {
  const res = await api.get<PostsListResponse>("/posts", {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      ...(params.mine ? { mine: "true" } : {}),
    },
  });
  return res.data;
}

export interface CreatePostInput {
  title: string;
  body: string;
  tags?: string[] | string;
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const res = await api.post<{ post: Post }>("/posts", input);
  return res.data.post;
}

export interface UpdatePostInput {
  title?: string;
  body?: string;
  tags?: string[] | string;
}

export async function updatePost(id: string, input: UpdatePostInput): Promise<Post> {
  const res = await api.put<{ post: Post }>(`/posts/${id}`, input);
  return res.data.post;
}

export async function deletePost(id: string): Promise<void> {
  await api.delete(`/posts/${id}`);
}
