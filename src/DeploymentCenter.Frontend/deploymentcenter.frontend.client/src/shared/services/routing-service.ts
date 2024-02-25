export function getDeploymentUrl(namespace: string, name: string) {
  return `/${namespace}/deployments/${name}`;
}

export function getLoadBalancerUrl(namespace: string, name: string) {
  return `/${namespace}/load-balancers/${name}`;
}