import { Unstable_Grid2 as Grid, TextField, Typography } from "@mui/material";
import { SelectNamespace } from "../../../shared/components/select-namespaces/SelectNamespace";
import { InputVariant } from "../../../shared/helpers/material-config";
import { Containers } from "./containers/Containers";
import { Container } from "../../deployment-page/models/container";
import {
  applicationFormData,
  updateAppData,
} from "../application-form-service";
import { selectedClusterApiUrl } from "../../../shared/services/configuration-service";

export function SetupDeployment() {
  const apiUrl = selectedClusterApiUrl.value;
  if (apiUrl === undefined) {
    return <div>Error</div>;
  }

  function setNamespace(namespace: string) {
    updateAppData((oldData) => (oldData.deployment.namespace = namespace));
  }

  function setDeploymentName(name: string) {
    updateAppData((oldData) => (oldData.deployment.name = name));
  }

  function setReplicas(replicas: string) {
    const parsedValue = parseInt(replicas);
    const valueToSet = isNaN(parsedValue) ? 0 : parsedValue;

    updateAppData((oldData) => (oldData.deployment.replicas = valueToSet));
  }

  function setContainers(containers: Container[]) {
    updateAppData((oldData) => (oldData.deployment.containers = containers));
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <Typography variant="h6">Deployment</Typography>
      <Grid container spacing={2}>
        <Grid sm={4} xs={12}>
          <SelectNamespace
            defaultNamespace={applicationFormData.value.deployment.namespace}
            apiUrl={apiUrl}
            onNamespaceChanged={setNamespace}
          />
        </Grid>

        <Grid sm={4} xs={12}>
          <TextField
            className="w-full"
            variant={InputVariant}
            label="Deployment Name"
            defaultValue={applicationFormData.value.deployment.name}
            onBlur={(e) => setDeploymentName(e.target.value)}
          />
        </Grid>

        <Grid sm={4} xs={12}>
          <TextField
            className="w-full"
            variant={InputVariant}
            label="Replicas"
            type="number"
            defaultValue={applicationFormData.value.deployment.replicas ?? 0}
            onBlur={(e) => setReplicas(e.target.value)}
          />
        </Grid>
      </Grid>
      <Containers
        containers={applicationFormData.value.deployment.containers}
        onContainersChange={setContainers}
      />
    </div>
  );
}
