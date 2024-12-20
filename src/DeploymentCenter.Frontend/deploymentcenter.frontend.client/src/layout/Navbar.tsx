import { AppBar, Box, Toolbar } from "@mui/material";
import { selectedCluster } from "../shared/services/configuration-service";
import { NavbarContentDesktop } from "./NavbarContent/NavbarContentDesktop";
import { NavbarContentMobile } from "./NavbarContent/NavbarContentMobile";
import { useMobile } from "../shared/hooks/mobile";

export function Navbar() {
  const mobile = useMobile();
  const cluster = selectedCluster.value;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="flex flex-col justify-center my-4 sm:my-auto">
          {
            mobile
              ? <NavbarContentMobile cluster={cluster} />
              : <NavbarContentDesktop cluster={cluster} />
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
