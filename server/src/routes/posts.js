import { Router } from "express";
import mongoose from "mongoose";
import Post from "../models/Post.js";
import { attachUser, requireAuth } from "../middleware/auth.js";

const router = Router();

function serializePost(p) {
  return {
    _id: p._id.toString(),
    title: p.title,
    body: p.body,
    tags: p.tags,
    views: p.views,
    author: p.author
      ? { _id: p.author._id.toString(), username: p.author.username }
      : null,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}

function parseTags(input) {
  if (Array.isArray(input)) return input.map((t) => String(t).trim()).filter(Boolean);
  if (typeof input === "string") {
    return input
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

// GET /api/posts?page=1&limit=10&mine=true
router.get("/", attachUser, async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
    const mine = req.query.mine === "true";

    const filter = {};
    if (mine && req.user) filter.author = req.user.id;

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("author", "username")
        .lean(),
      Post.countDocuments(filter),
    ]);

    res.json({
      posts: posts.map(serializePost),
      total,
      page,
      limit,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", attachUser, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const post = await Post.findById(req.params.id).populate("author", "username");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ post: serializePost(post) });
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { title, body } = req.body || {};
    if (!title || !body) {
      return res.status(400).json({ message: "title and body are required" });
    }
    const created = await Post.create({
      title: String(title).trim(),
      body: String(body).trim(),
      tags: parseTags(req.body.tags),
      author: req.user.id,
    });
    const populated = await created.populate("author", "username");
    res.status(201).json({ post: serializePost(populated) });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only edit your own posts" });
    }

    const { title, body } = req.body || {};
    if (title !== undefined) post.title = String(title).trim();
    if (body !== undefined) post.body = String(body).trim();
    if (req.body.tags !== undefined) post.tags = parseTags(req.body.tags);

    await post.save();
    const populated = await post.populate("author", "username");
    res.json({ post: serializePost(populated) });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own posts" });
    }
    await post.deleteOne();
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
