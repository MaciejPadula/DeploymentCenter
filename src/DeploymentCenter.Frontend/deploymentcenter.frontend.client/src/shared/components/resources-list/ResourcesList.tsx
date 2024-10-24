import { useQuery } from "@tanstack/react-query";
import { ResourcesFactory } from "./resource-row-model";
import { ResourceRow } from "./ResourceRow";
import { Button, LinearProgress, List, Typography } from "@mui/material";
import { NoElementsToDisplay } from "../error/no-elements-to-display/NoElementsToDisplay";
import { LoadingError } from "../error/loading-error/LoadingError";
import { CreateResourceModel } from "./create-resource-model";

type Props = {
  resourceText: string;
  resourceKey: string;
  resourcesFactory: ResourcesFactory;
  showIfEmpty?: boolean | undefined;
  setupResource?: CreateResourceModel;
};

export function ResourcesList(props: Props) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [props.resourceKey],
    queryFn: props.resourcesFactory,
    retry: 2,
  });

  const isLoading = isPending || isFetching || data == undefined;

  if (error) {
    return <LoadingError />;
  }

  return (
    <div className="w-full">
      {(props.showIfEmpty !== false ||
        (data !== undefined && data.length > 0)) && (
        <div className="flex flex-row p-4">
          <Typography variant="h5">{props.resourceText}</Typography>
        </div>
      )}

      {isLoading && <LinearProgress />}

      {!isLoading && props.showIfEmpty !== false && data.length === 0 && (
        <NoElementsToDisplay />
      )}

      {props.setupResource && (
        <Button
          onClick={() => props.setupResource?.clickHandler()}
          className={"flex w-full"}
        >
          {props.setupResource.title}
        </Button>
      )}

      {!isLoading && (props.showIfEmpty !== false || data.length > 0) && (
        <List>
          {data.map((resource) => (
            <ResourceRow
              key={`/${resource.clusterName}/${resource.namespace}/${resource.name}`}
              row={resource}
            />
          ))}
        </List>
      )}
    </div>
  );
}
