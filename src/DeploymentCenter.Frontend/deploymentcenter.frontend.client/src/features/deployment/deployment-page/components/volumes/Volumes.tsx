import { useQuery } from "@tanstack/react-query";
import { VolumeRow } from "./VolumeRow";
import { Skeleton } from "@mui/material";
import { UnknownError } from "../../../../../shared/components/error/unknown-error/UnknownError";
import { Cluster } from "../../../../../shared/models/cluster";
import useDeploymentsDataService from "../../../service/deployments-data-service";

type Props = {
  cluster: Cluster;
  deploymentName: string;
  namespace: string;
}

export function Volumes(props: Props) {
  const dataService = useDeploymentsDataService(props.cluster);
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