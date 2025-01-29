import { Cluster } from "../../../shared/models/cluster";
import { HttpClient } from "../../../shared/services/http-client";
import { CronJob } from "../models/cron-job";

function CronJobsDataService(httpClient: HttpClient) {
  const controller = "api/Services";

  interface GetCronJobsListResponse {
    cronJobs: CronJob[];
  }

  async function getCronJobs(namespace: string): Promise<CronJob[]> {
    const response = await httpClient.get<GetCronJobsListResponse>(
      `/${controller}/GetCronJobsList?namespace=${namespace}`
    );
    return response.cronJobs;
  }

  interface CronJobDetails {
    namespace: string;
    name: string;
    cronExpression: string;
  }

  async function getCronJobDetails(
    namespace: string,
    cronJobName: string
  ): Promise<CronJobDetails> {
    const response = await httpClient.get<CronJobDetails>(
      `/${controller}/GetCronJobDetails?namespace=${namespace}&cronJobName=${cronJobName}`
    );
    return response;
  }

  interface RunJobRequest {
    namespace: string;
    cronJobName: string;
  }

  async function runJob(namespace: string, cronJobName: string) {
    await httpClient.post<RunJobRequest, void>(`/${controller}/RunCronJob`, {
      namespace,
      cronJobName,
    });
  }

  return {
    getCronJobs,
    getCronJobDetails,
    runJob,
  };
}

export default function useCronJobsDataService(cluster: Cluster) {
  return CronJobsDataService(
    new HttpClient(cluster.apiUrl, cluster.kubeconfig)
  );
}
