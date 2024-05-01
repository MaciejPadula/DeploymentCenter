import useDeploymentsDataService from "./deployments-data-service";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import {
  ResourceRowModel,
  ResourcesFactory,
} from "../../shared/components/resources-list/resource-row-model";
import { useParams } from "react-router-dom";
import { DeployIcon } from "../../assets/icons";
import { selectedClusterApiUrl } from "../../shared/services/configuration-service";
import { useAppRouting } from "../../shared/hooks/navigation";

export function DeploymentsList() {
  const navigation = useAppRouting();
  const { namespace, clusterName } = useParams();
  const clusterApiUrl = selectedClusterApiUrl.value;
  const dataService = useDeploymentsDataService(clusterApiUrl);

  if (
    namespace === undefined ||
    clusterName === undefined ||
    clusterApiUrl === undefined
  ) {
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
          clickHandler: () =>
            navigation.deploymentPage(clusterName, namespace, x.name),
        } as ResourceRowModel)
    );
  };

  return (
    <ResourcesList
      resourceKey="DeploymentsLoader"
      resourceText="Deployments"
      resourcesFactory={factory}
    />
  );
}
