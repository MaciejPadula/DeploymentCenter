import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { SelectNamespaceDialog } from "../shared/components/select-connection-settings-dialog/SelectConnectionSettings";
import { ReactNode } from "react";
import { SearchResourcesInput } from "../features/search/SearchResourcesInput";
import { selectedCluster } from "../shared/services/configuration-service";

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
  const cluster = selectedCluster.value;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="flex flex-col justify-center">
          <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-row items-center justify-start">
              <Link to={"/"} className="flex items-center">
                <img className="w-12 aspect-square" src="/logo192.png" />
              </Link>

              <NavLinkItem to="/">Deployment Center</NavLinkItem>
            </div>

            {cluster && <div className="hidden sm:flex w-3/5"><SearchResourcesInput cluster={cluster} /></div>}

            <div className="flex flex-row justify-center items-center">
              <SelectNamespaceDialog />
            </div>
          </div>

          {cluster && <div className="flex sm:hidden w-full"><SearchResourcesInput cluster={cluster} /></div>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
