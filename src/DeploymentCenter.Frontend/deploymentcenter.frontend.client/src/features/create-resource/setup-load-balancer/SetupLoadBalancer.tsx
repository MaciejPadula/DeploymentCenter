import { SelectNamespace } from "../../../shared/components/select-namespaces/SelectNamespace";
import { InputVariant } from "../../../shared/helpers/material-config";
import { ValidationResult } from "../../../shared/models/validation-result";
import { selectedClusterApiUrl } from "../../../shared/services/configuration-service";
import { UpdaterFunction } from "../../../shared/helpers/function-helpers";
import {
  getDefaultIpAddress,
  getDefaultPort,
  LoadBalancerData,
  LoadBalancerPort,
} from "./load-balancer-data";
import { Unstable_Grid2 as Grid, TextField } from "@mui/material";
import { ChipListControl } from "../../../shared/components/chip-list-control/ChipListControl";
import { PortDialog } from "./PortDialog";
import { ExternalIpDialog } from "./ExternalIpDialog";

export function SetupLoadBalancer(props: {
  value: LoadBalancerData;
  updater: UpdaterFunction<LoadBalancerData>;
  validationResults: Map<string, ValidationResult>;
}) {
  const apiUrl = selectedClusterApiUrl.value;

  if (apiUrl === undefined) {
    return <div>Error</div>;
  }

  const applicationNameError = props.validationResults.get("applicationName");
  const namespaceError = props.validationResults.get("namespace");
  const nameError = props.validationResults.get("name");
  const externalIpsError = props.validationResults.get("externalIps");
  const portsError = props.validationResults.get("ports");

  function isError(result: ValidationResult | undefined) {
    return result?.isValid === false;
  }

  function setApplicationName(name: string) {
    props.updater((data) => (data.applicationName = name));
  }

  function setNamespace(namespace: string) {
    props.updater((data) => (data.namespace = namespace));
  }

  function setName(name: string) {
    props.updater((data) => (data.name = name));
  }

  function setExternalIps(externalIps: string[]) {
    props.updater((data) => (data.externalIps = externalIps));
  }

  function setPorts(ports: LoadBalancerPort[]) {
    props.updater((data) => (data.ports = ports));
  }

  console.log("SetupLoadBalancer");

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
            apiUrl={apiUrl}
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
            onBlur={(e) => setName(e.target.value)}
            error={isError(nameError)}
            helperText={nameError?.message}
          />
        </Grid>

        <div className="flex flex-col">
          <ChipListControl
            dialogTitle={"Setup External Ips"}
            label={"External Ips"}
            value={props.value.externalIps}
            toString={(ip) => ip}
            getEmptyValue={getDefaultIpAddress}
            onChange={setExternalIps}
            error={isError(externalIpsError)}
            helperText={externalIpsError?.message}
            dialogContentFactory={(value, setValue) => <ExternalIpDialog address={value} onAddressChange={setValue} />}
          />

          <ChipListControl
            dialogTitle={"Setup ports"}
            label={"Ports"}
            value={props.value.ports}
            toString={(port) => `${port.hostPort}:${port.targetPort}`}
            getEmptyValue={getDefaultPort}
            onChange={setPorts}
            error={isError(portsError)}
            helperText={portsError?.message}
            dialogContentFactory={(value, setValue) => <PortDialog port={value} onPortChange={setValue} />}
          />
        </div>
      </Grid>
    </>
  );
}
