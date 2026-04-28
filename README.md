# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Posts CRUD + Auth + MongoDB

The repo includes a small full-stack feature:

- Frontend `/posts` page with create / read / update / delete, "Written by me" filter, pagination, optimistic updates and a tabbed login/register modal.
- Node/Express + Mongoose backend in [server/](server/) with JWT stored in an `HttpOnly` cookie.

### 1. Start MongoDB

Make sure MongoDB is running locally on `mongodb://localhost:27017` (e.g. `brew services start mongodb-community`, or run via Docker: `docker run -d -p 27017:27017 mongo`).

### 2. Configure and run the API

```bash
cd server
cp .env.example .env
# edit .env if you need to (default DB is mongodb://localhost:27017/myapp)
npm install
npm run dev      # starts on http://localhost:5000
```

Endpoints exposed:

- `POST /api/auth/register` — `{ username, email, password }`
- `POST /api/auth/login` — `{ email, password }`
- `POST /api/auth/logout`
- `GET  /api/auth/me`
- `GET  /api/posts?page=1&limit=10&mine=true`
- `POST /api/posts` (auth)
- `PUT  /api/posts/:id` (auth + ownership)
- `DELETE /api/posts/:id` (auth + ownership)

### 3. Run the frontend

```bash
npm install
npm run dev      # http://localhost:5173
```

The Vite dev server proxies `/api` to `http://localhost:5000`, so the auth cookie stays same-origin.

### How auth is stored

The server signs a JWT and sets it as an `HttpOnly`, `SameSite=Lax` cookie called `token`. The browser sends it automatically on every same-origin `/api` request. The frontend mirrors the resolved user in `AuthContext` (hydrated via `GET /api/auth/me` on mount) so components can render owner-only edit/delete icons.



Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
