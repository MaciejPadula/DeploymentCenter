import { Chip } from "@mui/material";
import { LoadBalancerPort } from "../load-balancer-port";

export function LoadBalancerPortRow(props: { port: LoadBalancerPort }) {
  const port = props.port;
  
  return (
    <Chip label={`${port.hostPort}:${port.targetPort}`} />
  );
}