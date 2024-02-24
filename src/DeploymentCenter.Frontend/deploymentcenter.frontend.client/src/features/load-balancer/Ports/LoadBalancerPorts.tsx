import { useQuery } from "@tanstack/react-query";
import { getLoadBalancerPorts } from "../load-balancer-page-data-service";
import { Chip, LinearProgress, Paper, Tooltip } from "@mui/material";
import { LoadBalancerPort } from "../load-balancer-port";

export function LoadBalancerPorts(props: {
  loadBalancerName: string;
  namespace: string;
}) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["loadBalancerPortsLoader"],
    queryFn: async () =>
      await getLoadBalancerPorts(props.namespace, props.loadBalancerName),
  });

  const isLoading = isPending || isFetching || data == undefined;

  if (error) {
    <div>Error</div>;
  }

  function getPortText(port: LoadBalancerPort) {
    return `${port.hostPort}:${port.targetPort}/${port.protocol}`;
  }

  return (
    <div>
      {isLoading && <LinearProgress />}
      {!isLoading && (
        <Paper elevation={2} className="p-4">
          {data.map((port) => (
            <Tooltip key={getPortText(port)} title={port.protocol}>
              <Chip label={getPortText(port)} />
            </Tooltip>
          ))}
        </Paper>
      )}
    </div>
  );
}
