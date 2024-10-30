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
    setAccordationStatus((old) => !old);
  }

  function podTextColor() {
    if (props.pod.status === "Running") {
      return "green";
    } else if (props.pod.status === "Pending") {
      return "orange";
    } else {
      return "red";
    }
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        onClick={() => toggleAccordation()}
      >
        <Typography
          color={podTextColor()}
          sx={{ width: "33%", flexShrink: 0 }}
        >
          {props.pod.name}
        </Typography>
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          Pod status: {props.pod.status}
        </Typography>
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          Internal Ip: {props.pod.ip}
        </Typography>
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
