import { AxiosError } from "axios";

export function areMetricsAvailable(error: unknown) {
  return (
    error === undefined ||
    !(error instanceof AxiosError && error?.response?.status === 501)
  );
}
