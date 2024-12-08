import { useParams } from "react-router-dom";
import { ResourceSummary } from "../../shared/components/resource-page/ResourceSummary";
import {
  ResourceSummaryFactory,
} from "../../shared/components/resource-page/resource-summary-model";
import { ReplicasList } from "./components/pods/PodsList";
import { useEffect, useState } from "react";
import { addRecentlyVisitedPage } from "../../shared/services/recently-visited-service";
import { getDeploymentUrl } from "../../shared/services/routing-service";
import { DeployIcon } from "../../assets/icons";
import useDeploymentPageDataService from "./deployment-page-data-service";
import { createSummary } from "./details-factory";
import { NotFound } from "../../shared/components/error/not-found/NotFound";
import { Cluster } from "../../shared/models/cluster";
import { Volumes } from "./components/volumes/Volumes";
import { DeploymentToolbar } from "./components/toolbar/DeploymentToolbar";
import { DeploymentStatistics } from "./components/statistics/DeploymentStatistics";
import { ContainersList } from "./components/containers/ContainersList";

type Props = {
  cluster: Cluster;
};

export function DeploymentPage(props: Props) {
  const { deploymentName, namespace } = useParams();
  const dataService = useDeploymentPageDataService(props.cluster);
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
