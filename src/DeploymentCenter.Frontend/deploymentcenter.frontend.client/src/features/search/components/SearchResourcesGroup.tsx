import { Icon } from "@mui/material";
import { ResouceInSearchDetails, SearchResource, SearchResourceType } from "../models/search-resource";
import { DeployIcon, SvcIcon } from "../../../assets/icons";
import { getDeploymentUrl, getLoadBalancerUrl } from "../../../shared/services/routing-service";
import { Cluster } from "../../../shared/models/cluster";
import { SearchList } from "./List/SearchList";

type Props = {
  cluster: Cluster;
  namespace: string;
  resources: SearchResource[];
  onResourceClicked: (resource: ResouceInSearchDetails) => void;
}

export function SearchResourcesGroup(props: Props) {
  function getDetails(resource: SearchResource): ResouceInSearchDetails | null {
    switch (resource.type) {
      case SearchResourceType.Deployment:
        return { resource: resource, icon: DeployIcon, url: getDeploymentUrl(props.cluster.name, resource.namespace!, resource.name) };
      case SearchResourceType.LoadBalancer:
        return { resource: resource, icon: SvcIcon, url: getLoadBalancerUrl(props.cluster.name, resource.namespace!, resource.name) };
      default:
        return null;
    }
  }

  const header = props.namespace.length > 0 ? props.namespace : 'Without Namespace';

  const resources = props.resources.map(getDetails).filter(x => !!x).map(x => {
    return {
      name: x.resource.name,
      icon: <Icon><img src={x.icon} /></Icon>,
      onClick: () => props.onResourceClicked(x)
    }
  });

  return <SearchList header={header} divider={true} items={resources} />;
}