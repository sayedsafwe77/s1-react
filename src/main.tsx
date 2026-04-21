import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Profile from "./pages/Profile.tsx";
import Contact from "./pages/Contact.tsx";
import About from "./pages/About.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Index from "./pages/Todo/Index.tsx";
import Create from "./pages/Todo/Create.tsx";
import Edit from "./pages/Todo/Edit.tsx";
import Show from "./pages/Todo/Show.tsx";
import TournamentShow from "./pages/Tournament/Show.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<App />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>

        <Route path="/todo">
          <Route index element={<Index />}></Route>
          <Route path="create" element={<Create />}></Route>
          <Route path="edit" element={<Edit />}></Route>
          <Route path="show/:id" element={<Show />}></Route>
        </Route>
        <Route path="/tournaments">
          <Route path="*" element={<TournamentShow />}></Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);
