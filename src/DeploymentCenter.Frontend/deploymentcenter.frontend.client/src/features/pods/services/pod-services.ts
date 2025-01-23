import { Pod, PodHealth, PodHealthStatus } from "../models/pod";

export function getHealthColor(health: PodHealthStatus) {
  switch (health) {
    case PodHealthStatus.Running:
      return "green";
    case PodHealthStatus.Waiting:
      return "orange";
    case PodHealthStatus.Terminated:
      return "red";
    case PodHealthStatus.Completed:
      return "lightblue";
    case PodHealthStatus.Unknown:
      return "gray";
  }
}

export function getStatusText(podHealth: PodHealth) {
  switch (podHealth.health) {
    case PodHealthStatus.Unknown:
      return podHealth.reason || "Unknown";
    case PodHealthStatus.Running:
      return "Running";
    case PodHealthStatus.Waiting:
      return podHealth.reason || "Waiting";
    case PodHealthStatus.Terminated:
      return podHealth.reason || "Terminated";
    case PodHealthStatus.Completed:
      return podHealth.reason || "Completed";
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
