import {
  Unstable_Grid2 as Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { SelectNamespace } from "../../../shared/components/select-namespaces/SelectNamespace";
import { useConfiguredApiUrl } from "../../../shared/contexts/context-helpers";
import { DeploymentData } from "../deployment-data";
import { SetupContainer } from "./SetupContainer";
import { getDefaultContainer } from "../../deployment-page/models/container";
import AddIcon from "@mui/icons-material/Add";
import { InputVariant } from "../../../shared/helpers/material-config";

export function SetupDeployment(props: {
  deployment: DeploymentData;
  handleDeploymentChange: (deployment: DeploymentData) => void;
}) {
  const apiUrl = useConfiguredApiUrl();
  if (apiUrl === undefined) {
    return <div>Error</div>;
  }

  function setNamespace(namespace: string) {
    props.handleDeploymentChange({
      ...props.deployment,
      namespace,
    });
  }

  function setDeploymentName(name: string) {
    props.handleDeploymentChange({
      ...props.deployment,
      name,
    });
  }

  function setReplicas(replicas: string) {
    const parsedValue = parseInt(replicas);

    const valueToSet = isNaN(parsedValue) ? 0 : parsedValue;

    props.handleDeploymentChange({
      ...props.deployment,
      replicas: valueToSet,
    });
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <Typography variant="h6">Deployment</Typography>
      <Grid container spacing={2}>
        <Grid sm={4} xs={12}>
          <SelectNamespace
            namespace={props.deployment.namespace}
            apiUrl={apiUrl}
            onNamespaceChanged={setNamespace}
          />
        </Grid>

        <Grid sm={4} xs={12}>
          <TextField
            className="w-full"
            variant={InputVariant}
            label="Deployment Name"
            defaultValue={props.deployment.name}
            onBlur={(e) => setDeploymentName(e.target.value)}
          />
        </Grid>

        <Grid sm={4} xs={12}>
          <TextField
            className="w-full"
            variant={InputVariant}
            label="Replicas"
            type="number"
            defaultValue={props.deployment.replicas ?? 0}
            onBlur={(e) => setReplicas(e.target.value)}
          />
        </Grid>
      </Grid>
      <div>
        <Typography variant="h6">Containers</Typography>
        <div className="flex flex-row">
          {props.deployment.containers?.map((container, index) => (
            <SetupContainer
              key={`${index}-${container.name}-${container.image}`}
              container={container}
              handleContainerChange={(container) => {
                const newContainers = [...props.deployment.containers];
                newContainers[index] = container;

                props.handleDeploymentChange({
                  ...props.deployment,
                  containers: newContainers,
                });
              }}
              handleDelete={() => {
                const newContainers = [...props.deployment.containers];
                newContainers.splice(index, 1);

                props.handleDeploymentChange({
                  ...props.deployment,
                  containers: newContainers,
                });
              }}
            />
          ))}

          <IconButton
            size="small"
            onClick={() => {
              props.handleDeploymentChange({
                ...props.deployment,
                containers: [
                  ...(props.deployment.containers ?? []),
                  getDefaultContainer(),
                ],
              });
            }}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
