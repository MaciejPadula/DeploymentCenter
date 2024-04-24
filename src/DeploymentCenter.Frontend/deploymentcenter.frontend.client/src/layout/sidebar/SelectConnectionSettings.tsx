import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { SelectNamespace } from "../../shared/components/select-namespaces/SelectNamespace";
import { useLocation, useNavigate } from "react-router-dom";
import { useConfigurationContext } from "../../shared/contexts/context-helpers";
import { SelectClusters } from "../../shared/components/select-clusters/SelectClusters";
import { createRedirectUrl } from "./redirect-helper";

export function SelectNamespaceDialog(props: { onClose?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { configuration, setConfiguration } = useConfigurationContext();
  const [selectedNamespace, setSelectedNamespace] = useState(
    configuration.namespace
  );
  const [selectedCluster, setSelectedCluster] = useState(configuration.cluster);
  const [open, setOpen] = useState<boolean>(false);
  const [clusterUrl, setClusterUrl] = useState<string>("");

  useEffect(() => {
    const cluster = configuration.clusters.find(
      (x) => x.name === selectedCluster
    );
    if (cluster === undefined) {
      return;
    }
    setClusterUrl(cluster.apiUrl);
  }, [configuration.clusters, selectedCluster]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSave() {
    setConfiguration({
      ...configuration,
      namespace: selectedNamespace,
      cluster: selectedCluster,
    });
    navigate(createRedirectUrl(location.pathname, selectedCluster, selectedNamespace));
    setOpen(false);
    if (props.onClose) {
      props.onClose();
    }
    navigate(0);
  }

  return (
    <Fragment>
      <Button variant="text" onClick={handleClickOpen}>
        <span>{configuration.cluster}</span>
        <span className="sm:block hidden">/{configuration.namespace}</span>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Default Connection Settings</DialogTitle>
        <DialogContent className="w-full !px-8 !py-4 flex flex-col gap-4">
          <SelectClusters
            cluster={selectedCluster}
            clusters={configuration.clusters}
            onClusterChanged={(c) => setSelectedCluster(c)}
            onClusterEdit={handleClose}
          />
          {clusterUrl?.length > 0 && (
            <SelectNamespace
              namespace={selectedNamespace}
              apiUrl={clusterUrl}
              onNamespaceChanged={(ns) => setSelectedNamespace(ns)}
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
