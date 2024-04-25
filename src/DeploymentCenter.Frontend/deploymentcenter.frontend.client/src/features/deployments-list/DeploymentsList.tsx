import useDeploymentsDataService from "./deployments-data-service";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import {
  ResourceRowModel,
  ResourcesFactory,
} from "../../shared/components/resources-list/resource-row-model";
import { useNavigate, useParams } from "react-router-dom";
import { getDeploymentUrl } from "../../shared/services/routing-service";
import { DeployIcon } from "../../assets/icons";
import { useConfiguredCluster } from "../../shared/contexts/context-helpers";

export function DeploymentsList() {
  const navigate = useNavigate();
  const { namespace, clusterName } = useParams();
  const cluster = useConfiguredCluster(clusterName);
  const dataService = useDeploymentsDataService(cluster?.apiUrl);

  if (namespace === undefined || clusterName === undefined || cluster === undefined) {
    return <div>Error</div>;
  }

  const factory: ResourcesFactory = async () => {
    const response = await dataService.getDeployments(namespace);
    return response.map(
      (x) =>
        ({
          clusterName: clusterName,
          name: x.name,
          namespace: namespace,
          icon: DeployIcon,
          clickHandler: () => navigate(getDeploymentUrl(clusterName, namespace, x.name)),
        } as ResourceRowModel)
    );
  };

  return (
    <ResourcesList resourceKey="DeploymentsLoader" resourceText="Deployments" resourcesFactory={factory} />
  );
}
