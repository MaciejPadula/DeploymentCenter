import { Chip, LinearProgress, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getLoadBalancerIpAddresses } from "../load-balancer-page-data-service";

export function IpAddresses(props: {
  namespace: string;
  loadBalancerName: string;
}) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["podsLoader"],
    queryFn: async () =>
      await getLoadBalancerIpAddresses(props.namespace, props.loadBalancerName),
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
            <Chip key={x} label={x} />
          ))}
        </Paper>
      )}
    </>
  );
}
