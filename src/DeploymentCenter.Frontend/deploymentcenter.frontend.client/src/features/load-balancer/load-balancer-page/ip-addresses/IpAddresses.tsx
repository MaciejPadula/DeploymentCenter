import { Paper, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { IpAddressRow } from "./IpAddressRow";
import { Cluster } from "../../../../shared/models/cluster";
import { UnknownError } from "../../../../shared/components/error/unknown-error/UnknownError";
import useLoadBalancersDataService from "../../services/load-balancers-data-service";

export function IpAddresses(props: {
  cluster: Cluster;
  namespace: string;
  loadBalancerName: string;
}) {
  const dataService = useLoadBalancersDataService(props.cluster);
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [`ipAddresses-${props.loadBalancerName}-${props.namespace}`],
    queryFn: async () =>
      await dataService.getLoadBalancerIpAddresses(
        props.namespace,
        props.loadBalancerName
      ),
  });

  const isLoading = isPending || isFetching || data == undefined;

  if (error) {
    return <UnknownError />;
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
