import { Unstable_Grid2 as Grid, TextField } from "@mui/material";
import { SelectNamespace } from "../../../shared/components/select-namespaces/SelectNamespace";
import { InputVariant } from "../../../shared/helpers/material-config";
import { Containers } from "./containers/Containers";
import { Container } from "../../deployment-page/models/container";
import { selectedClusterApiUrl } from "../../../shared/services/configuration-service";
import { DeploymentData } from "./deployment-data";
import { UpdaterFunction } from "../shared";

export function SetupDeployment(props: {
  value: DeploymentData;
  updater: UpdaterFunction<DeploymentData>;
}) {
  const apiUrl = selectedClusterApiUrl.value;
  if (apiUrl === undefined) {
    return <div>Error</div>;
  }

  function setApplicationName(name: string) {
    props.updater((data) => (data.applicationName = name));
  }

  function setNamespace(namespace: string) {
    props.updater((data) => (data.namespace = namespace));
  }

  function setDeploymentName(name: string) {
    props.updater((data) => (data.name = name));
  }

  function setReplicas(replicas: string) {
    const parsedValue = parseInt(replicas);
    const valueToSet = isNaN(parsedValue) ? 0 : parsedValue;

    props.updater((data) => (data.replicas = valueToSet));
  }

  function setContainers(containers: Container[]) {
    props.updater((data) => (data.containers = containers));
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid sm={4} xs={12}>
          <TextField
            className="w-full"
            variant={InputVariant}
            label="Application Name"
            defaultValue={props.value.applicationName}
            onBlur={(e) => setApplicationName(e.target.value)}
          />
        </Grid>

        <Grid sm={4} xs={12}>
          <SelectNamespace
            defaultNamespace={props.value.namespace}
            apiUrl={apiUrl}
            onNamespaceChanged={setNamespace}
          />
        </Grid>

        <Grid sm={4} xs={12}>
          <TextField
            className="w-full"
            variant={InputVariant}
            label="Deployment Name"
            defaultValue={props.value.name}
            onBlur={(e) => setDeploymentName(e.target.value)}
          />
        </Grid>

        <Grid sm={4} xs={12}>
          <TextField
            className="w-full"
            variant={InputVariant}
            label="Replicas"
            type="number"
            defaultValue={props.value.replicas ?? 0}
            onBlur={(e) => setReplicas(e.target.value)}
          />
        </Grid>
      </Grid>
      <Containers
        containers={props.value.containers}
        onContainersChange={setContainers}
      />
    </>
  );
}
