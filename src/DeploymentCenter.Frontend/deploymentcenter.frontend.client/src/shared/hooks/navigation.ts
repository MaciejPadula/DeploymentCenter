import { useNavigate } from "react-router-dom";
import { createRedirectUrl } from "../helpers/redirect-helper";

export function useAppRouting() {
  const navigate = useNavigate();

  function clustersConfiguration() {
    navigate("/clusters-configuration");
  }

  function mainPage() {
    navigate("/");
  }

  function updateConnection(
    currentLocation: string,
    cluster: string,
    namespace: string
  ) {
    navigate(createRedirectUrl(currentLocation, cluster, namespace));
    reloadPage();
  }

  function setupDeployment() {
    navigate("/setup-deployment");
  }

  function setupLoadBalancer() {
    navigate("/setup-load-balancer");
  }

  function deploymentPage(
    clusterName: string,
    namespace: string,
    deploymentName: string
  ) {
    navigate(`/${clusterName}/${namespace}/deployments/${deploymentName}`);
  }

  function loadBalancerPage(
    clusterName: string,
    namespace: string,
    loadBalancerName: string
  ) {
    navigate(`/${clusterName}/${namespace}/load-balancers/${loadBalancerName}`);
  }

  function deploymentList(clusterName: string, namespace: string) {
    navigate(`/${clusterName}/${namespace}/deployments`);
  }

  function loadBalancerList(clusterName: string, namespace: string) {
    navigate(`/${clusterName}/${namespace}/load-balancers`);
  }

  function cronJobsList(clusterName: string, namespace: string) {
    navigate(`/${clusterName}/${namespace}/cron-jobs`);
  }

  function namespacesList(clusterName: string) {
    navigate(`/${clusterName}/namespaces`);
  }

  function navigateToUrl(url: string) {
    navigate(url);
  }

  function reloadPage() {
    navigate(0);
  }

  return {
    clustersConfiguration,
    mainPage,
    deploymentPage,
    loadBalancerPage,
    deploymentList,
    loadBalancerList,
    navigateToUrl,
    setupDeployment,
    setupService: setupLoadBalancer,
    updateConnection,
    cronJobsList,
    namespacesList,
    reloadPage,
  };
}
