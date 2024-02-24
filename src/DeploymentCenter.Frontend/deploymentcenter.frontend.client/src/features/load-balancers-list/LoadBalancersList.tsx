import { useNavigate } from "react-router-dom";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import { ResourceRowModel, ResourcesFactory } from "../../shared/components/resources-list/resource-row-model";
import { getLoadBalancers } from "./load-balancers-data-service";
import { getLoadBalancerUrl } from "../../shared/services/routing-service";
import { SvcIcon } from "../../assets/icons";

export function LoadBalancersList() {
  const navigate = useNavigate();
  
  const factory: ResourcesFactory = async () => {
    const response = await getLoadBalancers("default");
    return response.map((x) => {
      return {
        name: x.name,
        icon: SvcIcon,
        clickHandler: () => navigate(getLoadBalancerUrl(x.name)),
      } as ResourceRowModel;
    });
  };

  return (
    <ResourcesList resourceText="Load Balancers" resourcesFactory={factory} />
  );
}