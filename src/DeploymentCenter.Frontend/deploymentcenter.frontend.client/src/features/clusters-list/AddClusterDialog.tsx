import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemButton,
  TextField,
} from "@mui/material";
import { Fragment, useState } from "react";
import { Cluster } from "../../shared/models/cluster";
import { useConfigurationContext } from "../../shared/contexts/context-helpers";
import { InputVariant } from "../../shared/helpers/material-config";

export function AddClusterDialog() {
  const { configuration, setConfiguration } = useConfigurationContext();

  const [open, setOpen] = useState(false);
  const [clusterName, setClusterName] = useState("");
  const [clusterApiUrl, setClusterApiUrl] = useState("");

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleClusterAdded(cluster: Cluster) {
    setConfiguration({
      ...configuration,
      clusters: [...configuration.clusters, cluster],
    });
  }

  function handleSave() {
    handleClusterAdded({
      name: clusterName,
      apiUrl: clusterApiUrl,
    });
    setOpen(false);
  }

  return (
    <Fragment>
      <ListItemButton onClick={handleClickOpen}>+ Add Cluster</ListItemButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Kubernetes Cluster</DialogTitle>
        <DialogContent>
          <div className="w-full flex flex-col gap-4">
            <TextField
              label="Cluster Name"
              variant={InputVariant}
              onChange={(v) => setClusterName(v.currentTarget.value)}
            />
            <TextField
              label="Cluster Api Url"
              variant={InputVariant}
              onChange={(v) => setClusterApiUrl(v.currentTarget.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
