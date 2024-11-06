import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { MainPage } from "./features/main-page/MainPage";
import { DeploymentsList } from "./features/deployments-list/DeploymentsList";
import { DeploymentPage } from "./features/deployment-page/DeploymentPage";
import { LoadBalancersList } from "./features/load-balancers-list/LoadBalancersList";
import { LoadBalancerPage } from "./features/load-balancer/LoadBalancerPage";
import { NotFound } from "./shared/components/error/not-found/NotFound";
import { ClustersList } from "./features/clusters-list/ClustersList";
import { CreateDeployment } from "./features/create-resource/CreateDeployment";
import { CreateLoadBalancer } from "./features/create-resource/CreateLoadBalancer";
import { NamespacesList } from "./features/namespaces-list/NamespacesList";

export function RouteRecords() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />

          <Route path="setup-deployment" element={<CreateDeployment />} />
          <Route path="setup-load-balancer" element={<CreateLoadBalancer />} />

          <Route path="clusters-configuration" element={<ClustersList />} />

          <Route
            path="/:clusterName/:namespace/deployments"
            element={<DeploymentsList />}
          />
          <Route
            path="/:clusterName/:namespace/deployments/:deploymentName"
            element={<DeploymentPage />}
          />

          <Route
            path="/:clusterName/:namespace/load-balancers"
            element={<LoadBalancersList />}
          />
          <Route
            path="/:clusterName/:namespace/load-balancers/:loadBalancerName"
            element={<LoadBalancerPage />}
          />

          <Route path="/:clusterName/namespaces"
            element={<NamespacesList />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
