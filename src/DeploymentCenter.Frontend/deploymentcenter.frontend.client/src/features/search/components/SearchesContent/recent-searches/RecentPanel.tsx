import { SearchResourceType } from "../../../models/search-resource";
import { RecentServicesList } from "./RecentServicesList";
import { RecentSearchesList } from "./RecentSearchesList";
import { RecentResorcesList } from "./RecentResourcesList";

type Props = {
  recentSearches: string[];
  recentResourceTypes: SearchResourceType[];
  onSearchClicked?: (search: string) => void;
  onRemoveSearchClicked?: (search: string) => void;
}

export function RecentPanel(props: Props) {
  return (
    <div className="flex flex-col gap-4">
      <RecentSearchesList
        recentSearches={props.recentSearches}
        onSearchClicked={props.onSearchClicked}
        onRemoveSearchClicked={props.onRemoveSearchClicked}
      />
      <RecentServicesList recentResourceTypes={props.recentResourceTypes} />
      <RecentResorcesList />
    </div>
  );
}