import { useQuery } from "@tanstack/react-query";
import { getDeploymentPods } from "../deployment-page-data-service";
import { LinearProgress, List } from "@mui/material";
import { Replica } from "./Replica";

export function ReplicasList(props: { deploymentName: string, namespace: string }) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['podsLoader'],
    queryFn: async () => await getDeploymentPods(props.namespace, props.deploymentName)
  });
 
  const isLoading = isPending || isFetching || data == undefined;

  if (error) {
    <div>Error</div>
  }

  return (
    <div>
      {isLoading && <LinearProgress />}
      {!isLoading && data.map(pod => <Replica key={pod.name} pod={pod} />)}
    </div>
  );
}