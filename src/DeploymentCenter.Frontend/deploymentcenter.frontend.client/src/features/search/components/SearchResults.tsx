import { Card, CardContent, Icon, List, ListItemButton, ListItemText, ListItemIcon, ListItem, LinearProgress } from "@mui/material";
import { SearchResource, SearchResourceType } from "../models/search-resource";
import { Cluster } from "../../../shared/models/cluster";
import { getDeploymentUrl, getLoadBalancerUrl } from "../../../shared/services/routing-service";
import { DeployIcon, SvcIcon } from "../../../assets/icons";

type Props = {
  cluster: Cluster;
  resources: SearchResource[];
  isLoading: boolean;
  isParentFocused: boolean;
  onResourceClicked: (resource: ResouceInSearchDetails) => void;
  width?: number;
}

interface ResouceInSearchDetails {
  resource: SearchResource;
  icon: string;
  url: string;
}

export function SearchResults(props: Props) {
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

  const groupedResources = props.resources.reduce<Record<string, SearchResource[]>>((acc, fruit) => {
    const namespace = fruit.namespace ?? 'default';
    (acc[namespace] = acc[namespace] || []).push(fruit);
    return acc;
  }, {});

  const keys = Object.keys(groupedResources);

  return (
    props.isParentFocused && (props.resources.length > 0 || props.isLoading)
    && (
      <Card
        className="absolute z-50 !overflow-y-auto"
        style={{ width: props.width ?? 'inherit', maxHeight: '70dvh' }}
      >
        <CardContent>
          {props.isLoading && <LinearProgress />}
          {
            groupedResources && keys.map(key => (
              <List key={key}>
                <div>{key.length > 0 ? key : 'Without Namespace'}</div>
                {groupedResources[key].map(getDetails).filter(x => !!x).map(x => (
                  <ListItem key={x.resource.name} className="!p-0">
                    <ListItemButton onClick={() => props.onResourceClicked(x)} className="!py-0">
                      <ListItemIcon>
                        <Icon><img src={x.icon} /></Icon>
                      </ListItemIcon>
                      <ListItemText primary={x.resource.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ))
          }
        </CardContent>
      </Card>
    )
  );
}