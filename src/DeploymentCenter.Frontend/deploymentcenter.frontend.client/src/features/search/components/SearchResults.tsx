import { Card, CardContent, LinearProgress } from "@mui/material";
import { ResouceInSearchDetails, SearchResource } from "../models/search-resource";
import { Cluster } from "../../../shared/models/cluster";
import { SearchResourcesGroup } from "./SearchResourcesGroup";
import { RecentSearchesList } from "./RecentSearchesList";
import { groupObjects } from "../../../shared/helpers/object-helper";

type Props = {
  cluster: Cluster;
  query: string;
  resources: SearchResource[];
  recentSearches: string[];
  isLoading: boolean;
  onResourceClicked: (resource: ResouceInSearchDetails) => void;
  onRecentSearchClicked: (search: string) => void;
  onRemoveSearchClicked: (search: string) => void;
  width?: number;
}

export function SearchResults(props: Props) {
  const groupedResources = groupObjects<string, SearchResource>(props.resources, r => r.namespace ?? 'default');
  const keys = Object.keys(groupedResources);

  return (
    <Card
      className="absolute z-50 !overflow-y-auto"
      style={{ width: props.width ?? 'inherit', maxHeight: '70dvh' }}
    >
      <CardContent>
        {props.isLoading && <LinearProgress />}
        {props.query.length == 0 && !props.isLoading &&
          <RecentSearchesList
            recentSearches={props.recentSearches}
            onSearchClicked={x => props.onRecentSearchClicked(x)}
            onRemoveSearchClicked={x => props.onRemoveSearchClicked(x)}
          />
        }
        {
          props.query.length > 0 && props.resources.length > 0 && keys.map(namespace => (
            <SearchResourcesGroup
              key={namespace}
              cluster={props.cluster}
              namespace={namespace}
              resources={groupedResources[namespace]}
              onResourceClicked={props.onResourceClicked}
            />
          ))
        }
        {
          props.query.length > 0
          && props.resources.length == 0
          && !props.isLoading
          && <div>No resources found</div>
        }
      </CardContent>
    </Card>
  );
}