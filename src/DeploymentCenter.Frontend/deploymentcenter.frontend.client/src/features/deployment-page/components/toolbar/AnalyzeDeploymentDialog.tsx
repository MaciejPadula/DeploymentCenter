import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { AnalyzeDialogContent } from "./AnalyzeDialogContent";
import { Cluster } from "../../../../shared/models/cluster";

type Props = {
  cluster: Cluster;
  deploymentName: string;
  namespace: string;
};

export function AnalyzeDeploymentDialog(props: Props) {
  const [open, setOpen] = useState<boolean>(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Tooltip title={"Analyze Deployment Status"}>
        <IconButton onClick={handleClickOpen}>
          <AutoFixHighIcon className="text-blue-500" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Your Deployment Assistant</DialogTitle>
        <DialogContent className="w-full !px-8 !py-4 flex flex-col gap-4" style={{ minWidth: '600px' }}>
          <AnalyzeDialogContent cluster={props.cluster} namespace={props.namespace} deploymentName={props.deploymentName} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}