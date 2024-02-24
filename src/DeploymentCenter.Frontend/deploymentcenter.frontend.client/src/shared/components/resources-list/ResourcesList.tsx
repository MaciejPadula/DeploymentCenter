import { useQuery } from "@tanstack/react-query";
import { ResourcesFactory } from "./resource-row-model";
import { ResourceRow } from "./ResourceRow";
import { LinearProgress, List, Typography } from "@mui/material";

export function ResourcesList(props: { resourceText: string, resourcesFactory: ResourcesFactory }) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['resourceLoader'],
    queryFn: props.resourcesFactory
  });
 
  const isLoading = isPending || isFetching || data == undefined;

  if (error) {
    <div>Error</div>
  }

  return (
    <div className="w-full">
      <div className="flex flex-row p-4">
        <Typography variant="h5">
          {props.resourceText}
        </Typography>
      </div>
      {isLoading && <LinearProgress />}
      
      <List>
        {!isLoading && data.map(resource => <ResourceRow key={resource.name} row={resource} />)}
      </List>
    </div>
  );
}