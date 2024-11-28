import { Pod } from "./models/pod";

export function isPodFailed(pod: Pod): boolean {
  return pod.phase === "Failed" || !!pod.status;
}

export function isPodPending(pod: Pod): boolean {
  return pod.phase === "Pending" && !pod.status;
}

export function isPodRunning(pod: Pod): boolean {
  return pod.phase === "Running";
}