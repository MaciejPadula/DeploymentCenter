export enum PodHealthStatus {
  Unknown = 0,
  Waiting = 1,
  Running = 2,
  Terminated = 3,
  Completed = 4,
}

export interface PodHealth {
  health: PodHealthStatus;
  reason: string | null;
  message: string | null;
}

export interface Pod {
  name: string;
  status: PodHealth;
  ip: string;
}