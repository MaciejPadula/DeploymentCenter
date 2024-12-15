import { useParams } from "react-router-dom";
import { ResourceSummary } from "../../shared/components/resource-page/ResourceSummary";
import {
  ResourceSummaryFactory,
} from "../../shared/components/resource-page/resource-summary-model";
import { useEffect, useState } from "react";
import { addRecentlyVisitedPage } from "../../shared/services/recently-visited-service";
import { getDeploymentUrl } from "../../shared/services/routing-service";
import { DeployIcon } from "../../assets/icons";
import { NotFound } from "../../shared/components/error/not-found/NotFound";
import { Cluster } from "../../shared/models/cluster";
import useDeploymentsDataService from "./service/deployments-data-service";
import { createSummary } from "./deployment-page/details-factory";
import { DeploymentToolbar } from "./deployment-page/components/toolbar/DeploymentToolbar";
import { DeploymentStatistics } from "./deployment-page/components/statistics/DeploymentStatistics";
import { ReplicasList } from "./deployment-page/components/pods/PodsList";
import { ContainersList } from "./deployment-page/components/containers/ContainersList";
import { Volumes } from "./deployment-page/components/volumes/Volumes";

type Props = {
  cluster: Cluster;
};

export function DeploymentPage(props: Props) {
  const { deploymentName, namespace } = useParams();
  const dataService = useDeploymentsDataService(props.cluster);
  const [areDetailsLoaded, setAreDetailsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (deploymentName === undefined || namespace === undefined) {
      return;
    }

    addRecentlyVisitedPage(
      props.cluster.name,
      deploymentName,
      namespace,
      DeployIcon,
      getDeploymentUrl(props.cluster.name, namespace, deploymentName)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (deploymentName === undefined || namespace === undefined) {
    return <NotFound />;
  }

  const factory: ResourceSummaryFactory = async () => {
    const summary = await dataService.getDeploymentDetails(
      namespace,
      deploymentName
    );
    return createSummary(summary, props.cluster);
  };

  return (
    <div className="flex flex-col w-full p-2 gap-2">
      {areDetailsLoaded && <DeploymentToolbar
        namespace={namespace}
        deploymentName={deploymentName}
        cluster={props.cluster}
      />}
      <ResourceSummary
        resourceSummaryKey={`Deployment-${namespace}-${deploymentName}`}
        resourceSummaryFactory={factory}
        onPageLoaded={() => setAreDetailsLoaded(true)}
        onPageError={() => setAreDetailsLoaded(false)}
      />
      {areDetailsLoaded && (
        <>
          <DeploymentStatistics
            cluster={props.cluster}
            deploymentName={deploymentName}
            namespace={namespace}
          />
          <ReplicasList
            cluster={props.cluster}
            deploymentName={deploymentName}
            namespace={namespace}
          />
          <ContainersList
            cluster={props.cluster}
            deploymentName={deploymentName}
            namespace={namespace}
          />
          <Volumes
            cluster={props.cluster}
            deploymentName={deploymentName}
            namespace={namespace}
          />
        </>

      )}

    </div>
  );
}
