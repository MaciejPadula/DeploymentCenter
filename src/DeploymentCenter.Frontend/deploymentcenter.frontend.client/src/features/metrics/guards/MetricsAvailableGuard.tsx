import { useQuery } from "@tanstack/react-query";
import { Cluster } from "../../../shared/models/cluster";
import useMetricsDataService from "../services/metrics-service";
import StatisticsNotAvailable from "../components/StatisticsNotAvailable";
import { MetricsAvailability } from "../models/metrics-availability";
import { CircularProgress } from "@mui/material";

type Props = {
  cluster: Cluster;
  children: JSX.Element;
};

export function MetricsAvailableGuard(props: Props) {
  const dataService = useMetricsDataService(props.cluster);
  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["metrics_available", props.cluster.name],
    queryFn: async () => await dataService.areMetricsAvailable(),
  });

  const isLoaded = !isLoading && isFetched;
  const isNotLoaded = !isLoaded;
  const showStatistics = data === MetricsAvailability.Available;

  return (
    <>
      {isNotLoaded && <div className="flex justify-center"><CircularProgress size={100} /></div>}
      {isLoaded && showStatistics && props.children}
      {isLoaded && !showStatistics && <StatisticsNotAvailable />}
    </>
  );
}
