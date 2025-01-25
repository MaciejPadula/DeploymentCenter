import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { SelectNamespace } from "../select-namespaces/SelectNamespace";
import { SelectClusters } from "../select-clusters/SelectClusters";
import {
  configuration,
  selectedNamespace,
  selectedCluster,
  setClusterAndNamespace,
} from "../../services/configuration-service";
import { Cluster } from "../../models/cluster";
import { effect } from "@preact/signals-react";

type Props = {
  onClose?: () => void;
};

export function SelectNamespaceDialog(props: Props) {
  const [namespaceControl, setNamespaceControl] = useState(selectedNamespace.value);
  const [clusterControl, setClusterControl] = useState(selectedCluster.value?.name ?? "");
  const [open, setOpen] = useState<boolean>(false);
  const [cluster, setCluster] = useState<Cluster | null>(null);

  const validForm = !!cluster && !!namespaceControl && !!clusterControl;

  useEffect(() => {
    effect(() => {
      setClusterControl(selectedCluster.value?.name ?? "");
    });
  }, []);

  useEffect(() => {
    const cluster = configuration.value.clusters.find(
      (x) => x.name === clusterControl
    );
    setCluster(cluster ?? null);
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
  }

  return (
    <Fragment>
      <Button variant="text" onClick={handleClickOpen}>
        {configuration.value?.clusters?.length === 0 ? (
          <span>No Clusters</span>
        ) : (
          <>
            <span>{configuration.value.cluster}</span>
            <span className="sm:block hidden">
              /{configuration.value.namespace}
            </span>
          </>
        )}
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
              onNamespacesEdit={handleClose}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={handleSave} disabled={!validForm}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
