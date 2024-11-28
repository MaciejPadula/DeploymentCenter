import { Pod, PodHealthStatus } from "../models/pod";

export function getHealthColor(health: PodHealthStatus) {
  switch (health) {
    case PodHealthStatus.Running:
      return "green";
    case PodHealthStatus.Waiting:
      return "orange";
    case PodHealthStatus.Terminated:
      return "red";
    case PodHealthStatus.Unknown:
      return "gray";
  }
}

export function groupPodsByHealth(pods: Pod[]) {
  const grouped = pods.reduce((acc, pod) => {
    const health = pod.status.health;
    if (!acc[health]) {
      acc[health] = [];
    }

    acc[health].push(pod);
    return acc;
  }, {} as Record<PodHealthStatus, Pod[]>);

  return grouped;
}