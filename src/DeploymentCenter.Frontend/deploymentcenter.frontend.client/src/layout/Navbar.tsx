import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { SidebarToggler } from "../shared/components/sidebar/SidebarToggler";

export function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <SidebarToggler />
          <Typography
            variant="h6"
            component={Link}
            sx={{ flexGrow: 1 }}
            to={"/"}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            Deployment Center
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
