import { api } from "./client";
export async function listPosts(params = {}) {
    const res = await api.get("/posts", {
        params: {
            page: params.page ?? 1,
            limit: params.limit ?? 10,
            ...(params.mine ? { mine: "true" } : {}),
        },
    });
    return res.data;
}
export async function createPost(input) {
    const res = await api.post("/posts", input);
    return res.data.post;
}
export async function updatePost(id, input) {
    const res = await api.put(`/posts/${id}`, input);
    return res.data.post;
}
export async function deletePost(id) {
    await api.delete(`/posts/${id}`);
}
