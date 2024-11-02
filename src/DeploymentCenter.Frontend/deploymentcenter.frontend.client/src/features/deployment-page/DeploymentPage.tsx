import { useParams } from "react-router-dom";
import { ResourceSummary } from "../../shared/components/resource-page/ResourceSummary";
import {
  ResourceSummaryFactory,
} from "../../shared/components/resource-page/resource-summary-model";
import { ReplicasList } from "./pods/PodsList";
import { useEffect } from "react";
import { addRecentlyVisitedPage } from "../../shared/services/recently-visited-service";
import { getDeploymentUrl } from "../../shared/services/routing-service";
import { DeployIcon } from "../../assets/icons";
import { ContainersList } from "./containers/ContainersList";
import useDeploymentPageDataService from "./deployment-page-data-service";
import { DeploymentStatistics } from "./statistics/DeploymentStatistics";
import { configuration } from "../../shared/services/configuration-service";
import { DeploymentToolbar } from "./toolbar/DeploymentToolbar";
import { createSummary } from "./details-factory";

export function DeploymentPage() {
  const { deploymentName, namespace, clusterName } = useParams();
  const cluster = configuration.value.clusters.find(
    (c) => c.name === clusterName
  );
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
    return createSummary(summary, cluster);
  };

  return (
    <div className="flex flex-col w-full p-2 gap-2">
      <DeploymentToolbar
        namespace={namespace}
        deploymentName={deploymentName}
        cluster={cluster}
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
