import useDeploymentsDataService from "./deployments-data-service";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import {
  ResourceRowModel,
  ResourcesFactory,
} from "../../shared/components/resources-list/resource-row-model";
import { useNavigate, useParams } from "react-router-dom";
import { getDeploymentUrl } from "../../shared/services/routing-service";
import { DeployIcon } from "../../assets/icons";
import { useConfigurationContext } from "../../shared/contexts/context-helpers";

export function DeploymentsList() {
  const { configuration } = useConfigurationContext();
  const navigate = useNavigate();
  const { namespace, clusterName } = useParams();
  const cluster = configuration.clusters.find((x) => x.name === clusterName);
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
    <ResourcesList resourceText="Deployments" resourcesFactory={factory} />
  );
}
