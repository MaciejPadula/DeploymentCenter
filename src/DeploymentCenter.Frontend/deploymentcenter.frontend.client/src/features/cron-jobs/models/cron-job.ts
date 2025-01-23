export interface CronJob {
  namespace: string;
  name: string;
  cronExpression: string;
}