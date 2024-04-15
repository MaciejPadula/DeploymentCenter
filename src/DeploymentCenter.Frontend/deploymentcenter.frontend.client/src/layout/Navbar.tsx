import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { SidebarToggler } from "./sidebar/SidebarToggler";
import { SelectNamespaceDialog } from "./sidebar/SelectConnectionSettings";

export function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-row items-center justify-start">
              <SidebarToggler />
              <Typography
                variant="h6"
                component={Link}
                to={"/"}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Deployment Center
              </Typography>
            </div>
            <div className="flex flex-row justify-center items-center">
              <SelectNamespaceDialog />
              {/* <Button color="inherit">Login</Button> */}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
