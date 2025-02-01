import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Container } from "../../models/container";
import { useState } from "react";
import { ContainerVolumesList } from "./ContainerVolumesList";
import { Cluster } from "../../../../../shared/models/cluster";
import { KeyValueListControl } from "../../../../../shared/components/key-value-list-control/KeyValueListControl";
import { useMutation } from "@tanstack/react-query";
import useDeploymentsDataService from "../../../service/deployments-data-service";

type Props = {
  cluster: Cluster;
  namespace: string;
  deploymentName: string;
  container: Container;
};

export function ContainerRow(props: Props) {
  const dataService = useDeploymentsDataService(props.cluster);
  const [selectedTab, setSelectedTab] = useState(1);

  const [environmentVariables, setEnvironmentVariables] = useState(
    props.container.environmentVariables
  );

  const { mutateAsync: updateEnvVariables } = useMutation({
    mutationFn: async () =>
      await dataService.updateEnvironmentVariables(
        props.namespace,
        props.deploymentName,
        props.container.name,
        environmentVariables
      ),
  });

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
        <Typography>{props.container.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Docker Image" value={1} />
          <Tab label="Volume Mounts" value={2} />
          <Tab label="Environment Variables" value={3} />
        </Tabs>

        {selectedTab == 1 && (
          <div>
            <span>{props.container.image}</span>
          </div>
        )}

        {selectedTab == 2 && (
          <div>
            <ContainerVolumesList
              container={props.container}
              cluster={props.cluster}
              namespace={props.namespace}
              deploymentName={props.deploymentName}
            />
          </div>
        )}

        {selectedTab == 3 && (
          <>
            <KeyValueListControl
              defaultValue={props.container.environmentVariables}
              onChange={(envVars) => setEnvironmentVariables(envVars)}
            />
            <Button onClick={() => updateEnvVariables()}>Update</Button>
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
