import { useQuery } from "@tanstack/react-query";
import useDeploymentPageDataService from "../deployment-page-data-service";
import { LinearProgress } from "@mui/material";
import { Terminal } from "../../../shared/components/terminal/Terminal";

export function PodLogs(props: {
  namespace: string;
  podName: string;
  clusterUrl: string;
}) {
  const dataService = useDeploymentPageDataService(props.clusterUrl);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [
      "podLogsLoader",
      props.podName,
      props.namespace,
      props.clusterUrl,
    ],
    queryFn: async () =>
      await dataService.getPodLogs(props.namespace, props.podName),
  });

  const isLoading = isPending || isFetching || data == undefined;

  if (error) {
    <div>Error</div>;
  }

  return (
    <div>
      {isLoading && <LinearProgress />}
      {!isLoading && <Terminal text={data} />}
    </div>
  );
}
