import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
import { ReactNode } from "react";
import { Cluster } from "../../../shared/models/cluster";
import { UnknownError } from "../../../shared/components/error/unknown-error/UnknownError";
import { Terminal } from "../../../shared/components/terminal/Terminal";
import usePodsDataService from "../services/pods-data-service";
import { Pod, PodHealthStatus } from "../models/pod";

type Props = {
  namespace: string;
  pod: Pod;
  cluster: Cluster;
  children?: ReactNode;
}

export function ReplicaLogs(props: Props) {
  const dataService = usePodsDataService(props.cluster);

  const { error, data } = useQuery({
    queryKey: [
      `podLogsLoader`,
      props.pod.name,
      props.namespace,
      props.cluster.apiUrl,
    ],
    queryFn: async () =>
      await dataService.getPodLogs(props.namespace, props.pod.name),
    refetchInterval: props.pod.status.health == PodHealthStatus.Running ? 1000 : undefined,
  });

  if (error) {
    return <UnknownError />;
  }

  return (
    <div>
      {data === undefined ? (
        <Skeleton variant="rectangular" width="100%" height={200} />
      ) : (
        <Terminal name={props.pod.name} text={data}>{props.children}</Terminal>
      )}
    </div>
  );
}
