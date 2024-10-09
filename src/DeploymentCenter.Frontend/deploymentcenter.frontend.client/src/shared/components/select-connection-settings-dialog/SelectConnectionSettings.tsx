import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { SelectNamespace } from "../select-namespaces/SelectNamespace";
import { useLocation } from "react-router-dom";
import { SelectClusters } from "../select-clusters/SelectClusters";
import {
  configuration,
  selectedNamespace,
  selectedCluster,
  setClusterAndNamespace,
} from "../../services/configuration-service";
import { useAppRouting } from "../../hooks/navigation";
import { Cluster } from "../../models/cluster";

export function SelectNamespaceDialog(props: { onClose?: () => void }) {
  const navigation = useAppRouting();
  const location = useLocation();
  const [namespaceControl, setNamespaceControl] = useState(
    selectedNamespace.value
  );
  const [clusterControl, setClusterControl] = useState(
    selectedCluster.value?.name ?? ""
  );
  const [open, setOpen] = useState<boolean>(false);
  const [cluster, setCluster] = useState<Cluster | null>(null);

  useEffect(() => {
    const cluster = configuration.value.clusters.find(
      (x) => x.name === clusterControl
    );
    if (cluster === undefined) {
      return;
    }
    setCluster(cluster);
  }, [clusterControl]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSave() {
    setClusterAndNamespace(clusterControl, namespaceControl);
    setOpen(false);
    if (props.onClose) {
      props.onClose();
    }

    navigation.updateConnection(location.pathname, clusterControl, namespaceControl);
  }

  return (
    <Fragment>
      <Button variant="text" onClick={handleClickOpen}>
        <span>{configuration.value.cluster}</span>
        <span className="sm:block hidden">
          /{configuration.value.namespace}
        </span>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Default Connection Settings</DialogTitle>
        <DialogContent className="w-full !px-8 !py-4 flex flex-col gap-4">
          <SelectClusters
            defaultCluster={selectedCluster.value?.name ?? ""}
            clusters={configuration.value.clusters}
            onClusterChanged={setClusterControl}
            onClusterEdit={handleClose}
          />
          {cluster && (
            <SelectNamespace
              defaultNamespace={selectedNamespace.value}
              cluster={cluster}
              onNamespaceChanged={setNamespaceControl}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
