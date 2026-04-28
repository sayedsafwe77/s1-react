import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout.tsx";
import App from "./App.tsx";
import Profile from "./pages/Profile.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Index from "./pages/Todo/Index.tsx";
import Show from "./pages/Todo/Show.tsx";
import Create from "./pages/Todo/Create.tsx";
import TournamentShow from "./pages/Tournament/Show.tsx";
import { TodoLoader } from "./Loaders/todo.ts";
import { submitTodo } from "./actions.ts";
import NotFound from "./pages/Errors/NotFound.tsx";
import Exception from "./pages/Errors/Exception.tsx";

export default createBrowserRouter([
  {
    ErrorBoundary: NotFound,
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: App,
      },
      {
        path: "/profile",
        ErrorBoundary: Exception,
        Component: Profile,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/tournament/*",
        Component: TournamentShow,
      },
      {
        path: "/todo",
        children: [
          {
            index: true,
            // middleware: [getUserMiddleware],
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
            loader: TodoLoader,
            Component: Create,
          },
          {
            path: "edit/:id",
            lazy: {
              loader: async () =>
                (await import("./Loaders/todo.ts")).singleTodoLoader,
              action: async () => (await import("./actions.ts")).EditTodo,
              Component: async () =>
                (await import("./pages/Todo/Edit.tsx")).default,
            },
          },
        ],
      },
    ],
  },
]);
