import { useQuery } from "@tanstack/react-query";
import { LinearProgress } from "@mui/material";
import { ContainerRow } from "./ContainerRow";
import useDeploymentPageDataService from "../deployment-page-data-service";
import { Cluster } from "../../../shared/models/cluster";

export function ContainersList(props: {
  cluster: Cluster;
  deploymentName: string;
  namespace: string;
}) {
  const dataService = useDeploymentPageDataService(props.cluster);
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["containersLoader"],
    queryFn: async () =>
      await dataService.getDeploymentContainers(
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
        data.map((container) => (
          <ContainerRow key={container.name} container={container} />
        ))}
    </div>
  );
}
