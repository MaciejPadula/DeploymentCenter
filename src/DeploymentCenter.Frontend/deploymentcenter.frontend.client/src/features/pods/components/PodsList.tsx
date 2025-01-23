import { Skeleton } from "@mui/material";
import { ReplicaRow } from "./PodRow";
import { Cluster } from "../../../shared/models/cluster";
import usePodsDataService from "../services/pods-data-service";
import { useQuery } from "@tanstack/react-query";
import { UnknownError } from "../../../shared/components/error/unknown-error/UnknownError";

type Props = {
  namespace: string;
  cluster: Cluster;
  namePrefix: string;
}

export function PodsList(props: Props) {
  const dataService = usePodsDataService(props.cluster);
  const { error, data: pods } = useQuery({
    queryKey: [`podsLoader-${props.namePrefix}-${props.namespace}`],
    queryFn: async () =>
      await dataService.getPods(
        props.namespace,
        props.namePrefix
      ),
    refetchInterval: 2000,
  });

  if (error) {
    return <UnknownError />;
  }

  return (
    <div>
      {pods == undefined ? (
        <Skeleton variant="rectangular" width="100%" height={70} />
      ) : (
        pods.map((pod) => (
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
