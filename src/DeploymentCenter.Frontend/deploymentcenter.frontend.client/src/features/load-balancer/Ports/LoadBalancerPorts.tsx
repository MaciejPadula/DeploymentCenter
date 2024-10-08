import { useQuery } from "@tanstack/react-query";
import useLoadBalancerPageDataService from "../load-balancer-page-data-service";
import { LinearProgress, Paper } from "@mui/material";
import { LoadBalancerPortRow } from "./LoadBalancerPortRow";
import { Cluster } from "../../../shared/models/cluster";

export function LoadBalancerPorts(props: {
  cluster: Cluster;
  loadBalancerName: string;
  namespace: string;
}) {
  const dataService = useLoadBalancerPageDataService(props.cluster);
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
              key={`${port.hostPort}_${port.targetPort}`}
              port={port}
            />
          ))}
        </Paper>
      )}
    </div>
  );
}
