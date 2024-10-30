import { useParams } from "react-router-dom";
import { ResourceSummary } from "../../shared/components/resource-page/ResourceSummary";
import {
  ResourceSummaryFactory,
  ResourceSummaryModel,
} from "../../shared/components/resource-page/resource-summary-model";
import { ReplicasList } from "./Replicas/ReplicasList";
import { useEffect, useState } from "react";
import { addRecentlyVisitedPage } from "../../shared/services/recently-visited-service";
import { getDeploymentUrl } from "../../shared/services/routing-service";
import { DeployIcon } from "../../assets/icons";
import { ContainersList } from "./containers/ContainersList";
import useDeploymentPageDataService from "./deployment-page-data-service";
import { DeploymentDetails } from "./deployment-details";
import { DeploymentStatistics } from "./statistics/DeploymentStatistics";
import { configuration } from "../../shared/services/configuration-service";
import { DeploymentToolbar } from "./toolbar/DeploymentToolbar";

export function DeploymentPage() {
  const { deploymentName, namespace, clusterName } = useParams();
  const cluster = configuration.value.clusters.find(
    (c) => c.name === clusterName
  );
  const [details, setDetails] = useState<DeploymentDetails | null>(null);
  const dataService = useDeploymentPageDataService(cluster);

  useEffect(() => {
    if (
      deploymentName === undefined ||
      namespace === undefined ||
      clusterName === undefined ||
      cluster === undefined
    ) {
      return;
    }

    addRecentlyVisitedPage(
      clusterName,
      deploymentName,
      namespace,
      DeployIcon,
      getDeploymentUrl(clusterName, namespace, deploymentName)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    deploymentName === undefined ||
    namespace === undefined ||
    clusterName === undefined ||
    cluster === undefined
  ) {
    return <div>Error</div>;
  }

  const factory: ResourceSummaryFactory = async () => {
    const summary = await dataService.getDeploymentDetails(
      namespace,
      deploymentName
    );
    setDetails(summary);
    const properties = new Map<string, string>();
    properties.set("Name", summary.deploymentName);
    properties.set("Cluster", `${clusterName}:${cluster.apiUrl}`);
    properties.set("Namespace", summary.namespace);
    properties.set("Application", summary.applicationName);
    properties.set("Replicas", summary.allReplicas.toString());

    return {
      resourceTitle: "Deployment",
      icon: DeployIcon,
      properties: properties,
    } as ResourceSummaryModel;
  };

  return (
    <div className="flex flex-col w-full p-2 gap-2">
      <DeploymentToolbar
        namespace={namespace}
        deploymentName={deploymentName}
        cluster={cluster}
        replicas={details?.allReplicas ?? 1}
      />
      <ResourceSummary
        resourceSummaryKey={`deployment-${namespace}-${deploymentName}`}
        resourceSummaryFactory={factory}
      />
      <DeploymentStatistics
        cluster={cluster}
        deploymentName={deploymentName}
        namespace={namespace}
      />
      <ReplicasList
        cluster={cluster}
        deploymentName={deploymentName}
        namespace={namespace}
      />
      <ContainersList
        cluster={cluster}
        deploymentName={deploymentName}
        namespace={namespace}
      />
    </div>
  );
}
