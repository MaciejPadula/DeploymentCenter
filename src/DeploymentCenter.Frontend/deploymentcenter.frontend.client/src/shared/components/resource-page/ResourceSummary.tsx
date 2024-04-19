import { useQuery } from "@tanstack/react-query";
import { ResourceSummaryFactory } from "./resource-summary-model";
import { Icon, LinearProgress, Paper, Tooltip, Typography } from "@mui/material";

export function ResourceSummary(props: {
  resourceSummaryFactory: ResourceSummaryFactory;
}) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["resourceSummaryLoader"],
    queryFn: props.resourceSummaryFactory,
  });

  const isLoading = isPending || isFetching || data == undefined;

  if (error) {
    <div>Error</div>;
  }

  return (
    <Paper className="flex flex-wrap w-full" elevation={2}>
      {isLoading && <LinearProgress />}
      {!isLoading && (
        <div className="w-full">
          <div className="flex flex-row justify-between items-center p-4">
            <Typography variant="h5">{data.resourceTitle}</Typography>
            <Icon className="!w-12 !h-12">
              <img className="w-full h-full" src={data.icon} />
            </Icon>
          </div>
          <div className="flex flex-row flex-wrap w-full p-4">
            {Array.from(data.properties).map(([key, value]) => (
              <div className="w-1/2 sm:w-1/3 p-2" key={key}>
                <Typography fontWeight={"bold"}>{key}:</Typography>
                <Tooltip title={value}>
                  <Typography className="truncate">{value}</Typography>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
}
