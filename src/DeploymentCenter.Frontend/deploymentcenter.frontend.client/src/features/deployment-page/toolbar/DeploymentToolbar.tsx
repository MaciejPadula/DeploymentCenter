import { IconButton, Paper } from "@mui/material";
import { DeleteResource } from "../../../shared/components/delete-resource/DeleteResource";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Cluster } from "../../../shared/models/cluster";
import useDeploymentPageDataService from "../deployment-page-data-service";
import { useAppRouting } from "../../../shared/hooks/navigation";

type Props = {
  deploymentName: string;
  namespace: string;
  cluster: Cluster;
};

export function DeploymentToolbar(props: Props) {
  const navigation = useAppRouting();
  const deploymentService = useDeploymentPageDataService(props.cluster);

  async function deleteDeployment() {
    await deploymentService.removeDeployment(
      props.namespace,
      props.deploymentName
    );
    navigation.deploymentList(props.cluster.name, props.namespace);
  }

  function restartDeployment() {
    deploymentService.restartDeployment(props.namespace, props.deploymentName);
  }

  return (
    <Paper className="flex flex-wrap w-full p-4 flex-row" elevation={2}>
      <DeleteResource
        resourceName={props.deploymentName}
        onDelete={deleteDeployment}
      >
        <IconButton>
          <DeleteIcon className="text-red-700" />
        </IconButton>
      </DeleteResource>

      <div>
        <IconButton onClick={restartDeployment}>
          <RestartAltIcon className="text-yellow-400" />
        </IconButton>
      </div>
    </Paper>
  );
}
