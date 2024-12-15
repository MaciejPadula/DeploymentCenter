import { IconButton, Paper, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { ScaleDialog } from "./ScaleDialog";
import { useQuery } from "@tanstack/react-query";
import { createSummary } from "../../details-factory";
import { Cluster } from "../../../../../shared/models/cluster";
import useDeploymentsDataService from "../../../service/deployments-data-service";
import { useAppRouting } from "../../../../../shared/hooks/navigation";
import { DeleteResource } from "../../../../../shared/components/delete-resource/DeleteResource";
import { AnalyzeDeploymentDialog } from "../../../../assistant/AnalyzeDeploymentDialog";

type Props = {
  deploymentName: string;
  namespace: string;
  cluster: Cluster;
};

export function DeploymentToolbar(props: Props) {
  const navigation = useAppRouting();
  const deploymentService = useDeploymentsDataService(props.cluster);
  const { refetch, data } = useQuery({
    queryKey: [`deployment-${props.namespace}-${props.deploymentName}`],
    queryFn: async () => {
      const summary = await deploymentService?.getDeploymentDetails(
        props.namespace,
        props.deploymentName
      );
      return !summary ? null : createSummary(summary, props.cluster);
    },
  });

  async function deleteDeployment() {
    await deploymentService?.removeDeployment(
      props.namespace,
      props.deploymentName
    );
    navigation.deploymentList(props.cluster.name, props.namespace);
  }

  async function restartDeployment() {
    await deploymentService?.restartDeployment(
      props.namespace,
      props.deploymentName
    );
  }

  async function onReplicasChanged(value: number) {
    await deploymentService?.scaleDeployment(
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
        replicasCount={Number.parseInt(data?.properties.get('Replicas') ?? '0')}
        onChange={onReplicasChanged}
      />
      <div>
        <Tooltip title={"Restart"}>
          <IconButton onClick={restartDeployment}>
            <RestartAltIcon className="text-yellow-400" />
          </IconButton>
        </Tooltip>
      </div>

      <DeleteResource
        resourceName={props.deploymentName}
        onDelete={deleteDeployment}
      >
        <Tooltip title={"Delete"}>
          <IconButton>
            <DeleteIcon className="text-red-700" />
          </IconButton>
        </Tooltip>
      </DeleteResource>

      <AnalyzeDeploymentDialog
        cluster={props.cluster}
        deploymentName={props.deploymentName}
        namespace={props.namespace}
      />
    </Paper>
  );
}
