import { useQuery } from "@tanstack/react-query";
import useLoadBalancerPageDataService from "../load-balancer-page-data-service";
import { LinearProgress, Paper } from "@mui/material";
import { LoadBalancerPortRow } from "./LoadBalancerPortRow";

export function LoadBalancerPorts(props: {
  clusterUrl: string;
  loadBalancerName: string;
  namespace: string;
}) {
  const dataService = useLoadBalancerPageDataService(props.clusterUrl);
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["loadBalancerPortsLoader"],
    queryFn: async () =>
      await dataService.getLoadBalancerPorts(
        props.namespace,
        props.loadBalancerName
      ),
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
