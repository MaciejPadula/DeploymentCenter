import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Layout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <Outlet key={location.key} />
      </div>
    </>
  );
}