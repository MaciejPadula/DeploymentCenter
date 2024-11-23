import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { SelectNamespaceDialog } from "../shared/components/select-connection-settings-dialog/SelectConnectionSettings";
import { configuration } from "../shared/services/configuration-service";
import { effect } from "@preact/signals-react";
import { useEffect } from "react";
import { useAppRouting } from "../shared/hooks/navigation";

export function Navbar() {
  const navigation = useAppRouting();

  useEffect(() => {
    effect(() => {
      const currentConfig = configuration.value;
      navigation.updateConnection(
        currentConfig.cluster,
        currentConfig.namespace
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-row items-center justify-start">
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
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
