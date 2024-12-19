import { Card, CardContent, Icon, List, ListItemButton, ListItemText, ListItemIcon, ListItem, LinearProgress } from "@mui/material";
import { SearchResource, SearchResourceType } from "../models/search-resource";
import { Cluster } from "../../../shared/models/cluster";
import { getDeploymentUrl, getLoadBalancerUrl } from "../../../shared/services/routing-service";
import { DeployIcon, SvcIcon } from "../../../assets/icons";

type Props = {
  cluster: Cluster;
  resources: SearchResource[];
  isLoading: boolean;
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

  return (
    (props.resources.length > 0 || props.isLoading) && (
      <Card className="absolute z-50" style={{ width: props.width ?? 'inherit' }}>
        <CardContent>
          {props.isLoading && <LinearProgress />}
          <List>
            {!props.isLoading && props.resources.map(getDetails).filter(x => !!x).map(x => (
              <ListItem key={x.resource.name}>
                <ListItemButton onClick={() => props.onResourceClicked(x)}>
                  <ListItemIcon>
                    <Icon><img src={x.icon} /></Icon>
                  </ListItemIcon>
                  <ListItemText primary={x.resource.name} secondary={x.resource.namespace} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    )
  );
}