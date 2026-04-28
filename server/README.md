# my-app server

Express + Mongoose API backing the `/posts` page in the parent React app.

## Stack

- Express 4
- Mongoose 8
- jsonwebtoken (cookie-based, `HttpOnly`)
- bcryptjs (password hashing)
- cookie-parser, cors (with `credentials: true`), dotenv

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

The API listens on `PORT` (default `5000`).

### Environment variables

| Variable        | Default                              | Notes                                  |
| --------------- | ------------------------------------ | -------------------------------------- |
| `MONGO_URI`     | `mongodb://localhost:27017/myapp`    | Mongoose connection string             |
| `JWT_SECRET`    | _required_                           | HS256 signing key, use a long random   |
| `PORT`          | `5000`                               | HTTP port                              |
| `CLIENT_ORIGIN` | `http://localhost:5173`              | CORS origin (must match the frontend)  |
| `NODE_ENV`      | `development`                        | when `production`, cookie is `Secure`  |

## API

### Auth

- `POST /api/auth/register` `{ username, email, password }` — creates a user, sets cookie, returns `{ user }`
- `POST /api/auth/login` `{ email, password }` — returns `{ user }`, sets cookie
- `POST /api/auth/logout` — clears cookie
- `GET /api/auth/me` — `{ user }` or `{ user: null }`

### Posts

- `GET /api/posts?page=&limit=&mine=true` — list, populated `author: { _id, username }`
- `POST /api/posts` (auth) `{ title, body, tags? }`
- `PUT /api/posts/:id` (auth + owner) — partial update
- `DELETE /api/posts/:id` (auth + owner)

## Future hardening (not implemented)

- `helmet` for security headers
- `express-rate-limit` on `/api/auth/*`
- Refresh-token rotation
