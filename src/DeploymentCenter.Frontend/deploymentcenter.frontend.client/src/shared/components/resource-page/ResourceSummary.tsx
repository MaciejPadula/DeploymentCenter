import { useQuery } from "@tanstack/react-query";
import { ResourceSummaryFactory } from "./resource-summary-model";
import {
  Icon,
  LinearProgress,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { LoadingError } from "../error/loading-error/LoadingError";
import { AxiosError } from "axios";
import { NotFound } from "../error/not-found/NotFound";

export function ResourceSummary(props: {
  resourceSummaryKey: string;
  resourceSummaryFactory: ResourceSummaryFactory;
}) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [props.resourceSummaryKey],
    queryFn: props.resourceSummaryFactory,
    retry: 2,
  });

  const isLoading = isPending || isFetching || data == undefined;
  
  if (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return <NotFound />
    }
    return <LoadingError />;
  }

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Paper className="flex flex-wrap w-full min-h-1" elevation={2}>
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
        </Paper>
      )}
    </>
  );
}
