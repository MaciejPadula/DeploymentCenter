import { Typography } from "@mui/material";
import { GargeChartBox } from "../../shared/components/charts/gauge/GaugeChartBox";
import { useState } from "react";
import { ClusterMetrics } from "./models/cluster-metrics";

export function ClusterStatistics() {
  const [metrics, setMetrics] = useState<ClusterMetrics>({
    cpuUsage: 40,
    memoryUsage: 0,
    maxCpuUsage: 100,
    maxMemoryUsage: 162000,
  });

  setTimeout(() => {
    setMetrics({
      cpuUsage: Math.round(Math.random() * 100),
      memoryUsage: Math.round(Math.random() * 162000),
      maxCpuUsage: 100,
      maxMemoryUsage: 162000,
    });
  }, 600);

  return (
    <div className="p-4">
      <Typography variant="h4" className="text-center">Cluster Statistics</Typography>
      <div className={'flex w-full'}>
        <div className="w-full flex flex-col items-center">
          <Typography variant="h5">CPU</Typography>
          <GargeChartBox
            minValue={0}
            value={metrics.cpuUsage}
            maxValue={metrics.maxCpuUsage}
          />
        </div>

        <div className="w-full flex flex-col items-center">
          <Typography variant="h5">Memory</Typography>
          <GargeChartBox
            minValue={0}
            value={metrics.memoryUsage}
            maxValue={metrics.maxMemoryUsage}
          />
        </div>
      </div>
    </div>
  );
}