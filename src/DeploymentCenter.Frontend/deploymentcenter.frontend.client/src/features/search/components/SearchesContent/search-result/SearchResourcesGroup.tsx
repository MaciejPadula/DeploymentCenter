import { Icon } from "@mui/material";
import { ResouceInSearchDetails, SearchResource } from "../../../models/search-resource";
import { Cluster } from "../../../../../shared/models/cluster";
import { SearchList } from "../../List/SearchList";
import { mapResourcesToSearchList } from "../helpers/resources-in-search";

type Props = {
  cluster: Cluster;
  namespace: string;
  resources: SearchResource[];
  onResourceClicked: (resource: ResouceInSearchDetails) => void;
}

export function SearchResourcesGroup(props: Props) {
  const { header, resourcesList } = mapResourcesToSearchList(props.cluster.name, props.namespace, props.resources);

  const resources = resourcesList.map(x => {
    return {
      name: x.resource.name,
      icon: <Icon><img src={x.icon} /></Icon>,
      onClick: () => props.onResourceClicked(x)
    }
  });

  return <SearchList header={header} divider={true} items={resources} />;
}