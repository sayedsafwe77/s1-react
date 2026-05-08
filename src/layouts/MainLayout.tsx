import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/Auth/AuthProvider";

export default function MainLayout() {
  return (
    <>
      <AuthProvider>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </AuthProvider>
    </>
  );
}
