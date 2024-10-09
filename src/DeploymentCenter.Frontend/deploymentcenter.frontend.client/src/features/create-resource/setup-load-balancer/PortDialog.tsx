import { TextField } from "@mui/material";
import { LoadBalancerPort } from "./load-balancer-data";
import { InputVariant } from "../../../shared/helpers/material-config";
import { ChangeEvent } from "react";

type Props = {
  port: LoadBalancerPort;
  onPortChange: (port: LoadBalancerPort) => void;
};

export function PortDialog(props: Props) {

  function setHostPort(event: ChangeEvent<HTMLInputElement>) {
    props.onPortChange({
      ...props.port,
      hostPort: parseInt(event.target.value),
    });
  }

  function setTargetPort(event: ChangeEvent<HTMLInputElement>) {
    props.onPortChange({
      ...props.port,
      targetPort: parseInt(event.target.value),
    });
  }

  return (
    <>
      <TextField
        label="Host Port"
        variant={InputVariant}
        defaultValue={props.port.hostPort}
        onChange={setHostPort}
      />
      <TextField
        label="Target Port"
        variant={InputVariant}
        defaultValue={props.port.targetPort}
        onChange={setTargetPort}
      />
    </>
  );
}
