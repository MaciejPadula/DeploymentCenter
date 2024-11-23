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
    cluster: string,
    namespace: string
  ) {
    if (!cluster || !namespace) {
      return;
    }
    navigate(createRedirectUrl(window.location.pathname, cluster, namespace));
  }

  function setupDeployment(clusterName: string) {
    navigate(`/${clusterName}/setup-deployment`);
  }

  function setupLoadBalancer(clusterName: string) {
    navigate(`/${clusterName}/setup-load-balancer`);
  }

  function deploymentPage(
    clusterName: string,
    namespace: string,
    deploymentName: string
  ) {
    if (!clusterName || !namespace || !deploymentName) {
      return;
    }
    navigate(`/${clusterName}/${namespace}/deployments/${deploymentName}`);
  }

  function loadBalancerPage(
    clusterName: string,
    namespace: string,
    loadBalancerName: string
  ) {
    if (!clusterName || !namespace || !loadBalancerName) {
      return;
    }
    navigate(`/${clusterName}/${namespace}/load-balancers/${loadBalancerName}`);
  }

  function deploymentList(clusterName: string, namespace: string) {
    if (!clusterName || !namespace) {
      return;
    }
    navigate(`/${clusterName}/${namespace}/deployments`);
  }

  function loadBalancerList(clusterName: string, namespace: string) {
    if (!clusterName || !namespace) {
      return;
    }
    navigate(`/${clusterName}/${namespace}/load-balancers`);
  }

  function cronJobsList(clusterName: string, namespace: string) {
    if (!clusterName || !namespace) {
      return;
    }
    navigate(`/${clusterName}/${namespace}/cron-jobs`);
  }

  function namespacesList(clusterName: string) {
    if (!clusterName) {
      return;
    }
    navigate(`/${clusterName}/namespaces`);
  }

  function navigateToUrl(url: string) {
    navigate(url);
  }

  function reloadPage() {
    window.location.reload();
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
