import { LinearProgress, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useLoadBalancerPageDataService from "../load-balancer-page-data-service";
import { IpAddressRow } from "./IpAddressRow";

export function IpAddresses(props: {
  namespace: string;
  loadBalancerName: string;
}) {
  const dataService = useLoadBalancerPageDataService();
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
      {isLoading && <LinearProgress />}
      {!isLoading && (
        <Paper elevation={2} className="p-4">
          {data.map((x) => (
            <IpAddressRow key={x} ipAddress={x} />
          ))}
        </Paper>
      )}
    </>
  );
}
