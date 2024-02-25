import { getDeployments } from "./deployments-data-service";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import {
  ResourceRowModel,
  ResourcesFactory,
} from "../../shared/components/resources-list/resource-row-model";
import { useNavigate, useParams } from "react-router-dom";
import { getDeploymentUrl } from "../../shared/services/routing-service";
import { DeployIcon } from "../../assets/icons";

export function DeploymentsList() {
  const navigate = useNavigate();
  const { namespace } = useParams();

  if (namespace === undefined) {
    return <div>Error</div>;
  }

  const factory: ResourcesFactory = async () => {
    const response = await getDeployments(namespace);
    return response.map((x) => {
      return {
        name: x.name,
        namespace: namespace,
        icon: DeployIcon,
        clickHandler: () => navigate(getDeploymentUrl(namespace, x.name)),
      } as ResourceRowModel;
    });
  };

  return (
    <ResourcesList resourceText="Deployments" resourcesFactory={factory} />
  );
}
