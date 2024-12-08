import { useQuery } from "@tanstack/react-query";
import useDeploymentPageDataService from "../../deployment-page-data-service";
import { Cluster } from "../../../../shared/models/cluster";
import { VolumeRow } from "./VolumeRow";
import { Skeleton } from "@mui/material";
import { UnknownError } from "../../../../shared/components/error/unknown-error/UnknownError";

type Props = {
  cluster: Cluster;
  deploymentName: string;
  namespace: string;
}

export function Volumes(props: Props) {
  const dataService = useDeploymentPageDataService(props.cluster);
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [`volumes-${props.deploymentName}-${props.namespace}`],
    queryFn: async () =>
      await dataService.getDeploymentVolumes(
        props.namespace,
        props.deploymentName
      ),
  });

  const isLoading = isPending || isFetching || data == undefined;

  if (error) {
    return <UnknownError />;
  }


  return <div>
    {
      isLoading
        ? (<Skeleton variant="rectangular" width="100%" height={70} />)
        : data.map((volume) => (<VolumeRow key={volume.name} volume={volume} />))
    }
  </div>;
}