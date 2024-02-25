import { useQuery } from "@tanstack/react-query";
import { getLoadBalancerPorts } from "../load-balancer-page-data-service";
import { LinearProgress, Paper } from "@mui/material";
import { LoadBalancerPortRow } from "./LoadBalancerPortRow";

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

  return (
    <div>
      {isLoading && <LinearProgress />}
      {!isLoading && (
        <Paper elevation={2} className="p-4">
          {data.map((port) => (
            <LoadBalancerPortRow
              key={`${port.hostPort}_${port.protocol}_${port.targetPort}`}
              port={port}
            />
          ))}
        </Paper>
      )}
    </div>
  );
}
