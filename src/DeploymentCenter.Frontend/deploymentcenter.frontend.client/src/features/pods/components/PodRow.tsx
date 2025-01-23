import {
  Accordion,
  // AccordionActions,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Pod, PodHealthStatus } from "../models/pod";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { ReplicaLogs } from "./PodLogs";
import { getHealthColor, getStatusText } from "../services/pod-services";
import DeleteIcon from "@mui/icons-material/Delete";
import { Cluster } from "../../../shared/models/cluster";
import { DeleteResource } from "../../../shared/components/delete-resource/DeleteResource";
import usePodsDataService from "../services/pods-data-service";

export function ReplicaRow(props: {
  pod: Pod;
  namespace: string;
  cluster: Cluster;
}) {
  const dataService = usePodsDataService(props.cluster);
  const [accordationStatus, setAccordationStatus] = useState(false);

  const podTextColor = getHealthColor(props.pod.status.health);
  const podStatusText = getStatusText(props.pod.status);
  const isPodHealthy = props.pod.status.health === PodHealthStatus.Running
    || props.pod.status.health === PodHealthStatus.Completed;

  function toggleAccordation() {
    setAccordationStatus((old) => !old);
  }

  async function removePod() {
    await dataService.removePod(props.namespace, props.pod.name);
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        onClick={() => toggleAccordation()}
      >
        <Typography color={podTextColor} className={"w-full sm:w-1/3"}>
          {props.pod.name}
        </Typography>
        <Typography className={"hidden w-1/3 sm:flex"}>
          Pod status: {podStatusText}
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
              <div>Pod status: {podStatusText}</div>
            </div>

            {isPodHealthy &&
              <ReplicaLogs
                namespace={props.namespace}
                pod={props.pod}
                cluster={props.cluster}
              >
                <DeleteResource resourceName={props.pod.name} onDelete={removePod}>
                  <Tooltip title={"Delete Pod"}>
                    <IconButton>
                      <DeleteIcon className="text-red-700" />
                    </IconButton>
                  </Tooltip>
                </DeleteResource>
              </ReplicaLogs>
            }
          </>
        )}
      </AccordionDetails>
      {/* <AccordionActions>xd</AccordionActions> */}
    </Accordion>
  );
}
