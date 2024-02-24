import { getDeployments } from "./deployments-data-service";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import {
  ResourceRowModel,
  ResourcesFactory,
} from "../../shared/components/resources-list/resource-row-model";
import { useNavigate } from "react-router-dom";
import { getDeploymentUrl } from "../../shared/services/routing-service";
import { DeployIcon } from "../../assets/icons";

export function DeploymentsList() {
  const navigate = useNavigate();

  const factory: ResourcesFactory = async () => {
    const response = await getDeployments("default");
    return response.map((x) => {
      return {
        name: x.name,
        icon: DeployIcon,
        clickHandler: () => navigate(getDeploymentUrl(x.name)),
      } as ResourceRowModel;
    });
  };

  return (
    <ResourcesList resourceText="Deployments" resourcesFactory={factory} />
  );
}
