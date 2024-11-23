import { Unstable_Grid2 as Grid, TextField } from "@mui/material";
import { SelectNamespace } from "../../../shared/components/select-namespaces/SelectNamespace";
import { InputVariant } from "../../../shared/helpers/material-config";
import {
  Container,
  getDefaultContainer,
} from "../../deployment-page/models/container";
import { DeploymentData } from "./deployment-data";
import { UpdaterFunction } from "../../../shared/helpers/function-helpers";
import { ValidationResult } from "../../../shared/models/validation-result";
import { ContainersDialog } from "./ContainersDialog";
import { ChipListControl } from "../../../shared/components/chip-list-control/ChipListControl";
import { PlusMinusInput } from "../../../shared/components/plus-minus-input/PlusMinusInput";
import { Cluster } from "../../../shared/models/cluster";
import { useState } from "react";

type Props = {
  cluster: Cluster;
  value: DeploymentData;
  updater: UpdaterFunction<DeploymentData>;
  validationResults: Map<string, ValidationResult>;
};

export function SetupDeployment(props: Props) {
  const applicationNameError = props.validationResults.get("applicationName");
  const [appNameTouched, setAppNameTouched] = useState(false);
  const namespaceError = props.validationResults.get("namespace");
  const [namespaceTouched, setNamespaceTouched] = useState(false);
  const nameError = props.validationResults.get("name");
  const [deploymentNameTouched, setDeploymentNameTouched] = useState(false);
  const replicasError = props.validationResults.get("replicas");
  const [replicasTouched, setReplicasTouched] = useState(false);
  const containersError = props.validationResults.get("containers");
  const [containersTouched, setContainersTouched] = useState(false);
 
  function isError(result: ValidationResult | undefined) {
    return result?.isValid === false;
  }

  function setApplicationName(name: string) {
    props.updater((data) => (data.applicationName = name));
    setAppNameTouched(true);
  }

  function setNamespace(namespace: string) {
    props.updater((data) => (data.namespace = namespace));
    setNamespaceTouched(true);
  }

  function setDeploymentName(name: string) {
    props.updater((data) => (data.name = name));
    setDeploymentNameTouched(true);
  }

  function setReplicas(replicas: number | undefined) {
    props.updater((data) => (data.replicas = replicas));
    setReplicasTouched(true);
  }

  function setContainers(containers: Container[]) {
    props.updater((data) => (data.containers = containers));
    setContainersTouched(true);
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
            error={appNameTouched && isError(applicationNameError)}
            helperText={appNameTouched ? applicationNameError?.message : undefined}
          />
        </Grid>

        <Grid sm={4} xs={12}>
          <SelectNamespace
            defaultNamespace={props.value.namespace}
            cluster={props.cluster}
            onNamespaceChanged={setNamespace}
            error={namespaceTouched && isError(namespaceError)}
            helperText={namespaceTouched ? namespaceError?.message : undefined}
          />
        </Grid>

        <Grid sm={4} xs={12}>
          <TextField
            className="w-full"
            variant={InputVariant}
            label="Deployment Name"
            defaultValue={props.value.name}
            onBlur={(e) => setDeploymentName(e.target.value)}
            error={deploymentNameTouched && isError(nameError)}
            helperText={deploymentNameTouched ? nameError?.message : undefined}
          />
        </Grid>

        <Grid sm={4} xs={12}>
          <PlusMinusInput
            className="w-full"
            label="Replicas"
            defaultValue={props.value.replicas}
            onChange={(e) => setReplicas(e)}
            onBlur={() => setReplicasTouched(true)}
            error={replicasTouched && isError(replicasError)}
            helperText={replicasTouched ? replicasError?.message : undefined}
            min={0}
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
        error={containersTouched && isError(containersError)}
        helperText={containersTouched ? containersError?.message : undefined}
        dialogContentFactory={(value, setValue) => (
          <ContainersDialog container={value} onContainerChange={setValue} />
        )}
      />
    </>
  );
}
