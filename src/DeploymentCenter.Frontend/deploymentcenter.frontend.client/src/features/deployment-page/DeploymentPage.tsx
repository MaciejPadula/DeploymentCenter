import { useParams } from "react-router-dom";
import { ResourceSummary } from "../../shared/components/resource-page/ResourceSummary";
import {
  ResourceSummaryFactory,
  ResourceSummaryModel,
} from "../../shared/components/resource-page/resource-summary-model";
import { getDeploymentDetails } from "./deployment-page-data-service";
import { ReplicasList } from "./replicas/ReplicasList";
import { useEffect } from "react";
import { addRecentlyVisitedPage } from "../../shared/services/recently-visited-service";
import { getDeploymentUrl } from "../../shared/services/routing-service";
import { DeployIcon } from "../../assets/icons";
import { ContainersList } from "./containers/ContainersList";

export function DeploymentPage() {
  const { deploymentName, namespace } = useParams();

  useEffect(() => {
    if (deploymentName === undefined || namespace === undefined) {
      return;
    }

    addRecentlyVisitedPage(
      deploymentName,
      namespace,
      DeployIcon,
      getDeploymentUrl(namespace, deploymentName)
    );
  });

  if (deploymentName === undefined || namespace === undefined) {
    return <div>Loading...</div>;
  }

  const factory: ResourceSummaryFactory = async () => {
    const summary = await getDeploymentDetails(namespace, deploymentName ?? "");
    const properties = new Map<string, string>();

    properties.set("Name", summary.deploymentName);
    properties.set("Namespace", summary.namespace);
    properties.set("Application", summary.applicationName);
    properties.set(
      "Replicas",
      `${summary.aliveReplicas}/${summary.allReplicas}`
    );

    return {
      resourceTitle: "Deployment",
      icon: DeployIcon,
      properties: properties,
    } as ResourceSummaryModel;
  };

  return (
    <div className="flex flex-col w-full p-2 gap-2">
      <ResourceSummary resourceSummaryFactory={factory} />
      <ReplicasList deploymentName={deploymentName} namespace={namespace} />
      <ContainersList deploymentName={deploymentName} namespace={namespace} />
    </div>
  );
}
