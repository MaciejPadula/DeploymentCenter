import { Button, Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { SelectNamespaceDialog } from "./SelectConnectionSettings";
import { useNavigate } from "react-router-dom";

export function SidebarToggler() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function toggleDrawer(newOpen: boolean) {
    setOpen(newOpen);
  }

  function setupApplication() {
    toggleDrawer(false);
    navigate("setup-application");
  }

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <SelectNamespaceDialog onClose={() => toggleDrawer(false)} />
        <Button onClick={setupApplication}>Setup new application</Button>
      </Drawer>
    </>
  );
}
