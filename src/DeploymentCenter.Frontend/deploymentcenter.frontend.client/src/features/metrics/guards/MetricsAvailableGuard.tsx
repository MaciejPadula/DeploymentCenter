import { useQuery } from "@tanstack/react-query";
import { Cluster } from "../../../shared/models/cluster";
import useMetricsDataService from "../services/metrics-service";
import StatisticsNotAvailable from "../components/StatisticsNotAvailable";
import { MetricsAvailability } from "../models/metrics-availability";

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

  const showStatistics =
    !isLoading && isFetched && data === MetricsAvailability.Available;

  return (
    <>
      {isLoading && <div>loading</div>}
      {showStatistics ? props.children : <StatisticsNotAvailable />}
    </>
  );
}
