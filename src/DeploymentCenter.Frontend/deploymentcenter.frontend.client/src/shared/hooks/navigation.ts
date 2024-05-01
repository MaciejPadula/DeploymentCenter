import { useNavigate } from "react-router-dom";
import { createRedirectUrl } from "../helpers/redirect-helper";

export function useAppRouting() {
  const navigate = useNavigate();

  function clustersConfiguration() {
    navigate("/clusters-configuration");
    navigate(0);
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
    navigate(0);
  }

  function setupAplication() {
    navigate("setup-application");
  }

  function deploymentPage(
    clusterName: string,
    namespace: string,
    deploymentName: string
  ) {
    navigate(`/${clusterName}/${namespace}/deployments/${deploymentName}`);
    navigate(0);
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

  return {
    clustersConfiguration,
    mainPage,
    deploymentPage,
    loadBalancerPage,
    deploymentList,
    loadBalancerList,
    navigateToUrl,
    setupAplication,
    updateConnection,
    cronJobsList,
    namespacesList,
  };
}
