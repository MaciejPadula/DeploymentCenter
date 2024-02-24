import { getDeployments } from "./deployments-data-service";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import {
  ResourceRowModel,
  ResourcesFactory,
} from "../../shared/components/resources-list/resource-row-model";
import DeployIcon from "../../assets/deploy.svg";
import { Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function DeploymentsList() {
  const navigate = useNavigate();

  const factory: ResourcesFactory = async () => {
    const response = await getDeployments("default");
    return response.map((x) => {
      return {
        name: x.name,
        icon: (
          <Icon>
            <img className="w-full" src={DeployIcon} />
          </Icon>
        ),
        clickHandler: () => navigate(`/deployments/${x.name}`),
      } as ResourceRowModel;
    });
  };

  return (
    <ResourcesList resourceText="Deployments" resourcesFactory={factory} />
  );
}
