import { Button, Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { SelectNamespaceDialog } from "../../shared/components/select-connection-settings-dialog/SelectConnectionSettings";
import { useAppRouting } from "../../shared/hooks/navigation";

export function SidebarToggler() {
  const [open, setOpen] = useState(false);
  const navigation = useAppRouting();

  function toggleDrawer(newOpen: boolean) {
    setOpen(newOpen);
  }

  function setupApplication() {
    toggleDrawer(false);
    navigation.setupAplication();
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
