export function getDeploymentUrl(clusterName: string, namespace: string, name: string) {
  return `/${clusterName}/${namespace}/deployments/${name}`;
}

export function getCronJobUrl(clusterName: string, namespace: string, name: string) {
  return `/${clusterName}/${namespace}/cron-jobs/${name}`;
}

export function getLoadBalancerUrl(clusterName: string, namespace: string, name: string) {
  return `/${clusterName}/${namespace}/load-balancers/${name}`;
}