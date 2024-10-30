import { IconButton, Paper, Tooltip } from "@mui/material";
import { DeleteResource } from "../../../shared/components/delete-resource/DeleteResource";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Cluster } from "../../../shared/models/cluster";
import useDeploymentPageDataService from "../deployment-page-data-service";
import { useAppRouting } from "../../../shared/hooks/navigation";
import { ScaleDialog } from "./ScaleDialog";
import { useQuery } from "@tanstack/react-query";

type Props = {
  deploymentName: string;
  namespace: string;
  cluster: Cluster;
  replicas: number;
};

export function DeploymentToolbar(props: Props) {
  const navigation = useAppRouting();
  const deploymentService = useDeploymentPageDataService(props.cluster);
  const { refetch } = useQuery({
    queryKey: [`deployment-${props.namespace}-${props.deploymentName}`],
  });

  async function deleteDeployment() {
    await deploymentService.removeDeployment(
      props.namespace,
      props.deploymentName
    );
    navigation.deploymentList(props.cluster.name, props.namespace);
  }

  async function restartDeployment() {
    await deploymentService.restartDeployment(
      props.namespace,
      props.deploymentName
    );
  }

  async function onReplicasChanged(value: number) {
    await deploymentService.scaleDeployment(
      props.namespace,
      props.deploymentName,
      value
    );
    await refetch();
  }

  return (
    <Paper className="flex flex-wrap w-full p-4 flex-row" elevation={2}>
      <ScaleDialog
        deploymentName={props.deploymentName}
        namespace={props.namespace}
        cluster={props.cluster}
        replicasCount={props.replicas}
        onChange={onReplicasChanged}
      />
      <div>
        <Tooltip title={'Restart'}>
          <IconButton onClick={restartDeployment}>
            <RestartAltIcon className="text-yellow-400" />
          </IconButton>
        </Tooltip>
      </div>

      <DeleteResource
        resourceName={props.deploymentName}
        onDelete={deleteDeployment}
      >
        <Tooltip title={'Delete'}>
          <IconButton>
            <DeleteIcon className="text-red-700" />
          </IconButton>
        </Tooltip>

      </DeleteResource>
    </Paper>
  );
}
