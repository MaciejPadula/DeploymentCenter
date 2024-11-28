interface PodStatus {
  reason: string;
  message: string;
}

export interface Pod {
  name: string;
  phase: string;
  status: PodStatus | null;
  ip: string;
}