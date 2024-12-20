import { Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { ResouceInSearchDetails, SearchResource, SearchResourceType } from "../models/search-resource";
import { DeployIcon, SvcIcon } from "../../../assets/icons";
import { getDeploymentUrl, getLoadBalancerUrl } from "../../../shared/services/routing-service";
import { Cluster } from "../../../shared/models/cluster";

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

  return (
    <List>
      <Typography>{props.namespace.length > 0 ? props.namespace : 'Without Namespace'}</Typography>
      {props.resources.map(getDetails).filter(x => !!x).map(x => (
        <ListItem divider={true} key={x.resource.name} className="!p-0">
          <ListItemButton onClick={() => props.onResourceClicked(x)} className="!py-2">
            <ListItemIcon>
              <Icon><img src={x.icon} /></Icon>
            </ListItemIcon>
            <ListItemText primary={x.resource.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}