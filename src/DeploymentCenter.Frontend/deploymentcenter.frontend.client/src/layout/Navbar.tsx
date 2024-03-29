import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { SidebarToggler } from "./sidebar/SidebarToggler";
import { SelectNamespace } from "../shared/components/select-namespaces/SelectNamespace";
import { useConfigurationContext } from "../shared/contexts/context-helpers";

export function Navbar() {
  const { configuration, setConfiguration } = useConfigurationContext();
  const navigate = useNavigate();

  function handleNamespaceChange(ns: string) {
    setConfiguration({
      ...configuration,
      namespace: ns,
    });
    navigate('/');
  }

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
              <SelectNamespace
                namespace={configuration.namespace}
                onNamespaceChanged={(ns) => handleNamespaceChange(ns)}
              />
              {/* <Button color="inherit">Login</Button> */}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
