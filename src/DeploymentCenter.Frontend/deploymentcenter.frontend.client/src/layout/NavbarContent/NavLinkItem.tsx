import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export function NavLinkItem(props: { to: string, children: ReactNode }) {
  return (
    <Link to={props.to} className="ml-4">
      <Typography
        variant={'h6'}
        style={{ color: "inherit", textDecoration: "inherit" }}
        className="flex items-center gap-2"
      >
        {props.children}
      </Typography>
    </Link>
  );
}