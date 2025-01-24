import { LinearProgress } from "@mui/material";
import { ResouceInSearchDetails, SearchResource } from "../../../models/search-resource";
import { Cluster } from "../../../../../shared/models/cluster";
import { RecentSearchesList } from "../Recent/RecentSearchesList";
import { SearchResourcesGroup } from "./SearchResourcesGroup";
import { groupObjects } from "../../../../../shared/helpers/object-helper";
import { useSearchService } from "../../../service/search-service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type Props = {
  cluster: Cluster;
  query: string;
  recentSearches: string[];
  onSearchExecuted: (query: string) => void;
  onResourceClicked: (resource: ResouceInSearchDetails) => void;
  onRecentSearchClicked: (search: string) => void;
  onRemoveSearchClicked: (search: string) => void;
  width?: number;
}

export function SearchesContent(props: Props) {
  const service = useSearchService(props.cluster);

  const { data: queryResult, isLoading, refetch } = useQuery({
    queryKey: ["search", props.query, props.cluster.name],
    queryFn: async () => {
      if (props.query.length === 0) {
        return { resources: [] };
      }

      const response = await service.search(props.query);
      props.onSearchExecuted(props.query);
      return response;
    },
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.query]);

  const groupedResources = queryResult ? groupObjects<string, SearchResource>(queryResult.resources, r => r.namespace ?? 'default') : {};
  const keys = Object.keys(groupedResources);

  const resourcesCount = queryResult?.resources.length ?? 0;
  
  return (
    <div className="w-full flex flex-col">
      {isLoading && <LinearProgress />}
      {props.query.length == 0 && !isLoading &&
        <RecentSearchesList
          recentSearches={props.recentSearches}
          onSearchClicked={x => props.onRecentSearchClicked(x)}
          onRemoveSearchClicked={x => props.onRemoveSearchClicked(x)}
        />
      }
      {
        props.query.length > 0 && resourcesCount > 0 && keys.map(namespace => (
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
        && resourcesCount == 0
        && !isLoading
        && <div>No resources found</div>
      }
    </div>
  );
}