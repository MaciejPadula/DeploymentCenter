import useDeploymentsDataService from "./deployments-data-service";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import {
  ResourceRowModel,
  ResourcesFactory,
} from "../../shared/components/resources-list/resource-row-model";
import { useParams } from "react-router-dom";
import { DeployIcon } from "../../assets/icons";
import { useAppRouting } from "../../shared/hooks/navigation";
import { NotFound } from "../../shared/components/error/not-found/NotFound";
import { Cluster } from "../../shared/models/cluster";

type Props = {
  cluster: Cluster;
};

export function DeploymentsList(props: Props) {
  const navigation = useAppRouting();
  const { namespace } = useParams();
  const dataService = useDeploymentsDataService(props.cluster);

  if (namespace === undefined) {
    return <NotFound />;
  }

  const factory: ResourcesFactory = async () => {
    const response = await dataService.getDeployments(namespace);
    return response.map(
      (x) =>
      ({
        clusterName: props.cluster.name,
        name: x.name,
        namespace: namespace,
        icon: DeployIcon,
        clickHandler: () =>
          navigation.deploymentPage(props.cluster.name, namespace, x.name),
      } as ResourceRowModel)
    );
  };

  return (
    <ResourcesList
      resourceKey="DeploymentsLoader"
      resourceText="Deployments"
      resourcesFactory={factory}
      setupResource={{
        title: "Setup new deployment",
        clickHandler: () => navigation.setupDeployment(),
      }}
    />
  );
}
