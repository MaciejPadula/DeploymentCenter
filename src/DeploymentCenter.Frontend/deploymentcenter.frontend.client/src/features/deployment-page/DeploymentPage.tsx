import { useParams } from "react-router-dom";
import DeployIcon from "../../assets/deploy.svg";
import { Icon } from "@mui/material";
import { ResourceSummary } from "../../shared/components/resource-page/ResourceSummary";
import { ResourceSummaryFactory, ResourceSummaryModel } from "../../shared/components/resource-page/resource-summary-model";
import { getDeploymentDetails } from "./deployment-page-data-service";
import { ReplicasList } from "./Replicas/ReplicasList";

export function DeploymentPage() {
  const { deploymentName } = useParams();

  if (deploymentName === undefined) {
    return <div>Loading...</div>;
  }

  const factory: ResourceSummaryFactory = async () => {
    const summary = await getDeploymentDetails('default', deploymentName ?? '');
    const properties = new Map<string, string>();

    properties.set('Name', summary.deploymentName);
    properties.set('Namespace', summary.namespace);
    properties.set('Application', summary.applicationName);
    properties.set('Replicas', `${summary.aliveReplicas}/${summary.allReplicas}`);

    return {
      properties: properties,
    } as ResourceSummaryModel;
  }

  return (
    <div className="w-full">
      <Icon className="w-12 aspect-square">
        <img className="w-full" src={DeployIcon} />
      </Icon>
      <div className="flex flex-col">
        <ResourceSummary resourceSummaryFactory={factory} />
        <ReplicasList deploymentName={deploymentName} namespace="default" />
      </div>
    </div>
  );
}
