import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { Pod } from "../models/pod";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { PodLogs } from "./PodLogs";
import { useState } from "react";

export function ReplicaRow(props: {
  pod: Pod;
  namespace: string;
  clusterUrl: string;
}) {
  const [showLogs, setShowLogs] = useState(false);

  function toggleLogs() {
    setShowLogs((oldShowLogs) => !oldShowLogs);
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
        <Typography color={props.pod.isRunning ? "green" : "red"}>
          {props.pod.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{props.pod.status}</Typography>
        <Typography>{props.pod.ip}</Typography>
        <Button onClick={toggleLogs}>Show logs</Button>
        {showLogs && (
          <PodLogs
            namespace={props.namespace}
            podName={props.pod.name}
            clusterUrl={props.clusterUrl}
          />
        )}
      </AccordionDetails>
      <AccordionActions>xd</AccordionActions>
    </Accordion>
  );
}
