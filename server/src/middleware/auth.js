import jwt from "jsonwebtoken";

export const COOKIE_NAME = "token";

export function signToken(user) {
  return jwt.sign(
    { id: user._id.toString(), username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function setAuthCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export function clearAuthCookie(res) {
  res.clearCookie(COOKIE_NAME, { path: "/" });
}

// Soft auth: attaches req.user when a valid token is present, otherwise leaves it undefined.
export function attachUser(req, _res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return next();
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    // Invalid/expired token — treat as anonymous.
  }
  next();
}

// Hard auth: 401 if no valid token.
export function requireAuth(req, res, next) {
  attachUser(req, res, () => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    next();
  });
}
