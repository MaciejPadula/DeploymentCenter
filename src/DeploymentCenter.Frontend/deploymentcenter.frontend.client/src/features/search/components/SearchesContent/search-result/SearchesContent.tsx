import { LinearProgress } from "@mui/material";
import { ResouceInSearchDetails, SearchResource, SearchResourceType } from "../../../models/search-resource";
import { Cluster } from "../../../../../shared/models/cluster";
import { SearchResourcesGroup } from "./SearchResourcesGroup";
import { useSearchService } from "../../../service/search-service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { RecentPanel } from "../recent-searches/RecentPanel";

type Props = {
  cluster: Cluster;
  query: string;
  recentSearches: string[];
  recentResourceTypes: SearchResourceType[];
  onResourceClicked: (resource: ResouceInSearchDetails) => void;
  onRecentSearchClicked: (search: string) => void;
  onRemoveSearchClicked: (search: string) => void;
  width?: number;
}

type ResourcesDictionary = { [key: string]: SearchResource[] };

export function SearchesContent(props: Props) {
  const service = useSearchService(props.cluster);

  const { data: queryResult, isLoading, refetch } = useQuery({
    queryKey: ["search", props.query, props.cluster.name],
    queryFn: async () => {
      if (props.query.length === 0) {
        return { resources: [] };
      }

      const response = await service.search(props.query);
      return response;
    },
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.query]);

  const keys = Object.keys(queryResult?.resources ?? {});
  const resources: ResourcesDictionary = (queryResult?.resources ?? {}) as ResourcesDictionary;

  return (
    <div className="w-full flex flex-col">
      {isLoading && <LinearProgress />}
      {props.query.length == 0 && !isLoading &&
        <RecentPanel
          recentSearches={props.recentSearches}
          recentResourceTypes={props.recentResourceTypes}
          onSearchClicked={x => props.onRecentSearchClicked(x)}
          onRemoveSearchClicked={x => props.onRemoveSearchClicked(x)}
        />
      }
      {
        props.query.length > 0 && keys.map(namespace => (
          <SearchResourcesGroup
            key={namespace}
            cluster={props.cluster}
            namespace={namespace}
            resources={resources[namespace]}
            onResourceClicked={props.onResourceClicked}
          />
        ))
      }
      {
        props.query.length > 0
        && keys.length == 0
        && !isLoading
        && <div>No resources found</div>
      }
    </div>
  );
}