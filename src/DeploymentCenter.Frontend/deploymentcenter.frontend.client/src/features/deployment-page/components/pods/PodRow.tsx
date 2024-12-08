import {
  Accordion,
  // AccordionActions,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Pod, PodHealth, PodHealthStatus } from "../../models/pod";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useMemo, useState } from "react";
import { ReplicaLogs } from "./PodLogs";
import { Cluster } from "../../../../shared/models/cluster";
import { DeleteResource } from "../../../../shared/components/delete-resource/DeleteResource";
import useDeploymentPageDataService from "../../deployment-page-data-service";
import { getHealthColor } from "../../services/pod-services";
import DeleteIcon from "@mui/icons-material/Delete";

export function ReplicaRow(props: {
  pod: Pod;
  namespace: string;
  cluster: Cluster;
}) {
  const dataService = useDeploymentPageDataService(props.cluster);
  const [accordationStatus, setAccordationStatus] = useState(false);

  const podTextColor = useMemo(() => {
    return getHealthColor(props.pod.status.health);
  }, [props.pod.status.health]);

  const podStatusText = useMemo(() => {
    return getStatusText(props.pod.status);
  }, [props.pod.status]);

  function toggleAccordation() {
    setAccordationStatus((old) => !old);
  }

  async function removePod() {
    await dataService?.removePod(props.namespace, props.pod.name);
  }

  function getStatusText(podHealth: PodHealth) {
    switch (podHealth.health) {
      case PodHealthStatus.Unknown:
        return podHealth.reason || "Unknown";
      case PodHealthStatus.Running:
        return "Running";
      case PodHealthStatus.Waiting:
        return podHealth.reason || "Waiting";
      case PodHealthStatus.Terminated:
        return podHealth.reason || "Terminated";
    }
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

            {props.pod.status.health === PodHealthStatus.Running &&
              <ReplicaLogs
                namespace={props.namespace}
                podName={props.pod.name}
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
