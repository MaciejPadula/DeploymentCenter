import { useQuery } from "@tanstack/react-query";
import { ResourcesFactory } from "./resource-row-model";
import { ResourceRow } from "./ResourceRow";
import { LinearProgress, List, Typography } from "@mui/material";

export function ResourcesList(props: {
  resourceText: string;
  resourcesFactory: ResourcesFactory;
  showIfEmpty?: boolean | undefined;
}) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["resourceLoader"],
    queryFn: props.resourcesFactory,
  });

  const isLoading = isPending || isFetching || data == undefined;

  if (error) {
    <div>Error</div>;
  }

  return (
    <div className="w-full">
      {(props.showIfEmpty !== false || (data !== undefined && data.length > 0)) && (
        <div className="flex flex-row p-4">
          <Typography variant="h5">{props.resourceText}</Typography>
        </div>
      )}

      {isLoading && <LinearProgress />}

      <List>
        {!isLoading &&
          (props.showIfEmpty !== false || data.length > 0) &&
          data.map((resource) => (
            <ResourceRow
              key={`/${resource.clusterName}/${resource.namespace}/${resource.name}`}
              row={resource}
            />
          ))}
      </List>
    </div>
  );
}
