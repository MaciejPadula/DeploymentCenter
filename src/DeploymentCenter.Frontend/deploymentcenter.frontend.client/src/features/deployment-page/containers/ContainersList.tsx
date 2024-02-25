import { useQuery } from "@tanstack/react-query";
import { getDeploymentContainers } from "../deployment-page-data-service";
import { LinearProgress } from "@mui/material";
import { ContainerRow } from "./ContainerRow";

export function ContainersList(props: { deploymentName: string, namespace: string }) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['containersLoader'],
    queryFn: async () => await getDeploymentContainers(props.namespace, props.deploymentName)
  });
 
  const isLoading = isPending || isFetching || data == undefined;

  if (error) {
    <div>Error</div>
  }

  return (
    <div>
      {isLoading && <LinearProgress />}
      {!isLoading && data.map(container => <ContainerRow key={container.name} container={container} />)}
    </div>
  );
}