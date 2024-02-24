import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Layout() {
  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <Outlet />
      </div>
    </>
  );
}