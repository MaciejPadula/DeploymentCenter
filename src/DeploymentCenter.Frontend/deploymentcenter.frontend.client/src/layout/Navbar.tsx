import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { SelectNamespaceDialog } from "../shared/components/select-connection-settings-dialog/SelectConnectionSettings";
import { ReactNode } from "react";

function NavLinkItem(props: { to: string, children: ReactNode }) {
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

export function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-row items-center justify-start">
              <Link to={"/"} className="flex items-center">
                <img className="w-12 aspect-square" src="/logo192.png" />
              </Link>

              <NavLinkItem to="/">Deployment Center</NavLinkItem>
            </div>
            <div className="flex flex-row justify-center items-center">
              <SelectNamespaceDialog />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
