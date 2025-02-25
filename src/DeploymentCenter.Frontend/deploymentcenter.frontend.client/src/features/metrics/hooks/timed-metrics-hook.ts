/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { PodMetrics } from "../models/pod-metrics";
import { getNowFormatedTime } from "../../../shared/helpers/date-helpers";
import { UsagesDictionary } from "../services/metrics-service";
import { groupBy, lastElements } from "../../../shared/helpers/array-helpers";

export function useTimedMetrics(props: {
  filter?: string;
  maxPointsOnChart?: number;
}) {
  const [metrics, setMetrics] = useState<Map<string, PodMetrics[]>>(new Map());

  function addNewMetric(result: UsagesDictionary) {
    setMetrics((old) => {
      const now = getNowFormatedTime();

      // Gather all pods (existing + new)
      const knownPods = new Set([...old.values()].flat().map((m) => m.podName));
      const newPods = Object.keys(result);
      const allPods = new Set([...knownPods, ...newPods]);

      // Fill older snapshots with zeros for any newly discovered pod
      for (const [timestamp, snapshot] of old) {
        const existingNames = new Set(snapshot.map((m) => m.podName));
        for (const podName of allPods) {
          if (!existingNames.has(podName)) {
            snapshot.push({
              podName,
              cpuUsage: 0,
              memoryUsage: 0,
            });
          }
        }
        old.set(timestamp, snapshot);
      }

      // Add the new snapshot
      const mapped: PodMetrics[] = [...allPods].map((podName) => {
        const usage = result[podName];
        return {
          cpuUsage: usage ? usage.cpuUsage : 0,
          memoryUsage: usage ? usage.memoryUsage / 1024 / 1024 : 0,
          podName,
        };
      });
      old.set(now, mapped);

      // Keep only the last N snapshots
      const limitedKeys = lastElements(
        [...old.keys()],
        props.maxPointsOnChart ?? 10
      );
      const resultMap = new Map<string, PodMetrics[]>();
      for (const key of limitedKeys) {
        resultMap.set(key, old.get(key) || []);
      }
      return resultMap;
    });
  }

  const all = [...metrics.values()].flat();
  const grouped = [...groupBy(all, (m) => m.podName)]
    .filter(([_, arr]) => arr.some((m) => m.cpuUsage > 0 || m.memoryUsage > 0))
    .filter(
      ([name, _]) => !props.filter || name.includes(props.filter)
    )
    .map(([name, arr]) => ({
      title: name,
      cpu: arr.map((m) => m.cpuUsage),
      memory: arr.map((m) => m.memoryUsage),
    }));

  return {
    metrics: grouped,
    timeline: [...metrics.keys()],
    addNewMetric,
  };
}
