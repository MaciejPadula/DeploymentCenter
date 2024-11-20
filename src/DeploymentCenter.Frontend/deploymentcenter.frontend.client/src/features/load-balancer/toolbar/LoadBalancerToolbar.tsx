import { IconButton, Paper } from "@mui/material";
import { Cluster } from "../../../shared/models/cluster";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteResource } from "../../../shared/components/delete-resource/DeleteResource";
import useLoadBalancerPageDataService from "../load-balancer-page-data-service";
import { useAppRouting } from "../../../shared/hooks/navigation";

type Props = {
  loadBalancerName: string;
  namespace: string;
  cluster: Cluster;
};

export function LoadBalancerToolbar(props: Props) {
  const navigation = useAppRouting();
  const loadBalancerService = useLoadBalancerPageDataService(props.cluster);

  async function deleteLoadBalancer() {
    await loadBalancerService?.removeLoadBalancer(
      props.namespace,
      props.loadBalancerName
    );

    navigation.loadBalancerList(props.cluster.name, props.namespace);
  }

  return (
    <Paper className="flex flex-wrap w-full p-4 flex-row" elevation={2}>
      <DeleteResource
        resourceName={props.loadBalancerName}
        onDelete={deleteLoadBalancer}
      >
        <IconButton>
          <DeleteIcon className="text-red-700" />
        </IconButton>
      </DeleteResource>
    </Paper>
  );
}
