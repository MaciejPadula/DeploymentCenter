import { Card, CardContent, LinearProgress } from "@mui/material";
import { ResouceInSearchDetails, SearchResource } from "../models/search-resource";
import { Cluster } from "../../../shared/models/cluster";
import { SearchResourcesGroup } from "./SearchResourcesGroup";

type Props = {
  cluster: Cluster;
  resources: SearchResource[];
  isLoading: boolean;
  isParentFocused: boolean;
  onResourceClicked: (resource: ResouceInSearchDetails) => void;
  width?: number;
}

function groupResources(resources: SearchResource[]) : Record<string, SearchResource[]> {
  return resources.reduce<Record<string, SearchResource[]>>((acc, resource) => {
    const namespace = resource.namespace ?? 'default';
    (acc[namespace] = acc[namespace] || []).push(resource);
    return acc;
  }, {});
}

export function SearchResults(props: Props) {
  const groupedResources = groupResources(props.resources);
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
            groupedResources && keys.map(namespace => (
              <SearchResourcesGroup
                key={namespace}
                cluster={props.cluster}
                namespace={namespace}
                resources={groupedResources[namespace]}
                onResourceClicked={props.onResourceClicked}
              />
            ))
          }
        </CardContent>
      </Card>
    )
  );
}