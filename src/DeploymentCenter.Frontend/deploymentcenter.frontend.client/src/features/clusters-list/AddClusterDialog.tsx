import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemButton,
  TextField,
} from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import { Cluster } from "../../shared/models/cluster";
import { InputVariant } from "../../shared/helpers/material-config";
import { addCluster } from "../../shared/services/configuration-service";
import useClustersDataService from "./clusters-data-service";

export function AddClusterDialog() {
  const [open, setOpen] = useState(false);
  const [clusterName, setClusterName] = useState("");
  const [clusterApiUrl, setClusterApiUrl] = useState("");
  const [kubeconfig, setKubeconfig] = useState("");

  const cantLoad = useMemo(
    () =>
      clusterName.length === 0 ||
      clusterApiUrl.length === 0 ||
      kubeconfig.length === 0,
    [clusterName, clusterApiUrl, kubeconfig]
  );

  const clustersDataService = useClustersDataService(clusterApiUrl);

  async function secureKubeconfig(plainKubeconfig: string) {
    if (!clustersDataService) {
      return;
    }
    const result = await clustersDataService.securePassword(plainKubeconfig);
    setKubeconfig(result);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleClusterAdded(cluster: Cluster) {
    addCluster(cluster);
  }

  function handleSave() {
    handleClusterAdded({
      name: clusterName,
      apiUrl: clusterApiUrl,
      kubeconfig: kubeconfig,
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
              onBlur={(v) => setClusterName(v.currentTarget.value)}
            />
            <TextField
              label="Cluster Api Url"
              variant={InputVariant}
              onBlur={(v) => setClusterApiUrl(v.currentTarget.value)}
            />

            <TextField
              label="Cluster Kube Config"
              variant={InputVariant}
              onBlur={(v) => secureKubeconfig(v.currentTarget.value)}
              type={"password"}
              disabled={clusterApiUrl?.length === 0}
              multiline
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={handleSave} disabled={cantLoad}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
