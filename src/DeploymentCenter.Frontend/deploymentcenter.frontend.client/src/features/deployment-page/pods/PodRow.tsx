import {
  Accordion,
  // AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { Pod } from "../models/pod";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { ReplicaLogs } from "./PodLogs";
import { Cluster } from "../../../shared/models/cluster";
import { DeleteResource } from "../../../shared/components/delete-resource/DeleteResource";
import useDeploymentPageDataService from "../deployment-page-data-service";
import { isPodFailed, isPodPending, isPodRunning } from "../pod-helper";

export function ReplicaRow(props: {
  pod: Pod;
  namespace: string;
  cluster: Cluster;
}) {
  const dataService = useDeploymentPageDataService(props.cluster);
  const [accordationStatus, setAccordationStatus] = useState(false);

  function toggleAccordation() {
    setAccordationStatus((old) => !old);
  }

  function podTextColor() {
    if (isPodRunning(props.pod)) {
      return "green";
    } else if (isPodPending(props.pod)) {
      return "orange";
    } else if (isPodFailed(props.pod)) {
      return "red";
    }
  }

  async function removePod() {
    await dataService?.removePod(props.namespace, props.pod.name);
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        onClick={() => toggleAccordation()}
      >
        <Typography color={podTextColor()} className={"w-full sm:w-1/3"}>
          {props.pod.name}
        </Typography>
        <Typography className={"hidden w-1/3 sm:flex"}>
          Pod status: {props.pod.status?.reason ?? props.pod.phase}
        </Typography>
        <Typography className={"hidden  w-1/3 sm:flex"}>
          Internal Ip: {props.pod.ip}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {accordationStatus && (
          <>
            <div className={"block sm:hidden"}>
              <div>Internal Ip: {props.pod.ip}</div>
              <div>Pod status: {props.pod.phase}</div>
              {
                props.pod.status && (
                  <>
                    <div>Reason: {props.pod.status.reason}</div>
                    <div>Message: {props.pod.status.message}</div>
                  </>
                )
              }
            </div>
            <DeleteResource resourceName={props.pod.name} onDelete={removePod}>
              <Button>Delete pod</Button>
            </DeleteResource>
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
