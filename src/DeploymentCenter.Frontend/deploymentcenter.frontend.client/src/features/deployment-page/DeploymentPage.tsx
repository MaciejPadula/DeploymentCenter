import { useParams } from "react-router-dom";
import { ResourceSummary } from "../../shared/components/resource-page/ResourceSummary";
import {
  ResourceSummaryFactory,
  ResourceSummaryModel,
} from "../../shared/components/resource-page/resource-summary-model";
import { ReplicasList } from "./Replicas/ReplicasList";
import { useEffect } from "react";
import { addRecentlyVisitedPage } from "../../shared/services/recently-visited-service";
import { getDeploymentUrl } from "../../shared/services/routing-service";
import { DeployIcon } from "../../assets/icons";
import { ContainersList } from "./containers/ContainersList";
import { useConfigurationContext } from "../../shared/contexts/context-helpers";
import useDeploymentPageDataService from "./deployment-page-data-service";

export function DeploymentPage() {
  const { configuration } = useConfigurationContext();
  const { deploymentName, namespace, clusterName } = useParams();
  const cluster = configuration.clusters.find((x) => x.name === clusterName);
  const dataService = useDeploymentPageDataService(cluster?.apiUrl);

  useEffect(() => {
    if (deploymentName === undefined || namespace === undefined || clusterName === undefined || cluster === undefined) {
      return;
    }

    addRecentlyVisitedPage(
      clusterName,
      deploymentName,
      namespace,
      DeployIcon,
      getDeploymentUrl(clusterName, namespace, deploymentName)
    );
  });

  if (deploymentName === undefined || namespace === undefined || clusterName === undefined || cluster === undefined) {
    return <div>Error</div>;
  }

  const factory: ResourceSummaryFactory = async () => {
    const summary = await dataService.getDeploymentDetails(
      namespace,
      deploymentName
    );
    const properties = new Map<string, string>();
    properties.set("Name", summary.deploymentName);
    properties.set("Cluster", `${clusterName}:${cluster.apiUrl}`);
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
      <ReplicasList
        clusterUrl={cluster.apiUrl}
        deploymentName={deploymentName}
        namespace={namespace}
      />
      <ContainersList
        clusterUrl={cluster.apiUrl}
        deploymentName={deploymentName}
        namespace={namespace}
      />
    </div>
  );
}
