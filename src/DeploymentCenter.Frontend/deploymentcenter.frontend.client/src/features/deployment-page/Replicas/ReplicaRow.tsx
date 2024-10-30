import {
  Accordion,
  // AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Pod } from "../models/pod";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { ReplicaLogs } from "./ReplicaLogs";
import { Cluster } from "../../../shared/models/cluster";

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
    } else if (props.pod.status === "Succeeded") {
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
          className={'w-full sm:w-1/3'}
        >
          {props.pod.name}
        </Typography>
        <Typography className={'hidden w-1/3 sm:flex'}>
          Pod status: {props.pod.status}
        </Typography>
        <Typography className={'hidden  w-1/3 sm:flex'}>
          Internal Ip: {props.pod.ip}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {accordationStatus && (
          <>
            <div className={'block sm:hidden'}>
              <div>Internal Ip: {props.pod.ip}</div>
              <div>Pod status: {props.pod.status}</div>
            </div>
            <ReplicaLogs
              namespace={props.namespace}
              podName={props.pod.name}
              cluster={props.cluster}
            />
          </>
        )}
      </AccordionDetails>
      {/* <AccordionActions>xd</AccordionActions> */}
    </Accordion>
  );
}
