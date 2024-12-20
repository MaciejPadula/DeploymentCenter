import { Link } from "react-router-dom";
import { NavLinkItem } from "./NavLinkItem";

export function AppLogo() {
  return (
    <div className="flex items-center">
      <Link to={"/"} className="flex items-center">
        <img className="w-12 aspect-square" src="/logo192.png" />
      </Link>

      <NavLinkItem to="/">Deployment Center</NavLinkItem>
    </div>
  );
}