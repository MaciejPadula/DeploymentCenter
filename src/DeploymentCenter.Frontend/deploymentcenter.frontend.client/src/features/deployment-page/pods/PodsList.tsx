import { useQuery } from "@tanstack/react-query";
import useDeploymentPageDataService from "../deployment-page-data-service";
import { Skeleton } from "@mui/material";
import { ReplicaRow } from "./PodRow";
import { Cluster } from "../../../shared/models/cluster";
import { UnknownError } from "../../../shared/components/error/unknown-error/UnknownError";

export function ReplicasList(props: {
  cluster: Cluster;
  deploymentName: string;
  namespace: string;
}) {
  const dataService = useDeploymentPageDataService(props.cluster);
  const { error, data } = useQuery({
    queryKey: [`podsLoader-${props.deploymentName}-${props.namespace}`],
    queryFn: async () =>
      await dataService.getDeploymentPods(
        props.namespace,
        props.deploymentName
      ),
    refetchInterval: 2000,
  });

  if (error) {
    return <UnknownError />;
  }

  return (
    <div>
      {data == undefined ? (
        <Skeleton variant="rectangular" width="100%" height={70} />
      ) : (
        data.map((pod) => (
          <ReplicaRow
            key={pod.name}
            pod={pod}
            namespace={props.namespace}
            cluster={props.cluster}
          />
        ))
      )}
    </div>
  );
}
