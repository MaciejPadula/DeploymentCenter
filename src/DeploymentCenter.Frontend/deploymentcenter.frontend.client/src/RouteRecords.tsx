import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { MainPage } from "./features/main-page/MainPage";
import { DeploymentsList } from "./features/deployments-list/DeploymentsList";
import { DeploymentPage } from "./features/deployment-page/DeploymentPage";
import { LoadBalancersList } from "./features/load-balancers-list/LoadBalancersList";
import { LoadBalancerPage } from "./features/load-balancer/LoadBalancerPage";
import { NotFound } from "./shared/components/error/not-found/NotFound";
import { ClustersList } from "./features/clusters-list/ClustersList";
import { CreateDeploymentPage } from "./features/create-deployment/CreateDeploymentPage";
import { CreateLoadBalancerPage } from "./features/create-load-balancer/CreateLoadBalancerPage";
import { NamespacesList } from "./features/namespaces-list/NamespacesList";
import { ClusterFromUrlGuard } from "./shared/guards/ClusterFromUrlGuard";

export function RouteRecords() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />

          <Route path="/:clusterName/setup-deployment" element={<ClusterFromUrlGuard factory={c => <CreateDeploymentPage cluster={c} />} />} />
          <Route path="/:clusterName/setup-load-balancer" element={<ClusterFromUrlGuard factory={c => <CreateLoadBalancerPage cluster={c} />} />} />

          <Route path="clusters-configuration" element={<ClustersList />} />

          <Route
            path="/:clusterName/:namespace/deployments"
            element={<ClusterFromUrlGuard factory={c => <DeploymentsList cluster={c} />} />}
          />
          <Route
            path="/:clusterName/:namespace/deployments/:deploymentName"
            element={<ClusterFromUrlGuard factory={c => <DeploymentPage cluster={c} />} />}
          />

          <Route
            path="/:clusterName/:namespace/load-balancers"
            element={<ClusterFromUrlGuard factory={c => <LoadBalancersList cluster={c} />} />}
          />
          <Route
            path="/:clusterName/:namespace/load-balancers/:loadBalancerName"
            element={<ClusterFromUrlGuard factory={c => <LoadBalancerPage cluster={c} />} />}
          />

          <Route path="/:clusterName/namespaces"
            element={<ClusterFromUrlGuard factory={c => <NamespacesList cluster={c} />} />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
