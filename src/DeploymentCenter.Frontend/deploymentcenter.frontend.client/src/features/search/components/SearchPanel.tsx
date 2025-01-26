import { Card, CardContent } from "@mui/material";
import { ResouceInSearchDetails, SearchResourceType } from "../models/search-resource";
import { Cluster } from "../../../shared/models/cluster";
import { SearchesContent } from "./SearchesContent/search-result/SearchesContent";

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

export function SearchPanel(props: Props) {
  return (
    <Card
      className="absolute z-50 !overflow-y-auto"
      style={{ width: props.width ?? 'inherit', maxHeight: '70dvh' }}
    >
      <CardContent>
        <div className="w-full flex flex-col sm:flex-row">
          <div className="w-full">
            <SearchesContent
              cluster={props.cluster}
              query={props.query}
              recentSearches={props.recentSearches}
              recentResourceTypes={props.recentResourceTypes}
              onResourceClicked={props.onResourceClicked}
              onRecentSearchClicked={props.onRecentSearchClicked}
              onRemoveSearchClicked={props.onRemoveSearchClicked}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}