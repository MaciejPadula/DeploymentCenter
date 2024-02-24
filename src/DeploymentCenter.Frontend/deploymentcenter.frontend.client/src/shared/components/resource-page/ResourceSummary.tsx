import { useQuery } from "@tanstack/react-query";
import { ResourceSummaryFactory } from "./resource-summary-model";
import { LinearProgress, Typography } from "@mui/material";

export function ResourceSummary(props: { resourceSummaryFactory: ResourceSummaryFactory }) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['resourceSummaryLoader'],
    queryFn: props.resourceSummaryFactory
  });
 
  const isLoading = isPending || isFetching || data == undefined;

  if (error) {
    <div>Error</div>
  }
  
  return (
    <div className="flex flex-wrap w-full p-4">
      {isLoading && <LinearProgress />}
      
      {!isLoading && Array.from(data.properties).map(([key, value]) => (
        <div className="w-1/2 sm:w-1/3 p-2" key={key}>
          <Typography fontWeight={'bold'}>{key}:</Typography>
          <Typography>{value}</Typography>
        </div>
      ))}
    </div>
  );
}