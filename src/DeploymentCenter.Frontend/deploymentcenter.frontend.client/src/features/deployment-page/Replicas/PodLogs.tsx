import { useQuery } from "@tanstack/react-query";
import useDeploymentPageDataService from "../deployment-page-data-service";
import { LinearProgress } from "@mui/material";
import { Terminal } from "../../../shared/components/terminal/Terminal";
import { Cluster } from "../../../shared/models/cluster";

export function PodLogs(props: {
  namespace: string;
  podName: string;
  cluster: Cluster;
}) {
  const dataService = useDeploymentPageDataService(props.cluster);

  const { error, data } = useQuery({
    queryKey: [
      "podLogsLoader",
      props.podName,
      props.namespace,
      props.cluster.apiUrl,
    ],
    queryFn: async () =>
      await dataService.getPodLogs(props.namespace, props.podName),
    refetchInterval: 1000,
  });

  if (error) {
    <div>Error</div>;
  }

  return (
    <div>
      {data === undefined ? <LinearProgress /> : <Terminal text={data} />}
    </div>
  );
}
