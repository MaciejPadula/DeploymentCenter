import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
import { ContainerRow } from "./ContainerRow";
import useDeploymentPageDataService from "../deployment-page-data-service";
import { Cluster } from "../../../shared/models/cluster";
import { UnknownError } from "../../../shared/components/error/unknown-error/UnknownError";

export function ContainersList(props: {
  cluster: Cluster;
  deploymentName: string;
  namespace: string;
}) {
  const dataService = useDeploymentPageDataService(props.cluster);
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [`containersLoader-${props.deploymentName}-${props.namespace}`],
    queryFn: async () =>
      await dataService.getDeploymentContainers(
        props.namespace,
        props.deploymentName
      ),
  });

  const isLoading = isPending || isFetching || data == undefined;

  if (error) {
    return <UnknownError />;
  }

  return (
    <div>
      {
        isLoading
          ? (<Skeleton variant="rectangular" width="100%" height={70} />)
          : data.map((container) => (<ContainerRow key={container.name} container={container} />))
      }
    </div>
  );
}
