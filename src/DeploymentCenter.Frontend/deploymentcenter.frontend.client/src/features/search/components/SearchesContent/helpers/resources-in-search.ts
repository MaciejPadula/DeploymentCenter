import { CronJobIcon, DeployIcon, SvcIcon } from "../../../../../assets/icons";
import {
  getCronJobUrl,
  getDeploymentUrl,
  getLoadBalancerUrl,
} from "../../../../../shared/services/routing-service";
import {
  ResouceInSearchDetails,
  SearchResource,
  SearchResourceType,
} from "../../../models/search-resource";

function getDetails(
  cluster: string,
  resource: SearchResource
): ResouceInSearchDetails | null {
  switch (resource.type) {
    case SearchResourceType.Deployment:
      return {
        resource: resource,
        icon: DeployIcon,
        url: getDeploymentUrl(cluster, resource.namespace!, resource.name),
      };
    case SearchResourceType.LoadBalancer:
      return {
        resource: resource,
        icon: SvcIcon,
        url: getLoadBalancerUrl(cluster, resource.namespace!, resource.name),
      };
    case SearchResourceType.CronJob:
      return {
        resource: resource,
        icon: CronJobIcon,
        url: getCronJobUrl(cluster, resource.namespace!, resource.name),
      };
    default:
      return null;
  }
}

export function mapResourcesToSearchList(
  cluster: string,
  namespace: string,
  resources: SearchResource[]
): { header: string; resourcesList: ResouceInSearchDetails[] } {
  const header = namespace.length > 0 ? namespace : "Without Namespace";
  const resourcesList = resources
    .map((resource) => getDetails(cluster, resource))
    .filter((x) => !!x);
  return { header, resourcesList };

  // const resourcesList = resources.map(resource => getDetails(cluster, resource)).filter(x => !!x).map(x => {
  //   return {
  //     name: x.resource.name,
  //     icon: <Icon><img src={x.icon} /></Icon>,
  //     onClick: () => onResourceClicked(x)
  //   }
  // });

  // return { header, resourcesList };
}
