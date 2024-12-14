import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { Cluster } from "../../../shared/models/cluster";
import { AnalyzeDialogContent } from "./AnalyzeDialogContent";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  cluster: Cluster;
  title: string;
  tooltip: string;
  analyzeQuery: (question: string) => Promise<string | null>;
};

export function AnalyzeDialog(props: Props) {
  const [open, setOpen] = useState<boolean>(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Tooltip title={props.tooltip}>
        <IconButton onClick={handleClickOpen}>
          <AutoFixHighIcon className="text-blue-500" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullScreen={true}>
        <DialogTitle>{props.title}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className="w-full !px-8 !py-4 flex flex-col gap-4">
          <AnalyzeDialogContent
            cluster={props.cluster}
            analyzeQuery={props.analyzeQuery}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
