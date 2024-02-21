import { getDeployments } from "./deployments-data-service";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";

export function DeploymentsList() {
  const factory = async () => {
    const response = await getDeployments('default');
    console.log(response);
    const result = response.map(x => x.name);
    console.log(result);
    return result;
  };

  return (
    <ResourcesList resourceText="Deployments" resourcesFactory={factory} />
  );
}


