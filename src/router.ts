import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout.tsx";
import App from "./App.tsx";
import Profile from "./pages/Profile.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Index from "./pages/Todo/Index.tsx";
import Show from "./pages/Todo/Show.tsx";
import Create from "./pages/Todo/Create.tsx";
import Edit from "./pages/Todo/Edit.tsx";
import TournamentShow from "./pages/Tournament/Show.tsx";
import PostsIndex from "./pages/Posts/Index.tsx";
import { testLoader, TodoLoader } from "./Loaders/todo.ts";
import { postsLoader } from "./Loaders/posts.ts";
import { testMiddleware } from "./Middlewares/base.ts";
import { submitTodo } from "./actions.ts";
import { postsAction } from "./actions/posts.ts";
import MemoPosts from "./pages/MemoPosts.tsx";

export default createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      { path: "/", Component: App },
      { path: "/profile", Component: Profile },
      { path: "/about", Component: About },
      { path: "/contact", Component: Contact },
      { path: "/tournament/*", Component: TournamentShow },
      {
        path: "/posts",
        middleware: [testMiddleware],
        loader: postsLoader,
        action: postsAction,
        Component: PostsIndex,
      },
      {
        path: "/memo",
        loader: TodoLoader,
        Component: MemoPosts,
      },
      {
        path: "/todo",
        children: [
          {
            index: true,
            loader: TodoLoader,
            Component: Index,
          },
          {
            path: "show/:id",
            Component: Show,
          },
          {
            path: "create",
            action: submitTodo,
            Component: Create,
          },
          {
            path: "edit",
            loader: testLoader,
            middleware: [testMiddleware],
            Component: Edit,
          },
        ],
      },
    ],
  },
]);
