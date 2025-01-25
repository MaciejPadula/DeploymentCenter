import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { UrlBreadcrumbs } from "./UrlBreadcrumbs";

export function Layout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div className="flex p-2">
        <UrlBreadcrumbs />
      </div>
      <div className="flex flex-row">
        <Outlet key={location.key} />
      </div>
    </>
  );
}