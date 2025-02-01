import { Grid2 as Grid, TextField } from "@mui/material";
import { PortDialog } from "./PortDialog";
import { ExternalIpDialog } from "./ExternalIpDialog";
import { useState } from "react";
import { getDefaultIpAddress, getDefaultPort, LoadBalancerData, LoadBalancerPort } from "../models/load-balancer-data";
import { Cluster } from "../../../../shared/models/cluster";
import { UpdaterFunction } from "../../../../shared/helpers/function-helpers";
import { ValidationResult } from "../../../../shared/models/validation-result";
import { SelectNamespace } from "../../../../shared/components/select-namespaces/SelectNamespace";
import { InputVariant } from "../../../../shared/helpers/material-config";
import { ChipListControl } from "../../../../shared/components/chip-list-control/ChipListControl";

type Props = {
  cluster: Cluster;
  value: LoadBalancerData;
  updater: UpdaterFunction<LoadBalancerData>;
  validationResults: Map<string, ValidationResult>;
};

export function LoadBalancerForm(props: Props) {
  const applicationNameError = props.validationResults.get("applicationName");
  const [appNameTouched, setAppNameTouched] = useState(false);
  const namespaceError = props.validationResults.get("namespace");
  const [namespaceTouched, setNamespaceTouched] = useState(false);
  const nameError = props.validationResults.get("name");
  const [loadBalancerNameTouched, setLoadBalancerTouched] = useState(false);
  const externalIpsError = props.validationResults.get("externalIps");
  const [externalIpsTouched, setExternalIpsTouched] = useState(false);
  const portsError = props.validationResults.get("ports");
  const [portsTouched, setPortsTouched] = useState(false);

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

  function setName(name: string) {
    props.updater((data) => (data.name = name));
    setLoadBalancerTouched(true);
  }

  function setExternalIps(externalIps: string[]) {
    props.updater((data) => (data.externalIps = externalIps));
    setExternalIpsTouched(true);
  }

  function setPorts(ports: LoadBalancerPort[]) {
    props.updater((data) => (data.ports = ports));
    setPortsTouched(true);
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ sm: 4, xs: 12 }}>
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

        <Grid size={{ sm: 4, xs: 12 }}>
          <SelectNamespace
            defaultNamespace={props.value.namespace}
            cluster={props.cluster}
            onNamespaceChanged={setNamespace}
            error={namespaceTouched && isError(namespaceError)}
            helperText={namespaceTouched ? namespaceError?.message : undefined}
          />
        </Grid>

        <Grid size={{ sm: 4, xs: 12 }}>
          <TextField
            className="w-full"
            variant={InputVariant}
            label="Load Balancer Name"
            defaultValue={props.value.name}
            onBlur={(e) => setName(e.target.value)}
            error={loadBalancerNameTouched && isError(nameError)}
            helperText={loadBalancerNameTouched ? nameError?.message : undefined}
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
            error={externalIpsTouched && isError(externalIpsError)}
            helperText={externalIpsTouched ? externalIpsError?.message : undefined}
            dialogContentFactory={(value, setValue) => <ExternalIpDialog address={value} onAddressChange={setValue} />}
          />

          <ChipListControl
            dialogTitle={"Setup ports"}
            label={"Ports"}
            value={props.value.ports}
            toString={(port) => `${port.hostPort}:${port.targetPort}`}
            getEmptyValue={getDefaultPort}
            onChange={setPorts}
            error={portsTouched && isError(portsError)}
            helperText={portsTouched ? portsError?.message : undefined}
            dialogContentFactory={(value, setValue) => <PortDialog port={value} onPortChange={setValue} />}
          />
        </div>
      </Grid>
    </>
  );
}
