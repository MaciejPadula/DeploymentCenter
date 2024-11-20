import { useQuery } from "@tanstack/react-query";
import useLoadBalancerPageDataService from "../load-balancer-page-data-service";
import { Paper, Skeleton } from "@mui/material";
import { LoadBalancerPortRow } from "./LoadBalancerPortRow";
import { Cluster } from "../../../shared/models/cluster";
import { UnknownError } from "../../../shared/components/error/unknown-error/UnknownError";

export function LoadBalancerPorts(props: {
  cluster: Cluster;
  loadBalancerName: string;
  namespace: string;
}) {
  const dataService = useLoadBalancerPageDataService(props.cluster);
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["loadBalancerPortsLoader"],
    queryFn: async () =>
      await dataService?.getLoadBalancerPorts(
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
