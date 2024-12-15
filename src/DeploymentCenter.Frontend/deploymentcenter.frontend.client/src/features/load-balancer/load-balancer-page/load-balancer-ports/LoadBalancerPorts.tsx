import { useQuery } from "@tanstack/react-query";
import { Paper, Skeleton } from "@mui/material";
import { LoadBalancerPortRow } from "./LoadBalancerPortRow";
import { Cluster } from "../../../../shared/models/cluster";
import { UnknownError } from "../../../../shared/components/error/unknown-error/UnknownError";
import useLoadBalancersDataService from "../../services/load-balancers-data-service";

export function LoadBalancerPorts(props: {
  cluster: Cluster;
  loadBalancerName: string;
  namespace: string;
}) {
  const dataService = useLoadBalancersDataService(props.cluster);
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [`loadBalancerPortsLoader-${props.loadBalancerName}-${props.namespace}`],
    queryFn: async () =>
      await dataService.getLoadBalancerPorts(
        props.namespace,
        props.loadBalancerName
      ),
  });

  const isLoading = isPending || isFetching || data == undefined;

  if (error) {
    return <UnknownError />;
  }

  return (
    <div>
      {
        isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={70} />
        ) : (
          <Paper elevation={2} className="p-4">
            {data.map((port) => (
              <LoadBalancerPortRow
                key={`${port.hostPort}_${port.targetPort}`}
                port={port}
              />
            ))}
          </Paper>
        )

      }
    </div>
  );
}
