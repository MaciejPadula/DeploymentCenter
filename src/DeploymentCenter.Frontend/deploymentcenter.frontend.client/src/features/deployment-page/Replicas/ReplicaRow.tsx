import {
  Accordion,
  // AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Pod } from "../models/pod";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { PodLogs } from "./PodLogs";
import { Cluster } from "../../../shared/models/cluster";
import { useState } from "react";

export function ReplicaRow(props: {
  pod: Pod;
  namespace: string;
  cluster: Cluster;
}) {
  const [accordationStatus, setAccordationStatus] = useState(false);

  function toggleAccordation() {
    setAccordationStatus(old => !old);
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDropDownIcon />} onClick={() => toggleAccordation()}>
        <div className={"flex flex-row justify-between w-full"}>
          <Typography color={props.pod.isRunning ? "green" : "red"}>
            {props.pod.name}
          </Typography>
          <Typography>Pod status: {props.pod.status}</Typography>
          <Typography>Internal Ip: {props.pod.ip}</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {accordationStatus && (
          <PodLogs
            namespace={props.namespace}
            podName={props.pod.name}
            cluster={props.cluster}
          />
        )}
      </AccordionDetails>
      {/* <AccordionActions>xd</AccordionActions> */}
    </Accordion>
  );
}
