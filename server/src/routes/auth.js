import { Router } from "express";
import User from "../models/User.js";
import {
  attachUser,
  clearAuthCookie,
  setAuthCookie,
  signToken,
} from "../middleware/auth.js";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body || {};
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "username, email and password are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters" });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }
    const user = new User({ username, email });

    user.password = password;
    await user.save();

    const token = signToken(user);
    setAuthCookie(res, token);
    res.status(201).json({ user: user.toPublic() });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = signToken(user);
    setAuthCookie(res, token);
    res.json({ user: user.toPublic() });
  } catch (err) {
    next(err);
  }
});

router.post("/logout", (_req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

router.get("/me", attachUser, async (req, res, next) => {
  try {
    if (!req.user) return res.json({ user: null });
    const user = await User.findById(req.user.id);
    if (!user) return res.json({ user: null });
    res.json({ user: user.toPublic() });
  } catch (err) {
    next(err);
  }
});

export default router;
