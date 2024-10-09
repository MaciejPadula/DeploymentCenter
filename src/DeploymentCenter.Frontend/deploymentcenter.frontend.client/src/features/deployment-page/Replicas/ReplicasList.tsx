import { useQuery } from "@tanstack/react-query";
import useDeploymentPageDataService from "../deployment-page-data-service";
import { LinearProgress } from "@mui/material";
import { ReplicaRow } from "./ReplicaRow";
import { Cluster } from "../../../shared/models/cluster";

export function ReplicasList(props: {
  cluster: Cluster;
  deploymentName: string;
  namespace: string;
}) {
  const dataService = useDeploymentPageDataService(props.cluster);
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["podsLoader"],
    queryFn: async () =>
      await dataService.getDeploymentPods(
        props.namespace,
        props.deploymentName
      ),
  });

  const isLoading = isPending || isFetching || data == undefined;

  if (error) {
    <div>Error</div>;
  }

  return (
    <div>
      {isLoading && <LinearProgress />}
      {!isLoading &&
        data.map((pod) => (
          <ReplicaRow
            key={pod.name}
            pod={pod}
            namespace={props.namespace}
            cluster={props.cluster}
          />
        ))}
    </div>
  );
}
