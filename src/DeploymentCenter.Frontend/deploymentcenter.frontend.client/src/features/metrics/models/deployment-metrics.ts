export interface DeploymentMetrics {
  cpuUsage: number;
  memoryUsage: number;
}

export interface TimedDeploymentMetrics {
  timestampUtc: string;
  cpuUsage: number;
  memoryUsage: number;
}
