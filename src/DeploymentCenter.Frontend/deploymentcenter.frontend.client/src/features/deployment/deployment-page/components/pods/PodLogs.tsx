import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
import { ReactNode } from "react";
import { Cluster } from "../../../../../shared/models/cluster";
import useDeploymentsDataService from "../../../service/deployments-data-service";
import { UnknownError } from "../../../../../shared/components/error/unknown-error/UnknownError";
import { Terminal } from "../../../../../shared/components/terminal/Terminal";

export function ReplicaLogs(props: {
  namespace: string;
  podName: string;
  cluster: Cluster;
  children?: ReactNode;
}) {
  const dataService = useDeploymentsDataService(props.cluster);

  const { error, data } = useQuery({
    queryKey: [
      `podLogsLoader`,
      props.podName,
      props.namespace,
      props.cluster.apiUrl,
    ],
    queryFn: async () =>
      await dataService?.getPodLogs(props.namespace, props.podName),
    refetchInterval: 1000,
  });

  if (error) {
    return <UnknownError />;
  }

  return (
    <div>
      {data === undefined ? (
        <Skeleton variant="rectangular" width="100%" height={200} />
      ) : (
        <Terminal name={props.podName} text={data}>{props.children}</Terminal>
      )}
    </div>
  );
}
