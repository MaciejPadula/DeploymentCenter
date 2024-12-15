import { Skeleton, Typography } from "@mui/material";
import { GargeChartBox } from "../../../shared/components/charts/gauge/GaugeChartBox";
import useMetricsDataService from "../services/metrics-service";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Cluster } from "../../../shared/models/cluster";

interface ResourceMetrics {
  value: number;
  maxValue: number;
}

function getResourceMetrics(value: number, maxValue: number): ResourceMetrics {
  return {
    value: maxValue > 0 ? (value / maxValue) * 100 : 0,
    maxValue: 100,
  };
}

function toFixed(value: number, precision: number = 0): number {
  return Number(value.toFixed(precision));
}

type Props = {
  cluster: Cluster;
};

export function ClusterStatistics(props: Props) {
  const dataService = useMetricsDataService(props.cluster);
  const { data: metrics } = useQuery({
    queryKey: ["clusterMetrics", props.cluster.name],
    queryFn: async () => {
      return await dataService.getClusterMetrics();
    },
    refetchInterval: 5000,
  });

  const cpuData: ResourceMetrics = useMemo(
    () => getResourceMetrics(metrics?.cpuUsage ?? 0, metrics?.maxCpuUsage ?? 0),
    [metrics]
  );
  const memoryData: ResourceMetrics = useMemo(() => {
    const divider = 1024 * 1024;
    return {
      value: (metrics?.memoryUsage ?? 0) / divider,
      maxValue: (metrics?.maxMemoryUsage ?? 0) / divider,
    };
  }, [metrics]);

  return (
    <div className="p-4">
      <Typography variant="h4" className="text-center">
        Cluster Statistics
      </Typography>
      <div className={"flex w-full"}>
        <div className="w-full flex flex-col items-center">
          {metrics ? (
            <>
              <Typography variant="h5">CPU</Typography>
              <GargeChartBox
                minValue={0}
                value={toFixed(cpuData.value)}
                maxValue={cpuData.maxValue}
                suffix="%"
              />
            </>
          ) : (
            <Skeleton variant="rectangular" width="100%" height={200} />
          )}
        </div>

        <div className="w-full flex flex-col items-center">
          {metrics ? (
            <>
              <Typography variant="h5">Memory</Typography>
              <GargeChartBox
                minValue={0}
                value={toFixed(memoryData.value)}
                maxValue={toFixed(memoryData.maxValue)}
                suffix="MB"
              />
            </>
          ) : (
            <Skeleton variant="rectangular" width="100%" height={200} />
          )}
        </div>
      </div>
    </div>
  );
}
