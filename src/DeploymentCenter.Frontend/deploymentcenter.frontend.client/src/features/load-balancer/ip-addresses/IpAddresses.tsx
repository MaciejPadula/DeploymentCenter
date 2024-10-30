import { Paper, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useLoadBalancerPageDataService from "../load-balancer-page-data-service";
import { IpAddressRow } from "./IpAddressRow";
import { Cluster } from "../../../shared/models/cluster";

export function IpAddresses(props: {
  cluster: Cluster;
  namespace: string;
  loadBalancerName: string;
}) {
  const dataService = useLoadBalancerPageDataService(props.cluster);
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["podsLoader"],
    queryFn: async () =>
      await dataService.getLoadBalancerIpAddresses(
        props.namespace,
        props.loadBalancerName
      ),
  });

  const isLoading = isPending || isFetching || data == undefined;

  if (error) {
    <div>Error</div>;
  }

  return (
    <>
      {
        isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={70} />
        ) : (
          <Paper elevation={2} className="p-4">
            {data.map((x) => (
              <IpAddressRow key={x} ipAddress={x} />
            ))}
          </Paper>
        )
      }
    </>
  );
}
