import { useState } from "react";
import { Drawer, IconButton, Tooltip } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { Cluster } from "../../../shared/models/cluster";
import { AnalyzeChat } from "./AnalyzeChat";

type Props = {
  cluster: Cluster;
  title: string;
  tooltip: string;
  chatName: string;
  analyzeQuery: (question: string) => Promise<string | null>;
};

export function AnalyzeDrawer(props: Props) {
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
      <Drawer open={open} onClose={handleClose} anchor="right">
        <div className="w-full sm:w-[40dvw] h-full">
          <AnalyzeChat
            chatName={props.chatName}
            cluster={props.cluster}
            analyzeQuery={props.analyzeQuery}
          />
        </div>
      </Drawer>
    </>
  );
}
