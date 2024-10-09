import { Unstable_Grid2 as Grid, TextField } from "@mui/material";
import { SelectNamespace } from "../../../shared/components/select-namespaces/SelectNamespace";
import { InputVariant } from "../../../shared/helpers/material-config";
import {
  Container,
  getDefaultContainer,
} from "../../deployment-page/models/container";
import { selectedCluster } from "../../../shared/services/configuration-service";
import { DeploymentData } from "./deployment-data";
import { UpdaterFunction } from "../../../shared/helpers/function-helpers";
import { ValidationResult } from "../../../shared/models/validation-result";
import { ContainersDialog } from "./ContainersDialog";
import { ChipListControl } from "../../../shared/components/chip-list-control/ChipListControl";

export function SetupDeployment(props: {
  value: DeploymentData;
  updater: UpdaterFunction<DeploymentData>;
  validationResults: Map<string, ValidationResult>;
}) {
  const applicationNameError = props.validationResults.get("applicationName");
  const namespaceError = props.validationResults.get("namespace");
  const nameError = props.validationResults.get("name");
  const replicasError = props.validationResults.get("replicas");
  const containersError = props.validationResults.get("containers");
  const cluster = selectedCluster.value;

  if (cluster === undefined) {
    return <div>Error</div>;
  }

  function isError(result: ValidationResult | undefined) {
    return result?.isValid === false;
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
            error={isError(applicationNameError)}
            helperText={applicationNameError?.message}
          />
        </Grid>

        <Grid sm={4} xs={12}>
          <SelectNamespace
            defaultNamespace={props.value.namespace}
            cluster={cluster}
            onNamespaceChanged={setNamespace}
            error={isError(namespaceError)}
            helperText={namespaceError?.message}
          />
        </Grid>

        <Grid sm={4} xs={12}>
          <TextField
            className="w-full"
            variant={InputVariant}
            label="Deployment Name"
            defaultValue={props.value.name}
            onBlur={(e) => setDeploymentName(e.target.value)}
            error={isError(nameError)}
            helperText={nameError?.message}
          />
        </Grid>

        <Grid sm={4} xs={12}>
          <TextField
            className="w-full"
            variant={InputVariant}
            label="Replicas"
            defaultValue={props.value.replicas ?? 0}
            onBlur={(e) => setReplicas(e.target.value)}
            error={isError(replicasError)}
            helperText={replicasError?.message}
          />
        </Grid>
      </Grid>

      <ChipListControl
        dialogTitle={"Setup container"}
        label={"Containers"}
        value={props.value.containers}
        toString={(container) =>
          container.name?.length > 0 ? container.name : "Unnamed container"
        }
        getEmptyValue={getDefaultContainer}
        onChange={setContainers}
        error={isError(containersError)}
        helperText={containersError?.message}
        dialogContentFactory={(value, setValue) => (
          <ContainersDialog container={value} onContainerChange={setValue} />
        )}
      />
    </>
  );
}
